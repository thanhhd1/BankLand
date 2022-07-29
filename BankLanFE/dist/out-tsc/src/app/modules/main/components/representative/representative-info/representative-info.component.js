import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { RepresentativeModel } from 'src/app/modules/common/models/representative.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { RepresentativeService } from 'src/app/modules/common/services/representative.service';
var RepresentativeInfoComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RepresentativeInfoComponent, _super);
    function RepresentativeInfoComponent(authService, dialog, router, service, cdChanged) {
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
    RepresentativeInfoComponent.prototype.ngOnInit = function () {
        this.model = new RepresentativeModel();
    };
    RepresentativeInfoComponent.prototype.getEntity = function (id) {
        var _this = this;
        this.service.Get(id).subscribe(function (r) {
            _this.model = r;
        });
    };
    RepresentativeInfoComponent.prototype.show = function (isEdit, id) {
        this.form.resetForm();
        this.isEdit = isEdit;
        this.Submitting = false;
        this.model = new RepresentativeModel();
        if (this.isEdit) {
            this.getEntity(id);
        }
        this.cdChanged.detectChanges();
        this.modal.show();
    };
    RepresentativeInfoComponent.prototype.save = function () {
        var _this = this;
        if (this.Submitting)
            return;
        this.Submitting = true;
        if (this.isEdit) {
            this.service.Edit(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Ng\u01B0\u1EDDi \u0110\u1EA1i Di\u1EC7n", MessageConstant.EDIT_SCCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Ng\u01B0\u1EDDi \u0110\u1EA1i Di\u1EC7n", strMessage);
            });
        }
        else {
            this.service.Create(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Ng\u01B0\u1EDDi \u0110\u1EA1i Di\u1EC7n", MessageConstant.ADD_SUCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Ng\u01B0\u1EDDi \u0110\u1EA1i Di\u1EC7n", strMessage);
            });
        }
    };
    RepresentativeInfoComponent.prototype.cancel = function () {
        this.modal.hide();
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], RepresentativeInfoComponent.prototype, "onClose", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], RepresentativeInfoComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('f'),
        tslib_1.__metadata("design:type", NgForm)
    ], RepresentativeInfoComponent.prototype, "form", void 0);
    RepresentativeInfoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-representative-info',
            templateUrl: './representative-info.component.html',
            styleUrls: ['./representative-info.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            Router,
            RepresentativeService,
            ChangeDetectorRef])
    ], RepresentativeInfoComponent);
    return RepresentativeInfoComponent;
}(BaseComponent));
export { RepresentativeInfoComponent };
//# sourceMappingURL=representative-info.component.js.map