import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { UserService } from 'src/app/modules/common/services/user.service';
import UserModel from 'src/app/modules/common/models/user.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
var ResetPasswordComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ResetPasswordComponent, _super);
    function ResetPasswordComponent(authService, dialog, router, service, activeRouter, cdChanged) {
        var _this = _super.call(this, authService) || this;
        _this.dialog = dialog;
        _this.router = router;
        _this.service = service;
        _this.activeRouter = activeRouter;
        _this.cdChanged = cdChanged;
        _this.type = 0;
        _this.Submitting = false;
        _this.onClose = new EventEmitter();
        activeRouter.params.subscribe(function (r) {
            _this.id = r['{id}'];
            _this.getEntity();
        });
        return _this;
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        this.model = new UserModel();
    };
    ResetPasswordComponent.prototype.getEntity = function () {
        var _this = this;
        if (this.id) {
            this.service.Get(this.id).subscribe(function (r) {
                _this.model = r;
            }, function (error) {
                _this.dialog.showSwalSuccesAlert("\u0110\u1EB7t L\u1EA1i M\u1EADt Kh\u1EA9u", MessageConstant.FAILURE_REQUEST);
            });
        }
    };
    ResetPasswordComponent.prototype.show = function (id) {
        this.Submitting = false;
        this.id = id;
        this.form.resetForm();
        this.getEntity();
        this.modal.show();
    };
    ResetPasswordComponent.prototype.save = function () {
        var _this = this;
        this.Submitting = true;
        this.service.ResetPassword(this.model).subscribe(function (result) {
            if (result) {
                _this.Submitting = false;
                _this.dialog.showSwalSuccesAlert("\u0110\u1EB7t L\u1EA1i M\u1EADt Kh\u1EA9u", MessageConstant.REQUEST_SUCCESS_CONST);
                _this.onClose.emit(true);
                _this.cancel();
            }
        }, function (error) {
            _this.Submitting = false;
            var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
            _this.dialog.showSwalErrorAlert("\u0110\u1EB7t L\u1EA1i M\u1EADt Kh\u1EA9u", strMessage);
        });
    };
    ResetPasswordComponent.prototype.cancel = function () {
        this.modal.hide();
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ResetPasswordComponent.prototype, "onClose", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], ResetPasswordComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('f'),
        tslib_1.__metadata("design:type", NgForm)
    ], ResetPasswordComponent.prototype, "form", void 0);
    ResetPasswordComponent = tslib_1.__decorate([
        Component({
            selector: 'app-reset-password',
            templateUrl: './reset-password.component.html',
            styleUrls: ['./reset-password.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            Router,
            UserService,
            ActivatedRoute,
            ChangeDetectorRef])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}(BaseComponent));
export { ResetPasswordComponent };
//# sourceMappingURL=reset-password.component.js.map