import axios from "axios"

// const baseUrl = 'https://mr2-chats-backend.vercel.app/api' //backend url

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
    withCredentials: true,
})