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

export interface ServiceListApiResponse {
    success: boolean;
    message: string;
    data: Service[];
    pagination: Pagination;
    filters?: {
        spesialists: ServiceSpesialist[];
    };
}

export interface BlogCategory {
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
    title?: string;
    slug: string;
    image: string | null;
    image_url?: string;
    content: string;
    category: string;
    category_blog?: string;
    author: string;
    category_blog_id?: number;
    user_id?: number;
    user?: BlogAuthor | string;
    uploaded_at?: string;
    created_at?: string;
    updated_at?: string;

    excerpt?: string;
    publishedAt?: string;
    readTime?: string;
    featured?: boolean;
}

export interface ServiceCategory {
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

export interface ServiceStatus {
    id: number;
    status: "upcoming" | "ongoing" | "ended";
}

export interface ServiceLocation {
    id: number;
    location: "online" | "offline";
}

export interface ServiceType {
    id: number;
    name: string;
    slug: string;
    spesialists?: ServiceSpesialist[];
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
    categories?: ServiceCategory[];
    type_event_id?: number;
    type_event?: string;
    types?: ServiceType[];
    spesialists?: ServiceSpesialist[];
    presenter: string;
    presenters?: ServicePresenter[];
    price: number;
    price_discount: number;
    description?: string;
    category_event?: ServiceCategory;
    presenter_detail?: ServicePresenter;
    image?: string;
    image_url?: string;
    total_participants?: number;
    total_video?: number;
    reviews?: ServiceReview[];
}

export interface ReviewUser {
    id: number;
    name: string;
}

export interface ReviewEvent {
    id: number;
    name: string;
}

export interface Review {
    id: number;
    review: string;
    rating: number;
    event: ReviewEvent;
    author: string;
    created_at?: string;
}

export interface Presenter {
    id: number;
    name: string;
    slug: string;
    bio?: string;
    image?: string;
    expertise?: string[];
    experience?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Mentor {
    id: number;
    name: string;
    slug: string;
    spesialist: string;
    image: string | null;
    image_url?: string;
    description: string;
    place: string;
    created_at?: string;
    updated_at?: string;
}

export interface MentorDetail {
    id: number;
    name: string;
    slug: string;
    spesialist: string;
    image: string | null;
    image_url?: string;
    description: string;
    place: string;
    events: MentorEvent[];
}

export interface MentorEvent {
    id: number;
    name: string;
    start_time: string;
    end_time: string;
    status: "akan datang" | "berlangsung" | "selesai";
}

export interface BlogQueryParams {
    type?: number;
    search?: string;
    per_page?: number;
    category_id?: number;
    category_name?: string;
    page?: number;
}

export interface ServiceQueryParams {
    search?: string;
    status?: string;
    category_id?: number | string;
    category_slug?: string;
    category_name?: string;
    type_id?: number | string;
    type_slug?: string;
    spesialist_id?: number | string;
    spesialist_slug?: string;
    location?: string;
    per_page?: number;
    page?: number;
}

export interface ReviewQueryParams {
    per_page?: number;
    page?: number;
    service_id?: number;
    rating?: number;
    sort?: string;
    order?: "asc" | "desc";
    search?: string;
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

export interface ServiceDetailResponse {
    success: boolean;
    message: string;
    data: {
        id: number;
        name: string;
        slug: string;
        description: string;
        price: number;
        price_discount: number;
        start_time: string;
        end_time: string;
        location: string;
        image: string | null;
        image_url: string | null;
        status: "ongoing" | "upcoming" | "completed";
        total_participants: number;
        total_video: number;
        categories: Array<{
            id: number;
            name: string;
        }>;
        types: Array<{
            id: number;
            name: string;
        }>;
        spesialists: Array<{
            id: number;
            name: string;
        }>;
        presenters: Array<{
            id: number;
            name: string;
        }>;
        reviews: Array<{
            id: number;
            author: string;
            rating: number;
            comment: string | null;
            created_at: string;
        }>;
        category_event?: {
            id: number;
            name: string;
        } | null;
        type_event?: {
            id: number;
            name: string;
        } | null;
        presenter?: {
            id: number;
            name: string;
        } | null;
    };
}
