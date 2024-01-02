import { IUser } from "@/types";

import axiosInstance, { BLOSSOM_TOKEN_NAME, saveToken } from "./config";

type RegisterUserTypes = IUser;

export const registerUser = async ({
    name,
    email,
    password
}: RegisterUserTypes) => {
    try {
        const response = await axiosInstance.post("/users/create", {
            name,
            email,
            password
        });

        return response.data.user;
    } catch (error) {
        console.error(error);
    }
};

type LoginUserTypes = Omit<IUser, "name">;

export const loginUser = async ({ email, password }: LoginUserTypes) => {
    try {
        const response = await axiosInstance.post("/users/login", {
            email,
            password
        });

        const token = response.data.token;

        axiosInstance.defaults.headers.common["Authorization"] = token;
        saveToken(BLOSSOM_TOKEN_NAME, token);

        return response.data.user;
    } catch (error) {
        console.error(error);
    }
};
