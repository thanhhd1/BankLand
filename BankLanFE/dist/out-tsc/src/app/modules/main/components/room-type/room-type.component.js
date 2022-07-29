import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { RoomTypeCriteria } from 'src/app/modules/common/criterias/room-type.criteria';
import { RoomTypeInfoComponent } from './room-type-info/room-type-info.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { DatePipe } from '@angular/common';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { RoomTypeService } from 'src/app/modules/common/services/room-type.service';
var RoomTypeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RoomTypeComponent, _super);
    function RoomTypeComponent(authService, router, dialog, service, datePipe) {
        var _this = _super.call(this, authService) || this;
        _this.router = router;
        _this.dialog = dialog;
        _this.service = service;
        _this.datePipe = datePipe;
        _this.criteria = new RoomTypeCriteria();
        _this.serverLink = '/api/RoomType/Search';
        return _this;
    }
    RoomTypeComponent.prototype.InitTable = function () {
        this.compRef = this;
        this.aaSorting = [[0, 'asc']];
        this.aoColumnDefs = [
            { mData: 'Name', aTargets: [0] },
            { mData: 'KindOfRoom', aTargets: [1] },
        ];
        this.aoColumns = [
            {
                sTitle: 'Tên Phòng',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Loại Phòng',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Actions',
                sClass: 'text-center',
                mRender: function (data, type, oObj) {
                    var action = '';
                    action += '<button type="button" title="Edit" method-name="edit"  class="btn btn-outline-info mr-1 btn-sm" param="' + oObj.ID + '"><i class="ft-edit"></i></button> ';
                    action += '<button type="button" title="Delete" method-name="remove" class="btn btn-outline-danger round  mr-1 btn-sm" param="' + oObj.ID + '" ><i class="ft-trash-2"></i></button>';
                    return action;
                }
            }
        ];
    };
    RoomTypeComponent.prototype.RefreshTable = function () {
        this.table.ajax.reload();
    };
    RoomTypeComponent.prototype.catchTable = function (event) {
        this.table = event;
    };
    RoomTypeComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.InitTable();
                return [2 /*return*/];
            });
        });
    };
    RoomTypeComponent.prototype.SetCriteria = function (aoData) {
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
    RoomTypeComponent.prototype.add = function () {
        this.addModal.show(false, null);
    };
    RoomTypeComponent.prototype.edit = function (id) {
        this.addModal.show(true, id);
    };
    RoomTypeComponent.prototype.remove = function (id) {
        var _this = this;
        if (id) {
            this.dialog.showSwalConfirmAlert('Bạn Muốn Xóa Loại Phòng Này').then(function (isConfirm) {
                if (isConfirm) {
                    _this.service.Delete(id).subscribe(function (r) {
                        if (r) {
                            _this.dialog.showToastrSuccess('Xóa Loại Phòng', MessageConstant.REQUEST_SUCCESS_CONST);
                            _this.RefreshTable();
                        }
                    }, function (error) {
                        _this.dialog.showSwalErrorAlert('Xóa Loại Phòng', MessageConstant.DEL_ERROR_CONST);
                    });
                }
            });
        }
    };
    tslib_1.__decorate([
        ViewChild('addModal'),
        tslib_1.__metadata("design:type", RoomTypeInfoComponent)
    ], RoomTypeComponent.prototype, "addModal", void 0);
    RoomTypeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-room-type',
            templateUrl: './room-type.component.html',
            styleUrls: ['./room-type.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            Router,
            CommonDialogService,
            RoomTypeService,
            DatePipe])
    ], RoomTypeComponent);
    return RoomTypeComponent;
}(BaseComponent));
export { RoomTypeComponent };
//# sourceMappingURL=room-type.component.js.map