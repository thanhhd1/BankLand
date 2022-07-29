import * as tslib_1 from "tslib";
import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { CustomerCriteria } from 'src/app/modules/common/criterias/customer.criteria';
import { CustomerInfoComponent } from '../customer-info/customer-info.component';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { CustomerService } from 'src/app/modules/common/services/customer.service';
import { DatePipe } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap';
var CustomerListComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CustomerListComponent, _super);
    function CustomerListComponent(authService, router, dialog, service, datePipe) {
        var _this = _super.call(this, authService) || this;
        _this.router = router;
        _this.dialog = dialog;
        _this.service = service;
        _this.datePipe = datePipe;
        _this.criteria = new CustomerCriteria();
        _this.serverLink = '/api/Customer/Search';
        _this.onClosed = new EventEmitter();
        return _this;
    }
    CustomerListComponent.prototype.parseDateTOString = function (date) {
        if (date) {
            return this.datePipe.transform(date, 'dd/MM/yyyy');
        }
        return '';
    };
    CustomerListComponent.prototype.InitTable = function () {
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
                    action += '<button type="button" title="" method-name="select"  class="btn btn-outline-danger mr-1 btn-sm" param="' + oObj.ID + '"><i class="ft-edit"></i> Chọn Khách Hàng</button> ';
                    return action;
                }
            }
        ];
    };
    CustomerListComponent.prototype.RefreshTable = function () {
        this.table.ajax.reload();
    };
    CustomerListComponent.prototype.catchTable = function (event) {
        this.table = event;
    };
    CustomerListComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.InitTable();
                return [2 /*return*/];
            });
        });
    };
    CustomerListComponent.prototype.SetCriteria = function (aoData) {
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
    CustomerListComponent.prototype.add = function () {
        this.addCust.show(false, null);
    };
    CustomerListComponent.prototype.select = function (id) {
        this.onClosed.emit(id);
        this.modal.hide();
    };
    CustomerListComponent.prototype.show = function (companyId) {
        this.criteria.CompanyID = companyId;
        this.modal.show();
    };
    CustomerListComponent.prototype.hide = function () {
        this.modal.hide();
    };
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], CustomerListComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('addCust'),
        tslib_1.__metadata("design:type", CustomerInfoComponent)
    ], CustomerListComponent.prototype, "addCust", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], CustomerListComponent.prototype, "onClosed", void 0);
    CustomerListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-customer-list',
            templateUrl: './customer-list.component.html',
            styleUrls: ['./customer-list.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            Router,
            CommonDialogService,
            CustomerService,
            DatePipe])
    ], CustomerListComponent);
    return CustomerListComponent;
}(BaseComponent));
export { CustomerListComponent };
//# sourceMappingURL=customer-list.component.js.map