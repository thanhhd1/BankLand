import { Component, OnInit, Output, EventEmitter, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { CompanyService } from 'src/app/modules/common/services/company.service';
import { CompanyModel } from 'src/app/modules/common/models/company.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { CropImageComponent } from 'src/app/modules/common/component/crop-image/crop-image.component';
import { OrganizationService } from 'src/app/modules/common/services/organization.service';
import { RepresentativeService } from 'src/app/modules/common/services/representative.service';
import { LicenseTypeService } from 'src/app/modules/common/services/license-type.service';

import { Select2OptionData } from 'ng2-select2';
import { DatePipe } from '@angular/common';
import { CompanyLicenseTypeComponent } from '../company-license-type/company-license-type.component';
import { LicenseTypeModel } from 'src/app/modules/common/models/license-type.model';
import { CompanyLicenseTypeService } from 'src/app/modules/common/services/company-license-type.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css'],
  providers: [DatePipe]
})
export class CompanyInfoComponent extends BaseComponent implements OnInit {
  model: CompanyModel;
  Submitting: boolean = false;
  isEdit: boolean = false;
  id: string;
  Uploading: boolean = false;
  representatives: Array<Select2OptionData> = new Array<Select2OptionData>();
  organizations: Array<Select2OptionData> = new Array<Select2OptionData>();
  licenseTypes: Array<LicenseTypeModel> = new Array<LicenseTypeModel>();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  @ViewChild('cropImageApp') cropImageApp: CropImageComponent;
  @ViewChild('addModal') addModal: CompanyLicenseTypeComponent;

  constructor(authService: AuthenticationService,
    private dialog: CommonDialogService,
    private router: Router,
    private service: CompanyService,
    private representativeService: RepresentativeService,
    private companyLicenseTypeService: CompanyLicenseTypeService,
    private organizationService: OrganizationService,
    private licenseTypeService: LicenseTypeService,
    private datePipe: DatePipe,
    private cdChanged: ChangeDetectorRef) {
    super(authService);
  }

  ngOnInit() {
    this.model = new CompanyModel();
  }

  cropImage() {
    this.cropImageApp.ModelID = this.id;
    this.cropImageApp.show();
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
    this.licenseTypeService.GetByType(0).subscribe(r => {
      if (r) {
        this.licenseTypes = r;
      }
    })
  }

  getEntity(id) {
    this.service.Get(id).subscribe(r => {
      this.model = r;
      //this.model.LicenseDate =  new Date(this.model.LicenseDate.getDate() + '/' + this.model.LicenseDate.getMonth() + '/' + this.model.LicenseDate.getFullYear());
    }, error => {
      this.dialog.showSwalErrorAlert(`Cập Nhật KS-NN-HomeStay`, MessageConstant.FAILURE_REQUEST);
    });
  }

  show(isEdit, id) {
    this.isEdit = isEdit;
    this.Submitting = false;
    this.form.resetForm();
    this.model = new CompanyModel();

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

  licenseTypeChanged(event) {
    if (event.data && event.data.length > 0) {
      if (event.data[0] && event.data[0].selected) {
        this.model.LicenseTypeID = event.value
      }
      else if (this.model.LicenseTypeID) {
        $(event.data[0].element.parentElement).val(this.model.LicenseTypeID).trigger('change');
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
          this.dialog.showSwalSuccesAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} KS-NN-HomeStay`, MessageConstant.EDIT_SCCCESS_CONST);
          this.onClose.emit(true);
          this.cancel();
        }
      }, error => {
        this.Submitting = false;
        var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
        this.dialog.showSwalErrorAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} KS-NN-HomeStay`, MessageConstant.FAILURE_REQUEST);
      });
    }
    else {
      this.service.Create(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showSwalSuccesAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} KS-NN-HomeStay`, MessageConstant.ADD_SUCCESS_CONST);
          this.onClose.emit(true);
          this.cancel();
        }
      }, error => {
        this.Submitting = false;
        var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
        this.dialog.showSwalErrorAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} KS-NN-HomeStay`, MessageConstant.FAILURE_REQUEST);
      });
    }
  }

  cancel() {
    this.form.resetForm();
    this.modal.hide();
  }

  editLicenseType(companyID, id) {
    this.addModal.show(companyID, id, true);
  }

  addLicenseType() {
    this.addModal.show(this.model.ID, null, null);
  }

  removeLicenseType(index) {
    var item = this.model.CompanyLicenseType[index];
    if (item.ID) {
      this.companyLicenseTypeService.Delete(item.ID).subscribe(result => {
        if (result) {
          this.model.CompanyLicenseType.splice(index, 1);
          this.dialog.showToastrSuccess(`Xóa Giấy Phép Company`, MessageConstant.REQUEST_SUCCESS_CONST);
        }
      });
    } else {
      this.model.CompanyLicenseType.splice(index, 1);
      this.dialog.showToastrSuccess(`Xóa Giấy Phép Company`, MessageConstant.REQUEST_SUCCESS_CONST);
    }
  }

  onCloseLicenseType(event) {
    if (event && event.LicenseTypeID) {
      if (event.ID) {
        var index = this.model.CompanyLicenseType.findIndex(c => c.ID == event.ID);
        if (index >= 0) {
          this.model.CompanyLicenseType[index] = event;
        }
      } else {
        this.model.CompanyLicenseType.push(event);
      }
    } else {
      this.companyLicenseTypeService.GetAllByCompanyID(this.model.ID).subscribe(r => {
        this.model.CompanyLicenseType = r;
      });
    }
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

