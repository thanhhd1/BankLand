import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
var MenuService = /** @class */ (function (_super) {
    tslib_1.__extends(MenuService, _super);
    function MenuService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.resource = Global.apiUrl + "/api/Menu";
        return _this;
    }
    MenuService.prototype.GetAll = function () {
        var url = this.resource + "/GetAll";
        return this.http.get(url);
    };
    MenuService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], MenuService);
    return MenuService;
}(BaseService));
export { MenuService };
//# sourceMappingURL=menu.service.js.map