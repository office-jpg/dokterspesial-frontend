import { type ServiceCategory, type ApiResponse } from '~/types/api'
import { SERVICE_ENDPOINTS } from '~/api/api-url'
import { serverApiClient } from '~/api/server-client'

export async function getServiceCategories(): Promise<
  ApiResponse<ServiceCategory[]>
> {
  try {
    const url = SERVICE_ENDPOINTS.CATEGORIES

    const response = await serverApiClient.get<ApiResponse<ServiceCategory[]>>(url)
    return response.data
  } catch (error) {
    console.error('Error fetching service categories:', error)
    throw error
  }
}
