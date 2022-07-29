import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { BlockUI } from 'ng-block-ui';
var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(auth) {
        this.auth = auth;
    }
    TokenInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        var user = this.auth.getCurrentUser();
        if (user) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + user.access_token
                }
            });
        }
        //start block ui  
        this.blockUI.start('Processing your request...');
        return next.handle(request)
            .pipe(tap(function (event) {
            if (event instanceof HttpResponse) {
                _this.blockUI.stop();
            }
        }, function (error) {
            _this.blockUI.stop();
        }));
    };
    tslib_1.__decorate([
        BlockUI(),
        tslib_1.__metadata("design:type", Object)
    ], TokenInterceptor.prototype, "blockUI", void 0);
    TokenInterceptor = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [TokenService])
    ], TokenInterceptor);
    return TokenInterceptor;
}());
export { TokenInterceptor };
//# sourceMappingURL=token.interceptor.js.map