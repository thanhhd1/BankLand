import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service'; 
import { OrderModel } from 'src/app/modules/common/models/order.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router'; 
import { MenuService } from 'src/app/modules/common/services/menu.service';
import { OrderMenuDetailsModel } from 'src/app/modules/common/models/order-menu-detail.model';
import { OrderMenuDetailService } from 'src/app/modules/common/services/order-menu-details.service';
import { OrderServiceDetailComponent } from './order-service-detail/order-service-detail.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';


@Component({
  selector: 'app-order-services',
  templateUrl: './order-services.component.html',
  styleUrls: ['./order-services.component.css'],
  providers: [DatePipe]
})
export class OrderServicesComponent extends BaseComponent implements OnInit {
  @Input() model: OrderModel;
  @Input() isEdit: boolean=false;
  @ViewChild('addModal') addModal: OrderServiceDetailComponent;
  table: any;
  constructor(
    authService: AuthenticationService,
    private dialog: CommonDialogService,
    private service: OrderMenuDetailService,
    private menuService: MenuService,
    private datePipe: DatePipe,
    private router: Router,

  ) {
    super(authService);
  }

  ngOnInit() {

  }  
   
  add() {
    this.addModal.show(false, null, this.model.ID);
  }

  edit(id) {
    this.addModal.show(true, id, this.model.ID);
  }

  selectService(event) {
    if (event) {
      if(this.isEdit){ // Edit Order.
         this.service.GetByOrderId(event.OrderID).subscribe(r => {
           this.model.OrderMenuDetails = r;
         });
        }
        else{// addnew
          this.model.OrderMenuDetails.push(event);
        }
      }
    }
  

  removeService(index) {
      this.dialog.showSwalConfirmAlert('Xóa Mục Này').then(isConfirm => {
        if (isConfirm) {
          if(this.model.ID){
          this.service.Delete(this.model.OrderMenuDetails[index].ID).subscribe(
            r => {
              if (r) {
                this.dialog.showToastrSuccess(
                  'Xóa Dịch Vụ Sử Dụng',
                  MessageConstant.REQUEST_SUCCESS_CONST
                );
                this.model.OrderMenuDetails.splice(index, 1);
              }
            },
            error => {
              this.dialog.showSwalErrorAlert(
                'Xóa Dịch Vụ Sử Dụng', 'Xóa dịch vụ đang được sử dụng. Bạn Không thể xóa'
              );
            }
          );
        }
        else{
          this.model.OrderMenuDetails.splice(index, 1);
        }
      }
      });
  }
}
