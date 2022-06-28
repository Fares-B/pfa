import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryProps, MenuProps } from "./types";

interface LoginProps {
    email: string;
    password: string;
};

interface RegisterProps {
    email: string;
    lastName: string;
    firstName: string;
    password: string;
    // confirmPassword: string;
};

interface UpdateStatusProps {};

type medthodType = "PUT"|"POST"|"GET"|"DELETE";

interface OptionsProps {
    method: medthodType;
    headers: string[][] | Record<string, string> | Headers| any;
    body?: string;
}
export const DEFAULT_URL = "https://b1dd-2a01-e0a-8f9-7e80-7d0c-c9f6-f4e8-6ca5.eu.ngrok.io";
const query = async (path: string, method: medthodType, body: any = null): Promise<any> => {
    // @ts-ignore
    path = process.env.BACKEND_BASE_URL || DEFAULT_URL +  path;
    console.log(path);
    const token = await AsyncStorage.getItem("token");
    const options: OptionsProps = {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: "",
            "ngrok-skip-browser-warning": "true",
        },
    };
    if(token) options.headers.Authorization = "Bearer " + token;
    if(body) options.body = JSON.stringify(body);
    console.log("body", options.body);
    try {
        const res = await fetch(path, options);
        const data = await res.json();
        return data;
    } catch (err) {
        return err;
    }
}

// PUBLIC
export const loginRequest = async (body: LoginProps) => query("/login", "POST", body);

export const registerRequest = async (body: RegisterProps) => query("/register", "POST", body);

// PRIVATE
//get all menus of a restaurant
export const getProfileRequest = async () => query("/users/", "GET");

export const updateProfileRequest = async (body: any) => query("/users/", "PUT", body);

export const getMenusRequest = async (userId: string) => query(`/menus/${userId}`, "GET");

export const postMenuRequest = async (body: any) => query("/orders", "POST", body);

export const getHistoryOrdersRequest = async () => query(`/orders`, "GET");

export const cancelOrderRequest = async (orderId: string) => query(`/orders/${orderId}`, "DELETE");

export default query;
