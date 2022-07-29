import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { CustomerCriteria } from 'src/app/modules/common/criterias/customer.criteria';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { CustomerService } from 'src/app/modules/common/services/customer.service';
import { BaseComponent } from 'src/app/modules/base.component';
import { DatePipe } from '@angular/common';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [DatePipe]
})
export class CustomerComponent extends BaseComponent implements OnInit {
  criteria: CustomerCriteria = new CustomerCriteria();
  serverLink = '/api/Customer/Search';
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('addCust') addCust: CustomerInfoComponent;
  constructor(authService: AuthenticationService,
    private router: Router,
    private dialog: CommonDialogService,
    private service: CustomerService,
    private datePipe: DatePipe) {
    super(authService);
  }

  parseDateTOString(date) {
    if (date) {
      return this.datePipe.transform(date, 'dd/MM/yyyy');
    }
    return '';
  }

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[0, 'asc']];
    this.aoColumnDefs = [
      { 'mData': 'Name', 'aTargets': [0] },
      { 'mData': 'SocialNumber', 'aTargets': [1] },
      { 'mData': 'ProviderDate', 'aTargets': [2] },
      { 'mData': 'PlaceProvider', 'aTargets': [3] },
      { 'mData': 'Address', 'aTargets': [4] },
      { "mData": "BirthDate", "aTargets": [5] },
      { 'mData': 'ID', 'bSortable': false, 'aTargets': [6] }];

    this.aoColumns = [
      {
        'sTitle': 'Tên',
        'sClass': '',
        'mRender': (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        'sTitle': 'Số CMND',
        'sClass': 'text-center',
        'mRender': (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },

      {
        'sTitle': 'Ngày Cấp CMND',
        'sClass': 'text-center',
        'mRender': (data, type, oObj) => {
          if (data) {
            return this.parseDateTOString(data);
          }
          return '';
        }
      },
      {
        'sTitle': 'Nơi Cấp CMND',
        'sClass': '',
        'mRender': (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },

      {
        'sTitle': 'Địa Chỉ',
        'sClass': '',
        'mRender': (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        'sTitle': 'Ngày Sinh',
        'sClass': 'text-center',
        'mRender': (data, type, oObj) => {
          if (data) {
            return this.parseDateTOString(data);
          }
          return '';
        }
      }
      , {
        'sTitle': '',
        'sClass': 'text-center',
        'mRender': (data, type, oObj) => {
          var action = '';

          if (this.currentUser.Role == 'CompanyAdmin') {
            action += '<button type="button" title="Edit" method-name="edit"  class="btn btn-outline-info mr-1 btn-sm" param="' + oObj.ID + '"><i class="ft-edit"></i></button> ';
            action += '<button type="button" title="Delete" method-name="remove" class="btn btn-outline-danger round  mr-1 btn-sm" param="' + oObj.ID + '" ><i class="ft-trash-2"></i></button>';
          }

          return action;
        }
      }];
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
          case "iDisplayStart":
            this.criteria.CurrentPage = element.value;
            break;
          case "iDisplayLength":
            this.criteria.ItemPerPage = element.value;
            break;
          case "iSortCol_0":
            this.criteria.SortColumn = this.aoColumnDefs[element.value].mData;
            break;
          case "sSortDir_0":
            this.criteria.SortDirection = element.value;
            break;
          case "sSearch":
            this.criteria.SearchText = element.value;
            break;
        }
      });
    }

    this.criteria.CurrentPage = Math.ceil(this.criteria.CurrentPage / this.criteria.ItemPerPage);
    return this.criteria;
  }

  add() {
    this.addCust.show(false, null);
  }

  edit(id) {
    this.addCust.show(true, id);
  }

  remove(id) {
    if (id) {
      this.dialog.showSwalConfirmAlert('Bạn muốn xóa Khách Hàng').then(isConfirm => {
        if (isConfirm) {
          this.service.Delete(id).subscribe(r => {
            if (r) {
              this.dialog.showToastrSuccess('Xóa Khách hàng', MessageConstant.REQUEST_SUCCESS_CONST);
              this.RefreshTable();
            }
          }, error => {
            this.dialog.showSwalErrorAlert('Xóa Khách hàng', MessageConstant.DEL_ERROR_CONST)
          });
        }
      });
    }
  }

}
