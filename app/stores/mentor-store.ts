import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import axios from 'axios';

import { getServerAuthHeaders } from '~/api/environment';
import type { Mentor, PaginatedApiResponse } from '~/types/api';
import type { MentorCardProps } from '~/types';

interface Brand {
    id: number;
    name: string;
    slug: string;
}

interface MentorWithBrands extends Mentor {
    brands: Brand[];
}

interface MentorState {
    // Data state
    brands: Brand[];
    allMentors: MentorWithBrands[];
    filteredMentors: MentorCardProps[];
    
    // UI state
    selectedBrand: string;
    searchQuery: string;
    currentPage: number;
    isLoading: boolean;
    isInitialLoading: boolean;
    error: string | null;
    
    // SSR state
    hasHydrated: boolean;
    
    // Pagination
    itemsPerPage: number;
    
    // Actions
    setBrands: (brands: Brand[]) => void;
    setAllMentors: (mentors: MentorWithBrands[]) => void;
    setSelectedBrand: (brand: string) => void;
    setSearchQuery: (query: string) => void;
    setCurrentPage: (page: number) => void;
    setIsLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setHasHydrated: (hydrated: boolean) => void;
    
    // Complex actions
    fetchBrands: () => Promise<void>;
    fetchAllMentors: () => Promise<void>;
    filterMentors: () => void;
    initializeFromSSR: (data: {
        brands?: Brand[];
        mentors?: MentorWithBrands[];
        selectedBrand?: string;
        searchQuery?: string;
        currentPage?: number;
    }) => void;
    
    // Reset actions
    reset: () => void;
    resetFilters: () => void;
}

const transformMentorToCard = (mentor: MentorWithBrands): MentorCardProps => ({
    id: mentor.id,
    name: mentor.name,
    slug: mentor.slug,
    spesialist: mentor.spesialist,
    image: mentor.image,
    image_url: mentor.image_url,
    description: mentor.description,
    place: mentor.place,
});

const initialState = {
    brands: [],
    allMentors: [],
    filteredMentors: [],
    selectedBrand: 'all',
    searchQuery: '',
    currentPage: 1,
    isLoading: false,
    isInitialLoading: true,
    error: null,
    hasHydrated: false,
    itemsPerPage: 12,
};

export const useMentorStore = create<MentorState>()(
    devtools(
        subscribeWithSelector(
            immer((set, get) => ({
                ...initialState,
                
                // Basic setters
                setBrands: (brands) => 
                    set((state) => {
                        state.brands = brands;
                    }),
                
                setAllMentors: (mentors) => 
                    set((state) => {
                        state.allMentors = mentors;
                    }),
                
                setSelectedBrand: (brand) => 
                    set((state) => {
                        state.selectedBrand = brand;
                        state.currentPage = 1;
                    }),
                
                setSearchQuery: (query) => 
                    set((state) => {
                        state.searchQuery = query;
                        state.currentPage = 1;
                    }),
                
                setCurrentPage: (page) => 
                    set((state) => {
                        state.currentPage = page;
                    }),
                
                setIsLoading: (loading) => 
                    set((state) => {
                        state.isLoading = loading;
                    }),
                
                setError: (error) => 
                    set((state) => {
                        state.error = error;
                    }),
                
                setHasHydrated: (hydrated) => 
                    set((state) => {
                        state.hasHydrated = hydrated;
                        if (hydrated) {
                            state.isInitialLoading = false;
                        }
                    }),
                
                // Fetch functions
                fetchBrands: async () => {
                    try {
                        set((state) => {
                            state.isLoading = true;
                            state.error = null;
                        });
                        
                        const response = await axios.get(
                            'https://app.dokterspesial.id/api/brands',
                            { headers: getServerAuthHeaders() }
                        );
                        
                        if (response.data.success) {
                            set((state) => {
                                state.brands = response.data.data;
                            });
                        }
                    } catch (error) {
                        console.error('Error fetching brands:', error);
                        set((state) => {
                            state.error = 'Failed to fetch brands';
                        });
                    } finally {
                        set((state) => {
                            state.isLoading = false;
                        });
                    }
                },
                
                fetchAllMentors: async () => {
                    try {
                        set((state) => {
                            state.isLoading = true;
                            state.error = null;
                        });
                        
                        const response = await axios.get(
                            'https://app.dokterspesial.id/api/presenters?per_page=50',
                            { headers: getServerAuthHeaders() }
                        );
                        
                        if (response.data.success) {
                            set((state) => {
                                state.allMentors = response.data.data;
                            });
                            // Call filterMentors after the state is set
                            setTimeout(() => get().filterMentors(), 0);
                        }
                    } catch (error) {
                        console.error('Error fetching mentors:', error);
                        set((state) => {
                            state.error = 'Failed to fetch mentors';
                        });
                    } finally {
                        set((state) => {
                            state.isLoading = false;
                        });
                    }
                },
                
                // Filter mentors based on current state
                filterMentors: () => {
                    const { allMentors, selectedBrand, searchQuery } = get();
                    
                    const filtered = allMentors.filter(mentor => {
                        const matchesSearch = !searchQuery || 
                            mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            mentor.spesialist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            mentor.place.toLowerCase().includes(searchQuery.toLowerCase());

                        const matchesBrand = selectedBrand === 'all' || 
                            mentor.brands.some(brand => brand.slug === selectedBrand);

                        return matchesSearch && matchesBrand;
                    }).map(transformMentorToCard);
                    
                    set((state) => {
                        state.filteredMentors = filtered;
                    });
                },
                
                // Initialize from SSR data
                initializeFromSSR: (data) => {
                    set((state) => {
                        if (data.brands) state.brands = data.brands;
                        if (data.mentors) state.allMentors = data.mentors;
                        if (data.selectedBrand) state.selectedBrand = data.selectedBrand;
                        if (data.searchQuery) state.searchQuery = data.searchQuery;
                        if (data.currentPage) state.currentPage = data.currentPage;
                        state.hasHydrated = true;
                        state.isInitialLoading = false;
                    });
                    // Call filterMentors after the state is set
                    setTimeout(() => get().filterMentors(), 0);
                },
                
                // Reset actions
                reset: () => set(() => ({ ...initialState })),
                
                resetFilters: () => 
                    set((state) => {
                        state.selectedBrand = 'all';
                        state.searchQuery = '';
                        state.currentPage = 1;
                    }),
            }))
        ),
        {
            name: 'mentor-store',
        }
    )
);

// Selectors for performance optimization
export const useBrands = () => useMentorStore((state) => state.brands);
export const useFilteredMentors = () => useMentorStore((state) => state.filteredMentors);
export const useSelectedBrand = () => useMentorStore((state) => state.selectedBrand);
export const useSearchQuery = () => useMentorStore((state) => state.searchQuery);
export const useMentorLoading = () => useMentorStore((state) => state.isLoading);
export const useMentorError = () => useMentorStore((state) => state.error);
export const useHasHydrated = () => useMentorStore((state) => state.hasHydrated);

// Action selectors
export const useMentorActions = () => useMentorStore((state) => ({
    setSelectedBrand: state.setSelectedBrand,
    setSearchQuery: state.setSearchQuery,
    setCurrentPage: state.setCurrentPage,
    fetchBrands: state.fetchBrands,
    fetchAllMentors: state.fetchAllMentors,
    initializeFromSSR: state.initializeFromSSR,
    resetFilters: state.resetFilters,
    filterMentors: state.filterMentors,
}));
