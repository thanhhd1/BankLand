
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { RoomTypeCriteria } from 'src/app/modules/common/criterias/room-type.criteria';
import { RoomTypeInfoComponent } from './room-type-info/room-type-info.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { CustomerService } from 'src/app/modules/common/services/customer.service';
import { DatePipe } from '@angular/common';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { RoomTypeService } from 'src/app/modules/common/services/room-type.service';

@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.css'],
  providers:[DatePipe]
})
export class RoomTypeComponent extends BaseComponent implements OnInit {
  criteria: RoomTypeCriteria = new RoomTypeCriteria();
  serverLink = '/api/RoomType/Search';
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('addModal') addModal:RoomTypeInfoComponent;
  constructor(authService: AuthenticationService,
    private router: Router,
    private dialog: CommonDialogService,
    private service: RoomTypeService , 
    private datePipe:DatePipe) {
    super(authService);
  }
 

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[0, 'asc']];
    this.aoColumnDefs = [
      { mData: 'Name', aTargets: [0] },
      { mData: 'KindOfRoom', aTargets: [1] }, ];

    this.aoColumns = [
      {
        sTitle: 'Tên Phòng',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        sTitle: 'Loại Phòng',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data) {
            return  data;
          }
          return '';
        }
      }      
      
      , {
        sTitle: '',
        sClass: 'text-center',
        mRender: (data, type, oObj) => {
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
      this.dialog.showSwalConfirmAlert('Bạn Muốn Xóa Loại Phòng Này').then(isConfirm => {
        if (isConfirm) {
          this.service.Delete(id).subscribe(r => {
            if (r) {
              this.dialog.showToastrSuccess('Xóa Loại Phòng', MessageConstant.REQUEST_SUCCESS_CONST);
              this.RefreshTable();
            }
          }, error => {
            this.dialog.showSwalErrorAlert('Xóa Loại Phòng', MessageConstant.DEL_ERROR_CONST)
          });
        }
      });
    }
  }

}

