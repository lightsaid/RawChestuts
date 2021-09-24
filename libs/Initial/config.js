var AppConfig = /** @class */ (function () {
    function AppConfig(env) {
        this.env = env;
        if (env === 'production') {
            this.baseUrl = '';
        }
        else {
            this.baseUrl = 'http://localhost:9999';
        }
    }
    AppConfig.getInstance = function (env) {
        if (!AppConfig.instance) {
            AppConfig.instance = new AppConfig(env);
        }
        return AppConfig.instance;
    };
    return AppConfig;
}());
export default AppConfig.getInstance('development');
