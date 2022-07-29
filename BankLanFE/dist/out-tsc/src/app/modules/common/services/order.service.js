import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
var OrderService = /** @class */ (function (_super) {
    tslib_1.__extends(OrderService, _super);
    function OrderService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.resource = Global.apiUrl + "/api/Order";
        return _this;
    }
    OrderService.prototype.GetAll = function () {
        var url = this.resource + "/GetAll";
        return this.http.get(url);
    };
    OrderService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], OrderService);
    return OrderService;
}(BaseService));
export { OrderService };
//# sourceMappingURL=order.service.js.map