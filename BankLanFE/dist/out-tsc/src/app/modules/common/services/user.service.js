import * as tslib_1 from "tslib";
import { BaseService } from './base.service';
import Global from '../../../Global';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var UserService = /** @class */ (function (_super) {
    tslib_1.__extends(UserService, _super);
    function UserService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.resource = Global.apiUrl + '/api/User';
        return _this;
    }
    UserService.prototype.GetCurrent = function () {
        var url = this.resource + "/GetCurrent";
        return this.httpClient.get(url);
    };
    UserService.prototype.GetAllRole = function () {
        var url = this.resource + "/GetAllRole";
        return this.httpClient.get(url);
    };
    UserService.prototype.ChangePassword = function (entity) {
        var url = this.resource + "/ChangePassword";
        return this.httpClient.post(url, entity);
    };
    UserService.prototype.ResetPassword = function (entity) {
        var url = this.resource + "/ResetPassword";
        return this.httpClient.post(url, entity);
    };
    UserService.prototype.Register = function (entity) {
        var url = this.resource + "/Register";
        return this.httpClient.post(url, entity);
    };
    UserService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], UserService);
    return UserService;
}(BaseService));
export { UserService };
//# sourceMappingURL=user.service.js.map