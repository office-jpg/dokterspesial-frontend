import { useCallback, useEffect, useMemo, useState } from "react";

import { useLoaderData, useSearchParams } from "react-router";

import { Button } from "~/components/atoms/button";
import { FlickeringGrid } from "~/components/atoms/flickering-grid";
import { Icon } from "~/components/atoms/icon";
import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import SectionHeader from "~/components/atoms/section-header";
import { ServiceFilter } from "~/features/service/_components/service-filter";
import ServiceList from "~/features/service/_components/service-list";
import { ServicePagination } from "~/features/service/_components/service-pagination";

interface ServiceSectionProps {
    serviceList: any;
    serviceTypes: any;
    serviceCategories: any;
    serviceSpesialists: any;
    searchTerm: string;
    statusFilter: string[];
    spesialistFilter: string[];
    typeFilter: string[];
    categoryFilter: string[];
}

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export function ServiceSection({
    serviceList,
    serviceTypes,
    serviceCategories,
    serviceSpesialists,
    searchTerm: initialSearchTerm,
    statusFilter: initialStatusFilter,
    spesialistFilter: initialSpesialistFilter,
    typeFilter: initialTypeFilter,
    categoryFilter: initialCategoryFilter,
}: ServiceSectionProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm || "");
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const [shouldShowLoading, setShouldShowLoading] = useState(false);

    const [selectedStatuses, setSelectedStatuses] = useState<string[]>(
        initialStatusFilter || []
    );
    const [selectedSpesialists, setSelectedSpesialists] = useState<string[]>(
        initialSpesialistFilter || []
    );
    const [selectedTypes, setSelectedTypes] = useState<string[]>(
        initialTypeFilter || []
    );
    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        initialCategoryFilter || []
    );

    const debouncedSearchTerm = useDebounce(searchTerm, 800);

    const activeFilterCount =
        selectedStatuses.length +
        selectedSpesialists.length +
        selectedTypes.length +
        selectedCategories.length;
    const hasActiveFilters = activeFilterCount > 0;

    useEffect(() => {
        const updateParams = () => {
            const newParams = new URLSearchParams(searchParams);

            if (debouncedSearchTerm.trim()) {
                newParams.set("search", debouncedSearchTerm);
            } else {
                newParams.delete("search");
            }

            newParams.delete("page");
            setSearchParams(newParams, { preventScrollReset: true });
        };

        const currentSearch = searchParams.get("search") || "";
        if (debouncedSearchTerm !== currentSearch) {
            updateParams();
        }
    }, [debouncedSearchTerm, searchParams, setSearchParams]);

    useEffect(() => {
        const urlSearchTerm = searchParams.get("search") || "";
        if (urlSearchTerm !== searchTerm) {
            setSearchTerm(urlSearchTerm);
        }
    }, [searchParams]);

    useEffect(() => {
        if (searchTerm !== debouncedSearchTerm) {
            setIsLoading(true);
            setShouldShowLoading(true);
        } else {
            setIsLoading(false);
            setShouldShowLoading(false);
        }
    }, [searchTerm, debouncedSearchTerm]);

    const handleSearchChange = useCallback((value: string) => {
        setSearchTerm(value);
    }, []);

    const handleStatusChange = useCallback(
        (status: string) => {
            const newStatuses = selectedStatuses.includes(status)
                ? selectedStatuses.filter((s) => s !== status)
                : [...selectedStatuses, status];

            setSelectedStatuses(newStatuses);

            const newParams = new URLSearchParams(searchParams);
            newParams.delete("status");
            newParams.delete("page");

            newStatuses.forEach((s) => newParams.append("status", s));

            setSearchParams(newParams, { preventScrollReset: true });
        },
        [selectedStatuses, searchParams, setSearchParams]
    );

    const handleSpesialistChange = useCallback(
        (spesialist: string) => {
            const newSpesialists = selectedSpesialists.includes(spesialist)
                ? selectedSpesialists.filter((s) => s !== spesialist)
                : [...selectedSpesialists, spesialist];

            setSelectedSpesialists(newSpesialists);

            const newParams = new URLSearchParams(searchParams);
            newParams.delete("spesialist");
            newParams.delete("page");

            newSpesialists.forEach((s) => newParams.append("spesialist", s));

            setSearchParams(newParams, { preventScrollReset: true });
        },
        [selectedSpesialists, searchParams, setSearchParams]
    );

    const handleTypeChange = useCallback(
        (type: string) => {
            const newTypes = selectedTypes.includes(type)
                ? selectedTypes.filter((t) => t !== type)
                : [...selectedTypes, type];

            setSelectedTypes(newTypes);

            setSelectedSpesialists([]);

            const newParams = new URLSearchParams(searchParams);
            newParams.delete("page");
            newParams.delete("spesialist");
            newParams.delete("type");

            newTypes.forEach((t) => newParams.append("type", t));

            setSearchParams(newParams, { preventScrollReset: true });
        },
        [selectedTypes, searchParams, setSearchParams]
    );

    const handleCategoryChange = useCallback(
        (category: string) => {
            const newCategories = selectedCategories.includes(category)
                ? selectedCategories.filter((c) => c !== category)
                : [...selectedCategories, category];

            setSelectedCategories(newCategories);

            const newParams = new URLSearchParams(searchParams);
            newParams.delete("page");
            newParams.delete("category");

            newCategories.forEach((c) => newParams.append("category", c));

            setSearchParams(newParams, { preventScrollReset: true });
        },
        [selectedCategories, searchParams, setSearchParams]
    );

    const handleClearFilters = useCallback(() => {
        setSearchTerm("");
        setSelectedStatuses([]);
        setSelectedSpesialists([]);
        setSelectedTypes([]);
        setSelectedCategories([]);

        const newParams = new URLSearchParams();
        setSearchParams(newParams, { preventScrollReset: true });
    }, [setSearchParams]);

    const availableSpesialists = useMemo(() => {
        if (selectedTypes.length === 0 || !serviceList.filters?.spesialists) {
            return serviceSpesialists.data || [];
        }
        return serviceList.filters.spesialists;
    }, [selectedTypes, serviceList.filters?.spesialists, serviceSpesialists]);

    const getSelectedTypeName = () => {
        if (selectedTypes.length === 0) return "";
        return selectedTypes
            .map(
                (typeSlug) =>
                    serviceTypes.data?.find((t: any) => t.slug === typeSlug)
                        ?.name || ""
            )
            .filter(Boolean)
            .join(", ");
    };

    const getSelectedCategoryName = () => {
        if (selectedCategories.length === 0) return "";
        return selectedCategories
            .map(
                (categorySlug) =>
                    serviceCategories.data?.find(
                        (c: any) => c.slug === categorySlug
                    )?.name || ""
            )
            .filter(Boolean)
            .join(", ");
    };

    const getSelectedSpesialistName = () => {
        if (selectedSpesialists.length === 0) return "";
        return (
            availableSpesialists.find(
                (s: any) => s.slug === selectedSpesialists[0]
            )?.name || ""
        );
    };

    const handleTypeToggle = useCallback(
        (typeSlug: string) => {
            handleTypeChange(typeSlug);
        },
        [handleTypeChange]
    );

    const handleCategoryToggle = useCallback(
        (categorySlug: string) => {
            handleCategoryChange(categorySlug);
        },
        [handleCategoryChange]
    );

    const handleSpesialistToggle = useCallback(
        (spesialistName: string) => {
            const spesialist = availableSpesialists.find(
                (s: any) => s.name === spesialistName
            );
            if (spesialist) {
                handleSpesialistChange(spesialist.slug);
            }
        },
        [availableSpesialists, handleSpesialistChange]
    );

    const handleStatusToggle = useCallback(
        (statusKey: string) => {
            handleStatusChange(statusKey);
        },
        [handleStatusChange]
    );

    const forceRefetch = useCallback(() => {
        window.location.reload();
    }, []);

    return (
        <section
            id="services"
            className="relative overflow-hidden pt-20 pb-8 md:pt-24 md:pb-24"
        >
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
                        badge="Event"
                        title="Event Kami"
                        subtitle="Temukan berbagai acara menarik dan bermanfaat yang kami selenggarakan. Dari webinar hingga workshop, kami memiliki sesuatu untuk semua orang."
                    />
                    <div className="w-full">
                        <div className="mb-6">
                            <ServiceFilter
                                searchInput={searchTerm}
                                isSearchPending={
                                    searchTerm !== debouncedSearchTerm
                                }
                                selectedTypes={selectedTypes}
                                selectedCategories={selectedCategories}
                                selectedSpesialist={
                                    selectedSpesialists[0] || ""
                                }
                                selectedStatuses={selectedStatuses}
                                isExpanded={isExpanded}
                                types={serviceTypes.data || []}
                                categories={serviceCategories.data || []}
                                availableSpesialists={availableSpesialists}
                                pagination={serviceList.pagination}
                                onSearchInputChange={handleSearchChange}
                                onTypeToggle={handleTypeToggle}
                                onCategoryToggle={handleCategoryToggle}
                                onSpesialistToggle={handleSpesialistToggle}
                                onStatusToggle={handleStatusToggle}
                                onReset={handleClearFilters}
                                onExpandedChange={setIsExpanded}
                                filterInfo={{
                                    hasActiveFilters: hasActiveFilters,
                                    activeFilterCount: activeFilterCount,
                                }}
                                selectedTypeName={getSelectedTypeName()}
                                selectedCategoryName={getSelectedCategoryName()}
                                selectedSpesialistName={getSelectedSpesialistName()}
                            />
                        </div>

                        <div className="min-w-0 flex-1">
                            {serviceList.data && serviceList.data.length > 0 ? (
                                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                                    {serviceList.data.map(
                                        (service: any, index: any) => (
                                            <ServiceList
                                                key={service.id}
                                                service={service}
                                                index={index}
                                            />
                                        )
                                    )}
                                </div>
                            ) : (
                                <div className="py-12 text-center">
                                    <div className="mx-auto mb-4 h-24 w-24 text-gray-300">
                                        <Icon
                                            icon="ph:magnifying-glass"
                                            className="h-full w-full"
                                        />
                                    </div>
                                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                                        {searchTerm
                                            ? "Tidak ada layanan ditemukan"
                                            : "Belum ada layanan"}
                                    </h3>
                                    <p className="mb-6 text-gray-500">
                                        {searchTerm
                                            ? `Tidak ditemukan layanan yang sesuai dengan pencarian "${searchTerm}"`
                                            : "Saat ini belum ada layanan yang tersedia"}
                                    </p>
                                    {(searchTerm || hasActiveFilters) && (
                                        <Button
                                            onClick={() =>
                                                (window.location.href =
                                                    "/service")
                                            }
                                            variant="outline"
                                            className="mx-auto"
                                        >
                                            <Icon
                                                icon="ph:arrow-clockwise"
                                                className="mr-2 h-4 w-4"
                                            />
                                            Reset Filter
                                        </Button>
                                    )}
                                </div>
                            )}

                            <ServicePagination
                                page={serviceList.pagination?.current_page || 1}
                                totalPages={
                                    serviceList.pagination?.last_page || 1
                                }
                                from={
                                    ((serviceList.pagination?.current_page ||
                                        1) -
                                        1) *
                                        (serviceList.pagination?.per_page ||
                                            6) +
                                    1
                                }
                                to={Math.min(
                                    (serviceList.pagination?.current_page ||
                                        1) *
                                        (serviceList.pagination?.per_page || 6),
                                    serviceList.pagination?.total || 0
                                )}
                                total={serviceList.pagination?.total || 0}
                            />
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}
