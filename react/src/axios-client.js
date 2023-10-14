import axios from "axios";

const axiosClient = axios.create({
    // import env var
    baseURL: `${import.meta.env.VITA_APP_BASE_URL}/api`
})

export default axiosClient;