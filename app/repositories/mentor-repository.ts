 

import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import { getMentorDetail } from '~/actions/mentor/get-mentor-detail'
import { getMentors } from '~/actions/mentor/get-mentors'
import type { MentorCardProps } from '~/types'
import type {
  ApiResponse,
  PaginatedApiResponse,
  Mentor,
  MentorDetail,
  MentorQueryParams,
} from '~/types/api'
import { FALLBACK_MENTOR_DATA } from '~/contents/mentors'

/**
 * Mentor Repository Query Parameters
 * Extends API params with additional repository-specific options
 */
export interface MentorRepositoryParams extends MentorQueryParams {
  context?: 'home' | 'mentor'
}

/**
 * Mentor Repository Cache Keys
 * Centralized cache key management for React Query
 */
export const MentorRepositoryKeys = {
  all: ['mentor-repository'] as const,
  lists: () => [...MentorRepositoryKeys.all, 'list'] as const,
  list: (params?: MentorRepositoryParams) => {
    const cacheKey = {
      page: params?.page,
      per_page: params?.per_page,
      search: params?.search,
      context: params?.context,
    }
    return [...MentorRepositoryKeys.lists(), cacheKey] as const
  },
  details: () => [...MentorRepositoryKeys.all, 'detail'] as const,
  detail: (slug: string) => [...MentorRepositoryKeys.details(), slug] as const,
} as const

/**
 * Transform API Mentor to MentorCardProps
 */
function transformMentorToCard(mentor: Mentor): MentorCardProps {
  return {
    id: mentor.id,
    name: mentor.name,
    slug: mentor.slug,
    spesialist: mentor.spesialist,
    image: mentor.image,
    image_url: mentor.image_url,
    description: mentor.description,
    place: mentor.place,
  }
}

/**
 * Transform API MentorDetail to MentorCardProps
 */
function transformMentorDetailToCard(mentor: MentorDetail): MentorCardProps {
  return {
    id: mentor.id,
    name: mentor.name,
    slug: mentor.slug,
    spesialist: mentor.spesialist,
    image: mentor.image,
    image_url: mentor.image_url,
    description: mentor.description,
    place: mentor.place,
  }
}

/**
 * Mentor Repository Implementation
 * Repository Pattern with Factory Methods for Mentor Data Access
 */

/**
 * Mentor Repository Class - Data Access Layer
 * Contains business logic for different data fetching strategies
 */
class MentorRepository {
  /**
   * Get fallback data when API is unavailable
   */
  private getFallbackData(
    params?: MentorRepositoryParams
  ): PaginatedApiResponse<MentorCardProps> {
    const perPage = params?.per_page || 6
    const currentPage = params?.page || 1
    const searchQuery = params?.search?.toLowerCase() || ''

    let filteredData = FALLBACK_MENTOR_DATA

    if (searchQuery) {
      filteredData = FALLBACK_MENTOR_DATA.filter((mentor) =>
        mentor.name.toLowerCase().includes(searchQuery)
      )
    }

    const total = filteredData.length
    const totalPages = Math.ceil(total / perPage)
    const startIndex = (currentPage - 1) * perPage
    const endIndex = startIndex + perPage
    const paginatedData = filteredData.slice(startIndex, endIndex)

    return {
      success: true,
      message: 'Fallback data loaded',
      data: paginatedData,
      pagination: {
        current_page: currentPage,
        last_page: totalPages,
        per_page: perPage,
        total: total,
        next_page_url:
          currentPage < totalPages ? `?page=${currentPage + 1}` : null,
        prev_page_url: currentPage > 1 ? `?page=${currentPage - 1}` : null,
        first_page_url: '?page=1',
        last_page_url: `?page=${totalPages}`,
        has_more_pages: currentPage < totalPages,
      },
    }
  }

