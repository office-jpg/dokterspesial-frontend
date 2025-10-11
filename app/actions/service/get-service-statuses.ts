import { type ServiceStatus, type ApiResponse } from '~/types/api'
import { SERVICE_ENDPOINTS } from '~/api/api-url'
import { serverApiClient } from '~/api/server-client'

export async function getServiceStatuses(): Promise<ApiResponse<ServiceStatus[]>> {
  try {
    const response = await serverApiClient.get<ApiResponse<ServiceStatus[]>>(SERVICE_ENDPOINTS.STATUSES)
    return response.data
  } catch (error) {
    console.error('Error fetching service statuses:', error)
    throw error
  }
}