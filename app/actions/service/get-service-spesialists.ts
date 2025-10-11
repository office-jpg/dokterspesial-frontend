import { type ServiceSpesialist, type ApiResponse } from '~/types/api'
import { SERVICE_ENDPOINTS } from '~/api/api-url'
import { serverApiClient } from '~/api/server-client'

export async function getServiceSpesialists(): Promise<
  ApiResponse<ServiceSpesialist[]>
> {
  try {
    const url = SERVICE_ENDPOINTS.SPESIALISTS

    const response = await serverApiClient.get<ApiResponse<ServiceSpesialist[]>>(url)
    return response.data
  } catch (error) {
    console.error('Error fetching service spesialists:', error)
    throw error
  }
}
