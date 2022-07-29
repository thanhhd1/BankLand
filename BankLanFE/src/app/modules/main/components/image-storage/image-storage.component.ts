import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { BaseComponent } from 'src/app/modules/base.component';
import { ImageStorageModel } from 'src/app/modules/common/models/image-storage.model';
import { ImageStorageCriteria } from 'src/app/modules/common/criterias/image-storage.criteria';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { ImageStorageInfoComponent } from './image-storage-info/image-storage-info.component';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ImageStorageService } from 'src/app/modules/common/services/image-storage.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-image-storage',
  templateUrl: './image-storage.component.html',
  styleUrls: ['./image-storage.component.css'],
  providers: [DatePipe]
})
export class ImageStorageComponent extends BaseComponent implements OnInit {
  model: ImageStorageModel;
  Submitting: boolean = false;
  isEdit: boolean = false;
  criteria: ImageStorageCriteria = new ImageStorageCriteria();
  serverLink = '/api/ImageStorage/Search';
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  fileType: number = 0; //0 image 1 pdf
  @ViewChild('addModal') addModal: ImageStorageInfoComponent;
  @ViewChild('childModal') modal: ModalDirective;
  @Output() onClosed: EventEmitter<boolean> = new EventEmitter();
  @Input() isNotShowAction: boolean = false;
  constructor(
    authService: AuthenticationService,
    private router: Router,
    private dialog: CommonDialogService,
    private service: ImageStorageService,
    private datePipe: DatePipe
  ) {
    super(authService);
  }

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[0, 'asc']];
    this.aoColumnDefs = [
      { mData: 'Path', aTargets: [0] },
      { mData: 'CreatedAt', aTargets: [1] },
      { mData: 'ID', bSortable: false, bVisible:!this.isNotShowAction, aTargets: [2] }
    ];

    this.aoColumns = [
      {
        sTitle: 'File',
        sClass: '',
        mRender: (data, type, oObj, full) => {
          if (data) {
            if (this.fileType == 0) {
              return (
                '<a href="' +
                data +
                '" data-lightbox="iamge-1"><img src="' +
                data +
                '" class="rounded mx-auto d-block" alt="" width="100" height="100"></a>'
              );
            } else {
              return `<a href=${data} target="blank">Hồ Sơ ${full.row + 1}</a>`;
            }
          }
          return '';
        }
      },
      {
        sTitle: 'Ngày Tạo',
        sClass: '',
        mRender: (data, type, oObj, full) => {
          if (data) {
            return this.datePipe.transform(data, 'dd/MM/yyyy HH:mm:ss');
          }
          return '';
        }
      },
      {
        sTitle: '',
        sClass: 'text-center',
        mRender: (data, type, oObj) => {
          var action = '';
          if (!this.isNotShowAction) {
            action +=
              '<button type="button" title="Delete" method-name="remove" class="btn btn-outline-danger round  mr-1 btn-sm" param="' +
              oObj.ID +
              '" ><i class="ft-trash-2"></i></button>';
          }
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

  show(referenceId, imageType, type) {
    this.fileType = type;
    this.Submitting = false;
    this.criteria.ReferenceId = referenceId;
    this.criteria.Type = imageType;
    this.RefreshTable();
    this.modal.show();
  }

  add() {
    const { ReferenceId, Type } = this.criteria;
    this.addModal.show(false, null, ReferenceId, Type, this.fileType);
  }

  cancel() {
    this.onClosed.emit(true);
    this.modal.hide();
  }

  remove(id) {
    if (id) {
      this.dialog.showSwalConfirmAlert('Xoá Mục Này').then(isConfirm => {
        if (isConfirm) {
          this.service.Delete(id).subscribe(
            r => {
              if (r) {
                this.dialog.showToastrSuccess(
                  'Xoá Mục',
                  MessageConstant.REQUEST_SUCCESS_CONST
                );
                this.RefreshTable();
              }
            },
            error => {
              this.dialog.showSwalErrorAlert(
                'Xoá Mục',MessageConstant.DEL_ERROR_CONST
              );
            }
          );
        }
      });
    }
  }
}
