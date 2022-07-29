import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { ServicesManagementModel } from 'src/app/modules/common/models/services-management.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { ServicesManagementService } from 'src/app/modules/common/services/services-management.service';
var ServicesManagementInfoComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ServicesManagementInfoComponent, _super);
    function ServicesManagementInfoComponent(authService, dialog, router, service, cdChanged) {
        var _this = _super.call(this, authService) || this;
        _this.dialog = dialog;
        _this.router = router;
        _this.service = service;
        _this.cdChanged = cdChanged;
        _this.Submitting = false;
        _this.isEdit = false;
        _this.onClose = new EventEmitter();
        return _this;
    }
    ServicesManagementInfoComponent.prototype.ngOnInit = function () {
        this.model = new ServicesManagementModel();
    };
    ServicesManagementInfoComponent.prototype.getEntity = function (id) {
        var _this = this;
        this.service.Get(id).subscribe(function (r) {
            _this.model = r;
        });
    };
    ServicesManagementInfoComponent.prototype.show = function (isEdit, id) {
        this.form.resetForm();
        this.isEdit = isEdit;
        this.Submitting = false;
        this.model = new ServicesManagementModel();
        if (this.isEdit) {
            this.getEntity(id);
        }
        this.cdChanged.detectChanges();
        this.modal.show();
    };
    ServicesManagementInfoComponent.prototype.save = function () {
        var _this = this;
        if (this.Submitting)
            return;
        this.Submitting = true;
        if (this.isEdit) {
            this.service.Edit(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " D\u1ECBch v\u1EE5", MessageConstant.EDIT_SCCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error
                    ? error.error
                    : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " D\u1ECBch v\u1EE5", strMessage);
            });
        }
        else {
            this.service.Create(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " D\u1ECBch v\u1EE5", MessageConstant.ADD_SUCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error
                    ? error.error
                    : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " D\u1ECBch v\u1EE5", strMessage);
            });
        }
    };
    ServicesManagementInfoComponent.prototype.cancel = function () {
        this.modal.hide();
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ServicesManagementInfoComponent.prototype, "onClose", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], ServicesManagementInfoComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('f'),
        tslib_1.__metadata("design:type", NgForm)
    ], ServicesManagementInfoComponent.prototype, "form", void 0);
    ServicesManagementInfoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-services-management-info',
            templateUrl: './services-management-info.component.html',
            styleUrls: ['./services-management-info.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            Router,
            ServicesManagementService,
            ChangeDetectorRef])
    ], ServicesManagementInfoComponent);
    return ServicesManagementInfoComponent;
}(BaseComponent));
export { ServicesManagementInfoComponent };
//# sourceMappingURL=services-management-info.component.js.map