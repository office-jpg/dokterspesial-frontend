import { useEffect, useState } from "react";

import { useNavigate } from "react-router";

import { Avatar, AvatarFallback } from "~/components/atoms/avatar";
import { Button } from "~/components/atoms/button";
import { FlickeringGrid } from "~/components/atoms/flickering-grid";
import { Icon } from "~/components/atoms/icon";
import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import SectionHeader from "~/components/atoms/section-header";
import type { BlogProps } from "~/types";

import { BlogDetailBreadcrumb } from "../_components/blog-detail-breadcrumb";
import { BlogDetailSidebar } from "../_components/blog-detail-sidebar";
import { BlogDetailImageSkeleton } from "../_components/skeletons/blog-detail-image-skeleton";

interface BlogDetailProps {
    article: BlogProps & {
        content?: string | string[];
    };
    latestBlogs?: BlogProps[];
}

function BlogDetailSection({ article, latestBlogs }: BlogDetailProps) {
    const navigate = useNavigate();
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    const content =
        article.content ||
        article.excerpt.split(". ").map((s: string) => s.trim() + ".");

    const isHtmlContent =
        typeof content === "string" &&
        content.includes("<") &&
        content.includes(">");

    useEffect(() => {
        setImageLoading(true);
        setImageError(false);
    }, [article.id]);

    const handleBackClick = () => {
        navigate("/blog");
    };

    return (
        <section id="detail-service" className="relative md:py-24 py-8">
            <MaxWidthWrapper>
                <div className="absolute top-8 left-0 z-0 h-[200px] w-full [mask-image:linear-gradient(to_top,transparent_25%,black_95%)] md:top-24">
                    <FlickeringGrid
                        className="absolute top-0 left-0 size-full"
                        squareSize={4}
                        gridGap={6}
                        color="#6B7280"
                        maxOpacity={0.2}
                        flickerChance={0.05}
                    />
                </div>

                <BlogDetailBreadcrumb
                    category={article.category}
                    title={article.title}
                />

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="space-y-8 lg:col-span-2">
                        <SectionHeader
                            badge={article.category}
                            title={article.title}
                        />

                        <div>
                            <h3 className="text-foreground mb-4 text-xl font-semibold">
                                Tentang Penulis
                            </h3>
                            <div className="bg-background border-border flex items-center space-x-4 rounded-none border p-6">
                                <Avatar className="size-16">
                                    <AvatarFallback className="bg-blue-100 text-lg font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                        {article.author
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .toUpperCase()
                                            .slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-foreground text-lg font-semibold">
                                        {article.author}
                                    </p>
                                    <p className="text-muted-foreground mb-2 text-sm">
                                        Penulis & Content Creator
                                    </p>
                                    <p className="text-muted-foreground text-sm">
                                        {new Date(
                                            article.publishedAt
                                        ).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-background overflow-hidden rounded-none shadow-sm">
                            {imageLoading ? (
                                <BlogDetailImageSkeleton />
                            ) : imageError || !article.image ? (
                                <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                                    <div className="text-center">
                                        <Icon
                                            icon="lucide:image-off"
                                            className="text-muted-foreground mx-auto mb-3 h-12 w-12"
                                        />
                                        <p className="text-muted-foreground text-sm">
                                            Gambar tidak tersedia
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="h-full w-full object-cover transition-opacity duration-300"
                                        onLoad={() => setImageLoading(false)}
                                        onError={() => {
                                            setImageLoading(false);
                                            setImageError(true);
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="bg-background rounded-none p-8 shadow-sm">
                            <div className="mb-8">
                                <h3 className="text-foreground mb-4 text-xl font-semibold">
                                    Artikel
                                </h3>
                                <div className="prose prose-gray dark:prose-invert text-muted-foreground max-w-none leading-relaxed">
                                    {isHtmlContent ? (
                                        <div
                                            className="rich-content"
                                            dangerouslySetInnerHTML={{
                                                __html: content as string,
                                            }}
                                        />
                                    ) : (
                                        (content as string[]).map(
                                            (
                                                paragraph: string,
                                                index: number
                                            ) => {
                                                if (
                                                    paragraph.includes("<") &&
                                                    paragraph.includes(">")
                                                ) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="rich-content"
                                                            dangerouslySetInnerHTML={{
                                                                __html: paragraph,
                                                            }}
                                                        />
                                                    );
                                                } else {
                                                    return (
                                                        <p
                                                            key={index}
                                                            className="text-foreground mb-4 text-justify leading-relaxed"
                                                        >
                                                            {paragraph}
                                                        </p>
                                                    );
                                                }
                                            }
                                        )
                                    )}
                                </div>
                            </div>

                            <Button variant="outline" onClick={handleBackClick}>
                                Kembali ke Blog
                            </Button>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <BlogDetailSidebar latestBlogs={latestBlogs} />
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export { BlogDetailSection };
