import { fetcher } from './fetcher.js';
var UserServerApi = /** @class */ (function () {
    function UserServerApi() {
    }
    UserServerApi.prototype.register = function (dto) {
        var response = fetcher.post('/api/user/register', { body: JSON.stringify(dto) });
        response.then(function (res) {
        });
        return response;
    };
    UserServerApi.prototype.signin = function (dto) {
        var response = fetcher.post('/api/user/login', { body: JSON.stringify(dto) });
        response.then(function (res) {
        });
        return response;
    };
    UserServerApi.prototype.modify = function () { };
    return UserServerApi;
}());
export { UserServerApi };
