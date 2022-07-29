import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import Global from '../../../Global';
var TokenService = /** @class */ (function () {
    function TokenService() {
    }
    TokenService.prototype.getCurrentUser = function () {
        //const strValue = sessionStorage.getItem(Global.currentUser);
        var strValue = localStorage.getItem(Global.currentUser);
        if (strValue) {
            return JSON.parse(strValue);
        }
        return null;
    };
    TokenService.prototype.getAccessToken = function () {
        //const strValue = sessionStorage.getItem(Global.currentUser);
        var strValue = localStorage.getItem(Global.currentUser);
        if (strValue) {
            var user = JSON.parse(strValue);
            if (user) {
                return user.access_token;
            }
        }
        return null;
    };
    TokenService = tslib_1.__decorate([
        Injectable()
    ], TokenService);
    return TokenService;
}());
export { TokenService };
//# sourceMappingURL=token.service.js.map