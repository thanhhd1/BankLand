import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { RoomTypeService } from 'src/app/modules/common/services/room-type.service';
import { OrderService } from 'src/app/modules/common/services/order.service';
import { OrderModel } from 'src/app/modules/common/models/order.model';
var OrderViewComponent = /** @class */ (function (_super) {
    tslib_1.__extends(OrderViewComponent, _super);
    function OrderViewComponent(authService, dialog, router, service, roomTypeService, cdChanged) {
        var _this = _super.call(this, authService) || this;
        _this.dialog = dialog;
        _this.router = router;
        _this.service = service;
        _this.roomTypeService = roomTypeService;
        _this.cdChanged = cdChanged;
        _this.Submitting = false;
        _this.Uploading = false;
        _this.roomType = new Array();
        _this.onClose = new EventEmitter();
        return _this;
    }
    OrderViewComponent.prototype.ngOnInit = function () {
        this.model = new OrderModel();
    };
    OrderViewComponent.prototype.getEntity = function (id) {
        var _this = this;
        this.service.Get(id).subscribe(function (r) {
            _this.model = r;
        });
    };
    OrderViewComponent.prototype.show = function (id) {
        //this.form.resetForm();
        //this.Submitting = false;
        this.model = new OrderModel();
        this.getEntity(id);
        this.cdChanged.detectChanges();
        this.modal.show();
    };
    OrderViewComponent.prototype.print = function () {
        if (this.Submitting)
            return;
        this.Submitting = true;
        // this.service.Edit( this.model).subscribe(result => {
        //   if (result) {
        //     this.Submitting = false;
        //     this.dialog.showSwalSuccesAlert(`In Thông Tin Đơn Hàng`, MessageConstant.EDIT_SCCCESS_CONST);
        //     this.onClose.emit(true);
        //     this.cancel();
        //   }
        // }, error => {
        //   this.Submitting = false;
        //   var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
        //   this.dialog.showSwalErrorAlert(`Thông Tin Đơn Hàng`, strMessage);
        // });
    };
    OrderViewComponent.prototype.cancel = function () {
        this.modal.hide();
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], OrderViewComponent.prototype, "onClose", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], OrderViewComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('f'),
        tslib_1.__metadata("design:type", NgForm)
    ], OrderViewComponent.prototype, "form", void 0);
    OrderViewComponent = tslib_1.__decorate([
        Component({
            selector: 'app-order-view',
            templateUrl: './order-view.component.html',
            styleUrls: ['./order-view.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            Router,
            OrderService,
            RoomTypeService,
            ChangeDetectorRef])
    ], OrderViewComponent);
    return OrderViewComponent;
}(BaseComponent));
export { OrderViewComponent };
//# sourceMappingURL=order-view.component.js.map