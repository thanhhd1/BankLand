import * as tslib_1 from "tslib";
import { Component, Output, ViewChild, EventEmitter, ChangeDetectorRef, Input } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { ImageStorageModel } from 'src/app/modules/common/models/image-storage.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ImageStorageService } from 'src/app/modules/common/services/image-storage.service';
var ImageStorageInfoComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ImageStorageInfoComponent, _super);
    function ImageStorageInfoComponent(authService, dialog, service, cdChanged) {
        var _this = _super.call(this, authService) || this;
        _this.dialog = dialog;
        _this.service = service;
        _this.cdChanged = cdChanged;
        _this.Uploading = false;
        _this.Submitting = false;
        _this.isEdit = false;
        _this.isNotShowAction = false;
        _this.onClose = new EventEmitter();
        _this.type = 0; //0 image 1:file pdf
        return _this;
    }
    ImageStorageInfoComponent.prototype.ngOnInit = function () {
        this.model = new ImageStorageModel();
        this.defaultImage = 'https://via.placeholder.com/400x600.png';
    };
    ImageStorageInfoComponent.prototype.startUploadImage = function (event) {
        this.Uploading = true;
    };
    ImageStorageInfoComponent.prototype.callBackUploadImage = function (event) {
        this.Uploading = false;
        this.model.Path = event;
    };
    ImageStorageInfoComponent.prototype.errorCallback = function (event) {
        this.Uploading = false;
        this.modal.hide();
    };
    ImageStorageInfoComponent.prototype.show = function (isEdit, id, ReferenceId, Type, fileType) {
        if (!ReferenceId)
            return;
        this.isEdit = isEdit;
        this.type = fileType;
        this.Submitting = false;
        this.form.resetForm();
        this.model = new ImageStorageModel();
        this.model.ReferenceId = ReferenceId;
        this.model.Type = Type;
        this.cdChanged.detectChanges();
        this.modal.show();
    };
    ImageStorageInfoComponent.prototype.save = function () {
        var _this = this;
        if (this.Uploading) {
            this.dialog.showToastrWarning('File của  bạn đang được tải lên , vui lòng chờ');
            return;
        }
        if (this.Submitting)
            return;
        this.Submitting = true;
        if (this.isEdit) {
            this.service.Edit(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " File", MessageConstant.ADD_SUCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error
                    ? error.error
                    : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " File", MessageConstant.FAILURE_REQUEST);
            });
        }
        else {
            this.service.Create(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " File", MessageConstant.ADD_SUCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error
                    ? error.error
                    : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " File", MessageConstant.FAILURE_REQUEST);
            });
        }
    };
    ImageStorageInfoComponent.prototype.cancel = function () {
        this.modal.hide();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], ImageStorageInfoComponent.prototype, "isNotShowAction", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ImageStorageInfoComponent.prototype, "onClose", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], ImageStorageInfoComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('f'),
        tslib_1.__metadata("design:type", NgForm)
    ], ImageStorageInfoComponent.prototype, "form", void 0);
    ImageStorageInfoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-image-storage-info',
            templateUrl: './image-storage-info.component.html',
            styleUrls: ['./image-storage-info.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            ImageStorageService,
            ChangeDetectorRef])
    ], ImageStorageInfoComponent);
    return ImageStorageInfoComponent;
}(BaseComponent));
export { ImageStorageInfoComponent };
//# sourceMappingURL=image-storage-info.component.js.map