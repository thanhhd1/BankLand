import * as tslib_1 from "tslib";
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import UserModel from 'src/app/modules/common/models/user.model';
import { CropImageComponent } from 'src/app/modules/common/component/crop-image/crop-image.component';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/modules/common/services/user.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { CompanyService } from 'src/app/modules/common/services/company.service';
var UserInfoEditComponent = /** @class */ (function (_super) {
    tslib_1.__extends(UserInfoEditComponent, _super);
    function UserInfoEditComponent(authService, dialog, router, service, companyService, cdChanged, activeRouter) {
        var _this = _super.call(this, authService) || this;
        _this.dialog = dialog;
        _this.router = router;
        _this.service = service;
        _this.companyService = companyService;
        _this.cdChanged = cdChanged;
        _this.activeRouter = activeRouter;
        _this.Submitting = false;
        _this.passwordNotMath = false;
        _this.isEmailValid = false;
        _this.type = 0;
        _this.roles = new Array();
        _this.companies = new Array();
        activeRouter.params.subscribe(function (r) {
            _this.id = r['{id}'];
            _this.type = r['{type}'];
            _this.GetEntity();
        });
        return _this;
    }
    UserInfoEditComponent.prototype.ngOnInit = function () {
        this.model = new UserModel();
        this.isEmailValid = false;
    };
    UserInfoEditComponent.prototype.cropImage = function () {
        this.cropImageApp.ModelID = this.id;
        this.cropImageApp.show();
    };
    UserInfoEditComponent.prototype.changeAvatar = function (event) {
        if (event) {
            this.model.ProfilePicturePath = event;
        }
    };
    UserInfoEditComponent.prototype.getReturnUrl = function () {
        this.router.navigate(['/', 'management', 'users']);
    };
    UserInfoEditComponent.prototype.GetEntity = function () {
        var _this = this;
        if (this.id) {
            this.service.Get(this.id).subscribe(function (r) {
                _this.model = r;
                _this.getRoles();
                _this.getCompanies();
                _this.cdChanged.detectChanges();
            }, function (error) {
                var strMessage = error && error.error
                    ? error.error
                    : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert("C\u1EADp Nh\u1EADt " + _this.getTitle(_this.type), strMessage);
                //this.getReturnUrl();
            });
        }
        else {
            this.getReturnUrl();
        }
    };
    UserInfoEditComponent.prototype.getRoles = function () {
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
    UserInfoEditComponent.prototype.getCompanies = function () {
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
    UserInfoEditComponent.prototype.companyChanged = function (event) {
        if (event.data && event.data.length > 0) {
            if (event.data[0] && event.data[0].selected) {
                this.model.CompanyID = event.value;
            }
            else if (this.model.CompanyID) {
                $(event.data[0].element.parentElement)
                    .val(this.model.CompanyID)
                    .trigger('change');
            }
            else {
                $(event.data[0].element.parentElement)
                    .val(null)
                    .trigger('change');
            }
        }
    };
    UserInfoEditComponent.prototype.roleChanged = function (event) {
        if (event.data && event.data.length > 0) {
            if (event.data[0] && event.data[0].selected) {
                this.model.Role = event.value;
            }
            else if (this.model.Role) {
                $(event.data[0].element.parentElement)
                    .val(this.model.Role)
                    .trigger('change');
            }
            else {
                $(event.data[0].element.parentElement)
                    .val(null)
                    .trigger('change');
            }
        }
    };
    UserInfoEditComponent.prototype.save = function () {
        var _this = this;
        if (this.Submitting)
            return;
        this.Submitting = true;
        this.service.Edit(this.model).subscribe(function (result) {
            if (result) {
                _this.Submitting = false;
                _this.dialog.showToastrSuccess("C\u1EADp Nh\u1EADt " + _this.getTitle(_this.type), MessageConstant.EDIT_SCCCESS_CONST);
                _this.getReturnUrl();
            }
        }, function (error) {
            _this.Submitting = false;
            var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
            _this.dialog.showSwalErrorAlert("C\u1EADp Nh\u1EADt " + _this.getTitle(_this.type), strMessage);
        });
    };
    UserInfoEditComponent.prototype.cancel = function () {
        this.getReturnUrl();
    };
    tslib_1.__decorate([
        ViewChild('cropImageApp'),
        tslib_1.__metadata("design:type", CropImageComponent)
    ], UserInfoEditComponent.prototype, "cropImageApp", void 0);
    UserInfoEditComponent = tslib_1.__decorate([
        Component({
            selector: 'app-user-info-edit',
            templateUrl: './user-info-edit.component.html',
            styleUrls: ['./user-info-edit.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            Router,
            UserService,
            CompanyService,
            ChangeDetectorRef,
            ActivatedRoute])
    ], UserInfoEditComponent);
    return UserInfoEditComponent;
}(BaseComponent));
export { UserInfoEditComponent };
//# sourceMappingURL=user-info-edit.component.js.map