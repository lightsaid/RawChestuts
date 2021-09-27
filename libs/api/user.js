import { fetcher } from './fetcher.js';
var UserServerApi = /** @class */ (function () {
    function UserServerApi() {
    }
    UserServerApi.prototype.register = function (dto) {
        var response = fetcher.post('/api/user/register', { body: JSON.stringify(dto), hideErrMsg: false, hideSuccessMsg: false });
        response.then(function (res) {
            // 做些什么
        });
        return response;
    };
    UserServerApi.prototype.signin = function (dto, done) {
        var response = fetcher.post('/api/user/login', { body: JSON.stringify(dto) }, done);
        response.then(function (res) {
            // 做些什么
        });
        return response;
    };
    UserServerApi.prototype.modify = function (dto) {
        var response = fetcher.post('/api/user/update', { body: JSON.stringify(dto) });
        response.then(function (res) {
            // 做些什么
        });
        return response;
    };
    return UserServerApi;
}());
export { UserServerApi };
