import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
var InternetService = /** @class */ (function (_super) {
    tslib_1.__extends(InternetService, _super);
    function InternetService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.resource = Global.apiUrl + "/api/Internet";
        return _this;
    }
    InternetService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], InternetService);
    return InternetService;
}(BaseService));
export { InternetService };
//# sourceMappingURL=internet.service.js.map