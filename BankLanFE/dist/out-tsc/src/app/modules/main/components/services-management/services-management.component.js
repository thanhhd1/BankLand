import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { ServicesManagementCriteria } from 'src/app/modules/common/criterias/services-management.criteria';
import { ServicesManagementInfoComponent } from './services-management-info/services-management-info.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { DatePipe } from '@angular/common';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { ServicesManagementService } from 'src/app/modules/common/services/services-management.service';
var ServicesManagementComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ServicesManagementComponent, _super);
    function ServicesManagementComponent(authService, router, dialog, service, datePipe) {
        var _this = _super.call(this, authService) || this;
        _this.router = router;
        _this.dialog = dialog;
        _this.service = service;
        _this.datePipe = datePipe;
        _this.criteria = new ServicesManagementCriteria();
        _this.serverLink = '/api/Menu/Search';
        return _this;
    }
    ServicesManagementComponent.prototype.InitTable = function () {
        this.compRef = this;
        this.aaSorting = [[0, 'asc']];
        this.aoColumnDefs = [
            { mData: 'Name', aTargets: [0] },
            { mData: 'Price', aTargets: [1] },
            { mData: 'UnitName', aTargets: [2] },
            { mData: 'Unit', aTargets: [3] },
            { mData: 'Unit', aTargets: [4] },
            { mData: 'Unit', aTargets: [5] }
        ];
        this.aoColumns = [
            {
                sTitle: 'Tên dịch vụ',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Giá tiền',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Đơn vị tính',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Số lượng',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Đơn vị số lượng tính',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj) {
                        return oObj.Price + "/1" + oObj.UnitName;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Thành tiền',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj) {
                        return oObj.Price * oObj.Unit + " vnd";
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
    ServicesManagementComponent.prototype.RefreshTable = function () {
        this.table.ajax.reload();
    };
    ServicesManagementComponent.prototype.catchTable = function (event) {
        this.table = event;
    };
    ServicesManagementComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.InitTable();
                return [2 /*return*/];
            });
        });
    };
    ServicesManagementComponent.prototype.SetCriteria = function (aoData) {
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
    ServicesManagementComponent.prototype.add = function () {
        this.addModal.show(false, null);
    };
    ServicesManagementComponent.prototype.edit = function (id) {
        this.addModal.show(true, id);
    };
    ServicesManagementComponent.prototype.remove = function (id) {
        var _this = this;
        if (id) {
            this.dialog.showSwalConfirmAlert('Xoá dịch vụ này').then(function (isConfirm) {
                if (isConfirm) {
                    _this.service.Delete(id).subscribe(function (r) {
                        if (r) {
                            _this.dialog.showToastrSuccess('Xoá dịch vụ', MessageConstant.REQUEST_SUCCESS_CONST);
                            _this.RefreshTable();
                        }
                    }, function (error) {
                        _this.dialog.showSwalErrorAlert('Xoá dịch vụ', MessageConstant.DEL_ERROR_CONST);
                    });
                }
            });
        }
    };
    tslib_1.__decorate([
        ViewChild('addModal'),
        tslib_1.__metadata("design:type", ServicesManagementInfoComponent)
    ], ServicesManagementComponent.prototype, "addModal", void 0);
    ServicesManagementComponent = tslib_1.__decorate([
        Component({
            selector: 'app-services-management',
            templateUrl: './services-management.component.html',
            styleUrls: ['./services-management.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            Router,
            CommonDialogService,
            ServicesManagementService,
            DatePipe])
    ], ServicesManagementComponent);
    return ServicesManagementComponent;
}(BaseComponent));
export { ServicesManagementComponent };
//# sourceMappingURL=services-management.component.js.map