  /**
   * Home Mentors Data Fetching Strategy
   */
  async fetchHomeMentors(
    params?: MentorRepositoryParams
  ): Promise<PaginatedApiResponse<MentorCardProps>> {
    try {
      const apiParams: MentorQueryParams = {
        per_page: params?.per_page || 6,
        page: params?.page || 1,
        search: params?.search,
      }

      const response = await getMentors(apiParams)

      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch mentors')
      }

      const transformedData = response.data.map(transformMentorToCard)

      return {
        success: response.success,
        message: response.message,
        data: transformedData,
        pagination: response.pagination,
      }
    } catch (error) {
      console.error('❌ Error in fetchHomeMentors:', error)
      return this.getFallbackData(params)
    }
  }

  /**
   * Mentor Page Data Fetching Strategy
   */
  async fetchMentorPageMentors(
    params?: MentorRepositoryParams
  ): Promise<PaginatedApiResponse<MentorCardProps>> {
    try {
      const apiParams: MentorQueryParams = {
        per_page: params?.per_page || 8,
        page: params?.page || 1,
        search: params?.search,
      }

      const response = await getMentors(apiParams)

      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch mentors')
      }

      const transformedData = response.data.map(transformMentorToCard)

      return {
        success: response.success,
        message: response.message,
        data: transformedData,
        pagination: response.pagination,
      }
    } catch (error) {
      console.error('❌ Error in fetchMentorPageMentors:', error)

      const startIndex = ((params?.page || 1) - 1) * (params?.per_page || 8)
      const endIndex = startIndex + (params?.per_page || 8)
      const fallbackData = FALLBACK_MENTOR_DATA.slice(startIndex, endIndex)

      return {
        success: true,
        message: 'Fallback data loaded',
        data: fallbackData,
        pagination: {
          current_page: params?.page || 1,
          last_page: Math.ceil(
            FALLBACK_MENTOR_DATA.length / (params?.per_page || 8)
          ),
          per_page: params?.per_page || 8,
          total: FALLBACK_MENTOR_DATA.length,
          next_page_url: null,
          prev_page_url: null,
          first_page_url: '',
          last_page_url: '',
          has_more_pages: endIndex < FALLBACK_MENTOR_DATA.length,
        },
      }
    }
  }

  /**
   * Mentor Detail Data Fetching Strategy
   */
  async fetchMentorDetail(slug: string): Promise<ApiResponse<MentorCardProps>> {
    try {
      const mentorData = await getMentorDetail(slug)
      const transformedData = transformMentorDetailToCard(mentorData)

      return {
        success: true,
        message: 'Mentor detail fetched successfully',
        data: transformedData,
      }
    } catch (error) {
      console.error('❌ Error in fetchMentorDetail:', error)

      const fallbackMentor =
        FALLBACK_MENTOR_DATA.find((mentor: MentorCardProps) =>
          mentor.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .includes(slug.toLowerCase())
        ) || FALLBACK_MENTOR_DATA[0]

      return {
        success: true,
        message: 'Fallback data loaded',
        data: fallbackMentor,
      }
    }
  }
}

const mentorRepository = new MentorRepository()

/**
 * Repository Hook: Main mentor data access
 */
export function useMentorRepository(
  params?: MentorRepositoryParams,
  options?: { enabled?: boolean }
): UseQueryResult<PaginatedApiResponse<MentorCardProps>, Error> {
  return useQuery({
    queryKey: MentorRepositoryKeys.list(params),
    queryFn: () => {
      const context = params?.context || 'mentor'

      if (context === 'home') {
        return mentorRepository.fetchHomeMentors(params)
      }

      return mentorRepository.fetchMentorPageMentors(params)
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: options?.enabled ?? true, 
  })
}

/**
 * Repository Hook: Mentor detail access
 */
export function useMentorDetailRepository(
  slug: string
): UseQueryResult<ApiResponse<MentorCardProps>, Error> {
  return useQuery({
    queryKey: MentorRepositoryKeys.detail(slug),
    queryFn: () => mentorRepository.fetchMentorDetail(slug),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!slug,
  })
}

/**
 * Factory Method: Home Mentors Repository
 * Convenience hook with pre-configured home context
 */
export function useHomeMentorsRepository(
  params?: Omit<MentorRepositoryParams, 'context'>
) {
  return useMentorRepository({
    ...params,
    context: 'home',
  })
}

/**
 * Factory Method: Mentor Page Repository
 * Convenience hook with pre-configured mentor page context
 */
export function useMentorPageRepository(
  params?: Omit<MentorRepositoryParams, 'context'>,
  options?: { enabled?: boolean }
) {
  return useMentorRepository({
    ...params,
    context: 'mentor',
  }, options)
}

export async function getMentorsFromRepo(
  params?: MentorRepositoryParams
): Promise<PaginatedApiResponse<MentorCardProps>> {
  const repository = new MentorRepository()
  const context = params?.context || 'mentor'

  if (context === 'home') {
    return repository.fetchHomeMentors(params)
  }

  return repository.fetchMentorPageMentors(params)
}

export async function getMentorDetailFromRepo(
  slug: string
): Promise<ApiResponse<MentorCardProps>> {
  const repository = new MentorRepository()
  return repository.fetchMentorDetail(slug)
}

export const useMentors = useMentorRepository
export const useMentorDetail = useMentorDetailRepository
export const useHomeMentors = useHomeMentorsRepository
export const useMentorPageMentors = useMentorPageRepository
