import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { CompanyService } from 'src/app/modules/common/services/company.service';
import { CompanyCriteria } from 'src/app/modules/common/criterias/company.criteria';
import { BaseComponent } from 'src/app/modules/base.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { ImageStorageComponent } from '../image-storage/image-storage.component';
import { MessageConstant, ImageType } from 'src/app/modules/common/constant/message.const';
import { LicenseTypeService } from 'src/app/modules/common/services/license-type.service';
var CompanyComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CompanyComponent, _super);
    function CompanyComponent(authService, router, dialog, service, licenseTypeService, datePipe) {
        var _this = _super.call(this, authService) || this;
        _this.router = router;
        _this.dialog = dialog;
        _this.service = service;
        _this.licenseTypeService = licenseTypeService;
        _this.datePipe = datePipe;
        _this.criteria = new CompanyCriteria();
        _this.serverLink = '/api/Company/Search';
        _this.licenseTypes = new Array();
        _this.Submitting = false;
        _this.getLicenseType();
        return _this;
    }
    CompanyComponent.prototype.getLicenseType = function () {
        var _this = this;
        this.licenseTypes = [];
        this.licenseTypeService.GetAll().subscribe(function (r) {
            if (r) {
                _this.licenseTypes = r.sort(function (a, b) {
                    return a.Name > b.Name ? 1 : a.Name === b.Name ? 0 : -1;
                });
            }
        });
    };
    CompanyComponent.prototype.InitTable = function () {
        var _this = this;
        this.compRef = this;
        this.aaSorting = [[0, 'asc']];
        this.aoColumnDefs = [
            { mData: 'CompanyType', aTargets: [0] },
            { mData: 'Name', aTargets: [1] },
            { mData: 'Address', aTargets: [2] },
            { mData: 'CellPhoneNumber', aTargets: [3] },
            { mData: 'PhoneNumber', aTargets: [4] },
            { mData: 'Email', aTargets: [5] },
            { mData: 'LicenseNumber', aTargets: [6] },
            { mData: 'LicenseDate', aTargets: [7] },
            { mData: 'ProvideBy', aTargets: [8] },
            { mData: 'IsOrganization', aTargets: [9] },
            { mData: 'OrganizationID', aTargets: [10] },
            { mData: 'RepresentativeID', aTargets: [11] },
            { mData: 'LicenseTypeID', aTargets: [12] },
            { mData: 'ID', aTargets: [13] }
        ];
        this.aoColumns = [
            {
                sTitle: 'Loại Hình Đăng Ký',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data != undefined) {
                        return _this.getCompanyType(data);
                    }
                    return '';
                }
            },
            {
                sTitle: 'Tên Khách Sạn, Nhà Nghỉ..',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
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
                sTitle: 'Số Điện Thoại Di Động',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Số Điện Thoại Bàn',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Email',
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
                sTitle: 'Cơ Quan Cấp',
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
                    if (oObj && oObj.Organization && oObj.IsOrganization) {
                        return oObj.Organization.Name;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Người Đại Diện',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj && oObj.IsOrganization && oObj.Organization) {
                        return oObj.Organization.Representative.Name;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Người Đăng Ký',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj && !oObj.IsOrganization && oObj.Representative) {
                        return oObj.Representative.Name;
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
                    if (_this.currentUser.Role === 'Administrator') {
                        action +=
                            '<button type="button" title="Edit" method-name="edit"  class="btn btn-outline-info mr-1 btn-sm" param="' +
                                oObj.ID +
                                '"><i class="ft-edit"></i></button> ';
                        action +=
                            '<button type="button" title="Delete" method-name="remove" class="btn btn-outline-danger round  mr-1 btn-sm" param="' +
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
                    }
                    action +=
                        '<a href="' +
                            ("/management/rooms/" + oObj.ID) +
                            '"   class="btn btn-outline-info  mr-1 btn-sm" param="' +
                            oObj.ID +
                            '" ><i class="la la-folder"></i>  Danh Sách Phòng</button>';
                    return action;
                }
            }
        ];
    };
    CompanyComponent.prototype.RefreshTable = function () {
        this.table.ajax.reload();
    };
    CompanyComponent.prototype.catchTable = function (event) {
        this.table = event;
    };
    CompanyComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.InitTable();
                this.criteria.LicenseTypeID = '';
                this.criteria.CompanyType = '';
                return [2 /*return*/];
            });
        });
    };
    CompanyComponent.prototype.SetCriteria = function (aoData) {
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
    CompanyComponent.prototype.add = function () {
        this.addModal.show(false, null);
    };
    CompanyComponent.prototype.edit = function (id) {
        this.addModal.show(true, id);
    };
    CompanyComponent.prototype.showFiles = function (id) {
        this.imageStorageModal.show(id, ImageType.Company_File, 1);
    };
    CompanyComponent.prototype.showImages = function (id) {
        this.imageStorageModal.show(id, ImageType.Company_Image, 0);
    };
    CompanyComponent.prototype.remove = function (id) {
        var _this = this;
        if (id) {
            this.dialog
                .showSwalConfirmAlert('Bạn Muốn Xóa Khách Sạn, Nhà Nghỉ, Homstay')
                .then(function (isConfirm) {
                if (isConfirm) {
                    _this.service.Delete(id).subscribe(function (r) {
                        if (r) {
                            _this.dialog.showToastrSuccess('Xóa Khách Sạn, Nhà Nghỉ, Homstay', MessageConstant.REQUEST_SUCCESS_CONST);
                            _this.RefreshTable();
                        }
                    }, function (error) {
                        _this.dialog.showSwalErrorAlert('Xóa Khách Sạn, Nhà Nghỉ, Homstay', MessageConstant.DEL_ERROR_CONST);
                    });
                }
            });
        }
    };
    tslib_1.__decorate([
        ViewChild('addModal'),
        tslib_1.__metadata("design:type", CompanyInfoComponent)
    ], CompanyComponent.prototype, "addModal", void 0);
    tslib_1.__decorate([
        ViewChild('imageStorageModal'),
        tslib_1.__metadata("design:type", ImageStorageComponent)
    ], CompanyComponent.prototype, "imageStorageModal", void 0);
    CompanyComponent = tslib_1.__decorate([
        Component({
            selector: 'app-company',
            templateUrl: './company.component.html',
            styleUrls: ['./company.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            Router,
            CommonDialogService,
            CompanyService,
            LicenseTypeService,
            DatePipe])
    ], CompanyComponent);
    return CompanyComponent;
}(BaseComponent));
export { CompanyComponent };
//# sourceMappingURL=company.component.js.map