import { fetcher, ResponseProps } from './fetcher.js'

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
interface SigninResponseDto extends ResponseDto{
    userinfo: {
        id: string, 
        username: string, 
        avatar: string
    },
    token: string
}

interface IceUserServerApi {
    register: (dto: RegisterDto) => Promise<ResponseProps<ResponseDto>>
    signin: (dto: SigninDto) => Promise<ResponseProps<SigninResponseDto>>
    modify: (dto: ModifyUserDto) => Promise<ResponseProps<ResponseDto>>
}

export class UserServerApi implements IceUserServerApi{

    register(dto: RegisterDto){
        const response = fetcher.post<ResponseDto>('/api/user/register', { body: JSON.stringify(dto) })
        response.then(res=>{
            // 做些什么
        })
        return response
    }
    signin(dto: SigninDto){
        const response = fetcher.post<SigninResponseDto>('/api/user/login', { body: JSON.stringify(dto) })
        response.then(res=>{
            // 做些什么
        })
        return response
    }
    modify(dto: ModifyUserDto){
        const response = fetcher.post<ResponseDto>('/api/user/update', { body: JSON.stringify(dto) })
        response.then(res=>{
            // 做些什么
        })
        return response
    }
}