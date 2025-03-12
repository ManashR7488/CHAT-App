import axios from "axios"

const baseUrl = '/api' //backend url

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
})