import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { InternetModel } from 'src/app/modules/common/models/intenet.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { InternetService } from 'src/app/modules/common/services/internet.service';
import { OrganizationService } from 'src/app/modules/common/services/organization.service';
import { RepresentativeService } from 'src/app/modules/common/services/representative.service';
import { LicenseTypeService } from 'src/app/modules/common/services/license-type.service';
var InternetInfoComponent = /** @class */ (function (_super) {
    tslib_1.__extends(InternetInfoComponent, _super);
    function InternetInfoComponent(authService, dialog, router, service, representativeService, organizationService, licenseTypeService, cdChanged) {
        var _this = _super.call(this, authService) || this;
        _this.dialog = dialog;
        _this.router = router;
        _this.service = service;
        _this.representativeService = representativeService;
        _this.organizationService = organizationService;
        _this.licenseTypeService = licenseTypeService;
        _this.cdChanged = cdChanged;
        _this.Submitting = false;
        _this.isEdit = false;
        _this.representatives = new Array();
        _this.organizations = new Array();
        _this.licenseTypes = new Array();
        _this.onClose = new EventEmitter();
        return _this;
    }
    InternetInfoComponent.prototype.ngOnInit = function () {
        this.model = new InternetModel();
    };
    InternetInfoComponent.prototype.getEntity = function (id) {
        var _this = this;
        this.service.Get(id).subscribe(function (r) {
            _this.model = r;
        });
    };
    InternetInfoComponent.prototype.show = function (isEdit, id) {
        this.isEdit = isEdit;
        this.Submitting = false;
        this.model = new InternetModel();
        this.model.OrganizationID = '';
        this.model.RepresentativeID = '';
        this.model.LicenseTypeID = '';
        this.form.resetForm();
        if (this.isEdit) {
            this.getEntity(id);
        }
        this.getRepresentatives();
        this.getOrganization();
        this.getLicenseType();
        this.cdChanged.detectChanges();
        this.modal.show();
    };
    InternetInfoComponent.prototype.ongChangeIsOrganization = function () {
        if (this.model.IsOrganization) {
            this.model.RepresentativeID = null;
        }
        else {
            this.model.OrganizationID = null;
        }
    };
    InternetInfoComponent.prototype.getRepresentatives = function () {
        var _this = this;
        this.representatives = null;
        this.representativeService.GetAll().subscribe(function (r) {
            if (r) {
                _this.representatives = r;
            }
        });
    };
    InternetInfoComponent.prototype.getOrganization = function () {
        var _this = this;
        this.organizations = null;
        this.organizationService.GetAll().subscribe(function (r) {
            if (r) {
                _this.organizations = r;
            }
        });
    };
    InternetInfoComponent.prototype.getLicenseType = function () {
        var _this = this;
        this.licenseTypes = null;
        this.licenseTypeService.GetAll().subscribe(function (r) {
            if (r) {
                _this.licenseTypes = r;
            }
        });
    };
    InternetInfoComponent.prototype.save = function () {
        var _this = this;
        if (this.Submitting)
            return;
        this.Submitting = true;
        if (this.isEdit) {
            this.service.Edit(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Internet", MessageConstant.EDIT_SCCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Internet", strMessage);
            });
        }
        else {
            this.service.Create(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Internet", MessageConstant.ADD_SUCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Internet", strMessage);
            });
        }
    };
    InternetInfoComponent.prototype.cancel = function () {
        this.modal.hide();
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], InternetInfoComponent.prototype, "onClose", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], InternetInfoComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('f'),
        tslib_1.__metadata("design:type", NgForm)
    ], InternetInfoComponent.prototype, "form", void 0);
    InternetInfoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-internet-info',
            templateUrl: './internet-info.component.html',
            styleUrls: ['./internet-info.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            Router,
            InternetService,
            RepresentativeService,
            OrganizationService,
            LicenseTypeService,
            ChangeDetectorRef])
    ], InternetInfoComponent);
    return InternetInfoComponent;
}(BaseComponent));
export { InternetInfoComponent };
//# sourceMappingURL=internet-info.component.js.map