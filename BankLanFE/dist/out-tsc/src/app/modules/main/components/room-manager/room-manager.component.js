import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/modules/common/services/room.service';
import { OrderRoomDetailService } from 'src/app/modules/common/services/order-room-detail.service';
var RoomManagerComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RoomManagerComponent, _super);
    function RoomManagerComponent(authService, dialog, service, orderRoomService, datePipe, router) {
        var _this = _super.call(this, authService) || this;
        _this.dialog = dialog;
        _this.service = service;
        _this.orderRoomService = orderRoomService;
        _this.datePipe = datePipe;
        _this.router = router;
        return _this;
    }
    RoomManagerComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.model = new Array();
                this.service.GetByCompany().subscribe(function (r) {
                    _this.model = r;
                });
                return [2 /*return*/];
            });
        });
    };
    RoomManagerComponent.prototype.add = function (id) {
        this.router.navigateByUrl("/management/invoice");
    };
    RoomManagerComponent.prototype.edit = function (id) {
        var _this = this;
        // Get Room exits order unpaid
        this.orderRoomService.GetByRoomId(id).subscribe(function (r) {
            _this.roomOrder = r;
        });
        if (this.roomOrder)
            this.router.navigateByUrl("/management/invoice/" + this.roomOrder.OrderID);
    };
    RoomManagerComponent = tslib_1.__decorate([
        Component({
            selector: 'app-room-manager',
            templateUrl: './room-manager.component.html',
            styleUrls: ['./room-manager.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            RoomService,
            OrderRoomDetailService,
            DatePipe,
            Router])
    ], RoomManagerComponent);
    return RoomManagerComponent;
}(BaseComponent));
export { RoomManagerComponent };
//# sourceMappingURL=room-manager.component.js.map