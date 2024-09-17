import {AxiosResponse} from "axios";
import MonetaApi from "./services/MonetaApi";
import {User} from "oidc-client-ts";

export const AUTHORITY = "https://accounts.google.com"
export const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "834791764214-tqn6u72bnel582avnh9l0c243j6inps5.apps.googleusercontent.com"
export const getUser = () => {
    const oidcStorage = localStorage.getItem(`oidc.user:${AUTHORITY}:${CLIENT_ID}`)
    if (!oidcStorage) {
        return null;
    }

    return User.fromStorageString(oidcStorage);
}

export const loadResource = async <T,>(resource: string, id: string | number): Promise<AxiosResponse<T>> => {
    return MonetaApi.get<T>(resource, id)
}

export const loadResourceList = async <T,>(resource: string) => {
    console.log(`${resource} List Loader`)
    return MonetaApi.list<T>(resource)
}