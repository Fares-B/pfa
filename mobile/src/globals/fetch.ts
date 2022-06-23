import AsyncStorage from "@react-native-async-storage/async-storage";

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

type medthodType = "PUT"|"POST"|"GET";

interface OptionsProps {
    method: medthodType;
    headers: string[][] | Record<string, string> | Headers| any;
    body?: string;
}

const query = async (path: string, method: medthodType, body: any = null): Promise<any> => {
    path = process.env.BACKEND_BASE_URL || "http://192.168.1.39:5000" +  path;
    console.log(path);
    const token = await AsyncStorage.getItem("token");
    const options: OptionsProps = {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: "",
        },
    };
    if(token) options.headers.Authorization = "Bearer " + token;
    if(body) options.body = JSON.stringify(body);
    try {
        const res = await fetch(path, options);
        const data = await res.json();
        return data;
    } catch (err) {
        return console.log(err);
    }
}

// PUBLIC
export const loginRequest = async (body: LoginProps) => query("/login", "POST", body);

export const registerRequest = async (body: RegisterProps) => query("/register", "POST", body);

// PRIVATE
// export const updateStatusRequest = async (id: string) => query("/menus/next-status/" + id, "PUT");

// export const allOrdersRequest = async () => query("/menus", "GET")

export default query;
