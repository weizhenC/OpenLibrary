import axios from "axios";
const apiClient = axios.create({
  baseURL: "https://openlibrary.org/",
  timeout: 20000,
});

export default apiClient;
