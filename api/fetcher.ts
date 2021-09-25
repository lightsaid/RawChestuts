import appConfig  from '../initial/config.js'
import { GlobalProps } from '../enums/index.js'

export enum HttpMethods {
    GET = 'GET',
    POST = 'POST'
}

export enum HttpStatusCode {
    OK = 200,
    BadRequest = 400,
    Unauthorized = 401,
    Unknown = 110
}

export interface ResponseProps<T> {
    code: number
    data: T
    errInfo: string
    msg: string
}

class Request{
    private baseUrl: string
    private config: RequestInit
    constructor(baseUrl: string, config = {}) {
        this.baseUrl = baseUrl
        this.config = config
    }
    async get<T>(url: string, options = {}): Promise<ResponseProps<T>> {
        const req = await fetch(`${this.baseUrl}${url}`, {
            method: HttpMethods.GET,
            ...Object.assign(this.config, options)
        })
        const response = req.json() as Promise<ResponseProps<T>> 
        // TODO: 通用异常处理
        response.then(res=>{
            if(res.code !== HttpStatusCode.OK){
                console.error(res.msg, res.errInfo)
            }
        })
        return response
    }
    async post<T>(url: string, options = {}): Promise<ResponseProps<T>> {
        const req = await fetch(`${this.baseUrl}${url}`, {
            method: HttpMethods.POST,
            ...Object.assign(this.config, options)
        })
        const response = req.json() as Promise<ResponseProps<T>>
        // TODO: 通用异常处理
        response.then(res=>{
            if(res.code !== HttpStatusCode.OK){
                console.error(res.msg, res.errInfo)
            }
        })
        return response
    }
}

// 根据基础路径不同可以创建不同的实例
// 创建一个基础实例
export const fetcher = new Request(
    appConfig.baseUrl,
    {
        headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem(GlobalProps.Token)}
    }
)
