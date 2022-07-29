import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MessageConstant } from '../../common/constant/message.const';
import { LicenseTypeInfoComponent } from './license-type-info/license-type-info.component';
import { BaseComponent } from '../../base.component';
import { AuthenticationService } from '../../common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from '../../common/services/dialog.service';
import { LicenseTypeService } from '../../common/services/license-type.service';
import { LicenseTypeCriteria } from '../../../modules/common/criterias/license-type.criteria';
var LicenseTypeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LicenseTypeComponent, _super);
    function LicenseTypeComponent(authService, router, dialog, service) {
        var _this = _super.call(this, authService) || this;
        _this.router = router;
        _this.dialog = dialog;
        _this.service = service;
        _this.criteria = new LicenseTypeCriteria();
        _this.serverLink = '/api/LicenseType/Search';
        return _this;
    }
    LicenseTypeComponent.prototype.InitTable = function () {
        this.compRef = this;
        this.aaSorting = [[0, 'asc']];
        this.aoColumnDefs = [
            { 'mData': 'Name', 'aTargets': [0] },
            { 'mData': 'ID', 'bSortable': false, 'aTargets': [1] }
        ];
        this.aoColumns = [
            {
                'sTitle': 'Loại Giấy Phép',
                'sClass': '',
                'mRender': function (data, type, oObj) {
                    if (data) {
                        return data;
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
    LicenseTypeComponent.prototype.RefreshTable = function () {
        this.table.ajax.reload();
    };
    LicenseTypeComponent.prototype.catchTable = function (event) {
        this.table = event;
    };
    LicenseTypeComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.InitTable();
                return [2 /*return*/];
            });
        });
    };
    LicenseTypeComponent.prototype.SetCriteria = function (aoData) {
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
    LicenseTypeComponent.prototype.add = function () {
        this.addModal.show(false, null);
    };
    LicenseTypeComponent.prototype.edit = function (id) {
        this.addModal.show(true, id);
    };
    LicenseTypeComponent.prototype.remove = function (id) {
        var _this = this;
        if (id) {
            this.dialog.showSwalConfirmAlert('Delete this item').then(function (isConfirm) {
                if (isConfirm) {
                    _this.service.Delete(id).subscribe(function (r) {
                        if (r) {
                            _this.dialog.showToastrSuccess('Delete Customer', MessageConstant.REQUEST_SUCCESS_CONST);
                            _this.RefreshTable();
                        }
                    }, function (error) {
                        _this.dialog.showSwalErrorAlert('Delete Customer', 'Unable to delete! This service has some records in the system.');
                    });
                }
            });
        }
    };
    tslib_1.__decorate([
        ViewChild('addModal'),
        tslib_1.__metadata("design:type", LicenseTypeInfoComponent)
    ], LicenseTypeComponent.prototype, "addModal", void 0);
    LicenseTypeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-license-type',
            templateUrl: './license-type.component.html',
            styleUrls: ['./license-type.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            Router,
            CommonDialogService,
            LicenseTypeService])
    ], LicenseTypeComponent);
    return LicenseTypeComponent;
}(BaseComponent));
export { LicenseTypeComponent };
//# sourceMappingURL=license-type.component.js.map