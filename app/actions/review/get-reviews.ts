import { type Review, type PaginatedApiResponse, type ReviewQueryParams } from '~/types/api'
import { REVIEW_ENDPOINTS, buildUrlWithParams } from '~/api/api-url'
import { serverApiClient } from '~/api/server-client'

export async function getReviews(
  params?: ReviewQueryParams
): Promise<PaginatedApiResponse<Review>> {
  try {
    const url = buildUrlWithParams(
      REVIEW_ENDPOINTS.LIST,
      params as Record<string, string | number | boolean | undefined>
    )

    const response = await serverApiClient.get<PaginatedApiResponse<Review>>(url)
    return response.data
  } catch (error) {
    console.error('❌ Error fetching reviews:', error)
    throw error
  }
}

export async function getReviewsByEventName(
  eventName: string
): Promise<Review[]> {
  try {
    const response = await getReviews({ search: eventName, per_page: 100 })
    
    const filteredReviews = response.data.filter(
      review => review.event.name === eventName
    )
    
    return filteredReviews
  } catch (error) {
    console.error('❌ Error fetching reviews by event name:', error)
    return []
  }
}
