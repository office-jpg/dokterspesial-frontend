import { type ApiResponse } from '~/types/api'
import { BLOG_ENDPOINTS } from '~/api/api-url'
import { serverApiClient } from '~/api/server-client'

export interface BlogCategory {
  id: number
  name: string
}

export type BlogCategoriesResponse = ApiResponse<BlogCategory[]>

/**
 * Fetch blog categories from the API
 * Uses bearer token from environment for authentication
 */
export async function getBlogCategories(): Promise<BlogCategoriesResponse> {
  try {
    const response = await serverApiClient.get<BlogCategoriesResponse>(BLOG_ENDPOINTS.CATEGORIES)
    return response.data
  } catch (error) {
    console.error('Error fetching blog categories:', error)
    throw error
  }
}
