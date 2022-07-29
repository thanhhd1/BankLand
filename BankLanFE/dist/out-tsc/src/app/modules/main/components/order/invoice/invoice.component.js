import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { OrderModel } from 'src/app/modules/common/models/order.model';
import { CompanyModel } from 'src/app/modules/common/models/company.model';
import { OrderService } from 'src/app/modules/common/services/order.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ActivatedRoute } from '@angular/router';
var InvoiceComponent = /** @class */ (function (_super) {
    tslib_1.__extends(InvoiceComponent, _super);
    function InvoiceComponent(authService, service, dialog, activeRouter) {
        var _this = _super.call(this, authService) || this;
        _this.authService = authService;
        _this.service = service;
        _this.dialog = dialog;
        _this.activeRouter = activeRouter;
        _this.id = '';
        _this.isEdit = false;
        _this.companyInfo = new CompanyModel();
        _this.model = new OrderModel();
        _this.rooms = new Array();
        _this.customers = new Array();
        _this.menus = new Array();
        _this.Submitting = false;
        activeRouter.params.subscribe(function (r) {
            _this.id = r['{id}'];
        });
        return _this;
    }
    InvoiceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = new OrderModel();
        if (this.id) {
            // Load Order by ID
            this.isEdit = true;
            this.service.Get(this.id).subscribe(function (r) {
                _this.model = r;
            });
        }
    };
    InvoiceComponent.prototype.checkValidInvoice = function () {
        if (!this.model.OrderRoomDetails || (this.model.OrderRoomDetails && this.model.OrderRoomDetails.length == 0)
            || !this.model.OrderMenuDetails || (this.model.OrderMenuDetails && this.model.OrderMenuDetails.length == 0)
            || !this.model.OrderCustomers || (this.model.OrderCustomers && this.model.OrderCustomers.length == 0)) {
            return false;
        }
        if (this.model.OrderRoomDetails && this.model.OrderRoomDetails.length > 0) {
            var items = this.model.OrderRoomDetails.filter(function (c) { return !c.IsManualPrice && !c.CheckoutDate; });
            if (items && items.length > 0) {
                return false;
            }
        }
        return true;
    };
    InvoiceComponent.prototype.saveInfo = function () {
        var _this = this;
        if (!this.checkValidInvoice()) {
            this.dialog.showSwalErrorAlert("L\u01B0u Order", "Cần điền đủ thông tin các mục trước khi thực hiện lưu.");
            return;
        }
        if (this.isEdit) { // TODO thanh Toan
            alert(this.model);
        }
        else {
            this.service.Create(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert("L\u01B0u Order", MessageConstant.EDIT_SCCCESS_CONST);
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert("L\u01B0u Order", strMessage);
            });
        }
    };
    InvoiceComponent.prototype.caculateTotalInvoice = function (model) {
        model.Total = 0;
        var roomPrice = 0;
        var servicePrice = 0;
        if (model.OrderRoomDetails && model.OrderRoomDetails.length > 0) {
            roomPrice = model.OrderRoomDetails.reduce(function (prev, cur) {
                return prev + cur.ThanhTien;
            }, 0);
        }
        if (model.OrderMenuDetails && model.OrderMenuDetails.length > 0) {
            servicePrice = model.OrderMenuDetails.reduce(function (prev, cur) {
                return prev + cur.Quantity * cur.Menu.Price;
            }, 0);
        }
        model.Total = roomPrice + servicePrice;
        return model.Total;
    };
    InvoiceComponent = tslib_1.__decorate([
        Component({
            selector: 'app-invoice',
            templateUrl: './invoice.component.html',
            styleUrls: ['./invoice.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            OrderService,
            CommonDialogService,
            ActivatedRoute])
    ], InvoiceComponent);
    return InvoiceComponent;
}(BaseComponent));
export { InvoiceComponent };
//# sourceMappingURL=invoice.component.js.map