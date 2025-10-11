import { memo, useCallback, useEffect, useMemo, useState } from "react";

import { useSearchParams } from "react-router";

import { getMentors } from "~/actions/mentor/get-mentors";
import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import SectionHeader from "~/components/atoms/section-header";
import { MentorDetailModal } from "~/features/service-detail/_components/mentor-detail-modal";
import type { MentorCardProps } from "~/types";
import type { Mentor } from "~/types/api";

import { MentorCarousel } from "../_components/mentor-carousel";
import MentorEmptyState from "../_components/mentor-empty-state";
import { MentorSearch } from "../_components/mentor-search";
import { MentorCarouselSkeleton } from "../_components/skeletons/mentor-carousel-skeleton";

interface Brand {
    id: number;
    name: string;
    slug: string;
}

interface MentorWithBrands extends Mentor {
    brands: Brand[];
}

function transformMentorToCard(
    mentor: Mentor | MentorWithBrands
): MentorCardProps {
    return {
        id: mentor.id,
        name: mentor.name,
        slug: mentor.slug,
        spesialist: mentor.spesialist,
        image: mentor.image,
        image_url: mentor.image_url,
        description: mentor.description,
        place: mentor.place,
    };
}

interface GPAMentorSectionProps {
    loaderData?: {
        brands: Brand[];
        mentorsByBrand: Record<string, MentorWithBrands[]>;
        paginationByBrand: Record<string, any>;
        selectedBrand?: string;
        searchQuery?: string;
        initialSearch: string;
        initialBrand: string;
    };
}

