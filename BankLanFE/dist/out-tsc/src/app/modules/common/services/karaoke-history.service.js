import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
var KaraokeHistoryService = /** @class */ (function (_super) {
    tslib_1.__extends(KaraokeHistoryService, _super);
    function KaraokeHistoryService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.resource = Global.apiUrl + "/api/KaraokeHistory";
        return _this;
    }
    KaraokeHistoryService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], KaraokeHistoryService);
    return KaraokeHistoryService;
}(BaseService));
export { KaraokeHistoryService };
//# sourceMappingURL=karaoke-history.service.js.map