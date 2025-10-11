import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { type Blog, type Review, type Service } from "~/types/api";

export { useBlogFilterStore, useBlogFilters } from "./blog-filter-store";
export { 
    useMentorStore, 
    useBrands, 
    useFilteredMentors, 
    useSelectedBrand, 
    useSearchQuery, 
    useMentorLoading, 
    useMentorError, 
    useHasHydrated,
    useMentorActions 
} from "./mentor-store";

interface AppState {
    theme: "light" | "dark" | "system";
    sidebarOpen: boolean;
    loading: boolean;
    error: string | null;
    setTheme: (theme: "light" | "dark" | "system") => void;
    setSidebarOpen: (open: boolean) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearError: () => void;
}

interface DataState {
    reviews: Review[];
    blogs: Blog[];
    services: Service[];
    setReviews: (reviews: Review[]) => void;
    setBlogs: (blogs: Blog[]) => void;
    setServices: (services: Service[]) => void;
    addReview: (review: Review) => void;
    addBlog: (blog: Blog) => void;
    addService: (service: Service) => void;
    updateReview: (id: number, review: Partial<Review>) => void;
    updateBlog: (id: number, blog: Partial<Blog>) => void;
    updateService: (id: number, service: Partial<Service>) => void;
    removeReview: (id: number) => void;
    removeBlog: (id: number) => void;
    removeService: (id: number) => void;
}

export const useAppStore = create<AppState>()(
    devtools(
        persist(
            (set) => ({
                theme: "system",
                sidebarOpen: false,
                loading: false,
                error: null,
                setTheme: (theme) => set({ theme }),
                setSidebarOpen: (open) => set({ sidebarOpen: open }),
                setLoading: (loading) => set({ loading }),
                setError: (error) => set({ error }),
                clearError: () => set({ error: null }),
            }),
            {
                name: "app-storage",
                partialize: (state) => ({
                    theme: state.theme,
                    sidebarOpen: state.sidebarOpen,
                }),
            }
        ),
        {
            name: "app-store",
        }
    )
);

export const useDataStore = create<DataState>()(
    devtools(
        (set) => ({
            reviews: [],
            blogs: [],
            services: [],
            setReviews: (reviews) => set({ reviews }),
            setBlogs: (blogs) => set({ blogs }),
            setServices: (services) => set({ services }),
            addReview: (review) =>
                set((state) => ({ reviews: [...state.reviews, review] })),
            addBlog: (blog) =>
                set((state) => ({ blogs: [...state.blogs, blog] })),
            addService: (service) =>
                set((state) => ({ services: [...state.services, service] })),
            updateReview: (id, updatedReview) =>
                set((state) => ({
                    reviews: state.reviews.map((review) =>
                        review.id === id
                            ? { ...review, ...updatedReview }
                            : review
                    ),
                })),
            updateBlog: (id, updatedBlog) =>
                set((state) => ({
                    blogs: state.blogs.map((blog) =>
                        blog.id === id ? { ...blog, ...updatedBlog } : blog
                    ),
                })),
            updateService: (id, updatedService) =>
                set((state) => ({
                    services: state.services.map((service) =>
                        service.id === id
                            ? { ...service, ...updatedService }
                            : service
                    ),
                })),
            removeReview: (id) =>
                set((state) => ({
                    reviews: state.reviews.filter((review) => review.id !== id),
                })),
            removeBlog: (id) =>
                set((state) => ({
                    blogs: state.blogs.filter((blog) => blog.id !== id),
                })),
            removeService: (id) =>
                set((state) => ({
                    services: state.services.filter(
                        (service) => service.id !== id
                    ),
                })),
        }),
        {
            name: "data-store",
        }
    )
);
