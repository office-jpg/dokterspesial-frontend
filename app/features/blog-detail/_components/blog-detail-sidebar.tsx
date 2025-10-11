import { useState } from "react";

import { useNavigate } from "react-router";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "~/components/atoms/card";
import { Icon } from "~/components/atoms/icon";
import type { BlogProps } from "~/types";

interface BlogDetailSidebarProps {
    latestBlogs?: BlogProps[];
}

export function BlogDetailSidebar({ latestBlogs = [] }: BlogDetailSidebarProps) {
    const navigate = useNavigate();
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    const handleImageError = (blogSlug: string) => {
        setImageErrors((prev) => ({ ...prev, [blogSlug]: true }));
    };

    return (
        <div className="h-fit lg:sticky lg:top-24 lg:col-span-1">
            <Card className="bg-background/60 rounded-none border-0 shadow-lg backdrop-blur-lg transition-all duration-300">
                <CardHeader>
                    <CardTitle className="text-foreground font-semibold">
                        Postingan Terbaru
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {latestBlogs.length > 0 ? (
                        <div className="space-y-4">
                            {latestBlogs.map((blog) => (
                                <div key={blog.slug} className="group">
                                    <button
                                        onClick={() =>
                                            navigate(`/blog/${blog.slug}`)
                                        }
                                        className="w-full text-left"
                                    >
                                        <div className="flex gap-3">
                                            <div className="bg-muted relative size-16 flex-shrink-0 overflow-hidden">
                                                {imageErrors[blog.slug] ||
                                                !blog.image ? (
                                                    <div className="flex h-full w-full items-center justify-center">
                                                        <Icon
                                                            icon="lucide:image-off"
                                                            className="text-muted-foreground h-6 w-6"
                                                        />
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={blog.image}
                                                        alt={blog.title}
                                                        className="h-full w-full object-cover"
                                                        onError={() =>
                                                            handleImageError(
                                                                blog.slug
                                                            )
                                                        }
                                                    />
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="group-hover:text-accent line-clamp-2 text-sm font-bold transition-colors">
                                                    {blog.title}
                                                </h4>
                                                <p className="text-muted-foreground mt-1 text-xs">
                                                    {blog.category} •{" "}
                                                    {blog.date}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground py-4 text-center text-sm">
                            Tidak ada postingan terbaru
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
