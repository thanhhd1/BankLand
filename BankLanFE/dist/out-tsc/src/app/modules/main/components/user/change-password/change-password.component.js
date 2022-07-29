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
var ChangePasswordComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ChangePasswordComponent, _super);
    function ChangePasswordComponent(authService, dialog, router, service, activeRouter, cdChanged) {
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
    ChangePasswordComponent.prototype.ngOnInit = function () {
        this.model = new UserModel();
    };
    ChangePasswordComponent.prototype.getEntity = function () {
        var _this = this;
        if (this.id) {
            this.service.Get(this.id).subscribe(function (r) {
                _this.model = r;
            }, function (error) {
                _this.dialog.showSwalSuccesAlert("Thay \u0110\u1ED5i M\u1EADt Kh\u1EA9u", MessageConstant.FAILURE_REQUEST);
            });
        }
    };
    ChangePasswordComponent.prototype.show = function (id) {
        this.Submitting = false;
        this.id = id;
        this.form.resetForm();
        this.getEntity();
        this.modal.show();
    };
    ChangePasswordComponent.prototype.save = function () {
        var _this = this;
        this.Submitting = true;
        this.service.ChangePassword(this.model).subscribe(function (result) {
            if (result) {
                _this.Submitting = false;
                _this.dialog.showSwalSuccesAlert("Thay \u0110\u1ED5i M\u1EADt Kh\u1EA9u", MessageConstant.EDIT_SCCCESS_CONST);
                _this.onClose.emit(true);
                _this.cancel();
            }
        }, function (error) {
            _this.Submitting = false;
            var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
            _this.dialog.showSwalErrorAlert("Thay \u0110\u1ED5i M\u1EADt Kh\u1EA9u", strMessage);
        });
    };
    ChangePasswordComponent.prototype.cancel = function () {
        this.modal.hide();
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ChangePasswordComponent.prototype, "onClose", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], ChangePasswordComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('f'),
        tslib_1.__metadata("design:type", NgForm)
    ], ChangePasswordComponent.prototype, "form", void 0);
    ChangePasswordComponent = tslib_1.__decorate([
        Component({
            selector: 'app-change-password',
            templateUrl: './change-password.component.html',
            styleUrls: ['./change-password.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            Router,
            UserService,
            ActivatedRoute,
            ChangeDetectorRef])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}(BaseComponent));
export { ChangePasswordComponent };
//# sourceMappingURL=change-password.component.js.map