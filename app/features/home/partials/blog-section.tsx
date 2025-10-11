import { memo, useMemo } from "react";

import { Link } from "react-router";

import { AlertCircle, ChevronRight } from "lucide-react";

import { Button } from "~/components/atoms/button";
import { Card, CardContent } from "~/components/atoms/card";
import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import SectionHeader from "~/components/atoms/section-header";
import BlogBox from "~/features/blog/_components/blog-box";
import { BlogBoxSkeleton } from "~/features/blog/_components/skeletons/blog-box-skeleton";
import { transformBlogToProps } from "~/lib/blog-transformer";
import { useHomeBlogs } from "~/repositories";
import type { Blog } from "~/types/api";

interface BlogSectionProps {
    loaderData?: {
        webinarServices: any[];
        workshopServices: any[];
        blogs: Blog[];
    };
}

function BlogSection({ loaderData }: BlogSectionProps) {
    const needsClientQuery =
        !loaderData?.blogs || loaderData.blogs.length === 0;

    const {
        data: blogData,
        isLoading,
        error,
        refetch,
    } = useHomeBlogs(
        { per_page: 3 },
        {
            enabled: needsClientQuery,
        }
    );

    const blogs = useMemo(() => {
        const rawBlogs = loaderData?.blogs || blogData?.data || [];
        return rawBlogs.map(transformBlogToProps);
    }, [loaderData?.blogs, blogData?.data]);

    return (
        <section id="home-blog" className="relative md:py-24 py-8">
            <MaxWidthWrapper>
                <div className="flex w-full flex-col items-start justify-center text-start">
                    <SectionHeader
                        badge="Blog"
                        title={
                            <>
                                Artikel & Berita
                                <br />
                                <span className="text-primary">Terkini</span>
                            </>
                        }
                    />

                    <div className="w-full">
                        {needsClientQuery && isLoading ? (
                            <BlogBoxSkeleton count={3} />
                        ) : needsClientQuery && error ? (
                            <Card className="border-red-200 bg-red-50/80 backdrop-blur-lg">
                                <CardContent className="flex flex-col items-center justify-center py-12 text-center lg:py-16">
                                    <AlertCircle className="h-6 w-6 text-red-600 lg:h-8 lg:w-8" />
                                    <p className="mt-3 text-sm text-red-600 lg:mt-4">
                                        Gagal memuat artikel. Silakan coba lagi
                                        nanti.
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={() => refetch()}
                                        className="mt-4"
                                    >
                                        Coba Lagi
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : blogs.length > 0 ? (
                            <>
                                <div className="mb-8 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {blogs.map((post, index) => (
                                        <BlogBox
                                            key={post.id}
                                            post={post}
                                            index={index}
                                        />
                                    ))}
                                </div>

                                <div className="flex justify-center">
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="lg"
                                        className="group border-primary/20 hover:bg-primary bg-white/60 backdrop-blur-lg transition-all duration-300 hover:text-white"
                                    >
                                        <Link to="/blog">
                                            Lihat Semua Artikel
                                            <ChevronRight className="size-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <Card className="bg-muted/50">
                                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                                    <p className="text-muted-foreground">
                                        Belum ada artikel yang tersedia.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

const MemoizedBlogSection = memo(BlogSection);
export { MemoizedBlogSection as BlogSection };
