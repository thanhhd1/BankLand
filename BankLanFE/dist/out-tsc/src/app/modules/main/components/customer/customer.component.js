import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { CustomerCriteria } from 'src/app/modules/common/criterias/customer.criteria';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { CustomerService } from 'src/app/modules/common/services/customer.service';
import { BaseComponent } from 'src/app/modules/base.component';
import { DatePipe } from '@angular/common';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
var CustomerComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CustomerComponent, _super);
    function CustomerComponent(authService, router, dialog, service, datePipe) {
        var _this = _super.call(this, authService) || this;
        _this.router = router;
        _this.dialog = dialog;
        _this.service = service;
        _this.datePipe = datePipe;
        _this.criteria = new CustomerCriteria();
        _this.serverLink = '/api/Customer/Search';
        return _this;
    }
    CustomerComponent.prototype.parseDateTOString = function (date) {
        if (date) {
            return this.datePipe.transform(date, 'dd/MM/yyyy');
        }
        return '';
    };
    CustomerComponent.prototype.InitTable = function () {
        var _this = this;
        this.compRef = this;
        this.aaSorting = [[0, 'asc']];
        this.aoColumnDefs = [
            { 'mData': 'Name', 'aTargets': [0] },
            { 'mData': 'SocialNumber', 'aTargets': [1] },
            { 'mData': 'ProviderDate', 'aTargets': [2] },
            { 'mData': 'PlaceProvider', 'aTargets': [3] },
            { 'mData': 'Address', 'aTargets': [4] },
            { "mData": "BirthDate", "aTargets": [5] },
            { 'mData': 'ID', 'bSortable': false, 'aTargets': [6] }
        ];
        this.aoColumns = [
            {
                'sTitle': 'Tên',
                'sClass': '',
                'mRender': function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                'sTitle': 'Số CMND',
                'sClass': '',
                'mRender': function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                'sTitle': 'Ngày cấp CMND',
                'sClass': '',
                'mRender': function (data, type, oObj) {
                    if (data) {
                        return _this.parseDateTOString(data);
                    }
                    return '';
                }
            },
            {
                'sTitle': 'Nơi cấp CMND',
                'sClass': '',
                'mRender': function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                'sTitle': 'Địa chỉ',
                'sClass': '',
                'mRender': function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                'sTitle': 'Ngày sinh',
                'sClass': '',
                'mRender': function (data, type, oObj) {
                    if (data) {
                        return _this.parseDateTOString(data);
                    }
                    return '';
                }
            },
            {
                'sTitle': 'Actions',
                'sClass': 'text-center',
                'mRender': function (data, type, oObj) {
                    var action = '';
                    action += '<button type="button" title="Edit" method-name="edit"  class="btn btn-outline-info mr-1 btn-sm" param="' + oObj.ID + '"><i class="ft-edit"></i></button> ';
                    action += '<button type="button" title="Delete" method-name="remove" class="btn btn-outline-danger round  mr-1 btn-sm" param="' + oObj.ID + '" ><i class="ft-trash-2"></i></button>';
                    return action;
                }
            }
        ];
    };
    CustomerComponent.prototype.RefreshTable = function () {
        this.table.ajax.reload();
    };
    CustomerComponent.prototype.catchTable = function (event) {
        this.table = event;
    };
    CustomerComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.InitTable();
                return [2 /*return*/];
            });
        });
    };
    CustomerComponent.prototype.SetCriteria = function (aoData) {
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
    CustomerComponent.prototype.add = function () {
        this.addCust.show(false, null);
    };
    CustomerComponent.prototype.edit = function (id) {
        this.addCust.show(true, id);
    };
    CustomerComponent.prototype.remove = function (id) {
        var _this = this;
        if (id) {
            this.dialog.showSwalConfirmAlert('Bạn muốn xóa Khách Hàng').then(function (isConfirm) {
                if (isConfirm) {
                    _this.service.Delete(id).subscribe(function (r) {
                        if (r) {
                            _this.dialog.showToastrSuccess('Xóa Khách hàng', MessageConstant.REQUEST_SUCCESS_CONST);
                            _this.RefreshTable();
                        }
                    }, function (error) {
                        _this.dialog.showSwalErrorAlert('Xóa Khách hàng', MessageConstant.DEL_ERROR_CONST);
                    });
                }
            });
        }
    };
    tslib_1.__decorate([
        ViewChild('addCust'),
        tslib_1.__metadata("design:type", CustomerInfoComponent)
    ], CustomerComponent.prototype, "addCust", void 0);
    CustomerComponent = tslib_1.__decorate([
        Component({
            selector: 'app-customer',
            templateUrl: './customer.component.html',
            styleUrls: ['./customer.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            Router,
            CommonDialogService,
            CustomerService,
            DatePipe])
    ], CustomerComponent);
    return CustomerComponent;
}(BaseComponent));
export { CustomerComponent };
//# sourceMappingURL=customer.component.js.map