
import axios from "axios";

const baseURL = process.env.BASE_URL;
const ApiHelper = axios.create({
    baseURL,
});

ApiHelper.interceptors.request.use(async (config) => {
    return config;
});

console.log(baseURL,'baseURL')

ApiHelper.interceptors.response.use(
    (response) => {
        return Promise.resolve(response?.data);
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default ApiHelper;
