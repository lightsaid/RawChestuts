import appConfig  from './config.js'
import { StorageKey, HttpStatusCode } from '../enums/index.js'
import Message from './message.js'

export enum HttpMethods {
    GET = 'GET',
    POST = 'POST'
}
class Request {
    public aa = 10
    private baseUrl: string
    private config: RequestInit
    private readonly timeout: number
    private readonly responseHandler: Function
    constructor(baseUrl: string, config = {}, timeout: number, responseHandler: Function) {
        this.baseUrl = baseUrl
        this.config = config
        this.timeout = timeout
        this.responseHandler = responseHandler
    }
    send<T>(url: string, method: HttpMethods, options = {} as fetchOptio & RequestInit, done?: <K>(data: K)=> void): Promise<T> {
        const controller = new AbortController();
        const signal = controller.signal;
        const req = fetch(`${this.baseUrl}${url}`, {
            method: method,
            ...Object.assign(this.config, options, {signal})
        })
    
        const sleep = new Promise<Response>((resolve) => {
            const result:ResponseProps<{}> = {
                code: HttpStatusCode.Timeout,
                msg: '请求超时',
                data: {},
                errInfo: ''
            }
            let val = new Response(JSON.stringify(result))
            setTimeout(resolve, this.timeout, val);
        });
        return Promise.race([req, sleep]).then((resp) => {
            const response = resp.json() as Promise<T>
            response.then(res=>{
                this.responseHandler && this.responseHandler(res, options, controller, done)
            })
            return response
        })
    }
    get<T>(url: string, options = {} as fetchOptio & RequestInit, done?: <K>(data: K)=> void): Promise<T> {
        return this.send<T>(url, HttpMethods.GET, options, done)
    }
    post<T>(url: string, options = {} as fetchOptio & RequestInit, done?: <K>(data: K)=> void): Promise<T> {
        return this.send<T>(url, HttpMethods.POST, options, done)
    }
}

// 不同的服务器，可能有不同的错误处理方式
const fetcherResponse = <T>(res: ResponseProps<T>, config:fetchOptio, controller:AbortController, done?: <K>(data:K) => void) => {
    if(res.code !== HttpStatusCode.OK){
        // 通用异常处理
        if(!config?.hideErrMsg){
            new Message({content: res.msg, type: 'error', duration:20000000})
        }
    } 
    if(res.code === HttpStatusCode.Unauthorized){
        // 跳转到登录页/主页
    }
    if(res.code === HttpStatusCode.OK){
        if(!config.hideSuccessMsg){
            new Message({content: res.msg, type: 'success', duration: 2000})
        }
        done && done(res.data)
    }
    if(res.code === HttpStatusCode.Timeout){
        controller.abort()
    }
}

// 根据基础路径不同可以创建不同的实例
export const fetcher = new Request(
    appConfig.baseUrl,
    {
        headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem(StorageKey.Token)}
    },
    1000 * 10,
    fetcherResponse
)

