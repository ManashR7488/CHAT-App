import axios from "axios"

const baseUrl = 'https://mr2-chats-backend.vercel.app' //backend url

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
})