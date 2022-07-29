import * as tslib_1 from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { OrderModel } from 'src/app/modules/common/models/order.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/modules/common/services/room.service';
import { OrderRoomDetailComponent } from './order-room-detail/order-room-detail.component';
var OrderRoomComponent = /** @class */ (function (_super) {
    tslib_1.__extends(OrderRoomComponent, _super);
    function OrderRoomComponent(authService, roomService, dialog, datePipe, router) {
        var _this = _super.call(this, authService) || this;
        _this.roomService = roomService;
        _this.dialog = dialog;
        _this.datePipe = datePipe;
        _this.router = router;
        _this.isEdit = false;
        _this.isChanged = false;
        _this.roomSource = [];
        _this.roomSourceExist = [];
        return _this;
    }
    OrderRoomComponent.prototype.ngOnInit = function () {
    };
    OrderRoomComponent.prototype.removeRoom = function (index) {
        var _this = this;
        this.dialog.showSwalConfirmAlert('Bạn Muốn Xóa Việc Chọn Phòng Này').then(function (isConfirm) {
            if (isConfirm) {
                _this.model.OrderRoomDetails.splice(index, 1);
            }
        });
    };
    OrderRoomComponent.prototype.editRoom = function (id) {
        this.selectRoomModal.show(id);
    };
    OrderRoomComponent.prototype.selectBookingRoom = function (event) {
        if (!this.model) {
            this.model = new OrderModel();
        }
        this.model.OrderRoomDetails.push(event);
    };
    OrderRoomComponent.prototype.selectRoom = function () {
        var _this = this;
        // remove item room has selected
        this.roomSourceExist = Object.assign([], this.roomSource);
        if (this.model.OrderRoomDetails && this.model.OrderRoomDetails.length > 0) {
            for (var i = 0; i < this.model.OrderRoomDetails.length; i++) {
                var indexRoom = this.roomSourceExist.findIndex(function (c) {
                    return c.ID == _this.model.OrderRoomDetails[i].RoomID;
                });
                if (indexRoom >= 0) {
                    this.roomSourceExist.splice(indexRoom, 1);
                }
            }
        }
        // Show popup
        this.selectRoomModal.show(null);
    };
    OrderRoomComponent.prototype.changeCheckOutDate = function (event, source) {
        var currentDate = new Date();
        var currentTime = currentDate.getHours().toString() + ":" + currentDate.getMinutes().toString() + ":" + currentDate.getSeconds().toString();
        var currentValue = event.target.value + ' ' + currentTime;
        source.CheckoutDate = new Date(currentValue);
    };
    OrderRoomComponent.prototype.getThanhTien = function (source) {
        if (source) {
            if (source.IsManualPrice) {
                source.ThanhTien = source.Price;
            }
            else {
                if (source.CheckinDate && source.CheckoutDate) {
                    var days = this.showDays(source.CheckoutDate, source.CheckinDate);
                    source.ThanhTien = days * source.Price;
                }
                else {
                    source.ThanhTien = source.Price;
                }
            }
            return source.ThanhTien;
        }
        return 0;
    };
    OrderRoomComponent.prototype.showDays = function (firstDate, secondDate) {
        var startDay = new Date(firstDate);
        var endDay = new Date(secondDate);
        var millisecondsPerDay = 1000 * 60 * 60 * 24;
        var millisBetween = startDay.getTime() - endDay.getTime();
        var days = millisBetween / millisecondsPerDay;
        // Round down.
        return (Math.floor(days)) + 1;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", OrderModel)
    ], OrderRoomComponent.prototype, "model", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], OrderRoomComponent.prototype, "isEdit", void 0);
    tslib_1.__decorate([
        ViewChild('selectRoomModal'),
        tslib_1.__metadata("design:type", OrderRoomDetailComponent)
    ], OrderRoomComponent.prototype, "selectRoomModal", void 0);
    OrderRoomComponent = tslib_1.__decorate([
        Component({
            selector: 'app-order-room',
            templateUrl: './order-room.component.html',
            styleUrls: ['./order-room.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            RoomService,
            CommonDialogService,
            DatePipe,
            Router])
    ], OrderRoomComponent);
    return OrderRoomComponent;
}(BaseComponent));
export { OrderRoomComponent };
//# sourceMappingURL=order-room.component.js.map