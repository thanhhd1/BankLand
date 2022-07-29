import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { BaseComponent } from 'src/app/modules/base.component';
import { OrganizationCriteria } from 'src/app/modules/common/criterias/organization.criteria';
import { OrganizationInfoComponent } from './organization-info/organization-info.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { OrganizationService } from 'src/app/modules/common/services/organization.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
  providers: [DatePipe]
})
export class OrganizationComponent extends BaseComponent implements OnInit {
  criteria: OrganizationCriteria = new OrganizationCriteria();
  serverLink = '/api/Organization/Search';
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('addModal') addModal: OrganizationInfoComponent;
  constructor(
    authService: AuthenticationService,
    private router: Router,
    private dialog: CommonDialogService,
    private service: OrganizationService,
    private datePipe: DatePipe
  ) {
    super(authService);
  }

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[0, 'asc']];
    this.aoColumnDefs = [
      { mData: 'Name', aTargets: [0] },
      { mData: 'Address', aTargets: [1] },
      { mData: 'RepresentativeID', aTargets: [2] },
      { mData: 'ID', bSortable: false, aTargets: [3] }
    ];

    this.aoColumns = [
      {
        sTitle: 'Tên Tổ Chức',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        sTitle: 'Địa Chỉ',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },

      {
        sTitle: 'Người Đại Diện',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (oObj && oObj.Representative) {
            return oObj.Representative.Name;
          }
          return '';
        }
      },
      {
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

  add() {
    this.addModal.show(false, null);
  }

  edit(id) {
    this.addModal.show(true, id);
  }

  remove(id) {
    if (id) {
      this.dialog.showSwalConfirmAlert('Xóa Mục Này').then(isConfirm => {
        if (isConfirm) {
          this.service.Delete(id).subscribe(
            r => {
              if (r) {
                this.dialog.showToastrSuccess(
                  'Xóa Tổ Chức',
                  MessageConstant.REQUEST_SUCCESS_CONST
                );
                this.RefreshTable();
              }
            },
            error => {
              this.dialog.showSwalErrorAlert(
                'Xóa Tổ Chức', 'Tổ chức này đang được sử dụng. Bạn Không thể xóa'
              );
            }
          );
        }
      });
    }
  }
}
