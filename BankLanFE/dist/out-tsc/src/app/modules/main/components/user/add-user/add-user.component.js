import * as tslib_1 from "tslib";
import { Component, Output, ViewChild, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import UserModel from 'src/app/modules/common/models/user.model';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/common/services/user.service';
import { CompanyService } from 'src/app/modules/common/services/company.service';
var AddUserComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AddUserComponent, _super);
    function AddUserComponent(authService, dialog, router, service, companyService, cdChanged) {
        var _this = _super.call(this, authService) || this;
        _this.dialog = dialog;
        _this.router = router;
        _this.service = service;
        _this.companyService = companyService;
        _this.cdChanged = cdChanged;
        _this.Submitting = false;
        _this.passwordNotMath = false;
        _this.isEmailValid = false;
        _this.roles = new Array();
        _this.companies = new Array();
        _this.onClose = new EventEmitter();
        return _this;
    }
    AddUserComponent.prototype.ngOnInit = function () {
        this.model = new UserModel();
        this.isEmailValid = false;
    };
    AddUserComponent.prototype.show = function () {
        this.form.resetForm();
        this.Submitting = false;
        this.model = new UserModel();
        this.getRoles();
        this.getCompanies();
        this.cdChanged.detectChanges();
        this.modal.show();
    };
    AddUserComponent.prototype.getRoles = function () {
        var _this = this;
        this.roles = null;
        this.service.GetAllRole().subscribe(function (r) {
            if (r) {
                var list = [];
                r.forEach(function (c) {
                    list.push({
                        id: c.Name,
                        text: c.Name
                    });
                });
                _this.roles = list;
            }
        });
    };
    AddUserComponent.prototype.getCompanies = function () {
        var _this = this;
        this.companies = null;
        this.companyService.GetAll().subscribe(function (r) {
            if (r) {
                var list = [];
                r.forEach(function (c) {
                    list.push({
                        id: c.ID,
                        text: c.Name
                    });
                });
                _this.companies = list;
            }
        });
    };
    AddUserComponent.prototype.companyChanged = function (event) {
        if (event.data && event.data.length > 0) {
            if (event.data[0] && event.data[0].selected) {
                this.model.CompanyID = event.value;
            }
            else if (this.model.CompanyID) {
                $(event.data[0].element.parentElement).val(this.model.CompanyID).trigger('change');
            }
            else {
                $(event.data[0].element.parentElement).val(null).trigger('change');
            }
        }
    };
    AddUserComponent.prototype.roleChanged = function (event) {
        if (event.data && event.data.length > 0) {
            if (event.data[0] && event.data[0].selected) {
                this.model.Role = event.value;
            }
            else if (this.model.Role) {
                $(event.data[0].element.parentElement).val(this.model.Role).trigger('change');
            }
            else {
                $(event.data[0].element.parentElement).val(null).trigger('change');
            }
        }
    };
    AddUserComponent.prototype.save = function () {
        var _this = this;
        if (this.Submitting)
            return;
        this.Submitting = true;
        this.service.Create(this.model).subscribe(function (result) {
            if (result) {
                _this.Submitting = false;
                _this.dialog.showSwalSuccesAlert("Th\u00EAm M\u1EDBi Ng\u01B0\u1EDDi D\u00F9ng", MessageConstant.ADD_SUCCESS_CONST);
                _this.onClose.emit(true);
                _this.cancel();
            }
        }, function (error) {
            _this.Submitting = false;
            var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
            _this.dialog.showSwalErrorAlert("Th\u00EAm M\u1EDBi Ng\u01B0\u1EDDi D\u00F9ng", strMessage);
        });
    };
    AddUserComponent.prototype.cancel = function () {
        this.modal.hide();
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AddUserComponent.prototype, "onClose", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], AddUserComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('f'),
        tslib_1.__metadata("design:type", NgForm)
    ], AddUserComponent.prototype, "form", void 0);
    AddUserComponent = tslib_1.__decorate([
        Component({
            selector: 'app-add-user',
            templateUrl: './add-user.component.html',
            styleUrls: ['./add-user.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            Router,
            UserService,
            CompanyService,
            ChangeDetectorRef])
    ], AddUserComponent);
    return AddUserComponent;
}(BaseComponent));
export { AddUserComponent };
//# sourceMappingURL=add-user.component.js.map