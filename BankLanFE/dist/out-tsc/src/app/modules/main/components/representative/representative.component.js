import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { RepresentativeCriteria } from 'src/app/modules/common/criterias/representative.criteria';
import { RepresentativeInfoComponent } from './representative-info/representative-info.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { DatePipe } from '@angular/common';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { RepresentativeService } from 'src/app/modules/common/services/representative.service';
var RepresentativeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RepresentativeComponent, _super);
    function RepresentativeComponent(authService, router, dialog, service, datePipe) {
        var _this = _super.call(this, authService) || this;
        _this.router = router;
        _this.dialog = dialog;
        _this.service = service;
        _this.datePipe = datePipe;
        _this.criteria = new RepresentativeCriteria();
        _this.serverLink = '/api/Representative/Search';
        return _this;
    }
    RepresentativeComponent.prototype.InitTable = function () {
        var _this = this;
        this.compRef = this;
        this.aaSorting = [[0, 'asc']];
        this.aoColumnDefs = [
            { 'mData': 'Name', 'aTargets': [0] },
            { 'mData': 'Birthday', 'aTargets': [1] },
            { 'mData': 'SocialNumber', 'aTargets': [2] },
            { 'mData': 'ProvideDate', 'aTargets': [3] },
            { 'mData': 'PlaceProvide', 'aTargets': [4] },
            { 'mData': 'Email', 'aTargets': [5] },
            { "mData": "Address", "aTargets": [6] },
            { "mData": "Phone", "aTargets": [7] },
            { 'mData': 'ID', 'bSortable': false, 'aTargets': [8] }
        ];
        this.aoColumns = [
            {
                'sTitle': 'Name',
                'sClass': '',
                'mRender': function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                'sTitle': 'Birthdate',
                'sClass': '',
                'mRender': function (data, type, oObj) {
                    if (data) {
                        return _this.datePipe.transform(data, 'dd/MM/yyyy');
                    }
                    return '';
                }
            },
            {
                'sTitle': 'CMND',
                'sClass': '',
                'mRender': function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                'sTitle': 'Ngày Cấp',
                'sClass': '',
                'mRender': function (data, type, oObj) {
                    if (data) {
                        return _this.datePipe.transform(data, 'dd/MM/yyyy');
                    }
                    return '';
                }
            },
            {
                'sTitle': 'Nơi Cấp',
                'sClass': '',
                'mRender': function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                'sTitle': 'Email',
                'sClass': '',
                'mRender': function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                'sTitle': 'SĐT',
                'sClass': '',
                'mRender': function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return "";
                }
            },
            {
                'sTitle': 'Địa Chỉ',
                'sClass': '',
                'mRender': function (data, type, oObj) {
                    if (oObj) {
                        return oObj.Address;
                    }
                    return "";
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
    RepresentativeComponent.prototype.RefreshTable = function () {
        this.table.ajax.reload();
    };
    RepresentativeComponent.prototype.catchTable = function (event) {
        this.table = event;
    };
    RepresentativeComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.InitTable();
                return [2 /*return*/];
            });
        });
    };
    RepresentativeComponent.prototype.SetCriteria = function (aoData) {
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
    RepresentativeComponent.prototype.add = function () {
        this.addModal.show(false, null);
    };
    RepresentativeComponent.prototype.edit = function (id) {
        this.addModal.show(true, id);
    };
    RepresentativeComponent.prototype.remove = function (id) {
        var _this = this;
        if (id) {
            this.dialog.showSwalConfirmAlert('Xóa Mục Người Đại Diện').then(function (isConfirm) {
                if (isConfirm) {
                    _this.service.Delete(id).subscribe(function (r) {
                        if (r) {
                            _this.dialog.showToastrSuccess('Xóa Người Đại Diện', MessageConstant.REQUEST_SUCCESS_CONST);
                            _this.RefreshTable();
                        }
                    }, function (error) {
                        _this.dialog.showSwalErrorAlert('Xóa Người Đại Diện', 'Người đại diện này đang được sử dụng. Bạn Không thể xóa');
                    });
                }
            });
        }
    };
    tslib_1.__decorate([
        ViewChild('addModal'),
        tslib_1.__metadata("design:type", RepresentativeInfoComponent)
    ], RepresentativeComponent.prototype, "addModal", void 0);
    RepresentativeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-representative',
            templateUrl: './representative.component.html',
            styleUrls: ['./representative.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            Router,
            CommonDialogService,
            RepresentativeService,
            DatePipe])
    ], RepresentativeComponent);
    return RepresentativeComponent;
}(BaseComponent));
export { RepresentativeComponent };
//# sourceMappingURL=representative.component.js.map