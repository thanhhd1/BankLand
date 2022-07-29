import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import UserCriteria from 'src/app/modules/common/criterias/user.criteria';
import { BaseComponent } from 'src/app/modules/base.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { UserService } from 'src/app/modules/common/services/user.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { RoleConstants } from 'src/app/Global';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
var UserComponent = /** @class */ (function (_super) {
    tslib_1.__extends(UserComponent, _super);
    function UserComponent(authService, dialog, service, datePipe, router) {
        var _this = _super.call(this, authService) || this;
        _this.dialog = dialog;
        _this.service = service;
        _this.datePipe = datePipe;
        _this.router = router;
        _this.criteria = new UserCriteria();
        _this.serverLink = '/api/User/Search';
        return _this;
    }
    UserComponent.prototype.InitTable = function () {
        var _this = this;
        this.compRef = this;
        this.aaSorting = [[0, 'asc']];
        this.aoColumnDefs = [
            { mData: 'Name', aTargets: [0] },
            { mData: 'Role', aTargets: [1] },
            { mData: 'PhoneNumber', aTargets: [2] },
            { mData: 'Email', aTargets: [3] },
            { mData: "IsInactived", aTargets: [4] },
            { mData: 'Id', bSortable: false, 'aTargets': [5] }
        ];
        this.aoColumns = [
            {
                sTitle: 'Tên',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return "<img class='img-fluid rounded-circle' width=\"30\" height=\"30\" src='" + oObj.ProfilePicturePath + "' /> " + oObj.Name;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Vai Trò',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Số Điện Thoại',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Email',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return '<a class="email" href="mailto:' + data + '">' + data + '</a>';
                    }
                    return '';
                }
            },
            {
                sTitle: 'Trạng Thái',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj) {
                        return !oObj.IsInactived ? '<div class="badge badge-success round">Hoạt Động</div>' : '<div class="badge badge-danger round">Ngưng Hoạt Động</div>';
                    }
                    return "";
                }
            },
            {
                sTitle: 'Actions',
                sClass: 'text-center',
                mRender: function (data, type, oObj) {
                    var action = '';
                    action += '<button type="button" title="Edit" method-name="edit"  class="btn btn-outline-info mr-1 btn-sm" param="' + oObj.Id + '"><i class="ft-edit"></i></button> ';
                    if (_this.currentUser.Id === oObj.Id) {
                        action += '<button type="button" title="Delete" class="btn btn-outline-danger round  mr-1 btn-sm" disabled ><i class="ft-trash-2"></i></button>';
                    }
                    else {
                        action += '<button type="button" title="Delete" method-name="remove" class="btn btn-outline-danger round  mr-1 btn-sm" param="' + oObj.Id + '" ><i class="ft-trash-2"></i></button>';
                    }
                    // If client has email and password. User can change password.
                    if (oObj.Email) {
                        action += "<div class=\"btn-group\">\n                        <button type=\"button\" class=\"btn btn-outline-secondary mr-1 btn-sm dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                          <i class=\"la la-ellipsis-h \"></i>\n                        </button>\n                        <div class=\"dropdown-menu\">\n                            <a class=\"dropdown-item\" href=\"javascript:void(0)\" method-name=\"changepassword\" param='" + oObj.Id + "'>Change Password</a>  \n                            <a class=\"dropdown-item\" href=\"javascript:void(0)\" method-name=\"resetpassword\" param='" + oObj.Id + "'>Reset Password</a>    \n                        </div>\n                    </div>\n                    ";
                    }
                    return action;
                }
            }
        ];
    };
    UserComponent.prototype.searchGoogleMapAddress = function (url) {
        window.open(url);
    };
    UserComponent.prototype.RefreshTable = function () {
        this.table.ajax.reload();
    };
    UserComponent.prototype.catchTable = function (event) {
        this.table = event;
    };
    UserComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.InitTable();
                return [2 /*return*/];
            });
        });
    };
    UserComponent.prototype.parseDateTOString = function (date) {
        if (date) {
            return this.datePipe.transform(date, 'dd/MM/yyyy');
        }
        return '';
    };
    UserComponent.prototype.SetCriteria = function (aoData) {
        var _this = this;
        if (aoData) {
            aoData.forEach(function (element) {
                switch (element.name) {
                    case "iDisplayStart":
                        _this.criteria.CurrentPage = element.value;
                        break;
                    case "iDisplayLength":
                        _this.criteria.ItemPerPage = element.value;
                        break;
                    case "iSortCol_0":
                        _this.criteria.SortColumn = _this.aoColumnDefs[element.value].mData;
                        break;
                    case "sSortDir_0":
                        _this.criteria.SortDirection = element.value;
                        break;
                    case "sSearch":
                        _this.criteria.SearchText = element.value;
                        break;
                }
            });
        }
        this.criteria.CurrentPage = Math.ceil(this.criteria.CurrentPage / this.criteria.ItemPerPage);
        return this.criteria;
    };
    UserComponent.prototype.edit = function (id) {
        this.router.navigateByUrl("/management/edit-user/" + id);
    };
    UserComponent.prototype.add = function () {
        if (this.currentUser.Role !== RoleConstants.User) {
            this.modal.show();
        }
        else {
            this.dialog.showSwalErrorAlert('Thêm Mới', 'Bạn không có quyền tạo mới user');
        }
    };
    UserComponent.prototype.remove = function (id) {
        var _this = this;
        if (this.currentUser.Id != id) {
            this.dialog.showSwalConfirmAlert('Bạn Muốn Xóa Người Dùng Này').then(function (isConfirmed) {
                if (isConfirmed) {
                    _this.service.Delete(id).subscribe(function (r) {
                        if (r) {
                            _this.RefreshTable();
                            _this.dialog.showToastrSuccess('Xóa Người Dùng', MessageConstant.REQUEST_SUCCESS_CONST);
                        }
                        else {
                            _this.dialog.showSwalErrorAlert('Xóa Người Dùng', MessageConstant.DEL_ERROR_CONST);
                        }
                    }, function (error) {
                        _this.dialog.showSwalErrorAlert('Xóa Người Dùng', MessageConstant.DEL_ERROR_CONST);
                    });
                }
            });
        }
        else {
            this.dialog.showSwalErrorAlert('Xóa Người Dùng', 'Bạn không không nên xóa chính mình');
        }
    };
    UserComponent.prototype.changepassword = function (id) {
        this.modalChangePassword.show(id);
    };
    UserComponent.prototype.resetpassword = function (id) {
        this.modalResetPassword.show(id);
    };
    tslib_1.__decorate([
        ViewChild('addUser'),
        tslib_1.__metadata("design:type", AddUserComponent)
    ], UserComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('changePassword'),
        tslib_1.__metadata("design:type", ChangePasswordComponent)
    ], UserComponent.prototype, "modalChangePassword", void 0);
    tslib_1.__decorate([
        ViewChild('resetPassword'),
        tslib_1.__metadata("design:type", ResetPasswordComponent)
    ], UserComponent.prototype, "modalResetPassword", void 0);
    UserComponent = tslib_1.__decorate([
        Component({
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            UserService,
            DatePipe,
            Router])
    ], UserComponent);
    return UserComponent;
}(BaseComponent));
export { UserComponent };
//# sourceMappingURL=user.component.js.map