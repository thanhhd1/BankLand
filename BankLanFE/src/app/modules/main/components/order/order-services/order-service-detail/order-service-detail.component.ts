import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { BaseComponent } from 'src/app/modules/base.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { OrderMenuDetailsModel } from 'src/app/modules/common/models/order-menu-detail.model';
import { OrderMenuDetailService } from 'src/app/modules/common/services/order-menu-details.service';
import { MenuModel } from 'src/app/modules/common/models/menu.model';
import { MenuService } from 'src/app/modules/common/services/menu.service';


@Component({
  selector: 'app-order-service-detail',
  templateUrl: './order-service-detail.component.html',
  styleUrls: ['./order-service-detail.component.css']
})
export class OrderServiceDetailComponent extends BaseComponent
  implements OnInit {
  model: OrderMenuDetailsModel;
  Submitting: boolean = false;
  isEdit: boolean = false;
  @Output() onClosed: EventEmitter<OrderMenuDetailsModel> = new EventEmitter();
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  menus: Array<MenuModel> = new Array<MenuModel>();
  constructor(
    authService: AuthenticationService,
    private dialog: CommonDialogService,
    private router: Router,
    private service: OrderMenuDetailService,
    private menuService: MenuService,
    private cdChanged: ChangeDetectorRef
  ) {
    super(authService);
  }

  ngOnInit() {
    this.model = new OrderMenuDetailsModel();
    this.model.Quantity = 0;
  }

  getMenus() {
    this.menus = new Array<MenuModel>();
    this.menuService.GetAll().subscribe(r => {
      this.menus = r;
    });
  }

  getEntity(id) {
    this.service.Get(id).subscribe(r => {
      this.model = r;
    });
  }

  show(isEdit, id, orderID) {
    this.form.resetForm();
    this.getMenus();
    this.isEdit = isEdit;
    this.Submitting = false;
    this.model = new OrderMenuDetailsModel();
    this.model.OrderID = orderID;
    this.model.MenuID = null;
    if (this.isEdit) {
      this.getEntity(id);
    }
    this.cdChanged.detectChanges();
    this.modal.show();
  }

  onChangeSelect() {
    if (this.model && this.model.MenuID && this.menus) {
      var index = this.menus.findIndex(c =>
        c.ID == this.model.MenuID);
      if (index >= 0) {
        var roomItem = this.menus[index];
        this.model.MenuName = roomItem.Name;
        this.model.Price = roomItem.Price;
        this.model.Unit = roomItem.Unit;
        this.model.UnitName = roomItem.UnitName;
        if (this.model.Quantity) {
          this.model.ThanhTien = (this.model.Quantity ? this.model.Quantity : 0) * this.model.Quantity;
        } else {
          this.model.ThanhTien = 0;
        }
      } else {
        //this.model.Quantity = 0;
        this.model.ThanhTien = 0;
      }
    }
  }

  quantityChange() {
    if (this.model && this.model.MenuID && this.menus) {
      this.model.ThanhTien = this.model.Price * (this.model.Quantity ? this.model.Quantity : 0);
    }
  }

  save() {
    if (this.Submitting) return;
    this.Submitting = true;
    if (!this.model.OrderID) {
      var entity = Object.assign({}, this.model);
      this.onClosed.emit(entity);
      this.modal.hide();
    }
    else {
      if (this.isEdit) {
        this.service.Edit(this.model).subscribe(
          result => {
            if (result) {
              this.Submitting = false;
              this.dialog.showSwalSuccesAlert(
                `${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Dịch Phát Sinh`,
                MessageConstant.EDIT_SCCCESS_CONST
              );
              var entity = Object.assign({}, this.model);
              this.onClosed.emit(entity);
              this.cancel();
            }
          },
          error => {
            this.Submitting = false;
            var strMessage =
              error && error.error
                ? error.error
                : MessageConstant.FAILURE_REQUEST;
            this.dialog.showSwalErrorAlert(
              `${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Dịch Phát Sinh`,
              strMessage
            );
          }
        );
      } else {
        this.model.CheckinDate = new Date;
        this.service.Create(this.model).subscribe(
          result => {
            if (result) {
              this.Submitting = false;
              this.dialog.showSwalSuccesAlert(
                `${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Dịch Phát Sinh`,
                MessageConstant.ADD_SUCCESS_CONST
              );
              var entity = Object.assign({}, this.model);
              this.onClosed.emit(entity);
              this.cancel();
            }
          },
          error => {
            this.Submitting = false;
            var strMessage =
              error && error.error
                ? error.error
                : MessageConstant.FAILURE_REQUEST;
            this.dialog.showSwalErrorAlert(
              `${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Dịch Phát Sinh`,
              strMessage
            );
          }
        );
      }
    }
  }

  cancel() {
    this.modal.hide();
  }
}
