import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { RoomModel } from 'src/app/modules/common/models/room.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { OrderRoomDetailsModel } from 'src/app/modules/common/models/order-room-detail.model';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { OrderRoomDetailService } from 'src/app/modules/common/services/order-room-detail.service';
import { RoomService } from 'src/app/modules/common/services/room.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';

@Component({
  selector: 'app-order-room-detail',
  templateUrl: './order-room-detail.component.html',
  styleUrls: ['./order-room-detail.component.css']
})
export class OrderRoomDetailComponent extends BaseComponent implements OnInit {
  model: OrderRoomDetailsModel;
  valueTimeCheckIn: string;
  roomSource: RoomModel[] = [];
  Submitting: boolean = false;
  isEdit: boolean = false;
  id: string;
  @Output() onClosed: EventEmitter<OrderRoomDetailsModel> = new EventEmitter();
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  linkCheckUsingRoom: string = '';
  constructor(
    authService: AuthenticationService,
    private dialog: CommonDialogService,
    private datePipe: DatePipe,
    private router: Router,
    private cdChanged: ChangeDetectorRef,
    private service: OrderRoomDetailService,
    private roomService: RoomService
  ) {
    super(authService);
  }

  ngOnInit() {
    this.model = new OrderRoomDetailsModel();
  }

  show(isEdit, id, orderID) { 
    this.model = new OrderRoomDetailsModel();
    this.model.OrderID = orderID;
    this.isEdit = isEdit;

    if (id) {
      this.id = id;
      this.getEntity(id);
    } else {
      this.getRooms(null);
      this.modal.show();
    }

    this.cdChanged.detectChanges();
  }

  getEntity(id) {
    this.service.Get(id).subscribe(r => {
      this.model = r;
      this.getRooms(this.model.RoomID);
      this.modal.show();
    });
  }

  getRooms(roomId) {
    this.roomService.GetEmptyByCompany(roomId).subscribe(r => {
      this.roomSource = r;
    });
  }

  hide() {
    this.onClosed.emit();
    this.form.resetForm(); 
    this.modal.hide();
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
                `${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Đặt Phòng`,
                MessageConstant.EDIT_SCCCESS_CONST
              );
              var entity = Object.assign({}, this.model);
              this.onClosed.emit(entity);
              this.modal.hide();
            }
          },
          error => {
            this.Submitting = false;
            var strMessage =
              error && error.error
                ? error.error
                : MessageConstant.FAILURE_REQUEST;
            this.dialog.showSwalErrorAlert(
              `${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Đặt Phòng`,
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
                `${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Đặt Phòng`,
                MessageConstant.ADD_SUCCESS_CONST
              );
              var entity = Object.assign({}, this.model);
              this.onClosed.emit(entity);
              this.modal.hide();
            }
          },
          error => {
            this.Submitting = false;
            var strMessage =
              error && error.error
                ? error.error
                : MessageConstant.FAILURE_REQUEST;
            this.dialog.showSwalErrorAlert(
              `${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Đặt Phòng`,
              strMessage
            );
          }
        );
      }
    }
  }

  onchangRoomSelect() {
    if (this.model && this.model.RoomID && this.roomSource) {
      var indexRoom = this.roomSource.findIndex(c => c.ID == this.model.RoomID);
      if (indexRoom >= 0) {
        var roomItem = this.roomSource[indexRoom];
        this.model.RoomName = roomItem.Name;
        if (!this.model.IsManualPrice) {
          this.model.Price = roomItem.Price;
        }
      }

      // this.getThanhTien();
    }
  }

  getThanhTien() {
    if (this.model) {
      if (this.model.IsManualPrice) {
        this.model.ThanhTien = this.model.Price;
      } else {
        if (this.model.CheckinDate && this.model.CheckoutDate) {
          var days = this.showDays(
            this.model.CheckoutDate,
            this.model.CheckinDate
          );
          this.model.ThanhTien = days * this.model.Price;
        } else {
          this.model.ThanhTien = this.model.Price;
        }
      }
      return this.model.ThanhTien;
    }
    return 0;
  }

  showDays(firstDate, secondDate) {
    var startDay = new Date(firstDate);
    var endDay = new Date(secondDate);
    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var millisBetween = startDay.getTime() - endDay.getTime();
    var days = millisBetween / millisecondsPerDay;

    // Round down.
    return Math.floor(days) + 1;
  }
}
