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

interface IceUserServerApi{
    register: (dto: RegisterDto) => Promise<any>
    signin: (dto: SigninDto) => Promise<any>
    modify: () => void
}
export class UserServerApi implements IceUserServerApi{
    register(dto: RegisterDto){
        const response = fetcher.post('/api/user/register', { body: JSON.stringify(dto) })
        response.then(res=>{
        })
        return response
    }
    signin(dto: SigninDto){
        const response = fetcher.post('/api/user/login', { body: JSON.stringify(dto) })
        response.then(res=>{
        })
        return response
    }
    modify(){}
}