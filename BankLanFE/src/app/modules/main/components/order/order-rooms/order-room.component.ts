import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { OrderModel } from 'src/app/modules/common/models/order.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { RoomModel } from 'src/app/modules/common/models/room.model';
import { RoomService } from 'src/app/modules/common/services/room.service';
import { OrderRoomDetailComponent } from './order-room-detail/order-room-detail.component';
import { OrderRoomDetailService } from 'src/app/modules/common/services/order-room-detail.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
declare var $: any;

@Component({
  selector: 'app-order-room',
  templateUrl: './order-room.component.html',
  styleUrls: ['./order-room.component.css'],
  providers: [DatePipe]
})
export class OrderRoomComponent extends BaseComponent implements OnInit {
  @Input() model: OrderModel;
  @Input() isEdit: boolean = false;
  isChanged: boolean = false;
  roomSource: RoomModel[] = [];
  roomSourceExist: RoomModel[] = [];
  @ViewChild('selectRoomModal') selectRoomModal: OrderRoomDetailComponent;

  constructor(
    authService: AuthenticationService,
    private roomService: RoomService,
    private orderRoomDetailService: OrderRoomDetailService,
    private dialog: CommonDialogService,
    private datePipe: DatePipe,
    private router: Router
  ) {
    super(authService);
  }

  ngOnInit() {
  }

  removeRoom(index) {
    this.dialog.showSwalConfirmAlert('Bạn Muốn Xóa Việc Chọn Phòng Này').then(isConfirm => {
      if (isConfirm) {
        var removeItem = this.model.OrderRoomDetails[index];
        if (removeItem.ID) {
          this.orderRoomDetailService.Delete(removeItem.ID).subscribe(result => {
            if (result) {
              this.dialog.showSwalSuccesAlert(`Order Room Detail`, MessageConstant.DEL_SUCCESS_CONST);
            }
          }, error => {
            var strMessage = error && error.error ? error.error : MessageConstant.DEL_ERROR_CONST;
            this.dialog.showSwalErrorAlert(`Order Room Detail`, strMessage);
          });
        }

        // Removed from list
        this.model.OrderRoomDetails.splice(index, 1);
      }
    });
  }

  editRoom(id) {
    this.selectRoomModal.show(true, id, this.model.ID);
  }

  selectBookingRoom(event) {
    if (event) {
      // removed data old
      if (this.isEdit) {
        this.orderRoomDetailService.GetByOrderId(event.OrderID).subscribe(result => {
          if (result) {
            this.model.OrderRoomDetails = result;
          }
        }, error => {
          var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
          this.dialog.showSwalErrorAlert(`Order Room Detail`, strMessage);
        });
      } else {
        this.model.OrderRoomDetails.push(event);
      }
    }
  }

  selectRoom() {
    // remove item room has selected
    this.roomSourceExist = Object.assign([], this.roomSource);
    if (this.model.OrderRoomDetails && this.model.OrderRoomDetails.length > 0) {
      for (var i = 0; i < this.model.OrderRoomDetails.length; i++) {
        var indexRoom = this.roomSourceExist.findIndex(c =>
          c.ID == this.model.OrderRoomDetails[i].RoomID);
        if (indexRoom >= 0) {
          this.roomSourceExist.splice(indexRoom, 1);
        }
      }
    }
    this.selectRoomModal.show(false, null, this.model.ID);
  }

  getThanhTien(source) {
    if (source) {
      if (source.IsManualPrice) {
        source.ThanhTien = source.Price;
      } else {
        if (source.CheckinDate && source.CheckoutDate) {
          var days = this.showDays(source.CheckoutDate, source.CheckinDate);
          source.ThanhTien = days * source.Price;
        } else {
          source.ThanhTien = source.Price;
        }
      }

      return source.ThanhTien;
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
    return (Math.floor(days)) + 1;
  }
}
