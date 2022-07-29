import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';
var HistoricalSiteService = /** @class */ (function (_super) {
    tslib_1.__extends(HistoricalSiteService, _super);
    function HistoricalSiteService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.resource = Global.apiUrl + "/api/HistoricalSite";
        return _this;
    }
    HistoricalSiteService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], HistoricalSiteService);
    return HistoricalSiteService;
}(BaseService));
export { HistoricalSiteService };
//# sourceMappingURL=historical-site.service.js.map