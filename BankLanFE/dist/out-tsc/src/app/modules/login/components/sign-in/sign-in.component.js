import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../common/services/authentication.service';
import UserModel from '../../../common/models/user.model';
import { BaseComponent } from '../../../base.component';
import { RoleConstants } from 'src/app/Global';
var SignInComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SignInComponent, _super);
    function SignInComponent(router, activeRoute, authenticateService) {
        var _this = _super.call(this, authenticateService) || this;
        _this.router = router;
        _this.activeRoute = activeRoute;
        _this.authenticateService = authenticateService;
        _this.isError = false;
        _this.Submitting = false;
        _this.errorMessage = 'Mật Khẩu hoặc Email không chính xác.';
        activeRoute.parent.params.subscribe(function (r) {
            _this.model = new UserModel();
            _this.returnUrl =
                _this.activeRoute.snapshot.queryParams['returnUrl'] || '/';
        });
        return _this;
    }
    SignInComponent.prototype.ngOnInit = function () { };
    SignInComponent.prototype.redirectUrl = function () {
        var curUser = this.authenticateService.GetCurrentUser();
        if (curUser) {
            if (curUser.Role !== RoleConstants.Administrator) {
                window.location.href = "/management";
            }
            else {
                window.location.href = "/management/users";
            }
        }
    };
    SignInComponent.prototype.login = function () {
        var _this = this;
        this.isError = false;
        this.Submitting = true;
        this.authenticateService
            .Login(this.model.Email, this.model.Password)
            .subscribe(function (result) {
            _this.Submitting = false;
            if (result) {
                _this.authenticateService.SetCurrentUser(JSON.stringify({
                    access_token: result.access_token,
                    expires_in: result.expires_in,
                    Email: result.Email,
                    Role: result.Role,
                    Name: result.Name,
                    Id: result.Id,
                    CompanyID: result.CompanyID,
                    ProfilePicturePath: result.ProfilePicturePath
                }));
                _this.redirectUrl();
            }
            else {
                _this.isError = false;
            }
        }, function (error) {
            _this.Submitting = false;
            _this.isError = true;
            _this.errorMessage = error.error
                ? error.error
                : 'Mật Khẩu hoặc Email không chính xác.';
        });
    };
    SignInComponent = tslib_1.__decorate([
        Component({
            selector: '[app-sign-in]',
            templateUrl: './sign-in.component.html',
            styleUrls: ['./sign-in.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            ActivatedRoute,
            AuthenticationService])
    ], SignInComponent);
    return SignInComponent;
}(BaseComponent));
export { SignInComponent };
//# sourceMappingURL=sign-in.component.js.map