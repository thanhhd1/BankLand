import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { DatePipe } from '@angular/common';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { OrderCriteria } from 'src/app/modules/common/criterias/order.criteria';
import { OrderService } from 'src/app/modules/common/services/order.service';
import Global from 'src/app/Global';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [DatePipe]
})
export class OrderComponent extends BaseComponent implements OnInit {
  criteria: OrderCriteria = new OrderCriteria();
  serverLink = '/api/Order/Search';
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  companyId: string;
  constructor(
    authService: AuthenticationService,
    private router: Router,
    private dialog: CommonDialogService,
    private activeRouter: ActivatedRoute,
    private service: OrderService,
    private datePipe: DatePipe
  ) {
    super(authService);
  }

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[0, 'asc']];
    this.aoColumnDefs = [
      { mData: 'OrderInvoice', aTargets: [0] },
      { mData: 'OrderDate', aTargets: [1] },
      { mData: 'Customer.Name', aTargets: [2] },
      { mData: 'Room.Name', aTargets: [3] },
      { mData: 'Total', aTargets: [4] },
      { mData: 'CompletedDate', aTargets: [5] },
      { mData: 'IsCompleted', aTargets: [6] }
    ];

    this.aoColumns = [
      {
        sTitle: 'Số Hóa Đơn',
        sClass: 'text-center',
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        sTitle: 'Ngày Đăng Ký',
        sClass: 'text-center',
        mRender: (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, 'dd/MM/yyyy hh:mm a');
          }
          return '';
        }
      },
      {
        sTitle: 'Tên Khách Hàng',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (oObj && oObj.OrderCustomers) {
            return oObj.OrderCustomers.map(
              e => e.Customer.Name + ' - ' + e.Customer.SocialNumber
            ).join('</br> ');
          }
          return '';
        }
      },
      {
        sTitle: 'Số Phòng',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (oObj && oObj.OrderRoomDetails) {
            return oObj.OrderRoomDetails.map(e => e.Room.Name).join('</br> ');
          }
          return '';
        }
      },
      {
        sTitle: 'Tổng Tiền',
        sClass: 'text-right',
        mRender: (data, type, oObj) => {
          if (data) {
            return Global.FormatCurrency(data);
          }
          return '';
        }
      },
      {
        sTitle: 'Ngày Thanh Toán',
        sClass: 'text-center',
        mRender: (data, type, oObj) => {
          if (data && !data.includes('0001-01-01')) {
            return this.datePipe.transform(data, 'dd/MM/yyyy hh:mm a');
          }
          return '';
        }
      },
      {
        sTitle: 'Trạng Thái',
        sClass: 'text-center',
        mRender: (data, type, oObj) => {
          if (oObj) {
            return !oObj.IsCompleted
              ? '<div class="badge badge-warning round">Chưa Thanh Toán</div>'
              : '<div class="badge badge-success round">Đã Thanh Toán</div>';
          }
          return '';
        }
      },
      {
        sTitle: '',
        sClass: 'text-center',
        mRender: (data, type, oObj) => {
          var action = '';
          if (oObj.IsCompleted) {
            action +=
              '<button type="button" title="Chi tiết" method-name="edit"  class="btn btn-outline-info mr-1 btn-sm" param="' +
              oObj.ID +
              '"><i class="la la-desktop"></i></button> ';
          } else {
            action +=
              '<button type="button" title="Sửa" method-name="edit"  class="btn btn-outline-info mr-1 btn-sm" param="' +
              oObj.ID +
              '"><i class="ft-edit"></i></button> ';
          }

          action +=
            '<button type="button" title="Delete" method-name="remove" class="btn btn-outline-danger round  mr-1 btn-sm" param="' +
            oObj.ID +
            '" ><i class="ft-trash-2"></i></button>';

          return action;
        }
      }
    ];
  }

  RefreshTable() {
    this.table.ajax.reload();
  }
  catchTable(event) {
    this.table = event;
  }

  async ngOnInit() {
    this.InitTable();
  }

  SetCriteria(aoData: any) {
    if (aoData) {
      aoData.forEach(element => {
        switch (element.name) {
          case 'iDisplayStart':
            this.criteria.CurrentPage = element.value;
            break;
          case 'iDisplayLength':
            this.criteria.ItemPerPage = element.value;
            break;
          case 'iSortCol_0':
            this.criteria.SortColumn = this.aoColumnDefs[element.value].mData;
            break;
          case 'sSortDir_0':
            this.criteria.SortDirection = element.value;
            break;
          case 'sSearch':
            this.criteria.SearchText = element.value;
            break;
        }
      });
    }

    this.criteria.CurrentPage = Math.ceil(
      this.criteria.CurrentPage / this.criteria.ItemPerPage
    );
    return this.criteria;
  }

  edit(id) {
    this.router.navigateByUrl(`/management/invoice/${id}`);
  }

  remove(id) {
    if (id) {
      this.dialog
        .showSwalConfirmAlert('Bạn Muốn Xóa Đơn Hàng Này')
        .then(isConfirm => {
          if (isConfirm) {
            this.service.Delete(id).subscribe(
              r => {
                if (r) {
                  this.dialog.showToastrSuccess(
                    'Xóa Đơn Hàng',
                    MessageConstant.REQUEST_SUCCESS_CONST
                  );
                  this.RefreshTable();
                }
              },
              error => {
                this.dialog.showSwalErrorAlert(
                  'Xóa Đơn Hàng',
                  MessageConstant.DEL_ERROR_CONST
                );
              }
            );
          }
        });
    }
  }
}
