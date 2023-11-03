import axios, { AxiosResponse } from 'axios';
import * as url from "url";
import { Activity } from '../models/activity';

const sleep = (delay: number) => {
    return new Promise((resolve) =>{
        setTimeout(resolve,delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api/';

axios.interceptors.response.use(async responce => {
    try {
        await sleep(1000);
        return responce;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody =<T> (response: AxiosResponse<T>) => response.data

const  requests = {
    get: <T> (url: string)=> axios.get<T> (url).then(responseBody), 
    post:(url: string, body: {} )=> axios.post(url, body).then(responseBody),
    put:(url: string, body: {} )=> axios.put(url, body).then(responseBody),
    del:(url: string)=> axios.get(url).then(responseBody),
}
const Activities = {
    list: ()=> requests.get<Activity[]>("/activities"),
    details: (id: string)=> requests.get<Activity>(`activities/${id}`),
    create: (activity: Activity)=> axios.post<void>(`/activities`, activity),
    update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
    delete:(id: string) => axios.delete<void>(`/activities/${id}`)
}
const agent = {
    Activities
}
export default agent;  