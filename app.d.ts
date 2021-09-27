
// 定义全局变量

interface Window {
    
}

interface ResponseProps<T> {
    code: number
    data: T
    errInfo: string
    msg: string
}

interface fetchOptio {
    hideErrMsg?: boolean | undefined
    hideSuccessMsg?: boolean | undefined
}