import axios from "axios";

import { API_CONFIG, getServerAuthHeaders } from "./environment";

/**
 * Server-side API client with static token authentication
 * Only use this in server-side code (loaders, actions)
 */
export const serverApiClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

serverApiClient.interceptors.request.use(
    (config) => {
        const authHeaders = getServerAuthHeaders();

        Object.keys(authHeaders).forEach((key) => {
            config.headers.set(key, authHeaders[key]);
        });

        // Debug logging disabled for production

        return config;
    },
    (error) => {
        console.error('❌ Server API Request Error:', error);
        return Promise.reject(error);
    }
);

serverApiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("❌ Server API Response Error:", {
            url: error.config?.url,
            status: error.response?.status,
            message: error.message,
            responseData: error.response?.data,
        });

        return Promise.reject(error);
    }
);

