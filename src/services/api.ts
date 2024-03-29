import axios from "axios";

export const galleryBaseURL = "https://img.pokemondb.net/artwork/"

export const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
    timeout: 6000,
})

interface iRequest<Data>{
    method: "post" | "get" | "put" | "patch" | "delete"
    url: string;
    data?: Data;
    headers?: any;
    params?: any;
}

export const request = async (req: iRequest<any>) => {
    const response = await api.request(req);
    return response;
}