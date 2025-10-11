import { useState } from "react";
import { Badge } from "~/components/atoms/badge";
import { Button } from "~/components/atoms/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "~/components/atoms/collapsible";
import { Icon } from "~/components/atoms/icon";
import { Input } from "~/components/atoms/input";

interface ServiceFilterProps {
    // Filter state
    searchInput: string;
    isSearchPending: boolean;
    selectedTypes: string[];
    selectedCategories: string[];
    selectedSpesialist: string;
    selectedStatuses: string[];
    isExpanded: boolean;
    
    // Data
    types: any[];
    categories: any[];
    availableSpesialists: any[];
    pagination: any;
    
    // Handlers
    onSearchInputChange: (value: string) => void;
    onTypeToggle: (typeSlug: string) => void;
    onCategoryToggle: (categorySlug: string) => void;
    onSpesialistToggle: (spesialistName: string) => void;
    onStatusToggle: (status: string) => void;
    onReset: () => void;
    onExpandedChange: (expanded: boolean) => void;
    
    // Filter info
    filterInfo: {
        hasActiveFilters: boolean;
        activeFilterCount: number;
    };
    
    // Selected names for display
    selectedTypeName: string;
    selectedCategoryName: string;
    selectedSpesialistName: string;
}

const STATUS_OPTIONS = [
    { key: "akan datang", label: "Akan Datang" },
    { key: "berlangsung", label: "Sedang Berlangsung" },
    { key: "selesai", label: "Selesai" },
];

