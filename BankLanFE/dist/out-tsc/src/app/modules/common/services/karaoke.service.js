import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
var KaraokeService = /** @class */ (function (_super) {
    tslib_1.__extends(KaraokeService, _super);
    function KaraokeService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.resource = Global.apiUrl + "/api/Karaoke";
        return _this;
    }
    KaraokeService.prototype.MoveHistory = function (id) {
        var url = this.resource + "/MoveHistory/" + id;
        return this.http.post(url, id);
    };
    KaraokeService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], KaraokeService);
    return KaraokeService;
}(BaseService));
export { KaraokeService };
//# sourceMappingURL=karaoke.service.js.map