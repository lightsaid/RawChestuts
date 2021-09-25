import { UserServerApi, RegisterDto, SigninDto } from '../api/user.js'
import { GlobalProps } from '../enums/index.js'

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
        const response = this.signin({username:'yyds', password:'1234561'} as SigninDto)
        response.then(res=>{
            debugger
            localStorage.setItem(GlobalProps.Userinfo, JSON.stringify(res.data.userinfo))
            localStorage.setItem(GlobalProps.Token, `Bearer ${res.data.token}`)
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