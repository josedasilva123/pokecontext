import axios from "axios";

export const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
    timeout: 6000,
})

interface iRequest<Data>{
    method: "post" | "get" | "put" | "patch" | "delete"
    url: string;
    data?: Data;
    headers?: any;
}

export const request = async (req: iRequest<any>) => {
    const response = await axios.request(req);
    return response;
}