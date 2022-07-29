import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
var CompanyService = /** @class */ (function (_super) {
    tslib_1.__extends(CompanyService, _super);
    function CompanyService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.resource = Global.apiUrl + "/api/Company";
        return _this;
    }
    CompanyService.prototype.GetAll = function () {
        var url = this.resource + "/GetAll";
        return this.httpClient.get(url);
    };
    CompanyService.prototype.GetByCurrentUser = function () {
        var url = this.resource + "/GetByCurrentUser";
        return this.httpClient.get(url);
    };
    CompanyService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], CompanyService);
    return CompanyService;
}(BaseService));
export { CompanyService };
//# sourceMappingURL=company.service.js.map