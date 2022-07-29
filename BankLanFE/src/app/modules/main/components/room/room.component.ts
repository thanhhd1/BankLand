import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { RoomCriteria } from 'src/app/modules/common/criterias/room.criteria';
import { RoomInfoComponent } from './room-info/room-info.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { DatePipe } from '@angular/common';
import { MessageConstant, ImageType } from 'src/app/modules/common/constant/message.const';
import { RoomService } from 'src/app/modules/common/services/room.service';
import { ImageStorageComponent } from '../image-storage/image-storage.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [DatePipe]
})
export class RoomComponent extends BaseComponent implements OnInit {
  criteria: RoomCriteria = new RoomCriteria();
  serverLink = '/api/Room/Search';
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  companyId: string;
  @ViewChild('addModal') addModal: RoomInfoComponent;
  @ViewChild('imageStorageModal') imageStorageModal: ImageStorageComponent;
  constructor(authService: AuthenticationService,
    private router: Router,
    private dialog: CommonDialogService,
    private activeRouter: ActivatedRoute,
    private service: RoomService,
    private datePipe: DatePipe) {
    super(authService);
    activeRouter.params.subscribe(r => {
      this.companyId = r['companyId'];
      if (!this.companyId) {
        this.router.navigateByUrl('/');
      } else {
        this.criteria.CompanyID = this.companyId;
      }
    });
  }


  InitTable() {
    this.compRef = this;
    this.aaSorting = [[0, 'asc']];
    this.aoColumnDefs = [
      { mData: 'Name', aTargets: [0] },
      { mData: 'RoomTypeId', aTargets: [1] },
      { mData: 'Price', aTargets: [2] },
      { mData: 'AreaRoom', aTargets: [3] },
      { mData: 'ID', 'bSortable': false, aTargets: [4] }
    ];

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
          if (oObj && oObj.RoomTypeId && oObj.RoomType) {
            return oObj.RoomType.Name;
          }
          return '';
        }
      },
      {
        sTitle: 'Giá Phòng',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        sTitle: 'Diện tích Phòng',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      }
      , {
        sTitle: '',
        sClass: 'text-center',
        mRender: (data, type, oObj) => {
          var action = '';
          if (this.currentUser && this.currentUser.Role && this.currentUser.Role == 'CompanyAdmin') {
            action += '<button type="button" title="Edit" method-name="edit"  class="btn btn-outline-info mr-1 btn-sm" param="' + oObj.ID + '"><i class="ft-edit"></i></button> ';
            action += '<button type="button" title="Delete" method-name="remove" class="btn btn-outline-danger round  mr-1 btn-sm" param="' + oObj.ID + '" ><i class="ft-trash-2"></i></button>';
          }

          action +=
            '<button type="button"  method-name="showImages"  class="btn btn-outline-success mr-1 btn-sm" param="' +
            oObj.ID +
            '"><i class="la la-image"></i> Hình Ảnh</button> ';
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

  showFiles(id) {
    this.imageStorageModal.show(id, ImageType.Room_File, 1);
  }

  showImages(id) {
    this.imageStorageModal.show(id, ImageType.Room_Image, 0);
  }

  remove(id) {
    if (id) {
      this.dialog.showSwalConfirmAlert('Bạn Muốn Xóa Phòng Này').then(isConfirm => {
        if (isConfirm) {
          this.service.Delete(id).subscribe(r => {
            if (r) {
              this.dialog.showToastrSuccess('Xóa Phòng', MessageConstant.REQUEST_SUCCESS_CONST);
              this.RefreshTable();
            }
          }, error => {
            this.dialog.showSwalErrorAlert('Xóa Phòng', MessageConstant.DEL_ERROR_CONST)
          });
        }
      });
    }
  }

}

