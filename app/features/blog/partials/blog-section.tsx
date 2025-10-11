import { useEffect, useMemo, useState } from "react";

import { useNavigate, useSearchParams } from "react-router";

import { Badge } from "~/components/atoms/badge";
import { Button } from "~/components/atoms/button";
import { FlickeringGrid } from "~/components/atoms/flickering-grid";
import { Icon } from "~/components/atoms/icon";
import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import SectionHeader from "~/components/atoms/section-header";
import { BLOG_POSTS } from "~/contents/blogs";
import { transformBlogToProps } from "~/lib/blog-transformer";
import { useBlogPageRepository } from "~/repositories/blog-repository";
import { useBlogFilterStore } from "~/stores/blog-filter-store";
import type { Category } from "~/types";
import type { Blog, Pagination } from "~/types/api";

import BlogEmptyState from "../_components/blog-empty-state";
import BlogFilter from "../_components/blog-filter";
import BlogPagination from "../_components/blog-pagination";
import ResponsiveBlogCard from "../_components/responsive-blog-card";
import { ResponsiveBlogSkeleton } from "../_components/skeletons/responsive-blog-skeleton";

const BLOGS_PER_PAGE = 6;

function createCategoryMapping(
    categories: { id: number; name: string }[]
): Record<string, number> {
    return categories.reduce(
        (acc, category) => {
            acc[category.name] = category.id;
            return acc;
        },
        {} as Record<string, number>
    );
}

interface BlogSectionProps {
    loaderData?: {
        blogs: Blog[];
        pagination: Pagination;
        initialSearch: string;
        initialPage: number;
    };
}

