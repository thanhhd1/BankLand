import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
var LicenseTypeService = /** @class */ (function (_super) {
    tslib_1.__extends(LicenseTypeService, _super);
    function LicenseTypeService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.resource = Global.apiUrl + "/api/LicenseType";
        return _this;
    }
    LicenseTypeService.prototype.GetAll = function () {
        var url = this.resource + "/GetAll";
        return this.http.get(url);
    };
    LicenseTypeService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], LicenseTypeService);
    return LicenseTypeService;
}(BaseService));
export { LicenseTypeService };
//# sourceMappingURL=license-type.service.js.map