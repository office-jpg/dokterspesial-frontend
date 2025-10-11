/**
 * Environment configuration for API
 * Centralized configuration for all API-related environment variables
 */

export const API_CONFIG = {
  BASE_URL:
    import.meta.env.VITE_API_BASE_URL ||
    'https://admin.circleit.dev/api',

  VERSION: import.meta.env.VITE_API_VERSION || 'v1',

  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),

  REVALIDATE_TIME: parseInt(
    import.meta.env.VITE_API_REVALIDATE_TIME || '60'
  ),

  AUTH: {
    TOKEN_KEY: 'auth_token',
    REFRESH_TOKEN_KEY: 'refresh_token',
  },

  ENVIRONMENT: import.meta.env.MODE || 'development',

  DEBUG: import.meta.env.MODE === 'development',
} as const

/**
 * Get full API base URL with version
 */
export const getApiBaseUrl = (): string => {
  const baseUrl = API_CONFIG.BASE_URL
  if (baseUrl.endsWith('/api')) {
    return baseUrl
  }
  return `${baseUrl}/api`
}

/**
 * Get authorization headers if token exists
 * For client-side, only use localStorage token
 * Static token is server-side only
 */
export const getAuthHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(API_CONFIG.AUTH.TOKEN_KEY)
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  return headers
}

/**
 * Get server-side auth headers with static token
 * Only use this on server-side (in loaders/actions)
 */
export const getServerAuthHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  const staticToken = import.meta.env.VITE_STATIC_TOKEN
  if (staticToken) {
    headers['Authorization'] = `Bearer ${staticToken}`
  }

  return headers
}

/**
 * Get default fetch options for React Router
 */
export const getDefaultFetchOptions = (): RequestInit => {
  return {
    headers: getAuthHeaders(),
  }
}

/**
 * Get fetch options with cache control
 */
export const getFetchOptionsWithCache = (cacheTime?: number): RequestInit => {
  const options = getDefaultFetchOptions()
  
  const headers = options.headers as Record<string, string>
  if (cacheTime) {
    headers['Cache-Control'] = `max-age=${cacheTime}`
  }
  
  return {
    ...options,
    headers
  }
}