function GPAMentorSectionComponent({ loaderData }: GPAMentorSectionProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    // GPA brand slug - based on API response
    const GPA_BRAND_SLUG = "global-pain-academy";

    const [mentors, setMentors] = useState<MentorWithBrands[]>(
        loaderData?.mentorsByBrand?.[GPA_BRAND_SLUG] || []
    );

    const [pagination, setPagination] = useState<any>(
        loaderData?.paginationByBrand?.[GPA_BRAND_SLUG] || null
    );

    // Use URL search params for search query to avoid unnecessary state updates
    const searchQuery = useMemo(() => {
        return (
            searchParams.get("gpa_search") || loaderData?.initialSearch || ""
        );
    }, [searchParams, loaderData?.initialSearch]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasHydrated, setHasHydrated] = useState(!!loaderData);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasMorePages, setHasMorePages] = useState<boolean>(false);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

    const [selectedMentor, setSelectedMentor] =
        useState<MentorCardProps | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadInitialData = async () => {
            if (mentors.length === 0) {
                const initialPagination =
                    loaderData?.paginationByBrand?.[GPA_BRAND_SLUG];
                if (initialPagination) {
                    setCurrentPage(initialPagination.current_page || 1);
                    setHasMorePages(initialPagination.has_more_pages || false);
                }
                setHasHydrated(true);
            }
        };

        if (!hasHydrated) {
            loadInitialData();
        }
    }, [loaderData, hasHydrated, mentors.length, GPA_BRAND_SLUG]);

    const loadMoreMentors = useCallback(async () => {
        if (isLoadingMore || !hasMorePages) return;

        setIsLoadingMore(true);
        setError(null);

        try {
            const nextPage = currentPage + 1;
            const response = await getMentors({
                per_page: 6,
                page: nextPage,
                brand_slug: GPA_BRAND_SLUG,
                search: searchQuery || undefined,
            });

            if (response.success && response.data.length > 0) {
                const filteredMentors = response.data.filter((mentor) =>
                    mentor.brands?.some(
                        (brand) => brand.slug === GPA_BRAND_SLUG
                    )
                );

                setMentors((prev) => [...prev, ...filteredMentors]);
                setCurrentPage(nextPage);
                setHasMorePages(response.pagination?.has_more_pages || false);
                setPagination(response.pagination);
            } else {
                setHasMorePages(false);
            }
        } catch (error) {
            console.error("Error loading more GPA mentors:", error);
            setError("Gagal memuat data mentor tambahan");
        } finally {
            setIsLoadingMore(false);
        }
    }, [isLoadingMore, hasMorePages, currentPage, searchQuery, GPA_BRAND_SLUG]);

    const handleSearch = useCallback(
        async (query: string) => {
            // Update URL search params instead of local state
            setSearchParams(
                (prev) => {
                    if (query) {
                        prev.set("gpa_search", query);
                    } else {
                        prev.delete("gpa_search");
                    }
                    return prev;
                },
                {
                    replace: true,
                    preventScrollReset: true,
                }
            );

            setIsLoading(true);
            setError(null);

            // Clear mentors immediately to show skeleton
            setMentors([]);

            try {
                const response = await getMentors({
                    per_page: 12,
                    page: 1,
                    brand_slug: GPA_BRAND_SLUG,
                    search: query || undefined,
                });

                if (response.success) {
                    const filteredMentors = response.data.filter((mentor) => {
                        return mentor.brands?.some(
                            (brand) => brand.slug === GPA_BRAND_SLUG
                        );
                    });

                    setMentors(filteredMentors);
                    setCurrentPage(1);
                    setHasMorePages(
                        response.pagination?.has_more_pages || false
                    );
                    setPagination(response.pagination);
                } else {
                    setMentors([]);
                    setHasMorePages(false);
                }
            } catch (error) {
                console.error("Error searching GPA mentors:", error);
                setError("Gagal mencari mentor GPA");
                setMentors([]);
                setHasMorePages(false);
            } finally {
                setIsLoading(false);
            }
        },
        [setSearchParams, GPA_BRAND_SLUG]
    );

    const handleMentorClick = useCallback((mentor: MentorCardProps) => {
        setSelectedMentor(mentor);
        setIsModalOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setIsModalOpen(false);
        setSelectedMentor(null);
    }, []);

    const getSearchResultsCount = useCallback(() => {
        return mentors.length;
    }, [mentors.length]);

    const transformedMentors = useMemo(
        () => mentors.map(transformMentorToCard),
        [mentors]
    );

    return (
        <section
            id="gpa-mentors"
            className="from-background via-background to-muted/30 relative overflow-hidden bg-gradient-to-br py-8 md:py-24"
        >
            <MaxWidthWrapper className="relative z-10">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12 text-start">
                        <SectionHeader
                            badge="Tim Ahli GPA"
                            title="Mentor Global Pain Academy"
                            subtitle="Belajar dari para spesialis manajemen nyeri terdepan yang telah berpengalaman dalam menangani berbagai kasus nyeri muskuloskeletal dan kronis"
                            badgeColor="text-gpa bg-gpa/40"
                        />
                    </div>

                    <div className="space-y-8">
                        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                            <MentorSearch
                                value={searchQuery}
                                onChange={handleSearch}
                                placeholder="Cari mentor GPA berdasarkan nama..."
                            />
                        </div>

                        {error ? (
                            <MentorEmptyState
                                searchTerm={searchQuery}
                                hasError={true}
                            />
                        ) : isLoading ? (
                            <MentorCarouselSkeleton count={6} />
                        ) : transformedMentors.length > 0 ? (
                            <>
                                <MentorCarousel
                                    mentors={transformedMentors}
                                    onMentorClick={handleMentorClick}
                                    onReachEnd={() => {
                                        if (hasMorePages && !isLoadingMore) {
                                            loadMoreMentors();
                                        }
                                    }}
                                    isLoading={isLoadingMore}
                                    badgeColor="bg-blue-200 text-gpa dark:bg-blue-800 dark:text-blue-200"
                                />

                                {isLoadingMore && (
                                    <div className="mt-8">
                                        <MentorCarouselSkeleton count={3} />
                                    </div>
                                )}
                            </>
                        ) : (
                            <MentorEmptyState
                                searchTerm={searchQuery}
                                hasError={false}
                            />
                        )}

                        {searchQuery && (
                            <p className="text-muted-foreground text-center text-sm">
                                Menampilkan {getSearchResultsCount()} mentor GPA
                                untuk &ldquo;{searchQuery}&rdquo;
                            </p>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>

            {selectedMentor && (
                <MentorDetailModal
                    mentor={selectedMentor}
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    layout={false}
                    badgeColor="bg-blue-100 text-gpa dark:bg-blue-900"
                />
            )}
        </section>
    );
}

export const GPAMentorSection = memo(GPAMentorSectionComponent);
