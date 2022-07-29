import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';
var ImageStorageService = /** @class */ (function (_super) {
    tslib_1.__extends(ImageStorageService, _super);
    function ImageStorageService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.resource = Global.apiUrl + "/api/ImageStorage";
        return _this;
    }
    ImageStorageService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ImageStorageService);
    return ImageStorageService;
}(BaseService));
export { ImageStorageService };
//# sourceMappingURL=image-storage.service.js.map