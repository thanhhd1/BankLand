import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MessageConstant, ImageType } from 'src/app/modules/common/constant/message.const';
import { BaseComponent } from 'src/app/modules/base.component';
import { DatePipe } from '@angular/common';
import { KaraokeCriteria } from 'src/app/modules/common/criterias/karaoke.criteria';
import { KaraokeInfoComponent } from './karaoke-info/karaoke-info.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { KaraokeService } from 'src/app/modules/common/services/karaoke.service';
import { KaraokeRoomComponent } from './karaoke-room/karaoke-room.component';
import { ImageStorageComponent } from '../image-storage/image-storage.component';
import { KaraokeHistoryComponent } from './karaoke-history/karaoke-history.component';
var KaraokeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(KaraokeComponent, _super);
    function KaraokeComponent(authService, router, dialog, service, datePipe) {
        var _this = _super.call(this, authService) || this;
        _this.router = router;
        _this.dialog = dialog;
        _this.service = service;
        _this.datePipe = datePipe;
        _this.criteria = new KaraokeCriteria();
        _this.serverLink = '/api/Karaoke/Search';
        return _this;
    }
    KaraokeComponent.prototype.InitTable = function () {
        var _this = this;
        this.compRef = this;
        this.aaSorting = [[0, 'asc']];
        this.aoColumnDefs = [
            { mData: 'BusinessName', aTargets: [0] },
            { mData: 'LicenseNumber', aTargets: [1] },
            { mData: 'LicenseDate', aTargets: [2] },
            { mData: 'Address', aTargets: [3] },
            { mData: 'OrganizationName', aTargets: [4] },
            { mData: 'RepresentativeName', aTargets: [5] },
            { mData: 'SocialNumber', aTargets: [6] },
            { mData: 'ProvideDate', aTargets: [7] },
            { mData: 'PlaceProvide', aTargets: [8] },
            { mData: 'Phone', aTargets: [9] },
            { mData: 'RepresentativeAddress', aTargets: [10] },
            { mData: 'LicenseTypeID', aTargets: [11] },
            { mData: 'ID', bSortable: false, aTargets: [12] }
        ];
        this.aoColumns = [
            {
                sTitle: 'Tên Kinh Doanh',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Số Giấy Phép',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Ngày Cấp',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return _this.datePipe.transform(data, 'dd/MM/yyyy');
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
                sTitle: 'Tổ Chức/Cá Nhân',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj && oObj.Organization && oObj.IsOrganization) {
                        return 'Tổ Chức - ' + oObj.Organization.Name;
                    }
                    return 'Cá Nhân';
                }
            },
            {
                sTitle: 'Người Đại Diện/Đăng Ký',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj && oObj.Organization && oObj.IsOrganization) {
                        return oObj.Organization.Representative.Name;
                    }
                    else if (oObj && oObj.Representative && !oObj.IsOrganization) {
                        return oObj.Representative.Name;
                    }
                    return '';
                }
            },
            {
                sTitle: 'CMND',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj && oObj.Organization && oObj.IsOrganization) {
                        return oObj.Organization.Representative.SocialNumber;
                    }
                    else if (oObj && oObj.Representative && !oObj.IsOrganization) {
                        return oObj.Representative.SocialNumber;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Ngày Cấp CMND',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj && oObj.Organization && oObj.IsOrganization) {
                        return _this.datePipe.transform(oObj.Organization.Representative.ProvideDate, 'dd/MM/yyyy');
                    }
                    else if (oObj && oObj.Representative && !oObj.IsOrganization) {
                        return _this.datePipe.transform(oObj.Representative.ProvideDate, 'dd/MM/yyyy');
                    }
                    return '';
                }
            },
            {
                sTitle: 'Nơi Cấp',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj && oObj.Organization && oObj.IsOrganization) {
                        return oObj.Organization.Representative.PlaceProvide;
                    }
                    else if (oObj && oObj.Representative && !oObj.IsOrganization) {
                        return oObj.Representative.PlaceProvide;
                    }
                    return '';
                }
            },
            {
                sTitle: 'SĐT',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj && oObj.Organization && oObj.IsOrganization) {
                        return oObj.Organization.Representative.Phone;
                    }
                    else if (oObj && oObj.Representative && !oObj.IsOrganization) {
                        return oObj.Representative.Phone;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Địa  Chỉ NĐD',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj && oObj.Organization && oObj.IsOrganization) {
                        return oObj.Organization.Representative.Address;
                    }
                    else if (oObj && oObj.Representative && !oObj.IsOrganization) {
                        return oObj.Representative.Address;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Loại Giấy Phép',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj && oObj.LicenseType) {
                        return oObj.LicenseType.Name;
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
                    action +=
                        '<button type="button" title="Rooms" method-name="rooms" class="btn btn-outline-info round  mr-1 btn-sm" param="' +
                            oObj.ID +
                            '" ><i class="la la-building"></i></button>';
                    if (oObj.IsExistFiles && oObj.Rooms && oObj.Rooms.length > 0) {
                        action +=
                            '<button type="button" title="Cấp Bổ Sung" method-name="appendDecision"  class="btn btn-outline-danger mr-1 btn-sm" param="' +
                                oObj.ID +
                                '"><i class="la la-unlink"></i> Cấp Bổ Sung</button> ';
                    }
                    action +=
                        '<button type="button"  method-name="showFiles"  class="btn btn-outline-primary mr-1 btn-sm" param="' +
                            oObj.ID +
                            '"><i class="la la-folder"></i> Hồ Sơ</button> ';
                    action +=
                        '<button type="button"  method-name="showImages"  class="btn btn-outline-success mr-1 btn-sm" param="' +
                            oObj.ID +
                            '"><i class="la la-image"></i> Hình Ảnh</button>';
                    action +=
                        '<button type="button" title="History" method-name="histories"  class="btn btn-outline-danger mr-1 btn-sm" param="' +
                            oObj.ID +
                            '"><i class="la la-unlink"></i> Lịch Sử Cấp Hồ Sơ</button>';
                    return action;
                }
            }
        ];
    };
    KaraokeComponent.prototype.RefreshTable = function () {
        this.table.ajax.reload();
    };
    KaraokeComponent.prototype.catchTable = function (event) {
        this.table = event;
    };
    KaraokeComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.InitTable();
                return [2 /*return*/];
            });
        });
    };
    KaraokeComponent.prototype.SetCriteria = function (aoData) {
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
    KaraokeComponent.prototype.add = function () {
        this.addModal.show(false, null);
    };
    KaraokeComponent.prototype.edit = function (id) {
        this.addModal.show(true, id);
    };
    KaraokeComponent.prototype.rooms = function (id) {
        this.modalRoom.show(id);
    };
    KaraokeComponent.prototype.showFiles = function (id) {
        this.imageStorageModal.show(id, ImageType.Karaoke_File, 1);
    };
    KaraokeComponent.prototype.showImages = function (id) {
        this.imageStorageModal.show(id, ImageType.Karaoke_Image, 0);
    };
    KaraokeComponent.prototype.histories = function (id) {
        this.historyModal.show(id);
    };
    KaraokeComponent.prototype.appendDecision = function (id) {
        var _this = this;
        this.dialog.showSwalConfirmAlert('Cấp Bổ Sung Hồ Sơ cho Karaoke này?')
            .then(function (isConfirm) {
            if (isConfirm) {
                _this.service.MoveHistory(id).subscribe(function (r) {
                    if (r) {
                        _this.dialog.showToastrSuccess('Cấp Bổ Sung Hồ Sơ', "Karaoke đã được lưu lich sử");
                        _this.RefreshTable();
                    }
                }, function (error) {
                    _this.dialog.showSwalErrorAlert('Cấp Bổ Sung Hồ Sơ', 'Xảy ra lỗi khi tiến hành chuyển hồ sơ cũ, vui lòng thử lại');
                });
            }
        });
    };
    KaraokeComponent.prototype.remove = function (id) {
        var _this = this;
        if (id) {
            this.dialog.showSwalConfirmAlert('Xóa Mục Này').then(function (isConfirm) {
                if (isConfirm) {
                    _this.service.Delete(id).subscribe(function (r) {
                        if (r) {
                            _this.dialog.showToastrSuccess('Xóa Mục', MessageConstant.REQUEST_SUCCESS_CONST);
                            _this.RefreshTable();
                        }
                    }, function (error) {
                        _this.dialog.showSwalErrorAlert('Xóa Mục', MessageConstant.DEL_ERROR_CONST);
                    });
                }
            });
        }
    };
    tslib_1.__decorate([
        ViewChild('addModal'),
        tslib_1.__metadata("design:type", KaraokeInfoComponent)
    ], KaraokeComponent.prototype, "addModal", void 0);
    tslib_1.__decorate([
        ViewChild('modalRoom'),
        tslib_1.__metadata("design:type", KaraokeRoomComponent)
    ], KaraokeComponent.prototype, "modalRoom", void 0);
    tslib_1.__decorate([
        ViewChild('imageStorageModal'),
        tslib_1.__metadata("design:type", ImageStorageComponent)
    ], KaraokeComponent.prototype, "imageStorageModal", void 0);
    tslib_1.__decorate([
        ViewChild('historyModal'),
        tslib_1.__metadata("design:type", KaraokeHistoryComponent)
    ], KaraokeComponent.prototype, "historyModal", void 0);
    KaraokeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-karaoke',
            templateUrl: './karaoke.component.html',
            styleUrls: ['./karaoke.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            Router,
            CommonDialogService,
            KaraokeService,
            DatePipe])
    ], KaraokeComponent);
    return KaraokeComponent;
}(BaseComponent));
export { KaraokeComponent };
//# sourceMappingURL=karaoke.component.js.map