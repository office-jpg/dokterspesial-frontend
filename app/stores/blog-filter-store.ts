import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BlogFilterState {
    currentPage: number;
    searchTerm: string;
    selectedCategories: string[];
    searching: boolean;
    allAvailableCategories: string[];

    setCurrentPage: (page: number) => void;
    setSearchTerm: (term: string) => void;
    setSelectedCategories: (categories: string[]) => void;
    setSearching: (searching: boolean) => void;
    setAllAvailableCategories: (categories: string[]) => void;

    clearFilters: () => void;
    resetToDefaults: () => void;
    initializeCategories: (categoryNames: string[]) => void;

    hasActiveFilters: () => boolean;
    getFilterParams: (categoryMapping?: Record<string, number>) => {
        page: number;
        per_page: number;
        search?: string;
        type?: number;
        categories?: string;
    };
}

const DEFAULT_FILTERS = {
    currentPage: 1,
    searchTerm: "",
    selectedCategories: [] as string[],
    searching: false,
    allAvailableCategories: [] as string[],
};

export const useBlogFilterStore = create<BlogFilterState>()(
    devtools(
        persist(
            (set, get) => ({
                ...DEFAULT_FILTERS,

                setCurrentPage: (page: number) => set({ currentPage: page }),

                setSearchTerm: (term: string) => {
                    set({ searchTerm: term, searching: true, currentPage: 1 });
                },

                setSelectedCategories: (categories: string[]) => {
                    set({ selectedCategories: categories, currentPage: 1 });
                },

                setSearching: (searching: boolean) => set({ searching }),

                setAllAvailableCategories: (categories: string[]) => {
                    set({ allAvailableCategories: categories });
                },

                initializeCategories: (categoryNames: string[]) => {
                    const state = get();

                    set({ allAvailableCategories: categoryNames });

                    if (
                        state.selectedCategories.length === 0 &&
                        categoryNames.length > 0
                    ) {
                        set({ selectedCategories: categoryNames });
                    }
                },

                clearFilters: () => {
                    set({
                        ...DEFAULT_FILTERS,
                        currentPage: 1,
                    });
                },

                resetToDefaults: () => {
                    set({
                        ...DEFAULT_FILTERS,
                    });
                },

                hasActiveFilters: () => {
                    const state = get();

                    const hasSearchTerm = !!(
                        state.searchTerm && state.searchTerm.trim()
                    );

                    const allCategoriesSelected =
                        state.allAvailableCategories.length > 0 &&
                        state.selectedCategories.length ===
                            state.allAvailableCategories.length &&
                        state.selectedCategories.every((cat) =>
                            state.allAvailableCategories.includes(cat)
                        );

                    const hasPartialCategorySelection =
                        state.selectedCategories.length > 0 &&
                        !allCategoriesSelected;

                    return hasSearchTerm || hasPartialCategorySelection;
                },

                getFilterParams: (categoryMapping?: Record<string, number>) => {
                    const state = get();

                    const typeParam =
                        state.selectedCategories.length === 1 && categoryMapping
                            ? categoryMapping[state.selectedCategories[0]]
                            : undefined;

                    return {
                        page: state.currentPage,
                        per_page: 6,
                        search: state.searchTerm || undefined,
                        type: typeParam,
                        categories: undefined,
                    };
                },
            }),
            {
                name: "blog-filter-storage",
                partialize: (state) => ({
                    selectedCategories: state.selectedCategories,
                }),
                onRehydrateStorage: () => (state) => {
                    if (state) {
                        state.searchTerm = "";
                        state.currentPage = 1;
                        state.searching = false;
                    }
                },
            }
        ),
        {
            name: "blog-filter-store",
        }
    )
);

export const useBlogFilters = useBlogFilterStore;
