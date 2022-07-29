import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { RepresentativeCriteria } from 'src/app/modules/common/criterias/representative.criteria';
import { RepresentativeInfoComponent } from './representative-info/representative-info.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { CustomerService } from 'src/app/modules/common/services/customer.service';
import { DatePipe } from '@angular/common';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { RepresentativeService } from 'src/app/modules/common/services/representative.service';

@Component({
  selector: 'app-representative',
  templateUrl: './representative.component.html',
  styleUrls: ['./representative.component.css'],
  providers:[DatePipe]
})
export class RepresentativeComponent extends BaseComponent implements OnInit {
  criteria: RepresentativeCriteria = new RepresentativeCriteria();
  serverLink = '/api/Representative/Search';
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('addModal') addModal:RepresentativeInfoComponent;
  constructor(authService: AuthenticationService,
    private router: Router,
    private dialog: CommonDialogService,
    private service: RepresentativeService , 
    private datePipe:DatePipe) {
    super(authService);
  }
 

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[0, 'asc']];
    this.aoColumnDefs = [
      { 'mData': 'Name', 'aTargets': [0] },
      { 'mData': 'Birthday', 'aTargets': [1] }, 
      { 'mData': 'SocialNumber', 'aTargets': [2] },
      { 'mData': 'ProvideDate', 'aTargets': [3] },
      { 'mData': 'PlaceProvide', 'aTargets': [4] },
      { 'mData': 'Email', 'aTargets': [5] },
      { "mData": "Phone", "aTargets": [6] }, 
      { "mData": "Address", "aTargets": [7] }, 
      { 'mData': 'ID', 'bSortable': false, 'aTargets': [8] }];

    this.aoColumns = [
      {
        'sTitle': 'Name',
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
        'sClass': '',
        'mRender': (data, type, oObj) => {
          if (data) {
            return  this.datePipe.transform(data, 'dd/MM/yyyy');
          }
          return '';
        }
      },
      
      {
        'sTitle': 'CMND',
        'sClass': '',
        'mRender': (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },

      {
        'sTitle': 'Ngày Cấp',
        'sClass': '',
        'mRender': (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data,'dd/MM/yyyy');
          }
          return '';
        }
      },

      {
        'sTitle': 'Nơi Cấp',
        'sClass': '',
        'mRender': (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        'sTitle': 'Email',
        'sClass': '',
        'mRender': (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        'sTitle': 'SĐT',
        'sClass': '',
        'mRender': (data, type, oObj) => {
          if (data) {
            return data;
          }
          return "";
        }
      },
      {
        'sTitle': 'Địa Chỉ',
        'sClass': '',
        'mRender': (data, type, oObj) => {
          if (data) {
            return data;
          }
          return "";
        }
      }
      , {
        'sTitle': '',
        'sClass': 'text-center',
        'mRender': (data, type, oObj) => {
          var action = '';
          action += '<button type="button" title="Edit" method-name="edit"  class="btn btn-outline-info mr-1 btn-sm" param="' + oObj.ID + '"><i class="ft-edit"></i></button> ';
          action += '<button type="button" title="Delete" method-name="remove" class="btn btn-outline-danger round  mr-1 btn-sm" param="' + oObj.ID + '" ><i class="ft-trash-2"></i></button>';

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
    this.addModal.show(false,null);
  }

  edit(id) {
    this.addModal.show(true,id);
  }

  remove(id) {
    if (id) {
      this.dialog.showSwalConfirmAlert('Xóa Mục Người Đại Diện').then(isConfirm => {
        if (isConfirm) {
          this.service.Delete(id).subscribe(r => {
            if (r) {
              this.dialog.showToastrSuccess('Xóa Người Đại Diện', MessageConstant.REQUEST_SUCCESS_CONST);
              this.RefreshTable();
            }
          }, error => {
            this.dialog.showSwalErrorAlert('Xóa Người Đại Diện', 'Người đại diện này đang được sử dụng. Bạn Không thể xóa')
          });
        }
      });
    }
  }

}
