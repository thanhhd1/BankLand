import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { KaraokeHistoryCriteria } from 'src/app/modules/common/criterias/karaoke-history.criteria';
import { ModalDirective } from 'ngx-bootstrap';
import { ImageStorageComponent } from '../../image-storage/image-storage.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ImageType } from 'src/app/modules/common/constant/message.const';
import { KaraokeHistoryService } from 'src/app/modules/common/services/karaoke-history.service';
import { DatePipe } from '@angular/common';
import { KaraokeHistoryInfoComponent } from './karaoke-history-info/karaoke-history-info.component';

@Component({
  selector: 'app-karaoke-history',
  templateUrl: './karaoke-history.component.html',
  styleUrls: ['./karaoke-history.component.css'],
  providers: [DatePipe]
})
export class KaraokeHistoryComponent extends BaseComponent implements OnInit {
  criteria: KaraokeHistoryCriteria = new KaraokeHistoryCriteria();
  serverLink = '/api/KaraokeHistory/Search';
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('imageStorageModal') imageStorageModal: ImageStorageComponent;
  @ViewChild('karaokeHistory') karaokeHistory: KaraokeHistoryInfoComponent;
  constructor(
    authService: AuthenticationService,
    private router: Router,
    private dialog: CommonDialogService,
    private service: KaraokeHistoryService,
    private datePipe: DatePipe
  ) {
    super(authService);
  }

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[0, 'asc']];
    this.aoColumnDefs = [
      { mData: 'HistoryDate', aTargets: [0] },
      { mData: 'BusinessName', aTargets: [1] },
      { mData: 'QuanlityRooms', aTargets: [2] },
      { mData: 'Address', aTargets: [3] },
      { mData: 'RepresentativePhone', aTargets: [4] },
      { mData: 'ID', bSortable: false, aTargets: [5] }
    ];

    this.aoColumns = [
      {
        sTitle: 'Ngày Thay Đổi',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data) {
            return this.parseDateTOString(data);
          }
          return '';
        }
      },
      {
        sTitle: 'Tên Cơ Sở Kinh Doanh',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        sTitle: 'Số Phòng Đăng Ký',
        sClass: 'text-center',
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }

          return "";
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
        sTitle: 'Điện Thoại',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
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
            '<button type="button"  method-name="showDetail"  class="btn btn-outline-primary mr-1 btn-sm" param="' +
            oObj.ID +
            '"><i class="la la-desktop"></i>Chi Tiết</button> ';

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
  }

  parseDateTOString(date) {
    if (date) {
      return this.datePipe.transform(date, 'dd/MM/yyyy');
    }
    return '';
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


  cancel() {
    this.modal.hide();
  }

  show(id) {
    this.criteria = new KaraokeHistoryCriteria();
    this.criteria.KaraokeID = id;
    this.RefreshTable();
    this.modal.show();
  }

  showFiles(id) {
    this.imageStorageModal.show(id, ImageType.Karaoke_File, 1);
  }

  showImages(id) {
    this.imageStorageModal.show(id, ImageType.Karaoke_Image, 0);
  }

  showDetail(id) {
    this.karaokeHistory.show(id);
  }
}