function BlogSection({ loaderData }: BlogSectionProps) {
    const [mounted, setMounted] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const urlPage = parseInt(searchParams.get("page") || "1");
    const urlSearch = searchParams.get("search") || "";
    const urlCategories = searchParams.get("categories") || "";

    const [searchQuery, setSearchQuery] = useState(urlSearch);
    const [currentPageState, setCurrentPageState] = useState(urlPage);
    const [isInitialLoading, setIsInitialLoading] = useState(!loaderData);

    const {
        currentPage,
        searchTerm,
        selectedCategories,
        searching,
        setCurrentPage,
        setSearchTerm,
        setSelectedCategories,
        setSearching,
        clearFilters,
        hasActiveFilters,
        getFilterParams,
    } = useBlogFilterStore();

    const categories: Category[] = useMemo(() => {
        return Array.from(
            new Set(BLOG_POSTS.map((blog: any) => blog.category))
        ).map((name, index) => ({
            id: index + 1,
            name,
            blogs_count: 0,
        }));
    }, []);

    const categoryMapping = useMemo(() => {
        return categories.reduce(
            (acc, category) => {
                acc[category.name] = category.id;
                return acc;
            },
            {} as Record<string, number>
        );
    }, [categories]);

    const needsClientQuery =
        !loaderData ||
        searchQuery !== (loaderData?.initialSearch || "") ||
        currentPageState !== (loaderData?.initialPage || 1);

    const filterParams = getFilterParams(categoryMapping);

    const blogPageParams = {
        ...filterParams,
        per_page: BLOGS_PER_PAGE,
    };

    const {
        data: blogsResponse,
        isLoading: blogsLoading,
        error: blogsError,
    } = useBlogPageRepository(
        {
            ...blogPageParams,
            search: needsClientQuery ? searchQuery || undefined : undefined,
            page: needsClientQuery ? currentPageState : undefined,
        },
        {
            enabled: needsClientQuery,
        }
    );

    const displayBlogs =
        !needsClientQuery && loaderData
            ? loaderData.blogs
            : blogsResponse?.data || [];

    const pagination =
        !needsClientQuery && loaderData
            ? loaderData.pagination
            : blogsResponse?.pagination;

    const allBlogsForCounting = displayBlogs;

    const isLoading = needsClientQuery ? blogsLoading : false;
    const hasError = needsClientQuery ? blogsError : false;

    const currentBlogs = hasError
        ? BLOG_POSTS.slice(0, BLOGS_PER_PAGE)
        : displayBlogs;

    const blogs = useMemo(() => {
        if (hasError) {
            return BLOG_POSTS.slice(0, BLOGS_PER_PAGE);
        }
        return currentBlogs.map((blog: any) => transformBlogToProps(blog));
    }, [currentBlogs, hasError]);

    const totalPages = pagination?.last_page || 1;
    const totalItems = pagination?.total || 0;

    const itemsPerPage = pagination?.per_page || BLOGS_PER_PAGE;
    const startIndex = pagination
        ? (pagination.current_page - 1) * itemsPerPage
        : 0;
    const endIndex = Math.min(startIndex + currentBlogs.length, totalItems);

    const updateUrl = (newSearch?: string, newPage?: number) => {
        const params = new URLSearchParams(searchParams);

        if (newSearch !== undefined) {
            if (newSearch) {
                params.set("search", newSearch);
            } else {
                params.delete("search");
            }
        }

        if (newPage !== undefined && newPage > 1) {
            params.set("page", newPage.toString());
        } else {
            params.delete("page");
        }

        const newUrl = params.toString() ? `?${params.toString()}` : "";
        navigate(`/blog${newUrl}`, { replace: true });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setCurrentPageState(page);
        updateUrl(searchQuery, page);

        document.getElementById("blog")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    useEffect(() => {
        const urlPage = parseInt(searchParams.get("page") || "1");
        const urlSearch = searchParams.get("search") || "";

        if (urlPage !== currentPageState) {
            setCurrentPageState(urlPage);
            setCurrentPage(urlPage);
        }
        if (urlSearch !== searchQuery) {
            setSearchQuery(urlSearch);
            setSearchTerm(urlSearch);
        }
    }, [
        searchParams,
        currentPageState,
        searchQuery,
        setCurrentPage,
        setSearchTerm,
    ]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm !== searchQuery) {
                setSearchQuery(searchTerm);
                setCurrentPage(1);
                setCurrentPageState(1);
                updateUrl(searchTerm, 1);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, searchQuery, setCurrentPage]);

    const handleCategoryChange = (selectedCategories: string[]) => {
        setSelectedCategories(selectedCategories);
        setCurrentPage(1);
        setCurrentPageState(1);
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            setSearchTerm(params.get("search") || "");

            const categoriesParam = params.get("categories");
            if (categoriesParam && categories.length > 0) {
                const urlCategories = categoriesParam.split(",");
                const allCategoryNames = categories.map((cat) => cat.name);

                const isAllCategories =
                    urlCategories.length === allCategoryNames.length &&
                    urlCategories.every((cat) =>
                        allCategoryNames.includes(cat)
                    );

                if (!isAllCategories) {
                    setSelectedCategories(urlCategories);
                }
            }

            setCurrentPage(1);
            setSearching(false);
        }
    }, [
        setCurrentPage,
        setSearchTerm,
        setSearching,
        setSelectedCategories,
        categories,
    ]);

    return (
        <section id="blog" className="relative md:py-24 py-8">
            <div className="absolute top-0 left-0 z-0 h-[200px] w-full [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]">
                <FlickeringGrid
                    className="absolute top-0 left-0 size-full"
                    squareSize={4}
                    gridGap={6}
                    color="#6B7280"
                    maxOpacity={0.2}
                    flickerChance={0.05}
                />
            </div>
            <MaxWidthWrapper>
                <div className="flex w-full flex-col items-start justify-center text-start">
                    <SectionHeader
                        badge="Blog"
                        title="Artikel & Berita"
                        subtitle="Temukan artikel-artikel menarik, tips kesehatan, dan berita terbaru seputar dunia medis yang berguna untuk Anda."
                    />
                    <div className="w-full">
                        <div className="mb-6">
                            <BlogFilter
                                categories={categories}
                                blogData={allBlogsForCounting.map(
                                    (blog: any) => ({
                                        id: blog.id,
                                        category: blog.category || "General",
                                        title: blog.title || blog.name,
                                    })
                                )}
                                allBlogsData={allBlogsForCounting.map(
                                    (blog: any) => ({
                                        id: blog.id,
                                        category: blog.category || "General",
                                        title: blog.title || blog.name,
                                    })
                                )}
                            />
                        </div>
                        <div className="flex w-full flex-col items-center justify-start">
                            {mounted && hasActiveFilters() && (
                                <div className="border-secondary bg-background mb-6 w-full rounded-lg border-2 p-4 shadow-sm">
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-7 items-center justify-center rounded-full bg-background">
                                                <Icon
                                                    icon="heroicons:funnel"
                                                    className="h-3.5 w-3.5 text-gray-600 dark:text-gray-300"
                                                />
                                            </div>
                                            <div className="text-sm text-gray-700 dark:text-gray-200">
                                                <span className="font-semibold">
                                                    {pagination?.total ||
                                                        currentBlogs.length}
                                                </span>
                                                <span className="ml-1">
                                                    artikel ditemukan
                                                </span>
                                                {searchTerm && (
                                                    <span className="ml-1 text-gray-500 dark:text-gray-400">
                                                        untuk &quot;
                                                        <span className="font-medium">
                                                            {searchTerm}
                                                        </span>
                                                        &quot;
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={clearFilters}
                                            className="text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
                                        >
                                            <Icon
                                                icon="heroicons:x-mark"
                                                className="mr-1 size-4"
                                            />
                                            Reset
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {searchTerm && (
                                            <Badge
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                <Icon
                                                    icon="heroicons:magnifying-glass"
                                                    className="mr-1 size-3"
                                                />
                                                {searchTerm}
                                            </Badge>
                                        )}
                                        {selectedCategories.length > 0 &&
                                            selectedCategories.map(
                                                (category) => (
                                                    <Badge
                                                        key={category}
                                                        variant="secondary"
                                                        className="text-xs"
                                                    >
                                                        <Icon
                                                            icon="heroicons:tag"
                                                            className="mr-1 size-3"
                                                        />
                                                        {category}
                                                    </Badge>
                                                )
                                            )}
                                    </div>
                                </div>
                            )}

                            {mounted && !isLoading && (
                                <div className="text-muted-foreground mb-4 w-full text-sm">
                                    Menampilkan {startIndex + 1}-{endIndex} dari{" "}
                                    {totalItems} artikel
                                    {totalPages > 1 &&
                                        ` (halaman ${currentPage} dari ${totalPages})`}
                                </div>
                            )}

                            {isLoading && (
                                <ResponsiveBlogSkeleton
                                    count={BLOGS_PER_PAGE}
                                />
                            )}

                            {!isLoading && blogs.length === 0 && (
                                <BlogEmptyState
                                    searchTerm={searchTerm}
                                    selectedCategories={selectedCategories.join(
                                        ","
                                    )}
                                />
                            )}

                            {!isLoading && blogs.length > 0 && (
                                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {blogs.map((blog: any, index: number) => (
                                        <ResponsiveBlogCard
                                            key={blog.slug || blog.id}
                                            post={blog}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            )}

                            {totalPages > 1 && (
                                <div className="mt-6 flex justify-center md:mt-10">
                                    <BlogPagination
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export { BlogSection };
