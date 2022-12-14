import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MessageConstant, ImageType } from 'src/app/modules/common/constant/message.const';
import { BaseComponent } from 'src/app/modules/base.component';
import { ImageStorageComponent } from '../image-storage/image-storage.component';
import { InternetCriteria } from 'src/app/modules/common/criterias/internet.criteria';
import { InternetInfoComponent } from './internet-info/internet-info.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { InternetService } from 'src/app/modules/common/services/internet.service';
import { DatePipe } from '@angular/common';
var InternetComponent = /** @class */ (function (_super) {
    tslib_1.__extends(InternetComponent, _super);
    function InternetComponent(authService, router, dialog, service, datePipe) {
        var _this = _super.call(this, authService) || this;
        _this.router = router;
        _this.dialog = dialog;
        _this.service = service;
        _this.datePipe = datePipe;
        _this.criteria = new InternetCriteria();
        _this.serverLink = '/api/Internet/Search';
        return _this;
    }
    InternetComponent.prototype.InitTable = function () {
        var _this = this;
        this.compRef = this;
        this.aaSorting = [[0, 'asc']];
        this.aoColumnDefs = [
            { mData: 'LicenseNumber', aTargets: [0] },
            { mData: 'LicenseFromDate', aTargets: [1] },
            { mData: 'TotalComputer', aTargets: [2] },
            { mData: 'AreaRoom', aTargets: [3] },
            { mData: 'OrganizationName', aTargets: [4] },
            { mData: 'RepresentativeName', aTargets: [5] },
            { mData: 'SocialNumber', aTargets: [6] },
            { mData: 'ProvideDate', aTargets: [7] },
            { mData: 'PlaceProvide', aTargets: [8] },
            { mData: 'Phone', aTargets: [9] },
            { mData: 'RepresentativeAddress', aTargets: [10] },
            { mData: 'LicenseTypeID', aTargets: [11] },
            { mData: 'Address', aTargets: [12] }
        ];
        this.aoColumns = [
            {
                sTitle: 'S??? Gi???y Ph??p',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Ng??y C???p',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return _this.datePipe.transform(data, 'dd/MM/yyyy');
                    }
                    return '';
                }
            },
            {
                sTitle: 'S???  M??y T??nh',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Di???n t??ch Ph??ng',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'T??? Ch???c/C?? Nh??n',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj && oObj.Organization && oObj.IsOrganization) {
                        return 'T??? Ch???c - ' + oObj.Organization.Name;
                    }
                    return 'C?? Nh??n';
                }
            },
            {
                sTitle: 'Ng?????i ?????i Di???n/ ????ng K??',
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
                sTitle: 'Ng??y C???p CMND',
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
                sTitle: 'N??i C???p',
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
                sTitle: 'S??T',
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
                sTitle: '?????a  Ch??? N??D',
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
                sTitle: 'Lo???i Gi???y Ph??p',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj && oObj.LicenseType) {
                        return oObj.LicenseType.Name;
                    }
                    return '';
                }
            },
            {
                sTitle: '?????a Ch??? ????ng K??',
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
                            '"><i class="la la-folder"></i> H??? S??</button> ';
                    action +=
                        '<button type="button"  method-name="showImages"  class="btn btn-outline-success mr-1 btn-sm" param="' +
                            oObj.ID +
                            '"><i class="la la-image"></i> H??nh ???nh</button> ';
                    return action;
                }
            }
        ];
    };
    InternetComponent.prototype.RefreshTable = function () {
        this.table.ajax.reload();
    };
    InternetComponent.prototype.catchTable = function (event) {
        this.table = event;
    };
    InternetComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.InitTable();
                return [2 /*return*/];
            });
        });
    };
    InternetComponent.prototype.SetCriteria = function (aoData) {
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
    InternetComponent.prototype.add = function () {
        this.addModal.show(false, null);
    };
    InternetComponent.prototype.edit = function (id) {
        this.addModal.show(true, id);
    };
    InternetComponent.prototype.showFiles = function (id) {
        this.imageStorageModal.show(id, ImageType.Internet_File, 1);
    };
    InternetComponent.prototype.showImages = function (id) {
        this.imageStorageModal.show(id, ImageType.Internet_Image, 0);
    };
    InternetComponent.prototype.remove = function (id) {
        var _this = this;
        if (id) {
            this.dialog.showSwalConfirmAlert('X??a M???c N??y').then(function (isConfirm) {
                if (isConfirm) {
                    _this.service.Delete(id).subscribe(function (r) {
                        if (r) {
                            _this.dialog.showToastrSuccess('X??a Internet', MessageConstant.REQUEST_SUCCESS_CONST);
                            _this.RefreshTable();
                        }
                    }, function (error) {
                        _this.dialog.showSwalErrorAlert('X??a Internet', MessageConstant.DEL_ERROR_CONST);
                    });
                }
            });
        }
    };
    tslib_1.__decorate([
        ViewChild('addModal'),
        tslib_1.__metadata("design:type", InternetInfoComponent)
    ], InternetComponent.prototype, "addModal", void 0);
    tslib_1.__decorate([
        ViewChild('imageStorageModal'),
        tslib_1.__metadata("design:type", ImageStorageComponent)
    ], InternetComponent.prototype, "imageStorageModal", void 0);
    InternetComponent = tslib_1.__decorate([
        Component({
            selector: 'app-internet',
            templateUrl: './internet.component.html',
            styleUrls: ['./internet.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            Router,
            CommonDialogService,
            InternetService,
            DatePipe])
    ], InternetComponent);
    return InternetComponent;
}(BaseComponent));
export { InternetComponent };
//# sourceMappingURL=internet.component.js.map