export function ServiceFilter({
    // Filter state
    searchInput,
    isSearchPending,
    selectedTypes,
    selectedCategories,
    selectedSpesialist,
    selectedStatuses,
    isExpanded,
    
    // Data
    types,
    categories,
    availableSpesialists,
    pagination,
    
    // Handlers
    onSearchInputChange,
    onTypeToggle,
    onCategoryToggle,
    onSpesialistToggle,
    onStatusToggle,
    onReset,
    onExpandedChange,
    
    // Filter info
    filterInfo,
    
    // Selected names for display
    selectedTypeName,
    selectedCategoryName,
    selectedSpesialistName,
}: ServiceFilterProps) {
    // Compute derived values
    const selectedTypeNames = selectedTypes.map(typeSlug => 
        types.find((t: any) => t.slug === typeSlug)?.name
    ).filter(Boolean);
    const selectedCategoryNames = selectedCategories.map(categorySlug => 
        categories.find((c: any) => c.slug === categorySlug)?.name
    ).filter(Boolean);
    const selectedSpesialistNames = selectedSpesialistName ? [selectedSpesialistName] : [];
    const displaySpesialists = availableSpesialists || [];
    const displayServicesCount = pagination?.total || 0;
    const hasActiveFiltersForDisplay = filterInfo.hasActiveFilters || searchInput;
    const isLoading = false;
    const isLoadingSpecialists = false;
    const statusOptions = STATUS_OPTIONS;
    
    const handleReset = onReset;
    const handleTypeToggle = onTypeToggle;
    const handleCategoryToggle = onCategoryToggle;
    const handleSpesialistToggle = onSpesialistToggle;
    const handleStatusToggle = onStatusToggle;
    const handleSearchInputChange = onSearchInputChange;
    const setIsExpanded = onExpandedChange;

    return (
        <>
            {/* Filter Results Display */}
            {hasActiveFiltersForDisplay && (
                <div className="border-secondary bg-background mb-6 w-full rounded-lg border-2 p-4 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-secondary flex size-7 items-center justify-center rounded-full">
                                <Icon
                                    icon="heroicons:funnel"
                                    className="text-muted-foreground size-3.5"
                                />
                            </div>
                            <div className="text-foreground text-sm">
                                <span className="font-semibold">
                                    {displayServicesCount}
                                </span>
                                <span className="ml-1">
                                    layanan ditemukan
                                </span>
                                {searchInput && ( // Use searchInput for immediate display
                                    <span className="text-muted-foreground ml-1">
                                        untuk &quot;
                                        <span className="font-medium">
                                            {searchInput}
                                        </span>
                                        &quot;
                                    </span>
                                )}
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleReset}
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
                        {selectedCategoryNames.length > 0 &&
                            selectedCategoryNames.map((categoryName, index) => (
                                <Badge
                                    key={`category-${index}`}
                                    variant="secondary"
                                    className="text-xs"
                                >
                                    <Icon
                                        icon="heroicons:tag"
                                        className="mr-1 size-3"
                                    />
                                    {categoryName}
                                </Badge>
                            ))}

                        {selectedTypeNames.length > 0 &&
                            selectedTypeNames.map((typeName, index) => (
                                <Badge
                                    key={`type-${index}`}
                                    variant="secondary"
                                    className="text-xs"
                                >
                                    <Icon
                                        icon="heroicons:squares-2x2"
                                        className="mr-1 size-3"
                                    />
                                    {typeName}
                                </Badge>
                            ))}

                        {selectedSpesialistNames.length > 0 &&
                            selectedSpesialistNames.map((spesialistName, index) => (
                                <Badge
                                    key={`spesialist-${index}`}
                                    variant="secondary"
                                    className="text-xs"
                                >
                                    <Icon
                                        icon="heroicons:user"
                                        className="mr-1 size-3"
                                    />
                                    {spesialistName}
                                </Badge>
                            ))}
                    </div>
                </div>
            )}

            {/* Main Filter Component */}
            <div className="border-accent bg-secondary dark:bg-background space-y-4 border p-4 sm:p-6 shadow-sm">
            <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
                <div className="mb-6 sm:mb-8 flex items-start justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-2">
                            <Icon
                                icon="lucide:list-filter"
                                className="size-4 sm:size-5 text-gray-600 dark:text-gray-400"
                            />
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
                                Filter Event
                            </h3>
                        </div>
                        {filterInfo.hasActiveFilters && (
                            <Badge
                                variant="secondary"
                                className="text-xs font-medium"
                            >
                                {filterInfo.activeFilterCount} aktif
                            </Badge>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <CollapsibleTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <Icon
                                    icon={
                                        isExpanded
                                            ? "lucide:chevron-up"
                                            : "lucide:chevron-down"
                                    }
                                    className="mr-1 size-4"
                                />
                                {isExpanded ? "Sembunyikan" : "Tampilkan"}
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                </div>

                <CollapsibleContent>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {types.length > 0 && (
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Brand
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {types.map((type) => {
                                            const isSelected =
                                                selectedTypes.includes(
                                                    type.slug
                                                );
                                            return (
                                                <Button
                                                    key={type.id}
                                                    variant={
                                                        isSelected
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    size="sm"
                                                    disabled={isLoading}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleTypeToggle(
                                                            type.slug
                                                        );
                                                    }}
                                                    className="text-xs transition-colors"
                                                >
                                                    {type.name}
                                                </Button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Status
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {statusOptions.map((status) => {
                                        const isSelected =
                                            selectedStatuses.includes(
                                                status.key
                                            );
                                        return (
                                            <Button
                                                key={status.key}
                                                variant={
                                                    isSelected
                                                        ? "default"
                                                        : "outline"
                                                }
                                                size="sm"
                                                disabled={isLoading}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleStatusToggle(
                                                        status.key
                                                    );
                                                }}
                                                className="text-xs transition-colors"
                                            >
                                                {status.label}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Kategori
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {(categories || []).map((category) => {
                                        const isSelected =
                                            selectedCategories.includes(
                                                category.slug
                                            );
                                        return (
                                            <Button
                                                key={category.id}
                                                variant={
                                                    isSelected
                                                        ? "default"
                                                        : "outline"
                                                }
                                                size="sm"
                                                disabled={isLoading}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleCategoryToggle(
                                                        category.slug
                                                    );
                                                }}
                                                className="text-xs transition-colors"
                                            >
                                                {category.name}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Spesialis ({displaySpesialists.length})
                                    {selectedTypeNames.length > 0 && (
                                        <span className="text-xs text-muted-foreground ml-2">
                                            (Berdasarkan brand yang dipilih)
                                        </span>
                                    )}
                                    {isLoadingSpecialists && selectedTypeNames.length > 0 && (
                                        <span className="text-xs text-blue-500 ml-2">
                                            (Loading...)
                                        </span>
                                    )}
                                </label>
                                <div className="max-h-48 overflow-y-auto">
                                    <div className="flex flex-wrap gap-2 pr-4"
                                         style={{ pointerEvents: 'auto' }}
                                    >
                                        {isLoadingSpecialists && selectedTypeNames.length > 0 ? (
                                            <p className="text-sm text-gray-500">
                                                Loading specialists...
                                            </p>
                                        ) : displaySpesialists.length === 0 ? (
                                            <p className="text-sm text-gray-500">
                                                {selectedTypeNames.length > 0 
                                                    ? "Tidak ada spesialis tersedia untuk brand yang dipilih" 
                                                    : "Pilih brand terlebih dahulu"
                                                }
                                            </p>
                                        ) : (
                                            displaySpesialists.map((spesialist: any) => {
                                                const isSelected =
                                                    selectedSpesialistNames.includes(
                                                        spesialist.name
                                                    );
                                                
                                                

                                                return (
                                                    <Button
                                                        key={spesialist.id}
                                                        variant={
                                                            isSelected
                                                                ? "default"
                                                                : "outline"
                                                        }
                                                        size="sm"
                                                        onClick={() => {
                                                            handleSpesialistToggle(spesialist.name);
                                                        }}
                                                        className="text-xs transition-colors cursor-pointer hover:bg-primary/10"
                                                        style={{ pointerEvents: 'auto' }}
                                                    >
                                                        {spesialist.name}
                                                    </Button>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search Input */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Pencarian
                            </label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Cari layanan..."
                                    value={searchInput} // Use local state for immediate response
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        handleSearchInputChange(value); // Use our new handler
                                    }}
                                    className={`w-full pr-10 ${isSearchPending ? 'bg-gray-50 dark:bg-gray-800' : ''}`}
                                />
                                {isSearchPending && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <Icon
                                            icon="lucide:loader-2"
                                            className="size-4 animate-spin text-gray-400"
                                        />
                                    </div>
                                )}
                                {!isSearchPending && searchInput && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <Icon
                                            icon="lucide:search"
                                            className="size-4 text-gray-400"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
        </> 
    );
}