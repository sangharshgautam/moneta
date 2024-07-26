import {AxiosResponse} from "axios";
import MonetaApi from "./services/MonetaApi";

export const loadResource = async <T,>(resource: string, id: string | number): Promise<AxiosResponse<T>> => {
    console.log(`${resource} Loader`)
    return MonetaApi.get<T>(resource, id)
}

export const loadResourceList = async <T,>(resource: string) => {
    console.log(`${resource} List Loader`)
    return MonetaApi.list<T>(resource)
}