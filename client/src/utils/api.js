import axios from "axios";

// Single axios instance — all requests go through /api (proxied to Express)
const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // send cookies
});

// If we get a 401, the cookie expired — clear local auth state
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
