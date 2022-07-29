import * as tslib_1 from "tslib";
import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { OrderRoomDetailsModel } from 'src/app/modules/common/models/order-room-detail.model';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { OrderRoomDetailService } from 'src/app/modules/common/services/order-room-detail.service';
import { RoomService } from 'src/app/modules/common/services/room.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
var OrderRoomDetailComponent = /** @class */ (function (_super) {
    tslib_1.__extends(OrderRoomDetailComponent, _super);
    function OrderRoomDetailComponent(authService, dialog, datePipe, router, service, roomService) {
        var _this = _super.call(this, authService) || this;
        _this.dialog = dialog;
        _this.datePipe = datePipe;
        _this.router = router;
        _this.service = service;
        _this.roomService = roomService;
        _this.roomSource = [];
        _this.Submitting = false;
        _this.onClosed = new EventEmitter();
        _this.linkCheckUsingRoom = "";
        return _this;
    }
    OrderRoomDetailComponent.prototype.ngOnInit = function () {
        this.model = new OrderRoomDetailsModel();
    };
    OrderRoomDetailComponent.prototype.show = function (id) {
        this.form.resetForm();
        this.getRooms();
        this.model = new OrderRoomDetailsModel();
        if (id) {
            this.id = id;
            this.getEntity(id);
        }
        else {
            this.modal.show();
        }
    };
    OrderRoomDetailComponent.prototype.getEntity = function (id) {
        var _this = this;
        this.service.Get(id).subscribe(function (r) {
            _this.model = r;
            _this.modal.show();
        });
    };
    OrderRoomDetailComponent.prototype.getRooms = function () {
        var _this = this;
        this.roomService.GetEmptyByCompany().subscribe(function (r) {
            _this.roomSource = r;
        });
    };
    OrderRoomDetailComponent.prototype.hide = function () {
        this.onClosed.emit();
        this.modal.hide();
    };
    OrderRoomDetailComponent.prototype.save = function () {
        var _this = this;
        if (!this.id) {
            var entity = Object.assign({}, this.model);
            if (entity.IsManualPrice) {
                entity.CheckinDate = new Date();
            }
            this.onClosed.emit(entity);
            this.modal.hide();
        }
        else {
            this.getThanhTien();
            this.service.Edit(this.model).subscribe(function (result) {
                if (result) {
                    _this.Submitting = false;
                    _this.dialog.showSwalSuccesAlert((_this.id ? 'Chỉnh Sửa' : 'Thêm Mới') + " \u0110\u01A1n H\u00E0ng", MessageConstant.EDIT_SCCCESS_CONST);
                    _this.onClosed.emit();
                    _this.hide();
                }
            }, function (error) {
                _this.Submitting = false;
                var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
                _this.dialog.showSwalErrorAlert((_this.id ? 'Chỉnh Sửa' : 'Thêm Mới') + " \u0110\u01A1n H\u00E0ng", strMessage);
            });
        }
    };
    OrderRoomDetailComponent.prototype.onchangRoomSelect = function () {
        var _this = this;
        if (this.model && this.model.RoomID && this.roomSource) {
            var indexRoom = this.roomSource.findIndex(function (c) {
                return c.ID == _this.model.RoomID;
            });
            if (indexRoom >= 0) {
                var roomItem = this.roomSource[indexRoom];
                this.model.RoomName = roomItem.Name;
                if (!this.model.IsManualPrice) {
                    this.model.Price = roomItem.Price;
                }
            }
            this.getThanhTien();
        }
    };
    OrderRoomDetailComponent.prototype.getThanhTien = function () {
        if (this.model) {
            if (this.model.IsManualPrice) {
                this.model.ThanhTien = this.model.Price;
            }
            else {
                if (this.model.CheckinDate && this.model.CheckoutDate) {
                    var days = this.showDays(this.model.CheckoutDate, this.model.CheckinDate);
                    this.model.ThanhTien = days * this.model.Price;
                }
                else {
                    this.model.ThanhTien = this.model.Price;
                }
            }
            return this.model.ThanhTien;
        }
        return 0;
    };
    OrderRoomDetailComponent.prototype.showDays = function (firstDate, secondDate) {
        var startDay = new Date(firstDate);
        var endDay = new Date(secondDate);
        var millisecondsPerDay = 1000 * 60 * 60 * 24;
        var millisBetween = startDay.getTime() - endDay.getTime();
        var days = millisBetween / millisecondsPerDay;
        // Round down.
        return (Math.floor(days)) + 1;
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], OrderRoomDetailComponent.prototype, "onClosed", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], OrderRoomDetailComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        ViewChild('f'),
        tslib_1.__metadata("design:type", NgForm)
    ], OrderRoomDetailComponent.prototype, "form", void 0);
    OrderRoomDetailComponent = tslib_1.__decorate([
        Component({
            selector: 'app-order-room-detail',
            templateUrl: './order-room-detail.component.html',
            styleUrls: ['./order-room-detail.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            DatePipe,
            Router,
            OrderRoomDetailService,
            RoomService])
    ], OrderRoomDetailComponent);
    return OrderRoomDetailComponent;
}(BaseComponent));
export { OrderRoomDetailComponent };
//# sourceMappingURL=order-room-detail.component.js.map