import { Component, OnInit, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { CustomerCriteria } from 'src/app/modules/common/criterias/customer.criteria';
import { CustomerInfoComponent } from '../customer-info/customer-info.component';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { CustomerService } from 'src/app/modules/common/services/customer.service';
import { DatePipe } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent extends BaseComponent implements OnInit {
  criteria: CustomerCriteria = new CustomerCriteria();
  serverLink = '/api/Customer/Search';
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any; 
  @ViewChild('childModal') modal:ModalDirective;
  @ViewChild('addCust') addCust:CustomerInfoComponent;
  @Output() onClosed:EventEmitter<any> = new EventEmitter();
  constructor(authService: AuthenticationService,
    private router: Router,
    private dialog: CommonDialogService,
    private service: CustomerService , 
    private datePipe:DatePipe) {
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
            return  data;
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
          action += '<button type="button" title="" method-name="select"  class="btn btn-outline-danger mr-1 btn-sm" param="' + oObj.ID + '"><i class="ft-edit"></i> Chọn Khách Hàng</button> '; 

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

  add(){
    this.addCust.show(false,null);
  } 
  
  select(id){
    this.onClosed.emit(id);
    this.modal.hide();
  } 

  show(companyId){
    this.criteria.CompanyID = companyId;
    this.modal.show();
  } 

  hide(){
    this.modal.hide();
  }
}
