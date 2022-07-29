import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { BaseComponent } from 'src/app/modules/base.component';
import { KaraokeModel } from 'src/app/modules/common/models/karaoke.model';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { KaraokeService } from 'src/app/modules/common/services/karaoke.service';
import { RepresentativeService } from 'src/app/modules/common/services/representative.service';
import { OrganizationService } from 'src/app/modules/common/services/organization.service';
import { LicenseTypeService } from 'src/app/modules/common/services/license-type.service';
var KaraokeInfoComponent = /** @class */ (function (_super) {
    tslib_1.__extends(KaraokeInfoComponent, _super);
    function KaraokeInfoComponent(authService, dialog, router, service, representativeService, organizationService, licenseTypeService, cdChanged) {
        var _this = _super.call(this, authService) || this;
        _this.dialog = dialog;
        _this.router = router;
        _this.service = service;
        _this.representativeService = representativeService;
        _this.organizationService = organizationService;
        _this.licenseTypeService = licenseTypeService;
        _this.cdChanged = cdChanged;
        _this.Uploading = false;
        _this.Submitting = false;
        _this.isEdit = false;
        _this.representatives = new Array();
        _this.organizations = new Array();
        _this.licenseTypes = new Array();
        _this.onClose = new EventEmitter();
        return _this;
    }
    KaraokeInfoComponent.prototype.getRepresentatives = function () {
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
                list.unshift({ id: '', text: '--Chọn Mục--' });
                _this.representatives = list;
            }
        });
    };
    KaraokeInfoComponent.prototype.getOrganization = function () {
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
                list.unshift({ id: '', text: '--Chọn Mục--' });
                _this.organizations = list;
            }
        });
    };
    KaraokeInfoComponent.prototype.getLicenseType = function () {
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
                list.unshift({ id: '', text: '--Chọn Mục--' });
                _this.licenseTypes = list;
            }
        });
    };
    KaraokeInfoComponent.prototype.startUploadAvatar = function (event) {
        this.Uploading = true;
    };
    KaraokeInfoComponent.prototype.callBackUploadAvatar = function (event) {
        this.Uploading = false;
        this.model.Avatar = event;
    };
    KaraokeInfoComponent.prototype.errorCallback = function (event) {
        this.Uploading = false;
    };
    KaraokeInfoComponent.prototype.ngOnInit = function () {
        this.model = new KaraokeModel();
    };
    KaraokeInfoComponent.prototype.getEntity = function (id) {
        var _this = this;
        this.service.Get(id).subscribe(function (r) {
            _this.model = r;
        });
    };
    KaraokeInfoComponent.prototype.show = function (isEdit, id) {
        this.isEdit = isEdit;
        this.Submitting = false;
        this.form.resetForm();
        this.model = new KaraokeModel();
        if (this.isEdit) {
            this.getEntity(id);
        }
        this.getRepresentatives();
        this.getOrganization();
        this.getLicenseType();
        this.cdChanged.detectChanges();
        this.modal.show();
    };
    KaraokeInfoComponent.prototype.representativeChanged = function (event) {
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
    KaraokeInfoComponent.prototype.organizationChanged = function (event) {
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
    KaraokeInfoComponent.prototype.licenseTypeChanged = function (event) {
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
    KaraokeInfoComponent.prototype.save = function () {
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
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Karaoke", MessageConstant.EDIT_SCCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Karaoke", strMessage);
            });
        }
        else {
            this.service.Create(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Karaoke", MessageConstant.ADD_SUCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Karaoke", strMessage);
            });
        }
    };
    KaraokeInfoComponent.prototype.cancel = function () {
        this.modal.hide();
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], KaraokeInfoComponent.prototype, "onClose", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], KaraokeInfoComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('f'),
        tslib_1.__metadata("design:type", NgForm)
    ], KaraokeInfoComponent.prototype, "form", void 0);
    KaraokeInfoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-karaoke-info',
            templateUrl: './karaoke-info.component.html',
            styleUrls: ['./karaoke-info.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            Router,
            KaraokeService,
            RepresentativeService,
            OrganizationService,
            LicenseTypeService,
            ChangeDetectorRef])
    ], KaraokeInfoComponent);
    return KaraokeInfoComponent;
}(BaseComponent));
export { KaraokeInfoComponent };
//# sourceMappingURL=karaoke-info.component.js.map