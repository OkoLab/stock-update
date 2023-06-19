import axios from "axios";

export default {
    install: async () => {

        const baseUrl = "http://localhost:3000";

        axios.defaults.baseURL = baseUrl + "/api/";
        axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
        axios.defaults.headers.common["Content-Type"] = "application/json";
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.withCredentials = false; 
    }
}