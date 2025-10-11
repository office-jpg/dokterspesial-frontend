import type { LucideIcon } from "lucide-react";

export type {
    ServiceCategory,
    ServiceStatus,
    ServiceLocation,
    FilterCategory,
} from "./filter";
export type { BlogCategory } from "./filter";

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface Pagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    first_page_url: string;
    last_page_url: string;
    has_more_pages: boolean;
}

export interface PaginatedApiResponse<T> {
    success: boolean;
    message: string;
    data: T[];
    pagination: Pagination;
}

export interface ServiceListResponse extends PaginatedApiResponse<Service> {
    availableSpesialists?: ServiceSpesialist[];
    filters?: {
        spesialists: ServiceSpesialist[];
    };
}

export interface ServiceType {
    id: number;
    name: string;
    slug: string;
}

export interface ServicePresenter {
    id: number;
    name: string;
    slug: string;
}

export interface ServiceSpesialist {
    id: number;
    name: string;
    slug: string;
}

export interface ServiceReview {
    id: number;
    reviewer: string;
    rating: number;
    comment: string;
    created_at: string;
}

export interface ServiceApiStatus {
    id: number;
    status: "upcoming" | "ongoing" | "ended";
}

export interface ServiceApiLocation {
    id: number;
    location: "online" | "offline";
}

export interface ServiceApiType {
    id: number;
    name: string;
}

export interface Service {
    id: number;
    name: string;
    slug: string;
    location: string;
    start_time: string;
    end_time: string;
    status: "akan datang" | "berlangsung" | "selesai";
    category: string;
    type_event_id?: number;
    type_event?: string;
    presenter: string;
    price: number;
    price_discount: number;
    description?: string;
    category_event?: ServiceApiCategory;
    presenter_detail?: ServicePresenter;
    image?: string;
    image_url?: string;
    total_participants?: number;
    total_video?: number;
    reviews?: ServiceReview[];
}

export interface BlogCategoryApi {
    id: number;
    name: string;
}

export interface BlogAuthor {
    id: number;
    name: string;
}

export interface Blog {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    image_url?: string;
    content: string;
    category: string;
    author: string;
    category_blog_id?: number;
    category_blog?: BlogCategoryApi | string;
    user_id?: number;
    user?: BlogAuthor | string;
    uploaded_at?: string;
    created_at?: string;
    updated_at?: string;
    title?: string;
    excerpt?: string;
    publishedAt?: string;
    readTime?: string;
    featured?: boolean;
}

export interface ServiceQueryParams {
    search?: string;
    status?: string;
    category_id?: number;
    category_slug?: string;
    type_id?: number;
    type_slug?: string;
    spesialist_id?: number;
    spesialist_slug?: string;
    location?: string;
    per_page?: number;
    page?: number;
}

export interface BlogQueryParams {
    type?: number;
    search?: string;
    per_page?: number;
    category_id?: number;
    category_name?: string;
    page?: number;
}

export interface ReviewQueryParams {
    per_page?: number;
    page?: number;
    event_id?: number;
    rating?: number;
    sort?: string;
    order?: "asc" | "desc";
}

export interface PresenterQueryParams {
    per_page?: number;
    page?: number;
    search?: string;
}

export interface MentorQueryParams {
    per_page?: number;
    page?: number;
    search?: string;
}

export interface ApiError {
    success: false;
    message: string;
    errors?: Record<string, string[]>;
}

export interface StatCardProps {
    icon: LucideIcon;
    value: number;
    label: string;
    suffix?: string;
    color: "blue" | "green" | "purple" | "orange";
}

export interface ProgramCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    color: "blue" | "green" | "purple";
}

export interface Category {
    id: number;
    name: string;
    label?: string;
    blogs_count?: number;
    services_count?: number;
    count?: number;
}

export interface MentorCardProps {
    id: number;
    name: string;
    slug: string;
    spesialist: string;
    image: string | null;
    image_url?: string;
    description: string;
    place: string;
}

export interface TestimonialCardProps {
    name: string;
    role: string;
    content: string;
    rating?: number;
    image: string;
    category: string;
    title: string;
    author?: string;
}

