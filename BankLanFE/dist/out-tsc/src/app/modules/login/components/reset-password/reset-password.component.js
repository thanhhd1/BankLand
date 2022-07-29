import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import UserModel from 'src/app/modules/common/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/modules/common/services/user.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
var ResetPasswordComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ResetPasswordComponent, _super);
    function ResetPasswordComponent(router, activeRoute, userService, dialog, authenticateService) {
        var _this = _super.call(this, authenticateService) || this;
        _this.router = router;
        _this.activeRoute = activeRoute;
        _this.userService = userService;
        _this.dialog = dialog;
        _this.authenticateService = authenticateService;
        _this.isError = false;
        _this.Submitting = false;
        _this.errorMessage = "Mật khẩu hoặc Email không chính xác.";
        activeRoute.params.subscribe(function (r) {
            _this.model = new UserModel();
            if (!r['{userId}']) {
                _this.router.navigate(['/', 'auth', 'sign-in']);
            }
            _this.model.Id = r['{userId}'];
        });
        return _this;
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
    };
    ResetPasswordComponent.prototype.send = function () {
        var _this = this;
        this.isError = false;
        this.Submitting = true;
        this.userService.ResetPassword(this.model)
            .subscribe(function (result) {
            _this.Submitting = false;
            if (result) {
                _this.dialog.showToastrSuccess('Đặt lại mật khẩu', 'Mật khẩu của bạn đã thay đổi thành công.');
                _this.router.navigate(['/', 'auth', 'sign-in']);
            }
            else {
                _this.isError = false;
                _this.errorMessage = "Không thể đặt lại mật khẩu của bạn cho tài khoản này.";
            }
        }, function (error) {
            _this.Submitting = false;
            _this.isError = true;
            _this.errorMessage = error.error ? error.error : "Không thể đặt lại mật khẩu của bạn cho tài khoản này.";
        });
    };
    ResetPasswordComponent = tslib_1.__decorate([
        Component({
            selector: 'app-reset-password',
            templateUrl: './reset-password.component.html',
            styleUrls: ['./reset-password.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            ActivatedRoute,
            UserService,
            CommonDialogService,
            AuthenticationService])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}(BaseComponent));
export { ResetPasswordComponent };
//# sourceMappingURL=reset-password.component.js.map