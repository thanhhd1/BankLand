import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { HistoricalSiteModel } from 'src/app/modules/common/models/history-site.model';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { HistoricalSiteService } from 'src/app/modules/common/services/historical-site.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
var HistoricalSiteInfoComponent = /** @class */ (function (_super) {
    tslib_1.__extends(HistoricalSiteInfoComponent, _super);
    function HistoricalSiteInfoComponent(authService, dialog, router, service, cdChanged) {
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
    HistoricalSiteInfoComponent.prototype.ngOnInit = function () {
        this.model = new HistoricalSiteModel();
    };
    HistoricalSiteInfoComponent.prototype.getEntity = function (id) {
        var _this = this;
        this.service.Get(id).subscribe(function (r) {
            _this.model = r;
        });
    };
    HistoricalSiteInfoComponent.prototype.show = function (isEdit, id) {
        this.isEdit = isEdit;
        this.Submitting = false;
        this.model = new HistoricalSiteModel();
        this.form.resetForm();
        if (this.isEdit) {
            this.getEntity(id);
        }
        this.cdChanged.detectChanges();
        this.modal.show();
    };
    HistoricalSiteInfoComponent.prototype.save = function () {
        var _this = this;
        if (this.Submitting)
            return;
        this.Submitting = true;
        if (this.isEdit) {
            this.service.Edit(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Di T\u00EDch L\u1ECBch S\u1EED", MessageConstant.EDIT_SCCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Di T\u00EDch L\u1ECBch S\u1EED", strMessage);
            });
        }
        else {
            this.service.Create(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Di T\u00EDch L\u1ECBch S\u1EED", MessageConstant.ADD_SUCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Di T\u00EDch L\u1ECBch S\u1EED", strMessage);
            });
        }
    };
    HistoricalSiteInfoComponent.prototype.cancel = function () {
        this.modal.hide();
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], HistoricalSiteInfoComponent.prototype, "onClose", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], HistoricalSiteInfoComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('f'),
        tslib_1.__metadata("design:type", NgForm)
    ], HistoricalSiteInfoComponent.prototype, "form", void 0);
    HistoricalSiteInfoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-historical-site-info',
            templateUrl: './historical-site-info.component.html',
            styleUrls: ['./historical-site-info.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            Router,
            HistoricalSiteService,
            ChangeDetectorRef])
    ], HistoricalSiteInfoComponent);
    return HistoricalSiteInfoComponent;
}(BaseComponent));
export { HistoricalSiteInfoComponent };
//# sourceMappingURL=historical-site-info.component.js.map