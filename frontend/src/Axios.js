import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:5000/api" : "https://prediction.adaptable.app/api"

export const Axios = axios.create({
    baseURL: baseUrl
})