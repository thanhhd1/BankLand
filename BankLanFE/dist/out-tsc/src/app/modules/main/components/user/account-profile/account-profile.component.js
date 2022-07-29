import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { BaseComponent } from 'src/app/modules/base.component';
import UserModel from 'src/app/modules/common/models/user.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/modules/common/services/user.service';
import { CropImageComponent } from 'src/app/modules/common/component/crop-image/crop-image.component';
var AccountProfileComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AccountProfileComponent, _super);
    function AccountProfileComponent(authService, dialog, router, service, activeRouter) {
        var _this = _super.call(this, authService) || this;
        _this.dialog = dialog;
        _this.router = router;
        _this.service = service;
        _this.activeRouter = activeRouter;
        _this.Submitting = false;
        _this.type = 0;
        _this.closeModal = new EventEmitter();
        activeRouter.params.subscribe(function (r) {
            _this.id = r['{id}'];
            _this.getEntity();
        });
        return _this;
    }
    AccountProfileComponent.prototype.ngOnInit = function () {
        this.model = new UserModel();
    };
    AccountProfileComponent.prototype.cropImage = function () {
        this.cropImageApp.ModelID = this.id;
        this.cropImageApp.show();
    };
    AccountProfileComponent.prototype.changeAvatar = function (event) {
        if (event) {
            this.model.ProfilePicturePath = event;
        }
    };
    AccountProfileComponent.prototype.getEntity = function () {
        var _this = this;
        this.service.Get(this.id).subscribe(function (r) {
            _this.model = r;
        }, function (error) {
            _this.dialog.showSwalErrorAlert("C\u1EADp Nh\u1EADt Th\u00F4ng Tin C\u00E1i Nh\u00E2n", MessageConstant.FAILURE_REQUEST);
        });
    };
    AccountProfileComponent.prototype.updateCurrentUser = function () {
        var _this = this;
        this.service.GetCurrent().subscribe(function (r) {
            if (r) {
                _this.authenticationService.UpdateCurrentInfo(r);
            }
        });
    };
    AccountProfileComponent.prototype.save = function () {
        var _this = this;
        if (this.Submitting)
            return;
        this.Submitting = true;
        this.service.Edit(this.model).subscribe(function (result) {
            if (result) {
                _this.updateCurrentUser();
                _this.Submitting = false;
                _this.dialog.showSwalSuccesAlert("C\u1EADp Nh\u1EADt Th\u00F4ng Tin C\u00E1i Nh\u00E2n", MessageConstant.EDIT_SCCCESS_CONST);
                _this.closeModal.emit(true);
                if (_this.currentUser.Role === 'Administrator') {
                    _this.router.navigate(["/management/users"]);
                }
                else {
                    _this.router.navigate(["/management/dashboard"]);
                }
            }
        }, function (error) {
            _this.Submitting = false;
            var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
            _this.dialog.showSwalErrorAlert("C\u1EADp Nh\u1EADt Th\u00F4ng Tin C\u00E1i Nh\u00E2n", strMessage);
        });
    };
    AccountProfileComponent.prototype.cancel = function () {
        if (this.currentUser.Role === 'Administrator') {
            this.router.navigate(["/management/users"]);
        }
        else {
            this.router.navigate(["/management/dashboard"]);
        }
    };
    tslib_1.__decorate([
        ViewChild('cropImageApp'),
        tslib_1.__metadata("design:type", CropImageComponent)
    ], AccountProfileComponent.prototype, "cropImageApp", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AccountProfileComponent.prototype, "closeModal", void 0);
    AccountProfileComponent = tslib_1.__decorate([
        Component({
            selector: 'app-account-profile',
            templateUrl: './account-profile.component.html',
            styleUrls: ['./account-profile.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            Router,
            UserService,
            ActivatedRoute])
    ], AccountProfileComponent);
    return AccountProfileComponent;
}(BaseComponent));
export { AccountProfileComponent };
//# sourceMappingURL=account-profile.component.js.map