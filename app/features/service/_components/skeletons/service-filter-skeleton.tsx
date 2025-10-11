import { Skeleton } from "~/components/atoms/skeleton";

interface ServiceFilterSkeletonProps {
    showSearchBar?: boolean;
    showCategories?: boolean;
    showTopics?: boolean;
    showStatus?: boolean;
}

export function ServiceFilterSkeleton({
    showSearchBar = true,
    showCategories = true,
    showTopics = true,
    showStatus = true,
}: ServiceFilterSkeletonProps) {
    return (
        <div className="w-full space-y-4">
            {showSearchBar && (
                <div className="relative">
                    <Skeleton className="h-10 w-full rounded-md bg-gray-300/80 dark:bg-gray-600/80" />
                </div>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {showCategories && (
                    <div>
                        <Skeleton className="mb-2 h-4 w-16 bg-gray-300/80 dark:bg-gray-600/80" />
                        <Skeleton className="h-10 w-full rounded-md bg-gray-300/80 dark:bg-gray-600/80" />
                    </div>
                )}

                {showTopics && (
                    <div>
                        <Skeleton className="mb-2 h-4 w-12 bg-gray-300/80 dark:bg-gray-600/80" />
                        <Skeleton className="h-10 w-full rounded-md bg-gray-300/80 dark:bg-gray-600/80" />
                    </div>
                )}

                {showStatus && (
                    <div>
                        <Skeleton className="mb-2 h-4 w-14 bg-gray-300/80 dark:bg-gray-600/80" />
                        <Skeleton className="h-10 w-full rounded-md bg-gray-300/80 dark:bg-gray-600/80" />
                    </div>
                )}
            </div>
        </div>
    );
}

/**
 * Compact version for smaller spaces
 */
export function ServiceFilterCompactSkeleton() {
    return (
        <div className="w-full space-y-3">
            <Skeleton className="h-9 w-full rounded-md bg-gray-300/80 dark:bg-gray-600/80" />

            <div className="flex gap-2 overflow-x-auto">
                <Skeleton className="h-8 w-20 flex-shrink-0 rounded-md bg-gray-300/80 dark:bg-gray-600/80" />
                <Skeleton className="h-8 w-24 flex-shrink-0 rounded-md bg-gray-300/80 dark:bg-gray-600/80" />
                <Skeleton className="h-8 w-16 flex-shrink-0 rounded-md bg-gray-300/80 dark:bg-gray-600/80" />
            </div>
        </div>
    );
}

/**
 * Minimal loading state for inline usage
 */
export function ServiceFilterInlineSkeleton() {
    return (
        <div className="bg-card border-border flex h-32 items-center justify-center rounded-lg border p-6 shadow-sm">
            <div className="space-y-3 text-center">
                <Skeleton className="mx-auto h-4 w-24 bg-gray-300/80 dark:bg-gray-600/80" />
                <div className="flex justify-center gap-2">
                    <Skeleton className="h-2 w-2 rounded-full bg-gray-300/80 dark:bg-gray-600/80" />
                    <Skeleton className="h-2 w-2 rounded-full bg-gray-300/80 dark:bg-gray-600/80" />
                    <Skeleton className="h-2 w-2 rounded-full bg-gray-300/80 dark:bg-gray-600/80" />
                </div>
            </div>
        </div>
    );
}
