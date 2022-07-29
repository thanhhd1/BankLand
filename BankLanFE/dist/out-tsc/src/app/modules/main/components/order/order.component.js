import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { DatePipe } from '@angular/common';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { OrderCriteria } from 'src/app/modules/common/criterias/order.criteria';
import { OrderViewComponent } from './order-view/order-view.component';
import { OrderService } from 'src/app/modules/common/services/order.service';
var OrderComponent = /** @class */ (function (_super) {
    tslib_1.__extends(OrderComponent, _super);
    function OrderComponent(authService, router, dialog, activeRouter, service, datePipe) {
        var _this = _super.call(this, authService) || this;
        _this.router = router;
        _this.dialog = dialog;
        _this.activeRouter = activeRouter;
        _this.service = service;
        _this.datePipe = datePipe;
        _this.criteria = new OrderCriteria();
        _this.serverLink = '/api/Order/Search';
        return _this;
        // activeRouter.params.subscribe(r=>{
        //   this.companyId =  r['companyId'];
        //   if(!this.companyId){
        //     this.router.navigateByUrl('/');
        //   }
        // });
    }
    OrderComponent.prototype.InitTable = function () {
        var _this = this;
        this.compRef = this;
        this.aaSorting = [[0, 'asc']];
        this.aoColumnDefs = [
            { mData: 'OrderInvoice', aTargets: [0] },
            { mData: 'OrderDate', aTargets: [1] },
            { mData: 'Customer.Name', aTargets: [2] },
            { mData: 'Room.Name', aTargets: [3] },
            { mData: 'CompletedDate', aTargets: [4] },
            { mData: 'IsCompleted', aTargets: [5] }
        ];
        this.aoColumns = [
            {
                sTitle: 'Tên Đơn Hàng',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return data;
                    }
                    return '';
                }
            },
            {
                sTitle: 'Ngày Tạo',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data) {
                        return _this.datePipe.transform(data, 'dd/MM/yyyy');
                    }
                    return '';
                }
            },
            {
                sTitle: 'Khách Hàng',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj && oObj.OrderCustomers) {
                        return oObj.OrderCustomers.map(function (e) { return e.Customer.Name + ' - ' + e.Customer.SocialNumber; }).join('</br> ');
                    }
                    return '';
                }
            },
            {
                sTitle: 'Số Phòng',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj && oObj.OrderRoomDetails) {
                        return oObj.OrderRoomDetails.map(function (e) { return e.Room.Name; }).join('</br> ');
                    }
                    return '';
                }
            },
            {
                sTitle: 'Ngày Thanh Toán',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (data && !data.includes('0001-01-01')) {
                        return _this.datePipe.transform(data, 'dd/MM/yyyy');
                    }
                    return '';
                }
            },
            {
                sTitle: 'Trạng Thái',
                sClass: '',
                mRender: function (data, type, oObj) {
                    if (oObj) {
                        return !oObj.IsCompleted
                            ? '<div class="badge badge-success round">Chưa Thanh Toán</div>'
                            : '<div class="badge badge-danger round">Đã Thanh Toán</div>';
                    }
                    return '';
                }
            },
            {
                sTitle: 'Actions',
                sClass: 'text-center',
                mRender: function (data, type, oObj) {
                    var action = '';
                    action +=
                        '<button type="button" title="Edit" method-name="edit"  class="btn btn-outline-info mr-1 btn-sm" param="' +
                            oObj.ID +
                            '"><i class="ft-edit"></i></button> ';
                    action +=
                        '<button type="button" title="Delete" method-name="remove" class="btn btn-outline-danger round  mr-1 btn-sm" param="' +
                            oObj.ID +
                            '" ><i class="ft-trash-2"></i></button>';
                    action +=
                        '<button type="button"  method-name="showOrderInfo"  class="btn btn-outline-success mr-1 btn-sm" param="' +
                            oObj.ID +
                            '"><i class="la la-image"></i> Thông Tin Đơn Hàng </button> ';
                    return action;
                }
            }
        ];
    };
    OrderComponent.prototype.RefreshTable = function () {
        this.table.ajax.reload();
    };
    OrderComponent.prototype.catchTable = function (event) {
        this.table = event;
    };
    OrderComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.InitTable();
                return [2 /*return*/];
            });
        });
    };
    OrderComponent.prototype.SetCriteria = function (aoData) {
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
    OrderComponent.prototype.edit = function (id) {
        this.router.navigateByUrl("/management/invoice/" + id);
    };
    OrderComponent.prototype.showOrderInfo = function (id) {
        this.orderView.show(id);
    };
    OrderComponent.prototype.remove = function (id) {
        var _this = this;
        if (id) {
            this.dialog
                .showSwalConfirmAlert('Bạn Muốn Xóa Đơn Hàng Này')
                .then(function (isConfirm) {
                if (isConfirm) {
                    _this.service.Delete(id).subscribe(function (r) {
                        if (r) {
                            _this.dialog.showToastrSuccess('Xóa Đơn Hàng', MessageConstant.REQUEST_SUCCESS_CONST);
                            _this.RefreshTable();
                        }
                    }, function (error) {
                        _this.dialog.showSwalErrorAlert('Xóa Đơn Hàng', MessageConstant.DEL_ERROR_CONST);
                    });
                }
            });
        }
    };
    tslib_1.__decorate([
        ViewChild('orderView'),
        tslib_1.__metadata("design:type", OrderViewComponent)
    ], OrderComponent.prototype, "orderView", void 0);
    OrderComponent = tslib_1.__decorate([
        Component({
            selector: 'app-order',
            templateUrl: './order.component.html',
            styleUrls: ['./order.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            Router,
            CommonDialogService,
            ActivatedRoute,
            OrderService,
            DatePipe])
    ], OrderComponent);
    return OrderComponent;
}(BaseComponent));
export { OrderComponent };
//# sourceMappingURL=order.component.js.map