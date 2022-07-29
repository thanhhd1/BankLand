import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef,
  Input
} from '@angular/core';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { CompanyService } from 'src/app/modules/common/services/company.service';
import { CompanyCriteria } from 'src/app/modules/common/criterias/company.criteria';
import { BaseComponent } from 'src/app/modules/base.component';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { ImageStorageComponent } from '../image-storage/image-storage.component';
import {
  MessageConstant,
  ImageType
} from 'src/app/modules/common/constant/message.const';
import { LicenseTypeService } from 'src/app/modules/common/services/license-type.service';
import { LicenseTypeModel } from 'src/app/modules/common/models/license-type.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [DatePipe]
})
export class CompanyComponent extends BaseComponent implements OnInit {
  criteria: CompanyCriteria = new CompanyCriteria();
  serverLink = '/api/Company/Search';
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  licenseTypes: Array<LicenseTypeModel> = new Array<LicenseTypeModel>();
  Submitting: boolean = false;
  @ViewChild('addModal') addModal: CompanyInfoComponent;
  @ViewChild('imageStorageModal') imageStorageModal: ImageStorageComponent;
  constructor(
    authService: AuthenticationService,
    private router: Router,
    private dialog: CommonDialogService,
    private service: CompanyService,
    private licenseTypeService: LicenseTypeService,
    private datePipe: DatePipe
  ) {
    super(authService);
    this.getLicenseType();
  }

  getLicenseType() {
    this.licenseTypes = [];
    this.licenseTypeService.GetAll().subscribe(r => {
      if (r) {
        this.licenseTypes = r.sort((a, b) =>
          a.Name > b.Name ? 1 : a.Name === b.Name ? 0 : -1
        );
      }
    });
  }
  InitTable() {
    this.compRef = this;
    this.aaSorting = [[0, 'asc']];
    this.aoColumnDefs = [
      { mData: 'CompanyType', aTargets: [0] },
      { mData: 'Name', aTargets: [1] },
      { mData: 'KindOf', aTargets: [2] },
      { mData: 'QuanlityRoom', aTargets: [2] },
      { mData: 'QuanlityRoom', aTargets: [3] },
      { mData: 'RoomDetails', aTargets: [3] },
      { mData: 'Address', aTargets: [4] },
      { mData: 'PhoneNumber', aTargets: [5] },
      { mData: 'Email', aTargets: [6] },
      { mData: 'ID', aTargets: [7] }
    ];

    this.aoColumns = [
      {
        sTitle: 'Loại Hình Đăng Ký',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data != undefined) {
            return this.getCompanyType(data);
          }
          return '';
        }
      },
      {
        sTitle: 'Tên Khách Sạn, Nhà Nghỉ..',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        sTitle: 'Sức Chứa',
        sClass: 'text-center',
        mRender: (data, type, oObj) => {
          if (data) {
            return oObj.KindOf + ' người - ' + oObj.QuanlityRoom + ' phòng';
          }
          return '';
        }
      },
      {
        sTitle: 'Thông Tin Phòng',
        sClass: 'text-left',
        mRender: (data, type, oObj) => {
          return oObj.RoomDetails;
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
        sTitle: 'Số Điện Thoại',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        sTitle: 'Email',
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

          if (this.currentUser.Role === 'Administrator' || this.currentUser.Role === 'Employee_Travel_Services') {
            action +=
              '<button type="button" title="Edit" method-name="edit"  class="btn btn-outline-info mr-1 btn-sm" param="' +
              oObj.ID +
              '"><i class="ft-edit"></i></button> ';
            action +=
              '<button type="button" title="Delete" method-name="remove" class="btn btn-outline-danger round  mr-1 btn-sm" param="' +
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
          }

          if (this.currentUser.Role === 'CompanyAdmin') {
            action +=
              '<button type="button" title="View" method-name="edit"  class="btn btn-outline-info mr-1 btn-sm" param="' +
              oObj.ID +
              '"><i class="la la-desktop"></i></button> ';
          }

          action +=
            '<a href="' +
            `/management/rooms/${oObj.ID}` +
            '"   class="btn btn-outline-info  mr-1 btn-sm" param="' +
            oObj.ID +
            '" ><i class="la la-folder"></i>  Danh Sách Phòng</button>';
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
    this.criteria.LicenseTypeID = '';
    this.criteria.CompanyType = '';
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
    this.imageStorageModal.show(id, ImageType.Company_File, 1);
  }

  showImages(id) {
    this.imageStorageModal.show(id, ImageType.Company_Image, 0);
  }

  remove(id) {
    if (id) {
      this.dialog
        .showSwalConfirmAlert('Bạn Muốn Xóa Khách Sạn, Nhà Nghỉ, Homstay')
        .then(isConfirm => {
          if (isConfirm) {
            this.service.Delete(id).subscribe(
              r => {
                if (r) {
                  this.dialog.showToastrSuccess(
                    'Xóa Khách Sạn, Nhà Nghỉ, Homstay',
                    MessageConstant.REQUEST_SUCCESS_CONST
                  );
                  this.RefreshTable();
                }
              },
              error => {
                this.dialog.showSwalErrorAlert(
                  'Xóa Khách Sạn, Nhà Nghỉ, Homstay',
                  MessageConstant.DEL_ERROR_CONST
                );
              }
            );
          }
        });
    }
  }
}
