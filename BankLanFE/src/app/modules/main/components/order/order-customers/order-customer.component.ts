import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { OrderModel } from 'src/app/modules/common/models/order.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { OrderCustomerModel } from 'src/app/modules/common/models/order-customer.model';
import { CustomerListComponent } from '../../customer/customer-list/customer-list.component';
import { CustomerService } from 'src/app/modules/common/services/customer.service';
import { OrderCustomerService } from 'src/app/modules/common/services/order-customer.service';
import { OrderService } from 'src/app/modules/common/services/order.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';

@Component({
  selector: 'app-order-customer',
  templateUrl: './order-customer.component.html',
  styleUrls: ['./order-customer.component.css'],
  providers: [DatePipe]
})
export class OrderCustomerComponent extends BaseComponent implements OnInit {
  @Input() model: OrderModel;
  @Input() isEdit: boolean = false;
  @ViewChild('custListModal') custListModal: CustomerListComponent;
  constructor(
    authService: AuthenticationService,
    private dialog: CommonDialogService,
    private service: CustomerService,
    private orderService: OrderService,
    private serviceOrderCustomer: OrderCustomerService,
    private datePipe: DatePipe,
    private router: Router
  ) {
    super(authService);
  }

  ngOnInit() {}

  addNewCustomer() {
    this.custListModal.show(this.currentUser.CompanyID);
  }

  saveCustomerInfoToOrder(type) {
    const actionName = type === 'select' ? 'thêm' : 'xoá';
    this.orderService.Edit(this.model).subscribe(
      result => {
        if (result) {
          this.dialog.showSwalSuccesAlert(
            '',
            `Đã ${actionName} một khách hàng ${
              type === 'select' ? 'vào' : 'khỏi'
            } đơn đặt phòng.`
          );
        }
      },
      error => {
        this.dialog.showSwalErrorAlert(
          '',
          `Đã ${actionName} khách hàng không thành công. `
        );
      }
    );
  }

  selectCust(customerId) {
    if (this.model) {
      var index = this.model.OrderCustomers.findIndex(
        c => c.CustomerID == customerId
      );
      if (index < 0) {
        this.service.Get(customerId).subscribe(r => {
          var orderCust = new OrderCustomerModel();
          orderCust.CustomerID = customerId;
          orderCust.Customer = r;
          this.model.OrderCustomers.push(orderCust);
          if (this.isEdit) {
            this.saveCustomerInfoToOrder('select');
          }
        });
      }
    }
  }

  removeCust(index) {
    if (index || index === 0) {
      this.dialog.showSwalConfirmAlert('Xóa Mục Này').then(isConfirm => {
        if (isConfirm) {
          this.model.OrderCustomers.splice(index, 1);
          if (this.isEdit) {
            this.saveCustomerInfoToOrder('remove');
          }
        }
      });
    }
  }
}
