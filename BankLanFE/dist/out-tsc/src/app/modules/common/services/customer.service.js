import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';
var CustomerService = /** @class */ (function (_super) {
    tslib_1.__extends(CustomerService, _super);
    function CustomerService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.resource = Global.apiUrl + "/api/Customer";
        return _this;
    }
    CustomerService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], CustomerService);
    return CustomerService;
}(BaseService));
export { CustomerService };
//# sourceMappingURL=customer.service.js.map