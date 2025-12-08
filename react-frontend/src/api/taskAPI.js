import axios from "axios";

const base = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

const api = axios.create({
  baseURL: base,
  timeout: 10000,
});

export default api;
