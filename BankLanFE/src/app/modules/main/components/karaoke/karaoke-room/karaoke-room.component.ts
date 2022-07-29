import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import {
  MessageConstant,
  ImageType
} from 'src/app/modules/common/constant/message.const';
import { KaraokeRoomCriteria } from 'src/app/modules/common/criterias/karaoke-room.criteria';
import { BaseComponent } from 'src/app/modules/base.component';
import { ImageStorageComponent } from '../../image-storage/image-storage.component';
import { KaraokeRoomInfoComponent } from './karaoke-room-info/karaoke-room-info.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { KaraokeRoomService } from 'src/app/modules/common/services/karaoke-room.service';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-karaoke-room',
  templateUrl: './karaoke-room.component.html',
  styleUrls: ['./karaoke-room.component.css']
})
export class KaraokeRoomComponent extends BaseComponent implements OnInit {
  criteria: KaraokeRoomCriteria = new KaraokeRoomCriteria();
  serverLink = '/api/KaraokeRoom/Search';
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('addModal') addModal: KaraokeRoomInfoComponent;
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('imageStorageModal') imageStorageModal: ImageStorageComponent;
  constructor(
    authService: AuthenticationService,
    private router: Router,
    private dialog: CommonDialogService,
    private service: KaraokeRoomService
  ) {
    super(authService);
  }

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[0, 'asc']];
    this.aoColumnDefs = [
      { mData: 'RoomName', aTargets: [0] },
      { mData: 'AreaRoom', aTargets: [1] },
      { mData: 'ID', bSortable: false, aTargets: [2] }
    ];

    this.aoColumns = [
      {
        sTitle: 'Tên Phòng',
        sClass: '',
        mRender: (data, type, oObj, full) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        sTitle: 'Diện Tích Phòng',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data) {
            return `${data}`;
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
          // action +=
          //   '<button type="button"  method-name="showFiles"  class="btn btn-outline-primary mr-1 btn-sm" param="' +
          //   oObj.ID +
          //   '"><i class="la la-folder"></i> Hồ Sơ</button> ';

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
    this.addModal.show(false, null, this.criteria.KaraokeID);
  }

  edit(id) {
    this.addModal.show(true, id, this.criteria.KaraokeID);
  }

  cancel() {
    this.modal.hide();
    this.onClose.emit(true);
  }

  show(karaokeId) {
    this.criteria = new KaraokeRoomCriteria();
    this.criteria.KaraokeID = karaokeId;
    this.RefreshTable();
    this.modal.show();
  }

  showFiles(id) {
    this.imageStorageModal.show(id, ImageType.KaraokeRoom_File, 1);
  }

  showImages(id) {
    this.imageStorageModal.show(id, ImageType.KaraokeRoom_Image, 0);
  }

  remove(id) {
    if (id) {
      this.dialog.showSwalConfirmAlert('Delete this item').then(isConfirm => {
        if (isConfirm) {
          this.service.Delete(id).subscribe(
            r => {
              if (r) {
                this.dialog.showToastrSuccess(
                  'Delete Customer',
                  MessageConstant.REQUEST_SUCCESS_CONST
                );
                this.RefreshTable();
              }
            },
            error => {
              this.dialog.showSwalErrorAlert(
                'Delete Customer',MessageConstant.DEL_ERROR_CONST
              );
            }
          );
        }
      });
    }
  }
}
