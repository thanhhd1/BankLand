import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageConstant } from '../../common/constant/message.const';
import { LicenseTypeInfoComponent } from './license-type-info/license-type-info.component';
import { BaseComponent } from '../../base.component';
import { AuthenticationService } from '../../common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from '../../common/services/dialog.service';
import { LicenseTypeService } from '../../common/services/license-type.service';
import { LicenseTypeCriteria } from '../../../modules/common/criterias/license-type.criteria';

@Component({
  selector: 'app-license-type',
  templateUrl: './license-type.component.html',
  styleUrls: ['./license-type.component.css']
})
export class LicenseTypeComponent extends BaseComponent implements OnInit {
  criteria: LicenseTypeCriteria = new LicenseTypeCriteria();
  serverLink = '/api/LicenseType/Search';
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('addModal') addModal: LicenseTypeInfoComponent;
  constructor(authService: AuthenticationService,
    private router: Router,
    private dialog: CommonDialogService,
    private service: LicenseTypeService) {
    super(authService);
  }

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[0, 'asc']];
    this.aoColumnDefs = [
      { 'mData': 'Type', 'aTargets': [0] },
      { 'mData': 'Name', 'aTargets': [1] },
      { 'mData': 'ID', 'bSortable': false, 'aTargets': [2] }];

    this.aoColumns = [
      {
        'sTitle': 'Loại Giấy Phép',
        'sClass': '',
        'mRender': (data, type, oObj) => {
          if (data) {
            if (data == "1") {
              return 'Dịch Vụ Văn Hóa - Internet';
            }

            if (data == "2") {
              return 'Dịch Vụ Văn Hóa - Karaoke';
            }
          }

          return 'Dịch Vụ Lưu Trú - Khách Sạn, Nhà Nghỉ, HomeStay';
        }
      },
      {
        'sTitle': 'Tên Giấy Phép',
        'sClass': '',
        'mRender': (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
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

  add() {
    this.addModal.show(false, null);
  }

  edit(id) {
    this.addModal.show(true, id);
  }

  remove(id) {
    if (id) {
      this.dialog.showSwalConfirmAlert('Xóa loại giấy phép này').then(isConfirm => {
        if (isConfirm) {
          this.service.Delete(id).subscribe(r => {
            if (r) {
              this.dialog.showToastrSuccess('Xóa Loại Giấy Phép', MessageConstant.REQUEST_SUCCESS_CONST);
              this.RefreshTable();
            }
          }, error => {
            this.dialog.showSwalErrorAlert('Xóa Loại Giấy Phép', MessageConstant.DEL_ERROR_CONST)
          });
        }
      });
    }
  }

}

