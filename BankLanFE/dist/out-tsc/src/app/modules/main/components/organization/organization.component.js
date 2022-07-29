import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { BaseComponent } from 'src/app/modules/base.component';
import { OrganizationCriteria } from 'src/app/modules/common/criterias/organization.criteria';
import { OrganizationInfoComponent } from './organization-info/organization-info.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { OrganizationService } from 'src/app/modules/common/services/organization.service';
import { DatePipe } from '@angular/common';
var OrganizationComponent = /** @class */ (function (_super) {
    tslib_1.__extends(OrganizationComponent, _super);
    function OrganizationComponent(authService, router, dialog, service, datePipe) {
        var _this = _super.call(this, authService) || this;
        _this.router = router;
        _this.dialog = dialog;
        _this.service = service;
        _this.datePipe = datePipe;
        _this.criteria = new OrganizationCriteria();
        _this.serverLink = '/api/Organization/Search';
        return _this;
    }
    OrganizationComponent.prototype.InitTable = function () {
        this.compRef = this;
        this.aaSorting = [[0, 'asc']];
        this.aoColumnDefs = [
            { mData: 'Name', aTargets: [0] },
            { mData: 'Address', aTargets: [1] },
            { mData: 'RepresentativeID', aTargets: [2] },
            { mData: 'ID', bSortable: false, aTargets: [3] }
        ];
        this.aoColumns = [
            {
                sTitle: 'Tên Tổ Chức',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Địa Chỉ',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Người Đại Diện',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj && oObj.Representative) {
                        return oObj.Representative.Name;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Actions',
                sClass: 'text-center',
                mRender: function (data, type, oObj) {
                    var action = '';
                    action +=
                        '<button type="button" title="Edit" method-name="edit"  class="btn btn-outline-info mr-1 btn-sm" param="' +
                            oObj.ID +
                            '"><i class="ft-edit"></i></button> ';
                    action +=
                        '<button type="button" title="Delete" method-name="remove" class="btn btn-outline-danger round  mr-1 btn-sm" param="' +
                            oObj.ID +
                            '" ><i class="ft-trash-2"></i></button>';
                    return action;
                }
            }
        ];
    };
    OrganizationComponent.prototype.RefreshTable = function () {
        this.table.ajax.reload();
    };
    OrganizationComponent.prototype.catchTable = function (event) {
        this.table = event;
    };
    OrganizationComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.InitTable();
                return [2 /*return*/];
            });
        });
    };
    OrganizationComponent.prototype.SetCriteria = function (aoData) {
        var _this = this;
        if (aoData) {
            aoData.forEach(function (element) {
                switch (element.name) {
                    case 'iDisplayStart':
                        _this.criteria.CurrentPage = element.value;
                        break;
                    case 'iDisplayLength':
                        _this.criteria.ItemPerPage = element.value;
                        break;
                    case 'iSortCol_0':
                        _this.criteria.SortColumn = _this.aoColumnDefs[element.value].mData;
                        break;
                    case 'sSortDir_0':
                        _this.criteria.SortDirection = element.value;
                        break;
                    case 'sSearch':
                        _this.criteria.SearchText = element.value;
                        break;
                }
            });
        }
        this.criteria.CurrentPage = Math.ceil(this.criteria.CurrentPage / this.criteria.ItemPerPage);
        return this.criteria;
    };
    OrganizationComponent.prototype.add = function () {
        this.addModal.show(false, null);
    };
    OrganizationComponent.prototype.edit = function (id) {
        this.addModal.show(true, id);
    };
    OrganizationComponent.prototype.remove = function (id) {
        var _this = this;
        if (id) {
            this.dialog.showSwalConfirmAlert('Xóa Mục Này').then(function (isConfirm) {
                if (isConfirm) {
                    _this.service.Delete(id).subscribe(function (r) {
                        if (r) {
                            _this.dialog.showToastrSuccess('Xóa Tổ Chức', MessageConstant.REQUEST_SUCCESS_CONST);
                            _this.RefreshTable();
                        }
                    }, function (error) {
                        _this.dialog.showSwalErrorAlert('Xóa Tổ Chức', 'Tổ chức này đang được sử dụng. Bạn Không thể xóa');
                    });
                }
            });
        }
    };
    tslib_1.__decorate([
        ViewChild('addModal'),
        tslib_1.__metadata("design:type", OrganizationInfoComponent)
    ], OrganizationComponent.prototype, "addModal", void 0);
    OrganizationComponent = tslib_1.__decorate([
        Component({
            selector: 'app-organization',
            templateUrl: './organization.component.html',
            styleUrls: ['./organization.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            Router,
            CommonDialogService,
            OrganizationService,
            DatePipe])
    ], OrganizationComponent);
    return OrganizationComponent;
}(BaseComponent));
export { OrganizationComponent };
//# sourceMappingURL=organization.component.js.map