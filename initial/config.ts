type EnvTypes = 'development' | 'production'

class AppConfig{
    // 单例
    private static instance: AppConfig
    private env: EnvTypes
    public baseUrl: string

    constructor(env: EnvTypes){
        this.env = env
        if(env === 'production'){
            this.baseUrl = ''
        }else{
            this.baseUrl = 'http://localhost:9999'
        }

    }

    static getInstance(env: EnvTypes){
        if(!AppConfig.instance){
            AppConfig.instance = new AppConfig(env)
        }
        return AppConfig.instance
    }
}

export default AppConfig.getInstance('development')