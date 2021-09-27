import { fetcher } from './fetcher.js'

export interface RegisterDto{
    username: string
    password: string
    avatar?: string
}

export interface SigninDto{
    username: string
    password: string
}

export interface ModifyUserDto{
    username: string 
    avatar: string
}

type ResponseDto = {}
export interface SigninResponseDto extends ResponseDto{
    userinfo: {
        id: string, 
        username: string, 
        avatar: string
    },
    token: string
}


interface IceUserServerApi {
    register: (dto: RegisterDto) => Promise<ResponseProps<ResponseDto>>
    signin: (dto: SigninDto, done?: <SigninResponseDto>(data: SigninResponseDto)=>void) => Promise<ResponseProps<SigninResponseDto>>
    modify: (dto: ModifyUserDto) => Promise<ResponseProps<ResponseDto>>
}

export class UserServerApi implements IceUserServerApi{
    constructor(){

    }
    register(dto: RegisterDto){
        const response = fetcher.post<ResponseProps<ResponseDto>>('/api/user/register', { body: JSON.stringify(dto), hideErrMsg: false, hideSuccessMsg:false})
        response.then(res=>{
            // 做些什么
        })
        return response
    }

    signin(dto: SigninDto, done?: <SigninResponseDto>(data: SigninResponseDto)=>void){
        const response = fetcher.post<ResponseProps<SigninResponseDto>>('/api/user/login', { body: JSON.stringify(dto) }, done)
        response.then(res=>{
            // 做些什么
        })
        return response
    }

    modify(dto: ModifyUserDto){
        const response = fetcher.post<ResponseProps<ResponseDto>>('/api/user/update', { body: JSON.stringify(dto) })
        response.then(res=>{
            // 做些什么
        })
        return response
    }
}
