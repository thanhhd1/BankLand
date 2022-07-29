import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';
var RoomTypeService = /** @class */ (function (_super) {
    tslib_1.__extends(RoomTypeService, _super);
    function RoomTypeService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.resource = Global.apiUrl + "/api/RoomType";
        return _this;
    }
    RoomTypeService.prototype.GetAll = function () {
        var url = this.resource + "/GetAll";
        return this.http.get(url);
    };
    RoomTypeService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], RoomTypeService);
    return RoomTypeService;
}(BaseService));
export { RoomTypeService };
//# sourceMappingURL=room-type.service.js.map