import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
var OrderCustomerService = /** @class */ (function (_super) {
    tslib_1.__extends(OrderCustomerService, _super);
    function OrderCustomerService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.resource = Global.apiUrl + "/api/OrderCustomer";
        return _this;
    }
    OrderCustomerService.prototype.GetAll = function () {
        var url = this.resource + "/GetAll";
        return this.http.get(url);
    };
    OrderCustomerService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], OrderCustomerService);
    return OrderCustomerService;
}(BaseService));
export { OrderCustomerService };
//# sourceMappingURL=order-customer.service.js.map