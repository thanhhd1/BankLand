import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthenticationService } from '../common/services/authentication.service';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService) {
        this.authService = authService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        $('body').attr('class', 'horizontal-layout horizontal-menu 1-column  bg-full-screen-image blank-page');
        $('body').attr('data-col', '1-column');
    };
    LoginComponent = tslib_1.__decorate([
        Component({
            selector: '[app-login]',
            templateUrl: './login.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map