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

type ResponseDto = {}
interface SigninResponseDto extends ResponseDto{
    userInfo: {
        id: string, 
        username: string, 
        avatar: string
    },
    token: string
}


interface IceUserServerApi{
    register: (dto: RegisterDto) => Promise<ResponseProps<ResponseDto>>
    signin: (dto: SigninDto) => Promise<ResponseProps<SigninResponseDto>>
    modify: () => void
}
export class UserServerApi implements IceUserServerApi{
    register(dto: RegisterDto){
        const response = fetcher.post<ResponseDto>('/api/user/register', { body: JSON.stringify(dto) })
        response.then(res=>{
        })
        return response
    }
    signin(dto: SigninDto){
        const response = fetcher.post<SigninResponseDto>('/api/user/login', { body: JSON.stringify(dto) })
        response.then(res=>{
        })
        return response
    }
    modify(){}
}