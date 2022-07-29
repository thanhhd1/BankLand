import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageConstant, ImageType } from 'src/app/modules/common/constant/message.const';
import { BaseComponent } from 'src/app/modules/base.component';
import { DatePipe } from '@angular/common';
import { KaraokeCriteria } from 'src/app/modules/common/criterias/karaoke.criteria';
import { KaraokeInfoComponent } from './karaoke-info/karaoke-info.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { KaraokeService } from 'src/app/modules/common/services/karaoke.service';
import { KaraokeRoomComponent } from './karaoke-room/karaoke-room.component';
import { ImageStorageComponent } from '../image-storage/image-storage.component';
import { KaraokeHistoryComponent } from './karaoke-history/karaoke-history.component';
import { RepresentativeInfoComponent } from '../representative/representative-info/representative-info.component';

@Component({
  selector: 'app-karaoke',
  templateUrl: './karaoke.component.html',
  styleUrls: ['./karaoke.component.css'],
  providers: [DatePipe]
})
export class KaraokeComponent extends BaseComponent implements OnInit {
  criteria: KaraokeCriteria = new KaraokeCriteria();
  serverLink = '/api/Karaoke/Search';
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('addModal') addModal: KaraokeInfoComponent;
  @ViewChild('modalRoom') modalRoom: KaraokeRoomComponent;
  @ViewChild('imageStorageModal') imageStorageModal: ImageStorageComponent;
  @ViewChild('historyModal') historyModal: KaraokeHistoryComponent;
  @ViewChild('representativeinfoModal') representativeinfoModal: RepresentativeInfoComponent;

  constructor(authService: AuthenticationService,
    private router: Router,
    private dialog: CommonDialogService,
    private service: KaraokeService,
    private datePipe: DatePipe) {
    super(authService);
  }

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[0, 'asc']];
    this.aoColumnDefs = [
      { mData: 'BusinessName', aTargets: [0] },
      { mData: 'QuanlityRooms', aTargets: [1] },
      { mData: 'QuanlityRooms', aTargets: [2] },
      { mData: 'Address', aTargets: [3] },
      { mData: 'OrganizationName', aTargets: [4] },
      { mData: 'RepresentativeName', aTargets: [5] },
      { mData: 'Phone', aTargets: [6] },
      { mData: 'ID', bSortable: false, aTargets: [7] },
      { mData: 'ID', bSortable: false, aTargets: [8] }];

    this.aoColumns = [
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
        sTitle: 'Chi Tiết Phòng',
        sClass: 'f-10',
        mRender: (data, type, oObj) => {
          return oObj.RoomsDetails;
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
        sTitle: 'Tổ Chức/Cá Nhân',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (oObj && oObj.Organization && oObj.IsOrganization) {
            return 'Tổ Chức - ' + oObj.Organization.Name;
          }
          return 'Cá Nhân';
        }
      },
      {
        sTitle: 'Người Đại Diện/Đăng Ký',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (oObj && oObj.Organization && oObj.IsOrganization) {
            return "<a  href='javascript:void(0);' title='Show Người Đại Diện' style='margin-bottom:1px' param='" + oObj.Organization.Representative.ID + "' method-name='showRepresentativeInfo'><span style = 'padding-top:5px;'> " + oObj.Organization.Representative.Name + " </span></a>";
          }
          else if (oObj && oObj.Representative && !oObj.IsOrganization) {
            return "<a  href='javascript:void(0);' title='Show Người Đại Diện' style='margin-bottom:1px' param='" + oObj.Representative.ID + "' method-name='showRepresentativeInfo'><span style = 'padding-top:5px;'> " + oObj.Representative.Name + " </span></a>";
          }

          return '';
        }
      },
      {
        sTitle: 'Điện Thoại',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (oObj && oObj.Organization && oObj.IsOrganization) {
            return oObj.Organization.Representative.Phone;
          }
          else if (oObj && oObj.Representative && !oObj.IsOrganization) {
            return oObj.Representative.Phone;
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
      },
      {
        sTitle: '',
        sClass: 'text-center',
        mRender: (data, type, oObj) => {
          var action = '';
          action +=
            '<button type="button" title="Rooms" method-name="rooms" class="btn btn-outline-info round  mr-1 btn-sm" param="' +
            oObj.ID +
            '" ><i class="la la-building"></i></button>';
          if (oObj.IsExistFiles && oObj.Rooms && oObj.Rooms.length > 0) {
            action +=
              '<button type="button" title="Cấp Bổ Sung" method-name="appendDecision"  class="btn btn-outline-danger mr-1 btn-sm" param="' +
              oObj.ID +
              '"><i class="la la-unlink"></i> Cấp Bổ Sung</button> ';
          }
          action +=
            '<button type="button"  method-name="showFiles"  class="btn btn-outline-primary mr-1 btn-sm" param="' +
            oObj.ID +
            '"><i class="la la-folder"></i> Hồ Sơ</button> ';

          action +=
            '<button type="button"  method-name="showImages"  class="btn btn-outline-success mr-1 btn-sm" param="' +
            oObj.ID +
            '"><i class="la la-image"></i> Hình Ảnh</button>';

          action +=
            '<button type="button" title="History" method-name="histories"  class="btn btn-outline-danger mr-1 btn-sm" param="' +
            oObj.ID +
            '"><i class="la la-unlink"></i> Lịch Sử Cấp Hồ Sơ</button>';

          return action;
        }
      }];
  }

  showRepresentativeInfo(id) {
    this.representativeinfoModal.show(true, id);
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

  rooms(id) {
    this.modalRoom.show(id);
  }

  showFiles(id) {
    this.imageStorageModal.show(id, ImageType.Karaoke_File, 1)
  }

  showImages(id) {
    this.imageStorageModal.show(id, ImageType.Karaoke_Image, 0)
  }

  histories(id) {
    this.historyModal.show(id);
  }

  appendDecision(id) {
    this.dialog.showSwalConfirmAlert('Cấp Bổ Sung Hồ Sơ cho Karaoke này?')
      .then(isConfirm => {
        if (isConfirm) {
          this.service.MoveHistory(id).subscribe(r => {
            if (r) {
              this.dialog.showToastrSuccess('Cấp Bổ Sung Hồ Sơ', "Karaoke đã được lưu lich sử");
              this.RefreshTable();
            }
          }, error => {
            this.dialog.showSwalErrorAlert('Cấp Bổ Sung Hồ Sơ', 'Xảy ra lỗi khi tiến hành chuyển hồ sơ cũ, vui lòng thử lại');
          });
        }
      });
  }

  remove(id) {
    if (id) {
      this.dialog.showSwalConfirmAlert('Xóa Mục Này').then(isConfirm => {
        if (isConfirm) {
          this.service.Delete(id).subscribe(r => {
            if (r) {
              this.dialog.showToastrSuccess('Xóa Mục', MessageConstant.REQUEST_SUCCESS_CONST);
              this.RefreshTable();
            }
          }, error => {
            this.dialog.showSwalErrorAlert('Xóa Mục', MessageConstant.DEL_ERROR_CONST)
          });
        }
      });
    }
  }

}
