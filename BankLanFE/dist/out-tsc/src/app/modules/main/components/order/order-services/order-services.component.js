import * as tslib_1 from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { OrderModel } from 'src/app/modules/common/models/order.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceListComponent } from '../../services-management/service-list/service-list.component';
import { MenuService } from 'src/app/modules/common/services/menu.service';
import { OrderMenuDetailService } from 'src/app/modules/common/services/order-menu-details.service';
import { OrderServiceDetailComponent } from './order-service-detail/order-service-detail.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
var OrderServicesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(OrderServicesComponent, _super);
    function OrderServicesComponent(authService, dialog, service, menuService, datePipe, router) {
        var _this = _super.call(this, authService) || this;
        _this.dialog = dialog;
        _this.service = service;
        _this.menuService = menuService;
        _this.datePipe = datePipe;
        _this.router = router;
        _this.isEdit = false;
        return _this;
    }
    OrderServicesComponent.prototype.ngOnInit = function () {
        // this.model = new OrderModel();
    };
    // addNewService() {
    //   //this.serviceListModal.show(this.currentUser.CompanyID);
    // }
    // editRoom(id){
    //   //this.serviceListModal.show(id);
    // }
    OrderServicesComponent.prototype.RefreshTable = function () {
        this.table.ajax.reload();
    };
    OrderServicesComponent.prototype.add = function () {
        this.addModal.show(false, null, this.model.ID);
    };
    OrderServicesComponent.prototype.edit = function (id) {
        this.addModal.show(true, id, this.model.ID);
    };
    OrderServicesComponent.prototype.selectService = function (event) {
        var _this = this;
        if (event) {
            if (this.isEdit) { // Edit Order.
                this.service.GetByOrderId(event.OrderID).subscribe(function (r) {
                    _this.model.OrderMenuDetails = r;
                });
            }
            else { // addnew
                this.model = new OrderModel();
                this.model.OrderRoomDetails.push(event);
            }
        }
    };
    OrderServicesComponent.prototype.removeService = function (index) {
        var _this = this;
        if (index) {
            this.dialog.showSwalConfirmAlert('Xóa Mục Này').then(function (isConfirm) {
                if (isConfirm) {
                    _this.service.Delete(_this.model.OrderMenuDetails[index].ID).subscribe(function (r) {
                        if (r) {
                            _this.dialog.showToastrSuccess('Xóa Dịch Vụ Sử Dụng', MessageConstant.REQUEST_SUCCESS_CONST);
                            _this.model.OrderMenuDetails.splice(index, 1);
                        }
                    }, function (error) {
                        _this.dialog.showSwalErrorAlert('Xóa Dịch Vụ Sử Dụng', 'Xóa dịch vụ đang được sử dụng. Bạn Không thể xóa');
                    });
                }
            });
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", OrderModel)
    ], OrderServicesComponent.prototype, "model", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], OrderServicesComponent.prototype, "isEdit", void 0);
    tslib_1.__decorate([
        ViewChild('serviceListModal'),
        tslib_1.__metadata("design:type", ServiceListComponent)
    ], OrderServicesComponent.prototype, "serviceListModal", void 0);
    tslib_1.__decorate([
        ViewChild('addModal'),
        tslib_1.__metadata("design:type", OrderServiceDetailComponent)
    ], OrderServicesComponent.prototype, "addModal", void 0);
    OrderServicesComponent = tslib_1.__decorate([
        Component({
            selector: 'app-order-services',
            templateUrl: './order-services.component.html',
            styleUrls: ['./order-services.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            OrderMenuDetailService,
            MenuService,
            DatePipe,
            Router])
    ], OrderServicesComponent);
    return OrderServicesComponent;
}(BaseComponent));
export { OrderServicesComponent };
//# sourceMappingURL=order-services.component.js.map