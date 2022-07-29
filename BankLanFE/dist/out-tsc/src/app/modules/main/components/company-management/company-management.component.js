import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { CompanyService } from 'src/app/modules/common/services/company.service';
import { CompanyModel } from 'src/app/modules/common/models/company.model';
import { OrderCriteria } from 'src/app/modules/common/criterias/order.criteria';
import { OrderService } from 'src/app/modules/common/services/order.service';
import { RoomService } from 'src/app/modules/common/services/room.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
var CompanyManagementComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CompanyManagementComponent, _super);
    function CompanyManagementComponent(authService, dialog, service, roomService, orderService, datePipe, router) {
        var _this = _super.call(this, authService) || this;
        _this.dialog = dialog;
        _this.service = service;
        _this.roomService = roomService;
        _this.orderService = orderService;
        _this.datePipe = datePipe;
        _this.router = router;
        _this.model = new CompanyModel();
        _this.criteriaOrder = new OrderCriteria();
        _this.orders = new Array();
        _this.initCriteriaOrder = function () {
            _this.criteriaOrder.ItemPerPage = 10;
            _this.criteriaOrder.SortColumn = 'OrderDate';
            _this.criteriaOrder.SortDirection = 'desc';
            _this.criteriaOrder.IsCompleted = false;
        };
        _this.renderCustomers = function (orderCustomers) {
            return orderCustomers
                .map(function (e) { return e.Customer.Name + ' - ' + e.Customer.SocialNumber; })
                .join('\n ');
        };
        _this.renderRoomDetails = function (orderRoomDetails) {
            return orderRoomDetails.map(function (e) {
                var roomType = e.Room.RoomType ? e.Room.RoomType.Name : '';
                return e.Room.Name + "\n" + roomType;
            });
        };
        _this.getNumberByRoomStatus = function (rooms, status) {
            var count = 0;
            if (!rooms)
                return count;
            for (var i = 0; i < rooms.length; i++) {
                if (rooms[i].RoomStatus === status)
                    count++;
            }
            return count;
        };
        return _this;
    }
    CompanyManagementComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.service.GetByCurrentUser().subscribe(function (r) {
                    _this.model = r;
                });
                this.initCriteriaOrder();
                this.orderService.Search(this.criteriaOrder).subscribe(function (o) {
                    _this.orders = o.Data;
                });
                this.roomService.GetByCompany().subscribe(function (r) {
                    _this.roomModel = r;
                });
                return [2 /*return*/];
            });
        });
    };
    CompanyManagementComponent = tslib_1.__decorate([
        Component({
            selector: 'company-management',
            templateUrl: './company-management.component.html',
            styleUrls: ['./company-management.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            CommonDialogService,
            CompanyService,
            RoomService,
            OrderService,
            DatePipe,
            Router])
    ], CompanyManagementComponent);
    return CompanyManagementComponent;
}(BaseComponent));
export { CompanyManagementComponent };
//# sourceMappingURL=company-management.component.js.map