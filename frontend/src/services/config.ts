import * as SecureStore from "expo-secure-store";
import axios from "axios";

export const BASE_URL =
    process.env.EXPO_PUBLIC_SERVER_URL || "http://localhost:4000";

// 30 seconds
const TIMEOUT = 30000;

export const BLOSSOM_TOKEN_NAME = "blossom_user_token";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT
});

export const saveToken = async (key: string, value: string) => {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (error) {
        console.error("error in save token", error);
        throw error;
    }
};

axiosInstance.interceptors.request.use(async (req) => {
    try {
        const accessToken = await SecureStore.getItemAsync(BLOSSOM_TOKEN_NAME);

        req.headers.Authorization = accessToken;

        return req;
    } catch (error) {
        console.error(error);
        return req;
    }
});

export const fetcher = (url: string) =>
    axiosInstance.get(url).then((res) => res.data);

export default axiosInstance;
