import { type ApiResponse } from '~/types/api'
import { BRAND_ENDPOINTS } from '~/api/api-url'
import { serverApiClient } from '~/api/server-client'

interface Brand {
    id: number;
    name: string;
    slug: string;
}

export async function getBrands(): Promise<Brand[]> {
    try {
        const response = await serverApiClient.get<ApiResponse<Brand[]>>(BRAND_ENDPOINTS.LIST)
        
        if (!response.data.success) {
            throw new Error(response.data.message || 'Failed to fetch brands')
        }
        
        return response.data.data
    } catch (error) {
        console.error('Error fetching brands:', error)
        throw error
    }
}
