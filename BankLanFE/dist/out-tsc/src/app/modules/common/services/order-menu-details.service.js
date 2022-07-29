import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
var OrderMenuDetailService = /** @class */ (function (_super) {
    tslib_1.__extends(OrderMenuDetailService, _super);
    function OrderMenuDetailService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.resource = Global.apiUrl + "/api/OrderMenuDetail";
        return _this;
    }
    OrderMenuDetailService.prototype.GetAll = function () {
        var url = this.resource + "/GetAll";
        return this.http.get(url);
    };
    OrderMenuDetailService.prototype.GetByOrderId = function (id) {
        var url = this.resource + "/GetByOrderIdAsync/" + id;
        return this.httpClient.get(url);
    };
    OrderMenuDetailService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], OrderMenuDetailService);
    return OrderMenuDetailService;
}(BaseService));
export { OrderMenuDetailService };
//# sourceMappingURL=order-menu-details.service.js.map