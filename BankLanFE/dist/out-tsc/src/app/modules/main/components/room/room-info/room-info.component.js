import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { BaseComponent } from 'src/app/modules/base.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/modules/common/services/room.service';
import { RoomTypeService } from 'src/app/modules/common/services/room-type.service';
import { RoomModel } from 'src/app/modules/common/models/room.model';
var RoomInfoComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RoomInfoComponent, _super);
    function RoomInfoComponent(authService, dialog, router, service, roomTypeService, cdChanged) {
        var _this = _super.call(this, authService) || this;
        _this.dialog = dialog;
        _this.router = router;
        _this.service = service;
        _this.roomTypeService = roomTypeService;
        _this.cdChanged = cdChanged;
        _this.Submitting = false;
        _this.isEdit = false;
        _this.Uploading = false;
        _this.roomType = new Array();
        _this.onClose = new EventEmitter();
        return _this;
    }
    RoomInfoComponent.prototype.ngOnInit = function () {
        this.model = new RoomModel();
    };
    RoomInfoComponent.prototype.getRoomTypes = function () {
        var _this = this;
        this.roomType = null;
        this.roomTypeService.GetAll().subscribe(function (r) {
            if (r) {
                var list = [];
                r.forEach(function (c) {
                    list.push({
                        id: c.ID,
                        text: c.Name
                    });
                });
                _this.roomType = list;
            }
        });
    };
    RoomInfoComponent.prototype.getEntity = function (id) {
        var _this = this;
        this.service.Get(id).subscribe(function (r) {
            _this.model = r;
        });
    };
    RoomInfoComponent.prototype.show = function (isEdit, id) {
        this.form.resetForm();
        this.isEdit = isEdit;
        this.Submitting = false;
        this.model = new RoomModel();
        if (this.isEdit) {
            this.getEntity(id);
        }
        this.getRoomTypes();
        this.cdChanged.detectChanges();
        this.modal.show();
    };
    RoomInfoComponent.prototype.startUploadAvatar = function (event) {
        this.Uploading = true;
    };
    RoomInfoComponent.prototype.callBackUploadAvatar = function (event) {
        this.Uploading = false;
        this.model.Avatar = event;
    };
    RoomInfoComponent.prototype.errorCallback = function (event) {
        this.Uploading = false;
    };
    RoomInfoComponent.prototype.roomChanged = function (event) {
        if (event.data && event.data.length > 0) {
            if (event.data[0] && event.data[0].selected) {
                this.model.RoomTypeId = event.value;
            }
            else if (this.model.RoomTypeId) {
                $(event.data[0].element.parentElement).val(this.model.RoomTypeId).trigger('change');
            }
            else {
                $(event.data[0].element.parentElement).val(null).trigger('change');
            }
        }
    };
    RoomInfoComponent.prototype.save = function () {
        var _this = this;
        if (this.Submitting)
            return;
        this.Submitting = true;
        this.model.CompanyID = this.companyId;
        if (this.isEdit) {
            this.service.Edit(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Ph\u00F2ng", MessageConstant.EDIT_SCCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Ph\u00F2ng", strMessage);
            });
        }
        else {
            this.service.Create(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Ph\u00F2ng", MessageConstant.ADD_SUCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Ph\u00F2ng", strMessage);
            });
        }
    };
    RoomInfoComponent.prototype.cancel = function () {
        this.modal.hide();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], RoomInfoComponent.prototype, "companyId", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], RoomInfoComponent.prototype, "onClose", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], RoomInfoComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('f'),
        tslib_1.__metadata("design:type", NgForm)
    ], RoomInfoComponent.prototype, "form", void 0);
    RoomInfoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-room-info',
            templateUrl: './room-info.component.html',
            styleUrls: ['./room-info.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            Router,
            RoomService,
            RoomTypeService,
            ChangeDetectorRef])
    ], RoomInfoComponent);
    return RoomInfoComponent;
}(BaseComponent));
export { RoomInfoComponent };
//# sourceMappingURL=room-info.component.js.map