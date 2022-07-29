import * as tslib_1 from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { OrderModel } from 'src/app/modules/common/models/order.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { OrderCustomerModel } from 'src/app/modules/common/models/order-customer.model';
import { CustomerListComponent } from '../../customer/customer-list/customer-list.component';
import { CustomerService } from 'src/app/modules/common/services/customer.service';
var OrderCustomerComponent = /** @class */ (function (_super) {
    tslib_1.__extends(OrderCustomerComponent, _super);
    function OrderCustomerComponent(authService, dialog, service, datePipe, router) {
        var _this = _super.call(this, authService) || this;
        _this.dialog = dialog;
        _this.service = service;
        _this.datePipe = datePipe;
        _this.router = router;
        _this.isEdit = false;
        return _this;
    }
    OrderCustomerComponent.prototype.ngOnInit = function () {
    };
    OrderCustomerComponent.prototype.addNewCustomer = function () {
        this.custListModal.show(this.currentUser.CompanyID);
    };
    OrderCustomerComponent.prototype.selectCust = function (customerId) {
        var _this = this;
        if (this.model) {
            var index = this.model.OrderCustomers.findIndex(function (c) { return c.CustomerID == customerId; });
            if (index < 0) {
                this.service.Get(customerId).subscribe(function (r) {
                    var orderCust = new OrderCustomerModel();
                    orderCust.CustomerID = customerId;
                    orderCust.Customer = r;
                    _this.model.OrderCustomers.push(orderCust);
                });
            }
        }
    };
    OrderCustomerComponent.prototype.removeCust = function (index) {
        this.model.OrderCustomers.splice(index, 1);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", OrderModel)
    ], OrderCustomerComponent.prototype, "model", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], OrderCustomerComponent.prototype, "isEdit", void 0);
    tslib_1.__decorate([
        ViewChild('custListModal'),
        tslib_1.__metadata("design:type", CustomerListComponent)
    ], OrderCustomerComponent.prototype, "custListModal", void 0);
    OrderCustomerComponent = tslib_1.__decorate([
        Component({
            selector: 'app-order-customer',
            templateUrl: './order-customer.component.html',
            styleUrls: ['./order-customer.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            CustomerService,
            DatePipe,
            Router])
    ], OrderCustomerComponent);
    return OrderCustomerComponent;
}(BaseComponent));
export { OrderCustomerComponent };
//# sourceMappingURL=order-customer.component.js.map