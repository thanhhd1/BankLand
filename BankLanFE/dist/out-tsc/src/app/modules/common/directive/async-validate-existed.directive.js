import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS } from '@angular/forms';
import { BaseComponent } from '../../base.component';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import Global from 'src/app/Global';
var AsyncValidateExistedDirective = /** @class */ (function (_super) {
    tslib_1.__extends(AsyncValidateExistedDirective, _super);
    function AsyncValidateExistedDirective(http, authService) {
        var _this = _super.call(this, authService) || this;
        _this.http = http;
        _this.authService = authService;
        return _this;
    }
    AsyncValidateExistedDirective_1 = AsyncValidateExistedDirective;
    AsyncValidateExistedDirective.prototype.validate = function (control) {
        var _this = this;
        var value = control.value;
        if (!value) {
            return null;
        }
        var url = "" + Global.apiUrl + this.urlServer + "/" + value + "/" + (this.id ? this.id : null);
        return new Promise(function (resolve, reject) {
            _this.http.post(url, {}).subscribe(function (r) {
                if (r) {
                    resolve({ 'using': true });
                }
                else {
                    return resolve(null);
                }
            });
        });
    };
    var AsyncValidateExistedDirective_1;
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AsyncValidateExistedDirective.prototype, "urlServer", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AsyncValidateExistedDirective.prototype, "id", void 0);
    AsyncValidateExistedDirective = AsyncValidateExistedDirective_1 = tslib_1.__decorate([
        Directive({
            selector: '[appAsyncValidateExisted]',
            providers: [{
                    provide: NG_ASYNC_VALIDATORS, useExisting: AsyncValidateExistedDirective_1,
                    multi: true
                }]
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            AuthenticationService])
    ], AsyncValidateExistedDirective);
    return AsyncValidateExistedDirective;
}(BaseComponent));
export { AsyncValidateExistedDirective };
//# sourceMappingURL=async-validate-existed.directive.js.map