import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CompanyService } from 'src/app/modules/common/services/company.service';
import { CustomerService } from 'src/app/modules/common/services/customer.service';
import { RoomService } from 'src/app/modules/common/services/room.service';
import { MenuService } from 'src/app/modules/common/services/menu.service';
import { OrderModel } from 'src/app/modules/common/models/order.model';
import { CompanyModel } from 'src/app/modules/common/models/company.model';
import { RoomModel } from 'src/app/modules/common/models/room.model';
import CustomerModel from 'src/app/modules/common/models/customer.model';
import { MenuModel } from 'src/app/modules/common/models/menu.model';
import { OrderService } from 'src/app/modules/common/services/order.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderRoomDetailsModel } from 'src/app/modules/common/models/order-room-detail.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent extends BaseComponent implements OnInit {
  id: string = '';
  isEdit: boolean = false;
  companyInfo: CompanyModel = new CompanyModel();
  model: OrderModel = new OrderModel();
  rooms: Array<RoomModel> = new Array<RoomModel>();
  customers: Array<CustomerModel> = new Array<CustomerModel>();
  menus: Array<MenuModel> = new Array<MenuModel>();
  Submitting: boolean = false;
  roomId: string = '';
  constructor(private authService: AuthenticationService,
    private service: OrderService,
    private companyService: CompanyService,
    private roomService: RoomService,
    private dialog: CommonDialogService,
    private activeRouter: ActivatedRoute,
    private router: Router) {
    super(authService);
    activeRouter.params.subscribe(r => {
      this.id = r['{id}'];
      this.roomId = r['{roomId}']
    });
  }

  ngOnInit() {
    this.model = new OrderModel();
    this.getCompanyInfo();
    if (this.id && this.id != 'null') {
      // Load Order by ID
      this.isEdit = true;
      this.service.Get(this.id).subscribe(r => {
        this.model = r;
      });
    }
    if(this.roomId && this.roomId != 'null'){ // add room to details
      var orderRoomDetails = new OrderRoomDetailsModel();
      this.roomService.Get(this.roomId).subscribe(r => {
        orderRoomDetails.Price = r.Price;
        orderRoomDetails.RoomID = r.ID;
        orderRoomDetails.RoomName = r.Name;
        orderRoomDetails.IsManualPrice = false;
        orderRoomDetails.CheckinDate = new Date;
        this.model.OrderRoomDetails.push(orderRoomDetails);
      });
    }

  }

  checkSubmitValidInvoice() {
    if (!this.model.OrderRoomDetails || (this.model.OrderRoomDetails && this.model.OrderRoomDetails.length == 0)
      || !this.model.OrderCustomers || (this.model.OrderCustomers && this.model.OrderCustomers.length == 0)) {
      return false;
    }

    if (this.model.OrderRoomDetails && this.model.OrderRoomDetails.length > 0) {
      var items = this.model.OrderRoomDetails.filter(c => { return !c.IsManualPrice && !c.CheckoutDate });
      if (items && items.length > 0) {
        return false;
      }
    }

    return true;
  }

  checkSaveInfoInvoice() {
    if (!this.model.OrderRoomDetails || (this.model.OrderRoomDetails && this.model.OrderRoomDetails.length == 0)
      || !this.model.OrderCustomers || (this.model.OrderCustomers && this.model.OrderCustomers.length == 0)) {
      return false;
    }
    return true;
  }

  saveInfo() {
    if (this.isEdit) { // TODO thanh Toan
      if (!this.checkSubmitValidInvoice()) {
        this.dialog.showSwalErrorAlert(`Thanh Toán Order`, "Cần điền đủ thông tin đặt phòng và khách hàng trước khi thực hiện lưu.");
        return;
      }

      this.service.SubmitOrder(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showSwalSuccesAlert(`Thanh Toán Order`, MessageConstant.EDIT_SCCCESS_CONST);
          // redirect to Ordes
          this.router.navigateByUrl(`/management/orders`);
        }
      }, error => {
        this.Submitting = false;
        var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
        this.dialog.showSwalErrorAlert(`Thanh Toán Order`, strMessage);
      });
    }
    else {
      if (!this.checkSaveInfoInvoice()) {
        this.dialog.showSwalErrorAlert(`Lưu Order`, "Cần điền đủ thông tin đặt phòng và khách hàng trước khi thực hiện lưu.");
        return;
      }

      this.service.Create(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showSwalSuccesAlert(`Lưu Order`, MessageConstant.EDIT_SCCCESS_CONST);
          // redirect to Ordes
          this.router.navigateByUrl(`/management/orders`);
        }
      }, error => {
        this.Submitting = false;
        var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
        this.dialog.showSwalErrorAlert(`Lưu Order`, strMessage);
      });
    }
  }

  caculateTotalInvoice(model: OrderModel) {
    model.Total = 0;
    var roomPrice = 0;
    var servicePrice = 0;
    if (model.OrderRoomDetails && model.OrderRoomDetails.length > 0) {
      model.OrderRoomDetails.forEach(item => {
        if (item) {
          roomPrice += item.ThanhTien ? item.ThanhTien : 0;
        }
      });
    }

    if (model.OrderMenuDetails && model.OrderMenuDetails.length > 0) {
      model.OrderMenuDetails.forEach(item => {
        if (item) {
          servicePrice += item.ThanhTien ? item.ThanhTien : 0;
        }
      });
    }

    model.Total = roomPrice + servicePrice;
    return model.Total;
  }

  cancel() {
    this.router.navigateByUrl(`/management/orders`);
  }

  getCompanyInfo() {
    this.companyService.GetByCurrentUser().subscribe(r => {
      if (r) {
        this.companyInfo = r;
      }
    });
  }
}
