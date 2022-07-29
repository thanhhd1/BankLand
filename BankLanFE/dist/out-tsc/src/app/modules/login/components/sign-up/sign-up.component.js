import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import UserModel from 'src/app/modules/common/models/user.model';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { UserService } from 'src/app/modules/common/services/user.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
var SignUpComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SignUpComponent, _super);
    function SignUpComponent(router, userService, dialog, authenticateService) {
        var _this = _super.call(this, authenticateService) || this;
        _this.router = router;
        _this.userService = userService;
        _this.dialog = dialog;
        _this.authenticateService = authenticateService;
        _this.isError = false;
        _this.Submitting = false;
        return _this;
    }
    SignUpComponent.prototype.ngOnInit = function () {
        this.model = new UserModel();
    };
    SignUpComponent.prototype.save = function () {
        var _this = this;
        this.isError = false;
        this.Submitting = true;
        this.userService.Register(this.model).subscribe(function (r) {
            _this.Submitting = false;
            if (r) {
                _this.isError = false;
                _this.router.navigate(['/', 'auth', 'sign-in']);
                _this.dialog.showSwalSuccesAlert('Sign-up', 'Your account created successfully, Please check your inbox to acitve your account now.');
            }
            else {
                _this.isError = true;
            }
        }, function (error) {
            _this.Submitting = false;
            _this.isError = true;
            var msg = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
            _this.dialog.showToastrError('Sign-up', msg);
        });
    };
    SignUpComponent = tslib_1.__decorate([
        Component({
            selector: 'app-sign-up',
            templateUrl: './sign-up.component.html',
            styleUrls: ['./sign-up.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            UserService,
            CommonDialogService,
            AuthenticationService])
    ], SignUpComponent);
    return SignUpComponent;
}(BaseComponent));
export { SignUpComponent };
//# sourceMappingURL=sign-up.component.js.map