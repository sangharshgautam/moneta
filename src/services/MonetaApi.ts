import axios, {AxiosProgressEvent, AxiosResponse} from "axios";
import {Identifier} from "../components/modules/common/Models";
import {getUser} from "../Constants";

const monetaClient = axios.create({
    baseURL: process.env.REACT_APP_MONETA_API_BASE_URL || 'https://moneta-api-l6fp.onrender.com',
    timeout: 20000
})
monetaClient.interceptors.request.use((config) => {
    const user = getUser();
    const accessToken = user?.access_token;
    config.headers.set('Authorization',  `Bearer ${accessToken}`)
    return config
})

const execute = <T>(method: string, url: string, onProgress?: (value: number) => void, data?: T): Promise<AxiosResponse<T>> => {

    return monetaClient.request({
        method,
        url,
        data,
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(onProgress){
                // console.log(progressEvent)
                const total = progressEvent.total || 0
                const current = progressEvent.loaded

                let percentCompleted = Math.floor(current / total * 100)
                onProgress(percentCompleted)
            }
        }
    })
}
const MonetaApi = {
    list: <T>(resource: string, onProgress?: (value: number) => void ): Promise<AxiosResponse<T>> => {
        return execute('GET', `/${resource}`,  onProgress)
    },
    search: <T>(resource: string,  criteria: any, onProgress?: (value: number) => void ): Promise<AxiosResponse<T>> => {
        return execute('POST', `/${resource}`,  onProgress, criteria)
    },
    create: <T>(resource: string, entity: T, onProgress?: (value: number) => void): Promise<AxiosResponse<T>> => {
        return execute('POST', `/${resource}`, onProgress, entity)
    },
    save: <T extends Identifier>(resource: string, entity: T, onProgress?: (value: number) => void): Promise<AxiosResponse<T>> => {
        return execute('PUT', `/${resource}/${entity.id}`, onProgress, entity)
    },
    get: <T>(resource: string, id: string | number, onProgress?: (value: number) => void ): Promise<AxiosResponse<T>> => {
        return execute('GET', `/${resource}/${id}`,  onProgress)
    },
    delete: <T>(resource: string, id: string | number, onProgress?: (value: number) => void ): Promise<AxiosResponse<T>> => {
        return execute('DELETE', `/${resource}/${id}`,  onProgress)
    }
}

export default MonetaApi;