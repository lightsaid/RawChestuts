import appConfig  from '../initial/config.js'
import { StorageKey, HttpStatusCode } from '../enums/index.js'
import Message from '../initial/message.js'

export enum HttpMethods {
    GET = 'GET',
    POST = 'POST'
}

class Request {
    private baseUrl: string
    private config: RequestInit
    private readonly responseHandler: Function
    constructor(baseUrl: string, config = {}, responseHandler: Function) {
        this.baseUrl = baseUrl
        this.config = config
        this.responseHandler = responseHandler
    }

    async get<T>(url: string, options = {} as fetchOptio & RequestInit, done?: <K>(data: K)=> void): Promise<T> {
        const req = await fetch(`${this.baseUrl}${url}`, {
            method: HttpMethods.GET,
            ...Object.assign(this.config, options)
        })
        const response = req.json() as Promise<T>
        response.then(res=>{
            this.responseHandler && this.responseHandler(res, options, done)
        })
        return response
    }

    async post<T>(url: string, options = {} as fetchOptio & RequestInit, done?: <K>(data: K)=> void): Promise<T> {
        const req = await fetch(`${this.baseUrl}${url}`, {
            method: HttpMethods.POST,
            ...Object.assign(this.config, options)
        })
        const response = req.json() as Promise<T>
        response.then(res=>{
            this.responseHandler && this.responseHandler(res, options, done)
        })
        return response
    }
}

// 不同的服务器，可能有不同的错误处理方式
const fetcherResponse = <T>(res: ResponseProps<T>, config:fetchOptio, done?: <K>(data:K) => void) => {
    if(res.code !== HttpStatusCode.OK){
        // 通用异常处理
        if(!config?.hideErrMsg){
            new Message({content: res.msg, type: 'error', duration:2000})
        }
    } 
    if(res.code === HttpStatusCode.Unauthorized){
        // 跳转到登录页/主页
    }
    if(res.code === HttpStatusCode.OK){
        if(!config.hideSuccessMsg){
            new Message({content: res.msg, type: 'success', duration:2000})
        }
        done && done(res.data)
    }
}

// 根据基础路径不同可以创建不同的实例
export const fetcher = new Request(
    appConfig.baseUrl,
    {
        headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem(StorageKey.Token)}
    },
    fetcherResponse
)
