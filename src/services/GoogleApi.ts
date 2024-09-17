import axios, {AxiosResponse} from "axios";
import {getUser} from "../Constants";

const googleClient = axios.create({
    baseURL: 'https://www.googleapis.com'
})
googleClient.interceptors.request.use((config) => {
    const user = getUser();
    const accessToken = user?.access_token;
    config.headers.set('Authorization',  `Bearer ${accessToken}`).set('Accept', 'application/json')
    return config
})

const GoogleApi = {
    getUserInfo: (): Promise<AxiosResponse> => {
        const user = getUser();
        const accessToken = user?.access_token;
        return googleClient.get(`/oauth2/v1/userinfo?access_token=${accessToken}`)
    }
}

export default GoogleApi;