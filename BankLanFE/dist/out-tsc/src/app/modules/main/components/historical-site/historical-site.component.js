import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MessageConstant, ImageType } from 'src/app/modules/common/constant/message.const';
import { HistoricalSiteCriteria } from 'src/app/modules/common/criterias/historical-site.criteria';
import { BaseComponent } from 'src/app/modules/base.component';
import { HistoricalSiteInfoComponent } from './historical-site-info/historical-site-info.component';
import { ImageStorageComponent } from '../image-storage/image-storage.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { HistoricalSiteService } from 'src/app/modules/common/services/historical-site.service';
import { DatePipe } from '@angular/common';
var HistoricalSiteComponent = /** @class */ (function (_super) {
    tslib_1.__extends(HistoricalSiteComponent, _super);
    function HistoricalSiteComponent(authService, router, dialog, service, datePipe) {
        var _this = _super.call(this, authService) || this;
        _this.router = router;
        _this.dialog = dialog;
        _this.service = service;
        _this.datePipe = datePipe;
        _this.criteria = new HistoricalSiteCriteria();
        _this.serverLink = '/api/HistoricalSite/Search';
        return _this;
    }
    HistoricalSiteComponent.prototype.InitTable = function () {
        var _this = this;
        this.compRef = this;
        this.aaSorting = [[0, 'asc']];
        this.aoColumnDefs = [
            { mData: 'Name', aTargets: [0] },
            { mData: 'Category', aTargets: [1] },
            { mData: 'Address', aTargets: [2] },
            { mData: 'Profile', aTargets: [3] },
            { mData: 'OrderNumberRecognition', aTargets: [4] },
            { mData: 'DecisionBy', aTargets: [5] },
            { mData: 'DecisionDate', aTargets: [6] },
            { mData: 'ID', bSortable: false, aTargets: [7] }
        ];
        this.aoColumns = [
            {
                sTitle: 'Tên Di Tích',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Xếp  Hạng Di Tích',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data != undefined) {
                        return _this.getHistoricalType(data);
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
                sTitle: 'Sơ Yếu Lý Lịch',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Số Công Nhận',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Cấp thẩm quyền công nhận',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Ngày Ra QĐ',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return _this.datePipe.transform(data, 'dd/MM/yyyy');
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
                        '<button type="button" title="Sửa" method-name="edit"  class="btn btn-outline-info mr-1 btn-sm" param="' +
                            oObj.ID +
                            '"><i class="ft-edit"></i></button> ';
                    action +=
                        '<button type="button" title="Xoá" method-name="remove" class="btn btn-outline-danger round  mr-1 btn-sm" param="' +
                            oObj.ID +
                            '" ><i class="ft-trash-2"></i></button>';
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
    HistoricalSiteComponent.prototype.RefreshTable = function () {
        this.table.ajax.reload();
    };
    HistoricalSiteComponent.prototype.catchTable = function (event) {
        this.table = event;
    };
    HistoricalSiteComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.InitTable();
                this.criteria.Category = "";
                return [2 /*return*/];
            });
        });
    };
    HistoricalSiteComponent.prototype.SetCriteria = function (aoData) {
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
    HistoricalSiteComponent.prototype.add = function () {
        this.addModal.show(false, null);
    };
    HistoricalSiteComponent.prototype.edit = function (id) {
        this.addModal.show(true, id);
    };
    HistoricalSiteComponent.prototype.showFiles = function (id) {
        this.imageStorageModal.show(id, ImageType.HistoricalSite_File, 1);
    };
    HistoricalSiteComponent.prototype.showImages = function (id) {
        this.imageStorageModal.show(id, ImageType.HitoricalSite_Image, 0);
    };
    HistoricalSiteComponent.prototype.remove = function (id) {
        var _this = this;
        if (id) {
            this.dialog.showSwalConfirmAlert('Xoá Mục Này').then(function (isConfirm) {
                if (isConfirm) {
                    _this.service.Delete(id).subscribe(function (r) {
                        if (r) {
                            _this.dialog.showToastrSuccess('Xoá Di Tích Lịch Sử', MessageConstant.REQUEST_SUCCESS_CONST);
                            _this.RefreshTable();
                        }
                    }, function (error) {
                        _this.dialog.showSwalErrorAlert('Xoá Di Tích Lịch Sử', MessageConstant.DEL_ERROR_CONST);
                    });
                }
            });
        }
    };
    tslib_1.__decorate([
        ViewChild('addModal'),
        tslib_1.__metadata("design:type", HistoricalSiteInfoComponent)
    ], HistoricalSiteComponent.prototype, "addModal", void 0);
    tslib_1.__decorate([
        ViewChild('imageStorageModal'),
        tslib_1.__metadata("design:type", ImageStorageComponent)
    ], HistoricalSiteComponent.prototype, "imageStorageModal", void 0);
    HistoricalSiteComponent = tslib_1.__decorate([
        Component({
            selector: 'app-historical-site',
            templateUrl: './historical-site.component.html',
            styleUrls: ['./historical-site.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            Router,
            CommonDialogService,
            HistoricalSiteService,
            DatePipe])
    ], HistoricalSiteComponent);
    return HistoricalSiteComponent;
}(BaseComponent));
export { HistoricalSiteComponent };
//# sourceMappingURL=historical-site.component.js.map