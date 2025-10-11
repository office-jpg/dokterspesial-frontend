import { type Mentor, type PaginatedApiResponse, type MentorQueryParams } from '~/types/api'
import { MENTOR_ENDPOINTS, buildUrlWithParams } from '~/api/api-url'
import { serverApiClient } from '~/api/server-client'

interface Brand {
    id: number;
    name: string;
    slug: string;
}

interface MentorWithBrands extends Mentor {
    brands: Brand[];
}

export async function getMentors(
  params?: MentorQueryParams & { brand_slug?: string }
): Promise<PaginatedApiResponse<MentorWithBrands>> {
  try {
    const apiParams: Record<string, string | number | boolean | undefined> = {}

    if (params?.page) apiParams.page = params.page
    if (params?.per_page) apiParams.per_page = params.per_page
    if (params?.search) apiParams.search = params.search
    if (params?.brand_slug) apiParams.brand_slug = params.brand_slug

    const url = buildUrlWithParams(MENTOR_ENDPOINTS.LIST, apiParams)
    const response = await serverApiClient.get<PaginatedApiResponse<MentorWithBrands>>(url)
    return response.data
  } catch (error) {
    console.error('Error fetching mentors:', error)
    throw error
  }
}

export async function getAllMentors(): Promise<MentorWithBrands[]> {
  try {
    const apiParams = { per_page: 50 }
    const url = buildUrlWithParams(MENTOR_ENDPOINTS.LIST, apiParams)
    const response = await serverApiClient.get<PaginatedApiResponse<MentorWithBrands>>(url)
    
    if (!response.data.success) {
      throw new Error('Failed to fetch mentors')
    }
    
    return response.data.data
  } catch (error) {
    console.error('Error fetching all mentors:', error)
    throw error
  }
}
