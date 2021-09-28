var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import appConfig from './config.js';
import { StorageKey, HttpStatusCode } from '../enums/index.js';
import Message from './message.js';
export var HttpMethods;
(function (HttpMethods) {
    HttpMethods["GET"] = "GET";
    HttpMethods["POST"] = "POST";
})(HttpMethods || (HttpMethods = {}));
var Request = /** @class */ (function () {
    function Request(baseUrl, config, timeout, responseHandler) {
        if (config === void 0) { config = {}; }
        this.aa = 10;
        this.baseUrl = baseUrl;
        this.config = config;
        this.timeout = timeout;
        this.responseHandler = responseHandler;
    }
    Request.prototype.send = function (url, method, options, done) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var controller = new AbortController();
        var signal = controller.signal;
        var req = fetch("" + this.baseUrl + url, __assign({ method: method }, Object.assign(this.config, options, { signal: signal })));
        var sleep = new Promise(function (resolve) {
            var result = {
                code: HttpStatusCode.Timeout,
                msg: '请求超时',
                data: {},
                errInfo: ''
            };
            var val = new Response(JSON.stringify(result));
            setTimeout(resolve, _this.timeout, val);
        });
        return Promise.race([req, sleep]).then(function (resp) {
            var response = resp.json();
            response.then(function (res) {
                _this.responseHandler && _this.responseHandler(res, options, controller, done);
            });
            return response;
        });
    };
    Request.prototype.get = function (url, options, done) {
        if (options === void 0) { options = {}; }
        return this.send(url, HttpMethods.GET, options, done);
    };
    Request.prototype.post = function (url, options, done) {
        if (options === void 0) { options = {}; }
        return this.send(url, HttpMethods.POST, options, done);
    };
    return Request;
}());
// 不同的服务器，可能有不同的错误处理方式
var fetcherResponse = function (res, config, controller, done) {
    if (res.code !== HttpStatusCode.OK) {
        // 通用异常处理
        if (!(config === null || config === void 0 ? void 0 : config.hideErrMsg)) {
            new Message({ content: res.msg, type: 'error', duration: 20000000 });
        }
    }
    if (res.code === HttpStatusCode.Unauthorized) {
        // 跳转到登录页/主页
    }
    if (res.code === HttpStatusCode.OK) {
        if (!config.hideSuccessMsg) {
            new Message({ content: res.msg, type: 'success', duration: 2000 });
        }
        done && done(res.data);
    }
    if (res.code === HttpStatusCode.Timeout) {
        controller.abort();
    }
};
// 根据基础路径不同可以创建不同的实例
export var fetcher = new Request(appConfig.baseUrl, {
    headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem(StorageKey.Token) }
}, 1000 * 10, fetcherResponse);
