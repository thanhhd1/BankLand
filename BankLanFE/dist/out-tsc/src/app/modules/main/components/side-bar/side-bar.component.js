import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
var SideBarComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SideBarComponent, _super);
    function SideBarComponent(authService, router) {
        var _this = _super.call(this, authService) || this;
        _this.authService = authService;
        _this.router = router;
        _this.onChangePassword = new EventEmitter();
        return _this;
    }
    SideBarComponent.prototype.ngOnInit = function () {
    };
    SideBarComponent.prototype.signOut = function () {
        this.authService.SignOut();
        this.router.navigate(["/management/auth/sign-in"]);
    };
    SideBarComponent.prototype.changepassword = function () {
        this.onChangePassword.emit(true);
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], SideBarComponent.prototype, "onChangePassword", void 0);
    SideBarComponent = tslib_1.__decorate([
        Component({
            selector: '[app-side-bar]',
            templateUrl: './side-bar.component.html',
            styleUrls: ['./side-bar.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            Router])
    ], SideBarComponent);
    return SideBarComponent;
}(BaseComponent));
export { SideBarComponent };
//# sourceMappingURL=side-bar.component.js.map