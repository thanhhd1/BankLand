import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';
var ServicesManagementService = /** @class */ (function (_super) {
    tslib_1.__extends(ServicesManagementService, _super);
    function ServicesManagementService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.resource = Global.apiUrl + "/api/Menu";
        return _this;
    }
    ServicesManagementService.prototype.GetAll = function () {
        var url = this.resource + "/GetAll";
        return this.http.get(url);
    };
    ServicesManagementService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ServicesManagementService);
    return ServicesManagementService;
}(BaseService));
export { ServicesManagementService };
//# sourceMappingURL=services-management.service.js.map