import { type ServiceLocation, type PaginatedApiResponse } from '~/types/api'
import { SERVICE_ENDPOINTS } from '~/api/api-url'
import { serverApiClient } from '~/api/server-client'

export async function getServiceLocations(): Promise<PaginatedApiResponse<ServiceLocation>> {
  try {
    const response = await serverApiClient.get<PaginatedApiResponse<ServiceLocation>>(SERVICE_ENDPOINTS.LOCATIONS)
    return response.data
  } catch (error) {
    console.error('Error fetching service locations:', error)
    throw error
  }
}
