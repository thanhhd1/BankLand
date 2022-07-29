import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import CustomerModel from 'src/app/modules/common/models/customer.model';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/modules/common/services/customer.service';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { CompanyService } from 'src/app/modules/common/services/company.service';
var CustomerInfoComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CustomerInfoComponent, _super);
    function CustomerInfoComponent(authService, dialog, router, companyService, service, cdChanged) {
        var _this = _super.call(this, authService) || this;
        _this.dialog = dialog;
        _this.router = router;
        _this.companyService = companyService;
        _this.service = service;
        _this.cdChanged = cdChanged;
        _this.Submitting = false;
        _this.isEdit = false;
        _this.companies = new Array();
        _this.onClose = new EventEmitter();
        return _this;
    }
    CustomerInfoComponent.prototype.ngOnInit = function () {
        this.model = new CustomerModel();
    };
    CustomerInfoComponent.prototype.getEntity = function (id) {
        var _this = this;
        this.service.Get(id).subscribe(function (r) {
            _this.model = r;
        });
    };
    CustomerInfoComponent.prototype.show = function (isEdit, id) {
        this.form.resetForm();
        this.isEdit = isEdit;
        this.Submitting = false;
        this.model = new CustomerModel();
        if (this.isEdit) {
            this.getEntity(id);
        }
        this.model.CompanyID = this.currentUser.CompanyID;
        this.cdChanged.detectChanges();
        this.modal.show();
    };
    // getCompanies() {
    //   this.companies = null;
    //   this.companyService.GetAll().subscribe(r => {
    //     if (r) {
    //       var list = [];
    //       r.forEach(c => {
    //         list.push({
    //           id: c.ID,
    //           text: c.Name
    //         });
    //       });
    //       this.companies = list;
    //     }
    //   });
    // }
    // companyChanged(event) {
    //   if (event.data && event.data.length > 0) {
    //     if (event.data[0] && event.data[0].selected) {
    //       this.model.CompanyID = event.value;
    //     } else if (this.model.CompanyID) {
    //       $(event.data[0].element.parentElement)
    //         .val(this.model.CompanyID)
    //         .trigger('change');
    //     } else {
    //       $(event.data[0].element.parentElement)
    //         .val(null)
    //         .trigger('change');
    //     }
    //   }
    // }
    CustomerInfoComponent.prototype.save = function () {
        var _this = this;
        if (this.Submitting)
            return;
        this.Submitting = true;
        if (this.isEdit) {
            this.service.Edit(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Kh\u00E1ch H\u00E0ng", MessageConstant.EDIT_SCCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error
                    ? error.error
                    : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Kh\u00E1ch H\u00E0ng", strMessage);
            });
        }
        else {
            this.service.Create(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Kh\u00E1ch H\u00E0ng", MessageConstant.ADD_SUCCESS_CONST);
                    _this.onClose.emit(true);
                    _this.cancel();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error
                    ? error.error
                    : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " Kh\u00E1ch H\u00E0ng", strMessage);
            });
        }
    };
    CustomerInfoComponent.prototype.cancel = function () {
        this.modal.hide();
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], CustomerInfoComponent.prototype, "onClose", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], CustomerInfoComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('f'),
        tslib_1.__metadata("design:type", NgForm)
    ], CustomerInfoComponent.prototype, "form", void 0);
    CustomerInfoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-customer-info',
            templateUrl: './customer-info.component.html',
            styleUrls: ['./customer-info.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            Router,
            CompanyService,
            CustomerService,
            ChangeDetectorRef])
    ], CustomerInfoComponent);
    return CustomerInfoComponent;
}(BaseComponent));
export { CustomerInfoComponent };
//# sourceMappingURL=customer-info.component.js.map