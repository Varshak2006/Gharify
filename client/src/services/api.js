// import axios from "axios";
// const API=axios.create({
//     baseURL:"http://localhost:5000/api"
// });
// export default API;
import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Automatically attach JWT token to every request
API.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Automatically logout when JWT expires
API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        if (error.response?.status === 401) {

            console.log("Session expired. Logging out...");

            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("role");
            localStorage.removeItem("name");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default API;