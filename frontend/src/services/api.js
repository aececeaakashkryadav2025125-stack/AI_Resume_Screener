import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-resume-screener-f0g1.onrender.com"
});

export default api;