export interface ServiceProps {
    id?: number | string;
    name?: string;
    title: string;
    slug: string;
    date: string;
    startDate?: string;
    endDate?: string;
    time: string;
    startTime?: string;
    endTime?: string;
    start_time?: string;
    end_time?: string;
    location: string;
    description: string;
    category: string;
    categories?: string[] | Array<{ id: number; name: string }>;
    type: "Webinar" | "Workshop";
    types?: string[] | Array<{ id: number; name: string }>;
    spesialists?: string[] | Array<{ id: number; name: string }>;
    format?: "Online" | "Offline";
    type_event?: string;
    type_event_id?: number;
    type_service?: string;
    type_service_id?: number;
    price:
        | {
              current: number;
              original: number;
          }
        | number;
    price_discount?: number;
    presenter: {
        name: string;
        spesialist?: string;
    };
    presenters?: Array<{ id: number; name: string }>;
    image: string;
    rating: {
        score: number;
        total: number;
    };
    totalUsers: number;
    total_video?: number; 
    videoLessons?: number;
    status: "akan datang" | "berlangsung" | "selesai";
    reviews?: Array<{
        id: number;
        reviewer: string;
        rating: number;
        comment: string;
        created_at: string;
    }>;
}

export interface ServiceTypeData {
    id: number;
    name: string;
}

export interface ArticleProps {
    title: string;
    excerpt: string;
    category: string;
    date: string;
    categoryColor: string;
    gradient: string;
}

export interface BlogProps {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    date: string;
    author: string;
    readTime: string;
    image: string | null;
    featured?: boolean;
    publishedAt: string;
}

export interface ContactInfoProps {
    icon: LucideIcon;
    title: string;
    value: string;
    color: string;
}

export interface ValuePropositionProps {
    icon: LucideIcon;
    title: string;
    description: string;
    color: "blue" | "green" | "purple";
}

export interface TargetAudienceProps {
    icon: LucideIcon;
    title: string;
    items: string[];
    color: "blue" | "green" | "purple";
}

interface LeafletIcon {
    iconUrl: string;
    iconSize: [number, number];
    iconAnchor: [number, number];
    popupAnchor: [number, number];
}

interface LeafletMapOptions {
    center: [number, number];
    zoom: number;
    maxBounds?: [[number, number], [number, number]];
    maxBoundsViscosity?: number;
}

interface LeafletTileLayerOptions {
    maxZoom: number;
    minZoom: number;
    attribution: string;
}

interface LeafletMarkerOptions {
    icon?: LeafletIconInstance;
}

interface LeafletPopupOptions {
    className?: string;
}

type LeafletIconInstance = object;

interface LeafletTileLayer {
    addTo(map: LeafletMap): void;
}

interface LeafletMarker {
    bindPopup(
        content: string,
        options?: LeafletPopupOptions
    ): { addTo(map: LeafletMap): void };
}

export interface LeafletMap {
    remove(): void;
}

interface LeafletLibrary {
    map(element: HTMLElement, options: LeafletMapOptions): LeafletMap;
    tileLayer(url: string, options: LeafletTileLayerOptions): LeafletTileLayer;
    icon(options: LeafletIcon): LeafletIconInstance;
    marker(
        coords: [number, number],
        options?: LeafletMarkerOptions
    ): LeafletMarker;
}

declare global {
    interface Window {
        L: LeafletLibrary;
    }
}

export interface OfficeData {
    coords: [number, number];
    country: string;
    city: string;
    short: string;
}

export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data: T;
}

export interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    first_page_url: string;
    last_page_url: string;
    has_more_pages: boolean;
}

export interface PaginatedApiResponse<T = unknown> extends ApiResponse<T[]> {
    pagination: PaginationMeta;
}

export interface ServiceApiCategory {
    id: number;
    name: string;
    slug: string;
}

export interface PresenterData {
    id: number;
    name: string;
    slug?: string;
}

export interface ServiceData {
    id: number;
    name: string;
    slug: string;
    description?: string;
    location: string;
    start_time: string;
    end_time: string;
    status: "upcoming" | "ongoing" | "completed";
    category: string;
    category_event?: ServiceApiCategory;
    presenter: string | PresenterData;
    price: number;
    price_discount: number;
    image?: string;
    total_participants?: number;
    total_video?: number;
    reviews?: ReviewData[];
}

export interface ReviewData {
    id: number;
    reviewer: string;
    rating: number;
    comment: string;
    created_at: string;
}

export interface PresenterDetail {
    id: number;
    name: string;
    slug: string;
    bio?: string;
    image?: string;
    specialization?: string;
    experience?: string;
}

export interface BlogListParams {
    type?: number;
    search?: string;
    per_page?: number;
    category_id?: number;
    category_name?: string;
}

export interface ServiceListParams {
    type?: string;
    search?: string;
    status?: string;
    location?: string;
    category_id?: number;
    category_name?: string;
    per_page?: number;
}

export interface PresenterListParams {
    search?: string;
    per_page?: number;
}

export interface ReviewListParams {
    search?: string;
    per_page?: number;
}
