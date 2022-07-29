import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { CompanyService } from 'src/app/modules/common/services/company.service';
import { CompanyModel } from 'src/app/modules/common/models/company.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { CropImageComponent } from 'src/app/modules/common/component/crop-image/crop-image.component';
import { OrganizationService } from 'src/app/modules/common/services/organization.service';
import { RepresentativeService } from 'src/app/modules/common/services/representative.service';
import { LicenseTypeService } from 'src/app/modules/common/services/license-type.service';
import { DatePipe } from '@angular/common';
var CompanyInfoComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CompanyInfoComponent, _super);
    function CompanyInfoComponent(authService, dialog, router, service, representativeService, organizationService, licenseTypeService, datePipe, cdChanged) {
        var _this = _super.call(this, authService) || this;
        _this.dialog = dialog;
        _this.router = router;
        _this.service = service;
        _this.representativeService = representativeService;
        _this.organizationService = organizationService;
        _this.licenseTypeService = licenseTypeService;
        _this.datePipe = datePipe;
        _this.cdChanged = cdChanged;
        _this.Submitting = false;
        _this.isEdit = false;
        _this.Uploading = false;
        _this.representatives = new Array();
        _this.organizations = new Array();
        _this.licenseTypes = new Array();
        _this.onClose = new EventEmitter();
        return _this;
    }
    CompanyInfoComponent.prototype.ngOnInit = function () {
        this.model = new CompanyModel();
    };
    CompanyInfoComponent.prototype.cropImage = function () {
        this.cropImageApp.ModelID = this.id;
        this.cropImageApp.show();
    };
    CompanyInfoComponent.prototype.startUploadAvatar = function (event) {
        this.Uploading = true;
    };
    CompanyInfoComponent.prototype.callBackUploadAvatar = function (event) {
        this.Uploading = false;
        this.model.Avatar = event;
    };
    CompanyInfoComponent.prototype.errorCallback = function (event) {
        this.Uploading = false;
    };
    CompanyInfoComponent.prototype.getRepresentatives = function () {
        var _this = this;
        this.representatives = null;
        this.representativeService.GetAll().subscribe(function (r) {
            if (r) {
                var list = [];
                r.forEach(function (c) {
                    list.push({
                        id: c.ID,
                        text: c.Name
                    });
                });
                _this.representatives = list;
            }
        });
    };
    CompanyInfoComponent.prototype.getOrganization = function () {
        var _this = this;
        this.organizations = null;
        this.organizationService.GetAll().subscribe(function (r) {
            if (r) {
                var list = [];
                r.forEach(function (c) {
                    list.push({
                        id: c.ID,
                        text: c.Name
                    });
                });
                _this.organizations = list;
            }
        });
    };
    CompanyInfoComponent.prototype.getLicenseType = function () {
        var _this = this;
        this.licenseTypes = null;
        this.licenseTypeService.GetAll().subscribe(function (r) {
            if (r) {
                var list = [];
                r.forEach(function (c) {
                    list.push({
                        id: c.ID,
                        text: c.Name
                    });
                });
                _this.licenseTypes = list;
            }
        });
    };
    CompanyInfoComponent.prototype.getEntity = function (id) {
        var _this = this;
        this.service.Get(id).subscribe(function (r) {
            _this.model = r;
            //this.model.LicenseDate =  new Date(this.model.LicenseDate.getDate() + '/' + this.model.LicenseDate.getMonth() + '/' + this.model.LicenseDate.getFullYear());
        }, function (error) {
            _this.dialog.showSwalErrorAlert("C\u1EADp Nh\u1EADt KS-NN-HomeStay", MessageConstant.FAILURE_REQUEST);
        });
    };
    CompanyInfoComponent.prototype.show = function (isEdit, id) {
        this.isEdit = isEdit;
        this.Submitting = false;
        this.model = new CompanyModel();
        if (this.isEdit) {
            this.getEntity(id);
        }
        this.getRepresentatives();
        this.getOrganization();
        this.getLicenseType();
        this.cdChanged.detectChanges();
        this.modal.show();
    };
    CompanyInfoComponent.prototype.representativeChanged = function (event) {
        if (event.data && event.data.length > 0) {
            if (event.data[0] && event.data[0].selected) {
                this.model.RepresentativeID = event.value;
            }
            else if (this.model.RepresentativeID) {
                $(event.data[0].element.parentElement).val(this.model.RepresentativeID).trigger('change');
            }
            else {
                $(event.data[0].element.parentElement).val(null).trigger('change');
            }
        }
    };
    CompanyInfoComponent.prototype.organizationChanged = function (event) {
        if (event.data && event.data.length > 0) {
            if (event.data[0] && event.data[0].selected) {
                this.model.OrganizationID = event.value;
            }
            else if (this.model.OrganizationID) {
                $(event.data[0].element.parentElement).val(this.model.OrganizationID).trigger('change');
            }
            else {
                $(event.data[0].element.parentElement).val(null).trigger('change');
            }
        }
    };
    CompanyInfoComponent.prototype.licenseTypeChanged = function (event) {
        if (event.data && event.data.length > 0) {
            if (event.data[0] && event.data[0].selected) {
                this.model.LicenseTypeID = event.value;
            }
            else if (this.model.LicenseTypeID) {
                $(event.data[0].element.parentElement).val(this.model.LicenseTypeID).trigger('change');
            }
            else {
                $(event.data[0].element.parentElement).val(null).trigger('change');
            }
        }
    };
    CompanyInfoComponent.prototype.save = function () {
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
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " KS-NN-HomeStay", MessageConstant.EDIT_SCCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " KS-NN-HomeStay", MessageConstant.FAILURE_REQUEST);
            });
        }
        else {
            this.service.Create(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " KS-NN-HomeStay", MessageConstant.ADD_SUCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " KS-NN-HomeStay", MessageConstant.FAILURE_REQUEST);
            });
        }
    };
    CompanyInfoComponent.prototype.cancel = function () {
        this.form.resetForm();
        this.modal.hide();
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], CompanyInfoComponent.prototype, "onClose", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], CompanyInfoComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('f'),
        tslib_1.__metadata("design:type", NgForm)
    ], CompanyInfoComponent.prototype, "form", void 0);
    tslib_1.__decorate([
        ViewChild('cropImageApp'),
        tslib_1.__metadata("design:type", CropImageComponent)
    ], CompanyInfoComponent.prototype, "cropImageApp", void 0);
    CompanyInfoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-company-info',
            templateUrl: './company-info.component.html',
            styleUrls: ['./company-info.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            Router,
            CompanyService,
            RepresentativeService,
            OrganizationService,
            LicenseTypeService,
            DatePipe,
            ChangeDetectorRef])
    ], CompanyInfoComponent);
    return CompanyInfoComponent;
}(BaseComponent));
export { CompanyInfoComponent };
//# sourceMappingURL=company-info.component.js.map