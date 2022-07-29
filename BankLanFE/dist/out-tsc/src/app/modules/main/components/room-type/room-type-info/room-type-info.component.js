import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { RoomTypeModel } from 'src/app/modules/common/models/room-type.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { RoomTypeService } from 'src/app/modules/common/services/room-type.service';
var RoomTypeInfoComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RoomTypeInfoComponent, _super);
    function RoomTypeInfoComponent(authService, dialog, router, service, cdChanged) {
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
    RoomTypeInfoComponent.prototype.ngOnInit = function () {
        this.model = new RoomTypeModel();
    };
    RoomTypeInfoComponent.prototype.getEntity = function (id) {
        var _this = this;
        this.service.Get(id).subscribe(function (r) {
            _this.model = r;
        });
    };
    RoomTypeInfoComponent.prototype.show = function (isEdit, id) {
        this.form.resetForm();
        this.isEdit = isEdit;
        this.Submitting = false;
        this.model = new RoomTypeModel();
        if (this.isEdit) {
            this.getEntity(id);
        }
        this.cdChanged.detectChanges();
        this.modal.show();
    };
    RoomTypeInfoComponent.prototype.save = function () {
        var _this = this;
        if (this.Submitting)
            return;
        this.Submitting = true;
        if (this.isEdit) {
            this.service.Edit(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Lo\u1EA1i Ph\u00F2ng", MessageConstant.EDIT_SCCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Lo\u1EA1i Ph\u00F2ng", strMessage);
            });
        }
        else {
            this.service.Create(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Lo\u1EA1i Ph\u00F2ng", MessageConstant.ADD_SUCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Lo\u1EA1i Ph\u00F2ng", strMessage);
            });
        }
    };
    RoomTypeInfoComponent.prototype.cancel = function () {
        this.modal.hide();
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], RoomTypeInfoComponent.prototype, "onClose", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], RoomTypeInfoComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('f'),
        tslib_1.__metadata("design:type", NgForm)
    ], RoomTypeInfoComponent.prototype, "form", void 0);
    RoomTypeInfoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-room-type-info',
            templateUrl: './room-type-info.component.html',
            styleUrls: ['./room-type-info.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            Router,
            RoomTypeService,
            ChangeDetectorRef])
    ], RoomTypeInfoComponent);
    return RoomTypeInfoComponent;
}(BaseComponent));
export { RoomTypeInfoComponent };
//# sourceMappingURL=room-type-info.component.js.map