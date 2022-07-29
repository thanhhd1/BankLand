import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';
var RepresentativeService = /** @class */ (function (_super) {
    tslib_1.__extends(RepresentativeService, _super);
    function RepresentativeService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.resource = Global.apiUrl + "/api/Representative";
        return _this;
    }
    RepresentativeService.prototype.GetAll = function () {
        var url = this.resource + "/GetAll";
        return this.http.get(url);
    };
    RepresentativeService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], RepresentativeService);
    return RepresentativeService;
}(BaseService));
export { RepresentativeService };
//# sourceMappingURL=representative.service.js.map