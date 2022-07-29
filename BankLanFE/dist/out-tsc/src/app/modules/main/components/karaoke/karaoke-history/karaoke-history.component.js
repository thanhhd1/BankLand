import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { KaraokeHistoryCriteria } from 'src/app/modules/common/criterias/karaoke-history.criteria';
import { ModalDirective } from 'ngx-bootstrap';
import { ImageStorageComponent } from '../../image-storage/image-storage.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ImageType } from 'src/app/modules/common/constant/message.const';
import { KaraokeHistoryService } from 'src/app/modules/common/services/karaoke-history.service';
import { DatePipe } from '@angular/common';
var KaraokeHistoryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(KaraokeHistoryComponent, _super);
    function KaraokeHistoryComponent(authService, router, dialog, service, datePipe) {
        var _this = _super.call(this, authService) || this;
        _this.router = router;
        _this.dialog = dialog;
        _this.service = service;
        _this.datePipe = datePipe;
        _this.criteria = new KaraokeHistoryCriteria();
        _this.serverLink = '/api/KaraokeHistory/Search';
        return _this;
    }
    KaraokeHistoryComponent.prototype.InitTable = function () {
        var _this = this;
        this.compRef = this;
        this.aaSorting = [[0, 'asc']];
        this.aoColumnDefs = [
            { mData: 'BusinessName', aTargets: [0] },
            { mData: 'LicenseNumber', aTargets: [1] },
            { mData: 'LicenseDate', aTargets: [2] },
            { mData: 'Address', aTargets: [3] },
            { mData: 'OrganizationID', aTargets: [4] },
            { mData: 'OrganizationID', aTargets: [5] },
            { mData: 'OrganizationID', aTargets: [6] },
            { mData: 'OrganizationID', aTargets: [7] },
            { mData: 'OrganizationID', aTargets: [8] },
            { mData: 'OrganizationID', aTargets: [9] },
            { mData: 'RepresentativeID', aTargets: [10] },
            { mData: 'LicenseTypeID', aTargets: [11] },
            { mData: 'HistoryDate', aTargets: [12] },
            { mData: 'ID', bSortable: false, aTargets: [13] }
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
                sTitle: 'Tổ Chức',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj && oObj.IsOrganization) {
                        return oObj.OrganizationName;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Người Đại Diện',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj) {
                        return oObj.RepresentativeName;
                    }
                    return '';
                }
            },
            {
                sTitle: 'CMND',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj) {
                        return oObj.RepresentativeSocialNumber;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Ngày Cấp',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj) {
                        return _this.datePipe.transform(oObj.RepresentativeProvideDate, 'dd/MM/yyyy');
                    }
                    return '';
                }
            },
            {
                sTitle: 'Nơi Cấp',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj) {
                        return oObj.RepresentativePlaceProvide;
                    }
                    return '';
                }
            },
            {
                sTitle: 'SĐT',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj) {
                        return oObj.RepresentativePhone;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Địa  Chỉ NĐD',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj) {
                        return oObj.RepresentativeAddress;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Loại Giấy Phép',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj) {
                        return oObj.LicenseTypeName;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Ngày Huỷ',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj) {
                        return _this.datePipe.transform(oObj.HistoryDate, 'dd/MM/yyyy HH:mm');
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
                        '<button type="button"  method-name="showFiles"  class="btn btn-outline-primary mr-1 btn-sm" param="' +
                            oObj.ID +
                            '"><i class="la la-folder"></i> Hồ Sơ</button> ';
                    action +=
                        '<button type="button"  method-name="showImages"  class="btn btn-outline-success mr-1 btn-sm" param="' +
                            oObj.ID +
                            '"><i class="la la-image"></i> Hình Ảnh</button> ';
                    return action;
                }
            }
        ];
    };
    KaraokeHistoryComponent.prototype.RefreshTable = function () {
        this.table.ajax.reload();
    };
    KaraokeHistoryComponent.prototype.catchTable = function (event) {
        this.table = event;
    };
    KaraokeHistoryComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.InitTable();
                return [2 /*return*/];
            });
        });
    };
    KaraokeHistoryComponent.prototype.SetCriteria = function (aoData) {
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
    KaraokeHistoryComponent.prototype.cancel = function () {
        this.modal.hide();
    };
    KaraokeHistoryComponent.prototype.show = function (id) {
        this.criteria = new KaraokeHistoryCriteria();
        this.criteria.KaraokeID = id;
        this.RefreshTable();
        this.modal.show();
    };
    KaraokeHistoryComponent.prototype.showFiles = function (id) {
        this.imageStorageModal.show(id, ImageType.Karaoke_File, 1);
    };
    KaraokeHistoryComponent.prototype.showImages = function (id) {
        this.imageStorageModal.show(id, ImageType.Karaoke_Image, 0);
    };
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], KaraokeHistoryComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('imageStorageModal'),
        tslib_1.__metadata("design:type", ImageStorageComponent)
    ], KaraokeHistoryComponent.prototype, "imageStorageModal", void 0);
    KaraokeHistoryComponent = tslib_1.__decorate([
        Component({
            selector: 'app-karaoke-history',
            templateUrl: './karaoke-history.component.html',
            styleUrls: ['./karaoke-history.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            Router,
            CommonDialogService,
            KaraokeHistoryService,
            DatePipe])
    ], KaraokeHistoryComponent);
    return KaraokeHistoryComponent;
}(BaseComponent));
export { KaraokeHistoryComponent };
//# sourceMappingURL=karaoke-history.component.js.map