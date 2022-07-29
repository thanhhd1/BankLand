import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
var OrganizationService = /** @class */ (function (_super) {
    tslib_1.__extends(OrganizationService, _super);
    function OrganizationService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.resource = Global.apiUrl + "/api/Organization";
        return _this;
    }
    OrganizationService.prototype.GetAll = function () {
        var url = this.resource + "/GetAll";
        return this.http.get(url);
    };
    OrganizationService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], OrganizationService);
    return OrganizationService;
}(BaseService));
export { OrganizationService };
//# sourceMappingURL=organization.service.js.map