import { memo, useState } from "react";

import { Link } from "react-router";

import { ArrowRight, Calendar, ImageOff } from "lucide-react";

import { Badge } from "~/components/atoms/badge";
import { Button } from "~/components/atoms/button";
import { Card, CardContent, CardHeader } from "~/components/atoms/card";
import type { BlogProps } from "~/types";

interface BlogBoxProps {
    post: BlogProps;
    index: number;
}

const BlogBox = memo(({ post, index }: BlogBoxProps) => {
    const [imageError, setImageError] = useState(false);

    return (
        <Card className="group overflow-hidden p-0 transition-all duration-300 hover:shadow-lg gap-0 bg-background h-full flex flex-col">
            <CardHeader className="gap-0 relative p-0 flex-shrink-0">
                <Link
                    to={`/blog/${post.slug}`}
                    className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    {!(post.image && post.image.trim() !== "" && !imageError) ? (
                        <div className="bg-muted flex h-56 w-full items-center justify-center">
                            <div className="text-center">
                                <ImageOff className="text-muted-foreground mx-auto mb-2 size-12" />
                                <p className="text-muted-foreground text-sm">
                                    No Image Available
                                </p>
                            </div>
                        </div>
                    ) : (
                        <img
                            src={post.image!}
                            alt={post.title || "Blog image"}
                            className="h-56 w-full object-cover transition-all duration-500 ease-out group-hover:scale-105"
                            onError={() => setImageError(true)}
                            loading="lazy"
                        />
                    )}
                </Link>

                <div className="absolute inset-x-0 top-auto bottom-0">
                    <div className="bg-background inline-block max-w-52 w-full p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
                                {post.author?.charAt(0) || "A"}
                            </div>
                            <div className="min-w-0 flex-1">
                                <h4 className="text-foreground line-clamp-1 text-sm font-medium">
                                    {post.author || "Admin"}
                                </h4>
                                <div className="text-muted-foreground flex items-center gap-1 text-xs">
                                    <Calendar className="size-3" />
                                    <span>
                                        {new Date(
                                            post.publishedAt || post.date
                                        ).toLocaleDateString("id-ID")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="gap-0 flex h-fit flex-col p-6 flex-1">
                <div className="mb-4 flex items-center gap-4">
                    <hr className="w-10 border-[1px] border-muted-foreground" />
                    <Badge className="bg-primary text-primary-foreground text-xs">
                        {post.category || "Artikel"}
                    </Badge>
                </div>
                <div className="flex flex-1 flex-col">
                    <Link
                        to={`/blog/${post.slug}`}
                        className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                    >
                        <h2 className="text-foreground mb-3 line-clamp-2 text-xl font-semibold min-h-[3.5rem] group-hover:text-primary transition-colors duration-300">
                            {post.title}
                        </h2>
                        <p className="text-muted-foreground mb-6 line-clamp-3 text-sm leading-relaxed min-h-[4rem]">
                            {post.excerpt}
                        </p>
                    </Link>
                    <Button
                        variant="ghost"
                        asChild
                        className="!px-0 flex items-center gap-2 text-base font-medium text-foreground hover:text-primary transition-all duration-300 h-auto justify-start hover:bg-secondary"
                    >
                        <Link to={`/blog/${post.slug}`}>
                            Baca Selengkapnya
                            <ArrowRight className="size-5" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
});

BlogBox.displayName = "BlogBox";

export default BlogBox;
