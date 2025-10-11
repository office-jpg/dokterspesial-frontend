import { type ServiceType, type ApiResponse } from '~/types/api'
import { SERVICE_ENDPOINTS } from '~/api/api-url'
import { serverApiClient } from '~/api/server-client'

export async function getServiceTypes(): Promise<ApiResponse<ServiceType[]>> {
  try {
    const response = await serverApiClient.get<ApiResponse<ServiceType[]>>(SERVICE_ENDPOINTS.TYPES)
    return response.data
  } catch (error) {
    console.error('Error fetching service types:', error)
    throw error
  }
}

/**
 * Get service types with their associated specialists from the new /api/type-events endpoint
 */
export async function getServiceTypesWithSpecialists(): Promise<ApiResponse<ServiceType[]>> {
  try {
    console.log('🚀 getServiceTypesWithSpecialists action called - making API request to:', SERVICE_ENDPOINTS.TYPES);
    const response = await serverApiClient.get<ApiResponse<ServiceType[]>>(SERVICE_ENDPOINTS.TYPES)
    console.log('✅ getServiceTypesWithSpecialists response received:', {
      success: response.data.success,
      dataLength: response.data.data?.length
    });
    return response.data
  } catch (error) {
    console.error('❌ Error fetching service types with specialists:', error)
    throw error
  }
}