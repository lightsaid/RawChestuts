import { UserServerApi, RegisterDto, SigninDto } from '../api/user.js'

class UserServer extends UserServerApi{
    registerBtn: HTMLElement | null
    signinBtn: HTMLElement | null
    constructor(){
        super()
        this.registerBtn = document.getElementById("register")
        this.signinBtn = document.getElementById("signin")
        this.registerBtn?.addEventListener('click', this.handleResister.bind(this), false)
        this.signinBtn?.addEventListener('click', this.handleSignin.bind(this), false)
    }
    handleResister(){
        const response = this.register({username:'yyds', password:'123456'} as RegisterDto)
        response.then(result => {
            console.log("result=>>>", result.data)
        })
    }
    handleSignin(){
        const response = this.signin({username:'yyds', password:'123456'} as SigninDto)
        response.then(res=>{
            res.data.userInfo.id
        })
    }
    handleSignout(){
       console.log(111)
    }
}

export default new UserServer()