import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { LicenseTypeModel } from 'src/app/modules/common/models/license-type.model';
import { ModalDirective } from 'ngx-bootstrap';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LicenseTypeService } from 'src/app/modules/common/services/license-type.service';
import { BaseComponent } from 'src/app/modules/base.component';
var LicenseTypeInfoComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LicenseTypeInfoComponent, _super);
    function LicenseTypeInfoComponent(authService, dialog, router, service, cdChanged) {
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
    LicenseTypeInfoComponent.prototype.ngOnInit = function () {
        this.model = new LicenseTypeModel();
    };
    LicenseTypeInfoComponent.prototype.getEntity = function (id) {
        var _this = this;
        this.service.Get(id).subscribe(function (r) {
            _this.model = r;
        });
    };
    LicenseTypeInfoComponent.prototype.show = function (isEdit, id) {
        this.isEdit = isEdit;
        this.Submitting = false;
        this.model = new LicenseTypeModel();
        this.form.resetForm();
        if (this.isEdit) {
            this.getEntity(id);
        }
        this.cdChanged.detectChanges();
        this.modal.show();
    };
    LicenseTypeInfoComponent.prototype.save = function () {
        var _this = this;
        if (this.Submitting)
            return;
        this.Submitting = true;
        if (this.isEdit) {
            this.service.Edit(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " GP", MessageConstant.EDIT_SCCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " GP", strMessage);
            });
        }
        else {
            this.service.Create(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " GP", MessageConstant.ADD_SUCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " GP", strMessage);
            });
        }
    };
    LicenseTypeInfoComponent.prototype.cancel = function () {
        this.modal.hide();
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], LicenseTypeInfoComponent.prototype, "onClose", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], LicenseTypeInfoComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('f'),
        tslib_1.__metadata("design:type", NgForm)
    ], LicenseTypeInfoComponent.prototype, "form", void 0);
    LicenseTypeInfoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-license-type-info',
            templateUrl: './license-type-info.component.html',
            styleUrls: ['./license-type-info.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            Router,
            LicenseTypeService,
            ChangeDetectorRef])
    ], LicenseTypeInfoComponent);
    return LicenseTypeInfoComponent;
}(BaseComponent));
export { LicenseTypeInfoComponent };
//# sourceMappingURL=license-type-info.component.js.map