import { Skeleton } from "~/components/atoms/skeleton";

interface MentorCarouselSkeletonProps {
    count?: number;
}

export function MentorCarouselSkeleton({
    count = 6,
}: MentorCarouselSkeletonProps) {
    return (
        <div className="relative">
            <div className="overflow-hidden">
                <div className="flex gap-6">
                    {Array.from({ length: count }).map((_, index) => (
                        <div
                            key={index}
                            className="min-w-0 flex-[0_0_80%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_30%] xl:flex-[0_0_25%]"
                        >
                            <div className="group/card w-full pb-20">
                                <div className="relative w-full max-w-sm antialiased">
                                    <Skeleton className="h-80 w-full" />

                                    <div className="absolute -mt-24 w-full px-4">
                                        <div className="bg-background border-border border p-6 text-start shadow-lg">
                                            <div className="mb-2 flex items-center gap-2">
                                                <Skeleton className="h-4 w-4" />
                                                <Skeleton className="h-5 w-32" />
                                            </div>

                                            <div className="flex flex-col items-start justify-center gap-y-2">
                                                <Skeleton className="h-6 w-16 rounded" />
                                                <div className="flex items-center gap-1">
                                                    <Skeleton className="h-3 w-3" />
                                                    <Skeleton className="h-3 w-24" />
                                                </div>
                                            </div>

                                            <div className="mt-1 flex items-center gap-1">
                                                <Skeleton className="h-3 w-3" />
                                                <Skeleton className="h-4 w-20" />
                                            </div>

                                            <div className="mt-1 flex items-center gap-1">
                                                <Skeleton className="h-3 w-3" />
                                                <Skeleton className="h-4 w-28" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-10" />
                    <Skeleton className="h-10 w-10" />
                </div>

                <div className="mx-8 flex-1">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-2 flex-1" />
                    </div>
                </div>

                <div className="flex gap-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-2 w-2 rounded-full"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
