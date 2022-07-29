import * as tslib_1 from "tslib";
import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { DatePipe } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap';
import { ServicesManagementInfoComponent } from '../services-management-info/services-management-info.component';
import { MenuCriteria } from 'src/app/modules/common/criterias/menu.criteria';
import { MenuService } from 'src/app/modules/common/services/menu.service';
var ServiceListComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ServiceListComponent, _super);
    function ServiceListComponent(authService, router, dialog, service, datePipe) {
        var _this = _super.call(this, authService) || this;
        _this.router = router;
        _this.dialog = dialog;
        _this.service = service;
        _this.datePipe = datePipe;
        _this.criteria = new MenuCriteria();
        _this.serverLink = '/api/Menu/Search';
        _this.onClosed = new EventEmitter();
        return _this;
    }
    ServiceListComponent.prototype.parseDateTOString = function (date) {
        if (date) {
            return this.datePipe.transform(date, 'dd/MM/yyyy');
        }
        return '';
    };
    ServiceListComponent.prototype.InitTable = function () {
        this.compRef = this;
        this.aaSorting = [[0, 'asc']];
        this.aoColumnDefs = [
            { mData: 'Name', aTargets: [0] },
            { mData: 'Price', aTargets: [1] },
            { mData: 'UnitName', aTargets: [2] },
            { mData: 'Unit', aTargets: [3] },
            { mData: 'Unit', aTargets: [4] },
            { mData: 'Unit', aTargets: [5] },
            { mData: 'ID', bSortable: false, aTargets: [6] }
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
                'sTitle': 'Actions',
                'sClass': 'text-center',
                'mRender': function (data, type, oObj) {
                    var action = '';
                    action += '<button type="button" title="" method-name="select"  class="btn btn-outline-danger mr-1 btn-sm" param="' + data + '"><i class="ft-edit"></i> Chọn Dịch Vụ</button> ';
                    return action;
                }
            }
        ];
    };
    ServiceListComponent.prototype.RefreshTable = function () {
        this.table.ajax.reload();
    };
    ServiceListComponent.prototype.catchTable = function (event) {
        this.table = event;
    };
    ServiceListComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.InitTable();
                return [2 /*return*/];
            });
        });
    };
    ServiceListComponent.prototype.SetCriteria = function (aoData) {
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
    ServiceListComponent.prototype.add = function () {
        this.addModal.show(false, null);
    };
    ServiceListComponent.prototype.select = function (id) {
        this.onClosed.emit(id);
        this.modal.hide();
    };
    ServiceListComponent.prototype.show = function (companyId) {
        this.criteria.CompanyID = companyId;
        this.modal.show();
    };
    ServiceListComponent.prototype.hide = function () {
        this.modal.hide();
    };
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], ServiceListComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('addModal'),
        tslib_1.__metadata("design:type", ServicesManagementInfoComponent)
    ], ServiceListComponent.prototype, "addModal", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ServiceListComponent.prototype, "onClosed", void 0);
    ServiceListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-service-list',
            templateUrl: './service-list.component.html',
            styleUrls: ['./service-list.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            Router,
            CommonDialogService,
            MenuService,
            DatePipe])
    ], ServiceListComponent);
    return ServiceListComponent;
}(BaseComponent));
export { ServiceListComponent };
//# sourceMappingURL=service-list.component.js.map