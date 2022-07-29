import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MessageConstant,
  ImageType
} from 'src/app/modules/common/constant/message.const';
import { HistoricalSiteCriteria } from 'src/app/modules/common/criterias/historical-site.criteria';
import { BaseComponent } from 'src/app/modules/base.component';
import { HistoricalSiteInfoComponent } from './historical-site-info/historical-site-info.component';
import { ImageStorageComponent } from '../image-storage/image-storage.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { HistoricalSiteService } from 'src/app/modules/common/services/historical-site.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-historical-site',
  templateUrl: './historical-site.component.html',
  styleUrls: ['./historical-site.component.css'],
  providers: [DatePipe]
})
export class HistoricalSiteComponent extends BaseComponent implements OnInit {
  criteria: HistoricalSiteCriteria = new HistoricalSiteCriteria();
  serverLink = '/api/HistoricalSite/Search';
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('addModal') addModal: HistoricalSiteInfoComponent;
  @ViewChild('imageStorageModal') imageStorageModal: ImageStorageComponent;
  constructor(
    authService: AuthenticationService,
    private router: Router,
    private dialog: CommonDialogService,
    private service: HistoricalSiteService,
    private datePipe: DatePipe
  ) {
    super(authService);
  }

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[0, 'asc']];
    this.aoColumnDefs = [
      { mData: 'Name', aTargets: [0] },
      { mData: 'Category', aTargets: [1] },
      { mData: 'Address', aTargets: [2] },
      // { mData: 'Profile', aTargets: [3] },
      { mData: 'OrderNumberRecognition', aTargets: [3] },
      { mData: 'DecisionBy', aTargets: [4] },
      { mData: 'DecisionDate', aTargets: [5] },
      { mData: 'ID', bSortable: false, aTargets: [6] }
    ];

    this.aoColumns = [
      {
        sTitle: 'Tên Di Tích',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        sTitle: 'Xếp Hạng Di Tích',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data != undefined) {
            return this.getHistoricalType(data);
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
        sTitle: 'Số QĐ Công Nhận',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        sTitle: 'Cấp Thẩm Quyền Công Nhận',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        sTitle: 'Ngày Ra QĐ',
        sClass: 'text-center',
        mRender: (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, 'dd/MM/yyyy');
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
            '<button type="button" title="Sửa" method-name="edit"  class="btn btn-outline-info mr-1 btn-sm" param="' +
            oObj.ID +
            '"><i class="ft-edit"></i></button> ';
          action +=
            '<button type="button" title="Xoá" method-name="remove" class="btn btn-outline-danger round  mr-1 btn-sm" param="' +
            oObj.ID +
            '" ><i class="ft-trash-2"></i></button>';

          action +=
            '<button type="button"  method-name="showFiles"  class="btn btn-outline-primary mr-1 btn-sm" param="' +
            oObj.ID +
            '"><i class="la la-folder"></i> Hồ Sơ</button> ';

          action +=
            '<button type="button"  method-name="showImages"  class="btn btn-outline-success mr-1 btn-sm" param="' +
            oObj.ID +
            '"><i class="la la-image"></i> Hình Ảnh</button> ';

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
    this.criteria.Category = ""
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

  showFiles(id) {
    this.imageStorageModal.show(id, ImageType.HistoricalSite_File, 1);
  }

  showImages(id) {
    this.imageStorageModal.show(id, ImageType.HitoricalSite_Image, 0);
  }

  remove(id) {
    if (id) {
      this.dialog.showSwalConfirmAlert('Xoá Mục Này').then(isConfirm => {
        if (isConfirm) {
          this.service.Delete(id).subscribe(
            r => {
              if (r) {
                this.dialog.showToastrSuccess(
                  'Xoá Di Tích Lịch Sử',
                  MessageConstant.REQUEST_SUCCESS_CONST
                );
                this.RefreshTable();
              }
            },
            error => {
              this.dialog.showSwalErrorAlert(
                'Xoá Di Tích Lịch Sử',MessageConstant.DEL_ERROR_CONST
              );
            }
          );
        }
      });
    }
  }
}
