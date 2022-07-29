import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { CompanyService } from 'src/app/modules/common/services/company.service';
import { CompanyModel } from 'src/app/modules/common/models/company.model';
import { OrderModel } from 'src/app/modules/common/models/order.model';
import { OrderCriteria } from 'src/app/modules/common/criterias/order.criteria';
import { OrderService } from 'src/app/modules/common/services/order.service';
import { RoomService } from 'src/app/modules/common/services/room.service';
import { RoomModel } from 'src/app/modules/common/models/room.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.css'],
  providers: [DatePipe]
})
export class CompanyManagementComponent extends BaseComponent
  implements OnInit {
  model: CompanyModel = new CompanyModel();
  criteriaOrder: OrderCriteria = new OrderCriteria();
  orders: Array<OrderModel> = new Array<OrderModel>();
  roomModel: Array<RoomModel>;
  constructor(
    authService: AuthenticationService,
    private dialog: CommonDialogService,
    private service: CompanyService,
    private roomService: RoomService,
    private orderService: OrderService,
    private datePipe: DatePipe,
    private router: Router
  ) {
    super(authService);
  }

  async ngOnInit() {
    this.service.GetByCurrentUser().subscribe(r => {
      this.model = r;
    });

    this.initCriteriaOrder();
    this.criteriaOrder.IsCompleted = false;
    this.orderService.Search(this.criteriaOrder).subscribe(o => {
      this.orders = o.Data;
    });

    this.roomService.GetByCompany().subscribe(r => {
      this.roomModel = r;
    });
  }

  initCriteriaOrder = () => {
    this.criteriaOrder.ItemPerPage = 10;
    this.criteriaOrder.SortColumn = 'OrderDate';
    this.criteriaOrder.SortDirection = 'desc';
    this.criteriaOrder.IsCompleted = false;
  };

  renderCustomers = orderCustomers => {
    return orderCustomers
      .map(e => e.Customer.Name + ' - ' + e.Customer.SocialNumber)
      .join('\n ');
  };

  renderRoomDetails = orderRoomDetails => {
    return orderRoomDetails.map(e => {
      const roomType = e.Room.RoomType ? e.Room.RoomType.Name : '';
      return `${e.Room.Name}\n${roomType}`;
    });
  };

  getNumberByRoomStatus = (rooms, status) => {
    let count = 0;
    if (!rooms) return count;
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].RoomStatus === status) count++;
    }
    return count;
  };
}
