import { Component, OnInit, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { BaseComponent } from 'src/app/modules/base.component';
import { KaraokeModel } from 'src/app/modules/common/models/karaoke.model';
import { Select2OptionData } from 'ng2-select2';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { KaraokeService } from 'src/app/modules/common/services/karaoke.service';
import { RepresentativeService } from 'src/app/modules/common/services/representative.service';
import { OrganizationService } from 'src/app/modules/common/services/organization.service';
import { LicenseTypeService } from 'src/app/modules/common/services/license-type.service';
import { KaraokeLicenseTypeComponent } from '../karaoke-license-type/karaoke-license-type.component';
import { LicenseTypeModel } from 'src/app/modules/common/models/license-type.model';
import { KaraokeLicenseTypeService } from 'src/app/modules/common/services/karaoke-license-type.service';

@Component({
  selector: 'app-karaoke-info',
  templateUrl: './karaoke-info.component.html',
  styleUrls: ['./karaoke-info.component.css']
})
export class KaraokeInfoComponent extends BaseComponent implements OnInit {
  model: KaraokeModel;
  Uploading: boolean = false;
  Submitting: boolean = false;
  isEdit: boolean = false;
  representatives: Array<Select2OptionData> = new Array<Select2OptionData>();
  organizations: Array<Select2OptionData> = new Array<Select2OptionData>();
  licenseTypes: Array<LicenseTypeModel>;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;

  @ViewChild('addModal') addModal: KaraokeLicenseTypeComponent;

  constructor(authService: AuthenticationService,
    private dialog: CommonDialogService,
    private router: Router,
    private service: KaraokeService,
    private representativeService: RepresentativeService,
    private organizationService: OrganizationService,
    private licenseTypeService: LicenseTypeService,
    private karaokeLicenseTypeService: KaraokeLicenseTypeService,
    private cdChanged: ChangeDetectorRef) {
    super(authService);
  }

  getRepresentatives() {
    this.representatives = null;
    this.representativeService.GetAll().subscribe(r => {
      if (r) {
        var list = [];
        r.forEach(c => {
          list.push({
            id: c.ID,
            text: c.Name
          });
        });
        list.unshift({ id: '', text: '-- Người Đăng Ký --' });
        this.representatives = list;
      }
    })
  }

  getOrganization() {
    this.organizations = null;
    this.organizationService.GetAll().subscribe(r => {
      if (r) {
        var list = [];
        r.forEach(c => {
          list.push({
            id: c.ID,
            text: c.Name
          });
        });
        list.unshift({ id: '', text: '--Chọn Tên Tổ Chức--' });
        this.organizations = list;
      }
    })
  }

  getLicenseType() {
    this.licenseTypes = null;
    this.licenseTypeService.GetByType(2).subscribe(r => {
      if (r) {
        this.licenseTypes = r;
      }
    })
  }

  startUploadAvatar(event) {
    this.Uploading = true;
  }

  callBackUploadAvatar(event) {
    this.Uploading = false;
    this.model.Avatar = event;
  }

  errorCallback(event) {
    this.Uploading = false;

  }

  ngOnInit() {
    this.model = new KaraokeModel();
  }

  getEntity(id) {
    this.service.Get(id).subscribe(r => {
      this.model = r;
    });
  }

  show(isEdit, id) {

    this.isEdit = isEdit;
    this.Submitting = false;
    this.form.resetForm();
    this.model = new KaraokeModel();
    if (this.isEdit) {
      this.getEntity(id);
    }
    this.getRepresentatives();
    this.getOrganization();
    this.getLicenseType();
    this.cdChanged.detectChanges();
    this.modal.show();
  }

  representativeChanged(event) {
    if (event.data && event.data.length > 0) {
      if (event.data[0] && event.data[0].selected) {
        this.model.RepresentativeID = event.value
      }
      else if (this.model.RepresentativeID) {
        $(event.data[0].element.parentElement).val(this.model.RepresentativeID).trigger('change');
      }
      else {
        $(event.data[0].element.parentElement).val(null).trigger('change');
      }
    }

  }

  organizationChanged(event) {
    if (event.data && event.data.length > 0) {
      if (event.data[0] && event.data[0].selected) {
        this.model.OrganizationID = event.value
      }
      else if (this.model.OrganizationID) {
        $(event.data[0].element.parentElement).val(this.model.OrganizationID).trigger('change');
      }
      else {
        $(event.data[0].element.parentElement).val(null).trigger('change');
      }
    }

  }

  save() {
    if (this.Uploading) {
      this.dialog.showToastrWarning('File của  bạn đang được tải lên , vui lòng chờ');
      return;
    }
    if (this.Submitting) return;
    this.Submitting = true;
    if (this.isEdit) {
      this.service.Edit(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showSwalSuccesAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Karaoke`, MessageConstant.EDIT_SCCCESS_CONST);
          this.onClose.emit(true);
          this.cancel();
        }
      }, error => {
        this.Submitting = false;
        var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
        this.dialog.showSwalErrorAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Karaoke`, strMessage);
      });
    }
    else {
      this.service.Create(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showSwalSuccesAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Karaoke`, MessageConstant.ADD_SUCCESS_CONST);
          this.onClose.emit(true);
          this.cancel();
        }
      }, error => {
        this.Submitting = false;
        var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
        this.dialog.showSwalErrorAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Karaoke`, strMessage);
      });
    }
  }

  cancel() {
    this.modal.hide();
  }

  editLicenseType(karaokeID, id) {
    this.addModal.show(karaokeID, id, true);
  }

  addLicenseType() {
    this.addModal.show(this.model.ID, null, null);
  }

  removeLicenseType(index) {
    // var item = this.model.KaraokeLicenseTypes[index];
    // if (item.ID) {
    //   this.karaokeLicenseTypeService.Delete(item.ID).subscribe(result => {
    //     if (result) {
    //       this.model.KaraokeLicenseTypes.splice(index, 1);
    //       this.dialog.showToastrSuccess(`Xóa Giấy Phép Karaoke`, MessageConstant.REQUEST_SUCCESS_CONST);
    //     }
    //   });
    // } else {
    //   this.model.KaraokeLicenseTypes.splice(index, 1);
    //   this.dialog.showToastrSuccess(`Xóa Giấy Phép Karaoke`, MessageConstant.REQUEST_SUCCESS_CONST);
    // }

    this.model.KaraokeLicenseTypes.splice(index, 1);
    this.dialog.showToastrSuccess(`Xóa Giấy Phép Karaoke`, MessageConstant.REQUEST_SUCCESS_CONST);
  }

  onCloseLicenseType(event) {
    if (event){
      this.model.KaraokeLicenseTypes.push(event);
    }
    // if (event && event.LicenseTypeID) {
    //   if (event.ID) {
    //     var index = this.model.KaraokeLicenseTypes.findIndex(c => c.ID == event.ID);
    //     if (index >= 0) {
    //       this.model.KaraokeLicenseTypes[index] = event;
    //     }
    //   } else {
    //     this.model.KaraokeLicenseTypes.push(event);
    //   }
    // } else {
    //   this.karaokeLicenseTypeService.GetAllByKaraokeID(this.model.ID).subscribe(r => {
    //     this.model.KaraokeLicenseTypes = r;
    //   });
    // }
  }

  getLicenseTypeName(LicenseTypeID) {
    if (this.licenseTypes && this.licenseTypes.length > 0) {
      var index = this.licenseTypes.findIndex(c => c.ID == LicenseTypeID);
      if (index >= 0) {
        var item = this.licenseTypes[index];
        return item.Name;
      }
    }
    return '';
  }
}