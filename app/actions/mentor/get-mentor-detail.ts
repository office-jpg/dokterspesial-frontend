import { type MentorDetail, type ApiResponse } from '~/types/api'
import { MENTOR_ENDPOINTS } from '~/api/api-url'
import { serverApiClient } from '~/api/server-client'

export async function getMentorDetail(slug: string): Promise<MentorDetail> {
  try {
    const response = await serverApiClient.get<ApiResponse<MentorDetail>>(MENTOR_ENDPOINTS.DETAIL(slug))
    const result = response.data

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch mentor detail')
    }

    return result.data
  } catch (error) {
    console.error('Error fetching mentor detail:', error)
    throw error
  }
}
