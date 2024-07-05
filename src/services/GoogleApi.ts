import axios, {AxiosResponse} from "axios";

const googleClient = axios.create({
    baseURL: 'https://www.googleapis.com'
})
googleClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken")
    config.headers.set('Authorization',  `Bearer ${accessToken}`).set('Accept', 'application/json')
    return config
})

const GoogleApi = {
    getUserInfo: (): Promise<AxiosResponse> => {
        const accessToken = localStorage.getItem("accessToken")
        return googleClient.get(`/oauth2/v1/userinfo?access_token=${accessToken}`)
    }
}

export default GoogleApi;