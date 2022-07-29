import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { RoomCriteria } from 'src/app/modules/common/criterias/room.criteria';
import { RoomInfoComponent } from './room-info/room-info.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { DatePipe } from '@angular/common';
import { MessageConstant, ImageType } from 'src/app/modules/common/constant/message.const';
import { RoomService } from 'src/app/modules/common/services/room.service';
import { ImageStorageComponent } from '../image-storage/image-storage.component';
var RoomComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RoomComponent, _super);
    function RoomComponent(authService, router, dialog, activeRouter, service, datePipe) {
        var _this = _super.call(this, authService) || this;
        _this.router = router;
        _this.dialog = dialog;
        _this.activeRouter = activeRouter;
        _this.service = service;
        _this.datePipe = datePipe;
        _this.criteria = new RoomCriteria();
        _this.serverLink = '/api/Room/Search';
        activeRouter.params.subscribe(function (r) {
            _this.companyId = r['companyId'];
            if (!_this.companyId) {
                _this.router.navigateByUrl('/');
            }
        });
        return _this;
    }
    RoomComponent.prototype.InitTable = function () {
        this.compRef = this;
        this.aaSorting = [[0, 'asc']];
        this.aoColumnDefs = [
            { mData: 'Name', aTargets: [0] },
            { mData: 'RoomTypeId', aTargets: [1] },
            { mData: 'Price', aTargets: [2] },
            { mData: 'AreaRoom', aTargets: [3] },
            { mData: 'ID', aTargets: [4] }
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
                    if (oObj && oObj.RoomTypeId && oObj.RoomType) {
                        return oObj.RoomType.Name;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Giá Phòng',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Diện tích Phòng',
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
                    action +=
                        '<button type="button"  method-name="showImages"  class="btn btn-outline-success mr-1 btn-sm" param="' +
                            oObj.ID +
                            '"><i class="la la-image"></i> Hình Ảnh</button> ';
                    return action;
                }
            }
        ];
    };
    RoomComponent.prototype.RefreshTable = function () {
        this.table.ajax.reload();
    };
    RoomComponent.prototype.catchTable = function (event) {
        this.table = event;
    };
    RoomComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.InitTable();
                return [2 /*return*/];
            });
        });
    };
    RoomComponent.prototype.SetCriteria = function (aoData) {
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
    RoomComponent.prototype.add = function () {
        this.addModal.show(false, null);
    };
    RoomComponent.prototype.edit = function (id) {
        this.addModal.show(true, id);
    };
    RoomComponent.prototype.showFiles = function (id) {
        this.imageStorageModal.show(id, ImageType.Room_File, 1);
    };
    RoomComponent.prototype.showImages = function (id) {
        this.imageStorageModal.show(id, ImageType.Room_Image, 0);
    };
    RoomComponent.prototype.remove = function (id) {
        var _this = this;
        if (id) {
            this.dialog.showSwalConfirmAlert('Bạn Muốn Xóa Phòng Này').then(function (isConfirm) {
                if (isConfirm) {
                    _this.service.Delete(id).subscribe(function (r) {
                        if (r) {
                            _this.dialog.showToastrSuccess('Xóa Phòng', MessageConstant.REQUEST_SUCCESS_CONST);
                            _this.RefreshTable();
                        }
                    }, function (error) {
                        _this.dialog.showSwalErrorAlert('Xóa Phòng', MessageConstant.DEL_ERROR_CONST);
                    });
                }
            });
        }
    };
    tslib_1.__decorate([
        ViewChild('addModal'),
        tslib_1.__metadata("design:type", RoomInfoComponent)
    ], RoomComponent.prototype, "addModal", void 0);
    tslib_1.__decorate([
        ViewChild('imageStorageModal'),
        tslib_1.__metadata("design:type", ImageStorageComponent)
    ], RoomComponent.prototype, "imageStorageModal", void 0);
    RoomComponent = tslib_1.__decorate([
        Component({
            selector: 'app-room',
            templateUrl: './room.component.html',
            styleUrls: ['./room.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            Router,
            CommonDialogService,
            ActivatedRoute,
            RoomService,
            DatePipe])
    ], RoomComponent);
    return RoomComponent;
}(BaseComponent));
export { RoomComponent };
//# sourceMappingURL=room.component.js.map