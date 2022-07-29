import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
var OrderRoomDetailService = /** @class */ (function (_super) {
    tslib_1.__extends(OrderRoomDetailService, _super);
    function OrderRoomDetailService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.resource = Global.apiUrl + "/api/OrderRoomDetail";
        return _this;
    }
    OrderRoomDetailService.prototype.GetAll = function () {
        var url = this.resource + "/GetAll";
        return this.http.get(url);
    };
    OrderRoomDetailService.prototype.GetByRoomId = function (id) {
        var url = this.resource + "/GetByRoomId/" + id;
        return this.httpClient.get(url);
    };
    OrderRoomDetailService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], OrderRoomDetailService);
    return OrderRoomDetailService;
}(BaseService));
export { OrderRoomDetailService };
//# sourceMappingURL=order-room-detail.service.js.map