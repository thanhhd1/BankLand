import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MessageConstant,
  ImageType
} from 'src/app/modules/common/constant/message.const';
import { BaseComponent } from 'src/app/modules/base.component';
import { ImageStorageComponent } from '../image-storage/image-storage.component';
import { InternetCriteria } from 'src/app/modules/common/criterias/internet.criteria';
import { InternetInfoComponent } from './internet-info/internet-info.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { InternetService } from 'src/app/modules/common/services/internet.service';
import { DatePipe } from '@angular/common';
import { RepresentativeInfoComponent } from '../representative/representative-info/representative-info.component';

@Component({
  selector: 'app-internet',
  templateUrl: './internet.component.html',
  styleUrls: ['./internet.component.css'],
  providers: [DatePipe]
})
export class InternetComponent extends BaseComponent implements OnInit {
  criteria: InternetCriteria = new InternetCriteria();
  serverLink = '/api/Internet/Search';
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('addModal') addModal: InternetInfoComponent;
  @ViewChild('imageStorageModal') imageStorageModal: ImageStorageComponent;
  @ViewChild('representativeinfoModal') representativeinfoModal: RepresentativeInfoComponent;

  constructor(
    authService: AuthenticationService,
    private router: Router,
    private dialog: CommonDialogService,
    private service: InternetService,
    private datePipe: DatePipe
  ) {
    super(authService);
  }

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[0, 'asc']];
    this.aoColumnDefs = [
      { mData: 'OrganizationName', aTargets: [0] },
      { mData: 'RepresentativeName', aTargets: [1] },
      { mData: 'Address', aTargets: [2] },
      { mData: 'TotalComputer', aTargets: [3] },
      { mData: 'AreaRoom', aTargets: [4] },
      { mData: 'Phone', aTargets: [5] },
      { mData: 'ID', bSortable: false, aTargets: [6] },
    ];

    this.aoColumns = [
      {
        sTitle: 'T??? Ch???c/C?? Nh??n',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (oObj && oObj.Organization && oObj.IsOrganization) {
            return 'T??? Ch???c - ' + oObj.Organization.Name;
          }
          return 'C?? Nh??n';
        }
      },
      {
        sTitle: 'Ng?????i ?????i Di???n/????ng K??',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (oObj && oObj.Organization && oObj.IsOrganization) {
            return "<a  href='javascript:void(0);' title='Show Ng?????i ?????i Di???n' style='margin-bottom:1px' param='" + oObj.Organization.Representative.ID + "' method-name='showRepresentativeInfo'><span style = 'padding-top:5px;'> " + oObj.Organization.Representative.Name + " </span></a>";
          }
          else if (oObj && oObj.Representative && !oObj.IsOrganization) {
            return "<a  href='javascript:void(0);' title='Show Ng?????i ?????i Di???n' style='margin-bottom:1px' param='" + oObj.Representative.ID + "' method-name='showRepresentativeInfo'><span style = 'padding-top:5px;'> " + oObj.Representative.Name + " </span></a>";
          }

          return '';
        }
      },
      {
        sTitle: '?????a Ch??? ????ng K??',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        sTitle: 'S???  M??y T??nh',
        sClass: 'text-center',
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        sTitle: 'Di???n T??ch Ph??ng',
        sClass: 'text-center',
        mRender: (data, type, oObj) => {
          if (data) {
            return data + " m2";
          }
          return '';
        }
      },
      {
        sTitle: 'S??? ??i???n Tho???i',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (oObj && oObj.Organization && oObj.IsOrganization) {
            return oObj.Organization.Representative.Phone;
          } else if (oObj && oObj.Representative && !oObj.IsOrganization) {
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
          action +=
            '<button type="button"  method-name="showFiles"  class="btn btn-outline-primary mr-1 btn-sm" param="' +
            oObj.ID +
            '"><i class="la la-folder"></i> H??? S??</button> ';

          action +=
            '<button type="button"  method-name="showImages"  class="btn btn-outline-success mr-1 btn-sm" param="' +
            oObj.ID +
            '"><i class="la la-image"></i> H??nh ???nh</button> ';
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

  showFiles(id) {
    this.imageStorageModal.show(id, ImageType.Internet_File, 1);
  }

  showImages(id) {
    this.imageStorageModal.show(id, ImageType.Internet_Image, 0);
  }

  remove(id) {
    if (id) {
      this.dialog.showSwalConfirmAlert('X??a M???c N??y').then(isConfirm => {
        if (isConfirm) {
          this.service.Delete(id).subscribe(
            r => {
              if (r) {
                this.dialog.showToastrSuccess(
                  'X??a Internet',
                  MessageConstant.REQUEST_SUCCESS_CONST
                );
                this.RefreshTable();
              }
            },
            error => {
              this.dialog.showSwalErrorAlert(
                'X??a Internet', MessageConstant.DEL_ERROR_CONST
              );
            }
          );
        }
      });
    }
  }

  showRepresentativeInfo(id) {
    this.representativeinfoModal.show(true, id);
  }

}
