import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { BaseComponent } from 'src/app/modules/base.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { OrderMenuDetailsModel } from 'src/app/modules/common/models/order-menu-detail.model';
import { OrderMenuDetailService } from 'src/app/modules/common/services/order-menu-details.service';
import { MenuService } from 'src/app/modules/common/services/menu.service';
var OrderServiceDetailComponent = /** @class */ (function (_super) {
    tslib_1.__extends(OrderServiceDetailComponent, _super);
    function OrderServiceDetailComponent(authService, dialog, router, service, menuService, cdChanged) {
        var _this = _super.call(this, authService) || this;
        _this.dialog = dialog;
        _this.router = router;
        _this.service = service;
        _this.menuService = menuService;
        _this.cdChanged = cdChanged;
        _this.Submitting = false;
        _this.isEdit = false;
        _this.onClosed = new EventEmitter();
        _this.menus = new Array();
        return _this;
    }
    OrderServiceDetailComponent.prototype.ngOnInit = function () {
        this.model = new OrderMenuDetailsModel();
    };
    OrderServiceDetailComponent.prototype.getMenus = function () {
        var _this = this;
        this.menus = new Array();
        this.menuService.GetAll().subscribe(function (r) {
            _this.menus = r;
        });
    };
    OrderServiceDetailComponent.prototype.getEntity = function (id) {
        var _this = this;
        this.service.Get(id).subscribe(function (r) {
            _this.model = r;
        });
    };
    OrderServiceDetailComponent.prototype.show = function (isEdit, id, orderID) {
        this.form.resetForm();
        this.getMenus();
        this.isEdit = isEdit;
        this.Submitting = false;
        this.model = new OrderMenuDetailsModel();
        this.model.OrderID = orderID;
        if (this.isEdit) {
            this.getEntity(id);
        }
        this.cdChanged.detectChanges();
        this.modal.show();
    };
    OrderServiceDetailComponent.prototype.onChangeSelect = function () {
        var _this = this;
        if (this.model && this.model.MenuID && this.menus) {
            var index = this.menus.findIndex(function (c) {
                return c.ID == _this.model.MenuID;
            });
            if (index >= 0) {
                var roomItem = this.menus[index];
                this.model.MenuName = roomItem.Name;
                this.model.Price = roomItem.Price;
                this.model.Unit = roomItem.Unit;
                this.model.UnitName = roomItem.UnitName;
                this.model.ThanhTien = this.model.Price * this.model.Quantity;
                //this.model.OrderID = roomItem.
            }
        }
    };
    OrderServiceDetailComponent.prototype.quantityChange = function () {
        if (this.model && this.model.MenuID && this.menus) {
            this.model.ThanhTien = this.model.Price * this.model.Quantity;
        }
    };
    OrderServiceDetailComponent.prototype.save = function () {
        var _this = this;
        if (this.Submitting)
            return;
        this.Submitting = true;
        if (!this.model.OrderID) {
            // add newu order
            alert("va");
            var entity = Object.assign({}, this.model);
            this.onClosed.emit(this.model);
            this.modal.hide();
        }
        else {
            if (this.isEdit) {
                this.service.Edit(this.model).subscribe(function (result) {
                    if (result) {
                        _this.Submitting = false;
                        _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " D\u1ECBch v\u1EE5 s\u1EED d\u1EE5ng", MessageConstant.EDIT_SCCCESS_CONST);
                        var entity = Object.assign({}, _this.model);
                        _this.onClosed.emit(entity);
                        _this.cancel();
                    }
                }, function (error) {
                    _this.Submitting = false;
                    var strMessage = error && error.error
                        ? error.error
                        : MessageConstant.FAILURE_REQUEST;
                    _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " D\u1ECBch v\u1EE5 s\u1EED d\u1EE5ng", strMessage);
                });
            }
            else {
                this.model.CheckinDate = new Date;
                this.service.Create(this.model).subscribe(function (result) {
                    if (result) {
                        _this.Submitting = false;
                        _this.dialog.showSwalSuccesAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " D\u1ECBch v\u1EE5 s\u1EED d\u1EE5ng", MessageConstant.ADD_SUCCESS_CONST);
                        var entity = Object.assign({}, _this.model);
                        _this.onClosed.emit(entity);
                        _this.cancel();
                    }
                }, function (error) {
                    _this.Submitting = false;
                    var strMessage = error && error.error
                        ? error.error
                        : MessageConstant.FAILURE_REQUEST;
                    _this.dialog.showSwalErrorAlert((_this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới') + " D\u1ECBch v\u1EE5 s\u1EED d\u1EE5ng", strMessage);
                });
            }
        }
    };
    OrderServiceDetailComponent.prototype.cancel = function () {
        this.modal.hide();
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], OrderServiceDetailComponent.prototype, "onClosed", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], OrderServiceDetailComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('f'),
        tslib_1.__metadata("design:type", NgForm)
    ], OrderServiceDetailComponent.prototype, "form", void 0);
    OrderServiceDetailComponent = tslib_1.__decorate([
        Component({
            selector: 'app-order-service-detail',
            templateUrl: './order-service-detail.component.html',
            styleUrls: ['./order-service-detail.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            Router,
            OrderMenuDetailService,
            MenuService,
            ChangeDetectorRef])
    ], OrderServiceDetailComponent);
    return OrderServiceDetailComponent;
}(BaseComponent));
export { OrderServiceDetailComponent };
//# sourceMappingURL=order-service-detail.component.js.map