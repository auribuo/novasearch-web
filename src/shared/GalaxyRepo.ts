import {useStore} from "../plugins/pinia";
import axios, {AxiosError} from "axios";
import {GalaxyResponse} from "./types/GalaxyResponse";
import {GalaxyFilterRequest} from "./types/GalaxyFilterRequest";

function url(path: string): string {
    return useStore()
        .url(path);
}

async function getGalaxies(): Promise<GalaxyResponse | AxiosError> {
    try {
        const response = await axios.get<GalaxyResponse>(url("galaxies"));
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            return e;
        } else {
            throw e;
        }
    }
}

async function getGalaxy(id: string): Promise<GalaxyResponse | AxiosError> {
    try {
        const response = await axios.get<GalaxyResponse>(url(`galaxies/${id}`));
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            return e;
        } else {
            throw e;
        }
    }
}

async function filterGalaxies(req: GalaxyFilterRequest): Promise<GalaxyResponse | AxiosError> {
    try {
        const response = await axios.post<GalaxyResponse>(url("galaxies"), req);
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            return e;
        } else {
            throw e;
        }
    }
}

export function useGalaxyRepo() {
    return {
        getGalaxies,
        getGalaxy,
        filterGalaxies,
    };
}