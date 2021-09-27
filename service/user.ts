import { UserServerApi, RegisterDto, SigninDto, SigninResponseDto } from '../api/user.js'
import { StorageKey } from '../enums/index.js'

class UserServer extends UserServerApi{
    registerBtn: HTMLElement | null
    signinBtn: HTMLElement | null
    modifyBtn: HTMLElement | null
    constructor(){
        super()
        this.registerBtn = document.getElementById("register")
        this.signinBtn = document.getElementById("signin")
        this.modifyBtn = document.getElementById("modify")
        
        this.registerBtn?.addEventListener('click', this.handleResister.bind(this), false)
        this.signinBtn?.addEventListener('click', this.handleSignin.bind(this), false)
        this.modifyBtn?.addEventListener('click', this.handleModify.bind(this), false)
    }
    handleResister(){
        const response = this.register({username:'yyds', password:'123456'} as RegisterDto)
        response.then(result => {
            console.log("result=>>>", result.data)
        })
    }
    handleSignin(){
        const response = this.signin({username:'yyd', password:'123456'} as SigninDto, <SigninResponseDto>(data: SigninResponseDto)=>{
            console.log("===handleSignin===", data)
        })
        response.then(res=>{
            localStorage.setItem(StorageKey.Userinfo, JSON.stringify(res.data))
            localStorage.setItem(StorageKey.Token, `Bearer ${res.data}`)
        })
    }
    handleSignout(){
       console.log(111)
    }
    handleModify(){
        const response = this.modify({username:'xzz', avatar:'http://localhost:9999/static/default/avatar.png'})
    }
}

export default new UserServer()