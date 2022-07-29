import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { OrganizationModel } from 'src/app/modules/common/models/organization.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { OrganizationService } from 'src/app/modules/common/services/organization.service';
import { RepresentativeService } from 'src/app/modules/common/services/representative.service';
var OrganizationInfoComponent = /** @class */ (function (_super) {
    tslib_1.__extends(OrganizationInfoComponent, _super);
    function OrganizationInfoComponent(authService, dialog, router, service, representativeService, cdChanged) {
        var _this = _super.call(this, authService) || this;
        _this.dialog = dialog;
        _this.router = router;
        _this.service = service;
        _this.representativeService = representativeService;
        _this.cdChanged = cdChanged;
        _this.Submitting = false;
        _this.isEdit = false;
        _this.onClose = new EventEmitter();
        _this.representatives = new Array();
        return _this;
    }
    OrganizationInfoComponent.prototype.ngOnInit = function () {
        this.model = new OrganizationModel();
    };
    OrganizationInfoComponent.prototype.getRepresentatives = function () {
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
    OrganizationInfoComponent.prototype.getEntity = function (id) {
        var _this = this;
        this.service.Get(id).subscribe(function (r) {
            _this.model = r;
        });
    };
    OrganizationInfoComponent.prototype.show = function (isEdit, id) {
        this.isEdit = isEdit;
        this.Submitting = false;
        this.model = new OrganizationModel();
        this.form.resetForm();
        if (this.isEdit) {
            this.getEntity(id);
        }
        this.getRepresentatives();
        this.cdChanged.detectChanges();
        this.modal.show();
    };
    OrganizationInfoComponent.prototype.representativeChanged = function (event) {
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
    OrganizationInfoComponent.prototype.save = function () {
        var _this = this;
        if (this.Submitting)
            return;
        this.Submitting = true;
        if (this.isEdit) {
            this.service.Edit(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Organization", MessageConstant.EDIT_SCCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error
                    ? error.error
                    : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Organization", strMessage);
            });
        }
        else {
            this.service.Create(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Organization", MessageConstant.ADD_SUCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error
                    ? error.error
                    : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Organization", strMessage);
            });
        }
    };
    OrganizationInfoComponent.prototype.cancel = function () {
        this.modal.hide();
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], OrganizationInfoComponent.prototype, "onClose", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], OrganizationInfoComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('f'),
        tslib_1.__metadata("design:type", NgForm)
    ], OrganizationInfoComponent.prototype, "form", void 0);
    OrganizationInfoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-organization-info',
            templateUrl: './organization-info.component.html',
            styleUrls: ['./organization-info.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            Router,
            OrganizationService,
            RepresentativeService,
            ChangeDetectorRef])
    ], OrganizationInfoComponent);
    return OrganizationInfoComponent;
}(BaseComponent));
export { OrganizationInfoComponent };
//# sourceMappingURL=organization-info.component.js.map