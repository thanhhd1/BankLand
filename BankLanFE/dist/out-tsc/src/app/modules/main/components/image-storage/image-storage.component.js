import * as tslib_1 from "tslib";
import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { BaseComponent } from 'src/app/modules/base.component';
import { ImageStorageCriteria } from 'src/app/modules/common/criterias/image-storage.criteria';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { ImageStorageInfoComponent } from './image-storage-info/image-storage-info.component';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ImageStorageService } from 'src/app/modules/common/services/image-storage.service';
import { DatePipe } from '@angular/common';
var ImageStorageComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ImageStorageComponent, _super);
    function ImageStorageComponent(authService, router, dialog, service, datePipe) {
        var _this = _super.call(this, authService) || this;
        _this.router = router;
        _this.dialog = dialog;
        _this.service = service;
        _this.datePipe = datePipe;
        _this.Submitting = false;
        _this.isEdit = false;
        _this.criteria = new ImageStorageCriteria();
        _this.serverLink = '/api/ImageStorage/Search';
        _this.fileType = 0; //0 image 1 pdf
        _this.onClosed = new EventEmitter();
        _this.isNotShowAction = false;
        return _this;
    }
    ImageStorageComponent.prototype.InitTable = function () {
        var _this = this;
        this.compRef = this;
        this.aaSorting = [[0, 'asc']];
        this.aoColumnDefs = [
            { mData: 'Path', aTargets: [0] },
            { mData: 'CreatedAt', aTargets: [1] },
            { mData: 'ID', bSortable: false, bVisible: !this.isNotShowAction, aTargets: [2] }
        ];
        this.aoColumns = [
            {
                sTitle: 'File',
                sClass: '',
                mRender: function (data, type, oObj, full) {
                    if (data) {
                        if (_this.fileType == 0) {
                            return ('<a href="' +
                                data +
                                '" data-lightbox="iamge-1"><img src="' +
                                data +
                                '" class="rounded mx-auto d-block" alt="" width="100" height="100"></a>');
                        }
                        else {
                            return "<a href=" + data + " target=\"blank\">H\u1ED3 S\u01A1 " + (full.row + 1) + "</a>";
                        }
                    }
                    return '';
                }
            },
            {
                sTitle: 'Ngày Tạo',
                sClass: '',
                mRender: function (data, type, oObj, full) {
                    if (data) {
                        return _this.datePipe.transform(data, 'dd/MM/yyyy HH:mm:ss');
                    }
                    return '';
                }
            },
            {
                sTitle: 'Actions',
                sClass: 'text-center',
                mRender: function (data, type, oObj) {
                    var action = '';
                    if (!_this.isNotShowAction) {
                        action +=
                            '<button type="button" title="Delete" method-name="remove" class="btn btn-outline-danger round  mr-1 btn-sm" param="' +
                                oObj.ID +
                                '" ><i class="ft-trash-2"></i></button>';
                    }
                    return action;
                }
            }
        ];
    };
    ImageStorageComponent.prototype.RefreshTable = function () {
        this.table.ajax.reload();
    };
    ImageStorageComponent.prototype.catchTable = function (event) {
        this.table = event;
    };
    ImageStorageComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.InitTable();
                return [2 /*return*/];
            });
        });
    };
    ImageStorageComponent.prototype.SetCriteria = function (aoData) {
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
    ImageStorageComponent.prototype.show = function (referenceId, imageType, type) {
        this.fileType = type;
        this.Submitting = false;
        this.criteria.ReferenceId = referenceId;
        this.criteria.Type = imageType;
        this.RefreshTable();
        this.modal.show();
    };
    ImageStorageComponent.prototype.add = function () {
        var _a = this.criteria, ReferenceId = _a.ReferenceId, Type = _a.Type;
        this.addModal.show(false, null, ReferenceId, Type, this.fileType);
    };
    ImageStorageComponent.prototype.cancel = function () {
        this.onClosed.emit(true);
        this.modal.hide();
    };
    ImageStorageComponent.prototype.remove = function (id) {
        var _this = this;
        if (id) {
            this.dialog.showSwalConfirmAlert('Xoá Mục Này').then(function (isConfirm) {
                if (isConfirm) {
                    _this.service.Delete(id).subscribe(function (r) {
                        if (r) {
                            _this.dialog.showToastrSuccess('Xoá Mục', MessageConstant.REQUEST_SUCCESS_CONST);
                            _this.RefreshTable();
                        }
                    }, function (error) {
                        _this.dialog.showSwalErrorAlert('Xoá Mục', MessageConstant.DEL_ERROR_CONST);
                    });
                }
            });
        }
    };
    tslib_1.__decorate([
        ViewChild('addModal'),
        tslib_1.__metadata("design:type", ImageStorageInfoComponent)
    ], ImageStorageComponent.prototype, "addModal", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], ImageStorageComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ImageStorageComponent.prototype, "onClosed", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], ImageStorageComponent.prototype, "isNotShowAction", void 0);
    ImageStorageComponent = tslib_1.__decorate([
        Component({
            selector: 'app-image-storage',
            templateUrl: './image-storage.component.html',
            styleUrls: ['./image-storage.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            Router,
            CommonDialogService,
            ImageStorageService,
            DatePipe])
    ], ImageStorageComponent);
    return ImageStorageComponent;
}(BaseComponent));
export { ImageStorageComponent };
//# sourceMappingURL=image-storage.component.js.map