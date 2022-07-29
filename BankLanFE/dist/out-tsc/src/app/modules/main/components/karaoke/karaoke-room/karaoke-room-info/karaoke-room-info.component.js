import * as tslib_1 from "tslib";
import { Component, Output, ViewChild, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { KaraokeRoomModel } from 'src/app/modules/common/models/karaoke-room.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { KaraokeRoomService } from 'src/app/modules/common/services/karaoke-room.service';
var KaraokeRoomInfoComponent = /** @class */ (function (_super) {
    tslib_1.__extends(KaraokeRoomInfoComponent, _super);
    function KaraokeRoomInfoComponent(authService, dialog, service, cdChanged) {
        var _this = _super.call(this, authService) || this;
        _this.dialog = dialog;
        _this.service = service;
        _this.cdChanged = cdChanged;
        _this.Submitting = false;
        _this.isEdit = false;
        _this.onClose = new EventEmitter();
        return _this;
    }
    KaraokeRoomInfoComponent.prototype.ngOnInit = function () {
        this.model = new KaraokeRoomModel();
    };
    KaraokeRoomInfoComponent.prototype.getEntity = function (id) {
        var _this = this;
        this.service.Get(id).subscribe(function (r) {
            _this.model = r;
        });
    };
    KaraokeRoomInfoComponent.prototype.show = function (isEdit, id, karaokeID) {
        if (!karaokeID)
            return;
        this.isEdit = isEdit;
        this.Submitting = false;
        this.form.resetForm();
        this.model = new KaraokeRoomModel();
        this.model.KaraokeID = karaokeID;
        if (this.isEdit) {
            this.getEntity(id);
        }
        this.cdChanged.detectChanges();
        this.modal.show();
    };
    KaraokeRoomInfoComponent.prototype.save = function () {
        var _this = this;
        if (this.Submitting)
            return;
        this.Submitting = true;
        if (this.isEdit) {
            this.service.Edit(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Ph\u00F2ng Karaoke", MessageConstant.EDIT_SCCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Ph\u00F2ng Karaoke", strMessage);
            });
        }
        else {
            this.service.Create(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Ph\u00F2ng Karaoke", MessageConstant.ADD_SUCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Ph\u00F2ng Karaoke", strMessage);
            });
        }
    };
    KaraokeRoomInfoComponent.prototype.cancel = function () {
        this.modal.hide();
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], KaraokeRoomInfoComponent.prototype, "onClose", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], KaraokeRoomInfoComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('f'),
        tslib_1.__metadata("design:type", NgForm)
    ], KaraokeRoomInfoComponent.prototype, "form", void 0);
    KaraokeRoomInfoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-karaoke-room-info',
            templateUrl: './karaoke-room-info.component.html',
            styleUrls: ['./karaoke-room-info.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            KaraokeRoomService,
            ChangeDetectorRef])
    ], KaraokeRoomInfoComponent);
    return KaraokeRoomInfoComponent;
}(BaseComponent));
export { KaraokeRoomInfoComponent };
//# sourceMappingURL=karaoke-room-info.component.js.map