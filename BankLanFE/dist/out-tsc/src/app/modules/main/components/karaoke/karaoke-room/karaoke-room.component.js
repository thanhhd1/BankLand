import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MessageConstant, ImageType } from 'src/app/modules/common/constant/message.const';
import { KaraokeRoomCriteria } from 'src/app/modules/common/criterias/karaoke-room.criteria';
import { BaseComponent } from 'src/app/modules/base.component';
import { ImageStorageComponent } from '../../image-storage/image-storage.component';
import { KaraokeRoomInfoComponent } from './karaoke-room-info/karaoke-room-info.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { KaraokeRoomService } from 'src/app/modules/common/services/karaoke-room.service';
import { ModalDirective } from 'ngx-bootstrap';
var KaraokeRoomComponent = /** @class */ (function (_super) {
    tslib_1.__extends(KaraokeRoomComponent, _super);
    function KaraokeRoomComponent(authService, router, dialog, service) {
        var _this = _super.call(this, authService) || this;
        _this.router = router;
        _this.dialog = dialog;
        _this.service = service;
        _this.criteria = new KaraokeRoomCriteria();
        _this.serverLink = '/api/KaraokeRoom/Search';
        return _this;
    }
    KaraokeRoomComponent.prototype.InitTable = function () {
        this.compRef = this;
        this.aaSorting = [[0, 'asc']];
        this.aoColumnDefs = [
            { mData: 'AreaRoom', aTargets: [0] },
            { mData: 'AreaRoom', aTargets: [1] },
            { mData: 'ID', bSortable: false, aTargets: [2] }
        ];
        this.aoColumns = [
            {
                sTitle: 'Room',
                sClass: '',
                mRender: function (data, type, oObj, full) {
                    if (data) {
                        return "Ph\u00F2ng " + (full.row + 1);
                    }
                    return '';
                }
            },
            {
                sTitle: 'Diện Tích Phòng',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return "" + data;
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
                    // action +=
                    //   '<button type="button"  method-name="showFiles"  class="btn btn-outline-primary mr-1 btn-sm" param="' +
                    //   oObj.ID +
                    //   '"><i class="la la-folder"></i> Hồ Sơ</button> ';
                    action +=
                        '<button type="button"  method-name="showImages"  class="btn btn-outline-success mr-1 btn-sm" param="' +
                            oObj.ID +
                            '"><i class="la la-image"></i> Hình Ảnh</button> ';
                    return action;
                }
            }
        ];
    };
    KaraokeRoomComponent.prototype.RefreshTable = function () {
        this.table.ajax.reload();
    };
    KaraokeRoomComponent.prototype.catchTable = function (event) {
        this.table = event;
    };
    KaraokeRoomComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.InitTable();
                return [2 /*return*/];
            });
        });
    };
    KaraokeRoomComponent.prototype.SetCriteria = function (aoData) {
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
    KaraokeRoomComponent.prototype.add = function () {
        this.addModal.show(false, null, this.criteria.KaraokeID);
    };
    KaraokeRoomComponent.prototype.edit = function (id) {
        this.addModal.show(true, id, this.criteria.KaraokeID);
    };
    KaraokeRoomComponent.prototype.cancel = function () {
        this.modal.hide();
    };
    KaraokeRoomComponent.prototype.show = function (karaokeId) {
        this.criteria = new KaraokeRoomCriteria();
        this.criteria.KaraokeID = karaokeId;
        this.RefreshTable();
        this.modal.show();
    };
    KaraokeRoomComponent.prototype.showFiles = function (id) {
        this.imageStorageModal.show(id, ImageType.KaraokeRoom_File, 1);
    };
    KaraokeRoomComponent.prototype.showImages = function (id) {
        this.imageStorageModal.show(id, ImageType.KaraokeRoom_Image, 0);
    };
    KaraokeRoomComponent.prototype.remove = function (id) {
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
                        _this.dialog.showSwalErrorAlert('Delete Customer', MessageConstant.DEL_ERROR_CONST);
                    });
                }
            });
        }
    };
    tslib_1.__decorate([
        ViewChild('addModal'),
        tslib_1.__metadata("design:type", KaraokeRoomInfoComponent)
    ], KaraokeRoomComponent.prototype, "addModal", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], KaraokeRoomComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('imageStorageModal'),
        tslib_1.__metadata("design:type", ImageStorageComponent)
    ], KaraokeRoomComponent.prototype, "imageStorageModal", void 0);
    KaraokeRoomComponent = tslib_1.__decorate([
        Component({
            selector: 'app-karaoke-room',
            templateUrl: './karaoke-room.component.html',
            styleUrls: ['./karaoke-room.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            Router,
            CommonDialogService,
            KaraokeRoomService])
    ], KaraokeRoomComponent);
    return KaraokeRoomComponent;
}(BaseComponent));
export { KaraokeRoomComponent };
//# sourceMappingURL=karaoke-room.component.js.map