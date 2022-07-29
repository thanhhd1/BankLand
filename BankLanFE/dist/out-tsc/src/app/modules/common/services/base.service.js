import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var BaseService = /** @class */ (function () {
    function BaseService(httpClient) {
        this.httpClient = httpClient;
    }
    BaseService.prototype.Search = function (criteria) {
        var url = this.resource + "/Search";
        return this.httpClient.post(url, criteria);
    };
    BaseService.prototype.Get = function (id) {
        var url = this.resource + "/Get/" + id;
        return this.httpClient.get(url);
    };
    BaseService.prototype.Create = function (entity) {
        var url = this.resource + "/Post";
        return this.httpClient.post(url, entity);
    };
    BaseService.prototype.Edit = function (entity) {
        var url = this.resource + "/Put";
        return this.httpClient.put(url, entity);
    };
    BaseService.prototype.Delete = function (id) {
        var url = this.resource + "/Delete/" + id;
        return this.httpClient.delete(url);
    };
    BaseService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], BaseService);
    return BaseService;
}());
export { BaseService };
//# sourceMappingURL=base.service.js.map