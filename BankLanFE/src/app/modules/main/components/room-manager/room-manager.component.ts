import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/modules/common/services/room.service';
import { RoomModel } from 'src/app/modules/common/models/room.model';
import { OrderRoomDetailsModel } from 'src/app/modules/common/models/order-room-detail.model';
import { OrderRoomDetailService } from 'src/app/modules/common/services/order-room-detail.service';
import { RoomInfoComponent } from '../room/room-info/room-info.component';

@Component({
  selector: 'app-room-manager',
  templateUrl: './room-manager.component.html',
  styleUrls: ['./room-manager.component.css'],
  providers: [DatePipe]
})
export class RoomManagerComponent extends BaseComponent implements OnInit {
  model: Array<RoomModel>;
  orderID: string;
  @ViewChild('addModal') addModal: RoomInfoComponent;
  constructor(
    authService: AuthenticationService,
    private dialog: CommonDialogService,
    private service: RoomService,
    private orderRoomService: OrderRoomDetailService,
    private datePipe: DatePipe,
    private router: Router
  ) {
    super(authService);
  }

  async ngOnInit() {
    this.model = new Array<RoomModel>();
    this.getRooms();
  }

  getRooms() {
    this.service.GetByCompany().subscribe(r => {
      this.model = r;
    });
  }

  addNewRoom() {
    this.addModal.show(false, null);
  }

  add(id) {
    this.router.navigateByUrl(`/management/invoice/${null}/${id}`);
  }

  edit(id) {
    // Get Room exits order unpaid
    this.orderRoomService.GetByRoomId(id).subscribe(r => {
      this.orderID = r;
      if (this.orderID)
        this.router.navigateByUrl(`/management/invoice/${this.orderID}`);
    });
  }

  refreshRooms() {
    this.getRooms();
  }
}
