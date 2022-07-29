import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import Global from '../../../Global';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.urlLogin = Global.apiUrl + '/token';
    }
    AuthenticationService.prototype.Login = function (email, password) {
        localStorage.removeItem(Global.currentUser);
        var urlData = "username=" + email + "&password=" + password;
        var headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.post(this.urlLogin, urlData, { headers: headers });
    };
    AuthenticationService.prototype.SetDefaultDate = function (date) {
        var obj = this.GetDefaultDate();
        if (!obj) {
            obj = { date: date };
        }
        else {
            obj.date = date;
        }
        localStorage.setItem(Global.defaultDateKey, JSON.stringify(obj));
    };
    AuthenticationService.prototype.SetReceivedDate = function (date) {
        var obj = this.GetDefaultDate();
        if (!obj) {
            obj = { receivedDate: date };
        }
        else {
            obj.receivedDate = date;
        }
        localStorage.setItem(Global.defaultDateKey, JSON.stringify(obj));
    };
    AuthenticationService.prototype.GetDefaultDate = function () {
        var strValue = localStorage.getItem(Global.defaultDateKey);
        if (strValue) {
            return JSON.parse(strValue);
        }
        return null;
    };
    AuthenticationService.prototype.SetCurrentUser = function (userInfo) {
        localStorage.setItem(Global.currentUser, userInfo);
    };
    AuthenticationService.prototype.GetCurrentUser = function () {
        var strValue = localStorage.getItem(Global.currentUser);
        if (strValue) {
            return JSON.parse(strValue);
        }
        return null;
    };
    AuthenticationService.prototype.SignOut = function () {
        localStorage.removeItem(Global.currentUser);
    };
    AuthenticationService.prototype.UpdateCurrentInfo = function (user) {
        var cUser = this.GetCurrentUser();
        if (cUser && user) {
            cUser.Name = user.Name;
            cUser.ProfilePicturePath = user.ProfilePicturePath;
            this.SetCurrentUser(JSON.stringify(cUser));
        }
    };
    AuthenticationService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map