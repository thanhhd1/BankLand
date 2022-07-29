import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { ServicesManagementCriteria } from 'src/app/modules/common/criterias/services-management.criteria';
import { ServicesManagementInfoComponent } from './services-management-info/services-management-info.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { DatePipe } from '@angular/common';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { ServicesManagementService } from 'src/app/modules/common/services/services-management.service';
import Global from 'src/app/Global';

@Component({
  selector: 'app-services-management',
  templateUrl: './services-management.component.html',
  styleUrls: ['./services-management.component.css'],
  providers: [DatePipe]
})
export class ServicesManagementComponent extends BaseComponent
  implements OnInit {
  criteria: ServicesManagementCriteria = new ServicesManagementCriteria();
  serverLink = '/api/Menu/Search';
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('addModal') addModal: ServicesManagementInfoComponent;
  constructor(
    authService: AuthenticationService,
    private router: Router,
    private dialog: CommonDialogService,
    private service: ServicesManagementService,
    private datePipe: DatePipe
  ) {
    super(authService);
  }

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[0, 'asc']];
    this.aoColumnDefs = [
      { mData: 'CompanyName', aTargets: [0] },
      { mData: 'Name', aTargets: [1] },
      { mData: 'Price', aTargets: [2] },
      { mData: 'UnitName', aTargets: [3] }
    ];

    this.aoColumns = [
      {
        sTitle: 'Tên Tổ Chức Kinh Doanh',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        sTitle: 'Tên Dịch Vụ',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        sTitle: 'Đơn Giá',
        sClass: 'text-right',
        mRender: (data, type, oObj) => {
          if (data) {
            return (
              '<span style="text-align:right">' +
              Global.FormatCurrency(data) +
              '</span>'
            );
          }

          return '';
        }
      },
      {
        sTitle: 'Đơn Vị Tính',
        sClass: 'text-center',
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      }
    ];

    if (this.currentUser.Role === 'CompanyAdmin') {
      this.aoColumnDefs.push({ mData: 'ID', bSortable: false, aTargets: [4] });

      this.aoColumns.push({
        sTitle: '',
        sClass: 'text-center',
        mRender: (data, type, oObj) => {
          var action = '';
          action +=
            '<button type="button" title="Edit" method-name="edit"  class="btn btn-outline-info mr-1 btn-sm" param="' +
            oObj.ID +
            '"><i class="ft-edit"></i></button> ';
          action +=
            '<button type="button" title="Delete" method-name="remove" class="btn btn-outline-danger round  mr-1 btn-sm" param="' +
            oObj.ID +
            '" ><i class="ft-trash-2"></i></button>';
          return action;
        }
      });
    }
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

  add() {
    this.addModal.show(false, null);
  }

  edit(id) {
    this.addModal.show(true, id);
  }

  remove(id) {
    if (id) {
      this.dialog.showSwalConfirmAlert('Xoá dịch vụ này').then(isConfirm => {
        if (isConfirm) {
          this.service.Delete(id).subscribe(
            r => {
              if (r) {
                this.dialog.showToastrSuccess(
                  'Xoá dịch vụ',
                  MessageConstant.REQUEST_SUCCESS_CONST
                );
                this.RefreshTable();
              }
            },
            error => {
              this.dialog.showSwalErrorAlert(
                'Xoá dịch vụ',
                MessageConstant.DEL_ERROR_CONST
              );
            }
          );
        }
      });
    }
  }
}
