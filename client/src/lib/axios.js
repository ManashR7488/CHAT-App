import axios from "axios"

const baseUrl = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "https://mr2-chats.vercel.app/api"; //backend url

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
})