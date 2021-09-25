var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { UserServerApi } from '../api/user.js';
var UserServer = /** @class */ (function (_super) {
    __extends(UserServer, _super);
    function UserServer() {
        var _a, _b;
        var _this = _super.call(this) || this;
        _this.registerBtn = document.getElementById("register");
        _this.signinBtn = document.getElementById("signin");
        (_a = _this.registerBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', _this.handleResister.bind(_this), false);
        (_b = _this.signinBtn) === null || _b === void 0 ? void 0 : _b.addEventListener('click', _this.handleSignin.bind(_this), false);
        return _this;
    }
    UserServer.prototype.handleResister = function () {
        var response = this.register({ username: 'yyds', password: '123456' });
        response.then(function (result) {
            console.log("result=>>>", result.data);
        });
    };
    UserServer.prototype.handleSignin = function () {
        var response = this.signin({ username: 'yyds', password: '123456' });
        response.then(function (res) {
            res.data.userInfo.id;
        });
    };
    UserServer.prototype.handleSignout = function () {
        console.log(111);
    };
    return UserServer;
}(UserServerApi));
export default new UserServer();
