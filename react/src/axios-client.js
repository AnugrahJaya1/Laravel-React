import axios from "axios";

const axiosClient = axios.create({
    // import env var
    baseURL: `${import.meta.env.VITA_APP_BASE_URL}/api`
})

// add req intercept, before send req
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.get('ACCESS_TOKEN')

    // modify config
    config.headers.Authorization = `Bearer ${token}`

    return config;
})

// add req intercept, after response receive
axiosClient.interceptors.response.use((response) => {
    // result
    return response;
}, (error) => {
    // rejected
    const { response } = error;

    if (response.status === 401) {
        // token invalid/exp token
        localStorage.removeItem('ACCESS_TOKEN');
    }

    throw error;
})

export default axiosClient;