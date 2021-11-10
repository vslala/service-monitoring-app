import axios from "axios";

const SERVICE_URL = "http://localhost:8080"

export const request = axios.create({
    baseURL: SERVICE_URL
});

// request.interceptors.request.use((config) => {
//     config.headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem(User.ID_TOKEN)!}`,
//         'Accept': '*/*'
//     }
//     return config;
// });