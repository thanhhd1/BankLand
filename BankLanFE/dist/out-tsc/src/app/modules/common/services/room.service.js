import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';
var RoomService = /** @class */ (function (_super) {
    tslib_1.__extends(RoomService, _super);
    function RoomService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.resource = Global.apiUrl + "/api/Room";
        return _this;
    }
    RoomService.prototype.GetAll = function () {
        var url = this.resource + "/GetAll";
        return this.http.get(url);
    };
    RoomService.prototype.GetByCompany = function () {
        var url = this.resource + "/GetByCompany";
        return this.http.get(url);
    };
    RoomService.prototype.GetEmptyByCompany = function () {
        var url = this.resource + "/GetEmptyByCompany";
        return this.http.get(url);
    };
    RoomService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], RoomService);
    return RoomService;
}(BaseService));
export { RoomService };
//# sourceMappingURL=room.service.js.map