import { Component, OnInit, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { InternetModel } from 'src/app/modules/common/models/intenet.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { InternetService } from 'src/app/modules/common/services/internet.service';
import { OrganizationService } from 'src/app/modules/common/services/organization.service';
import { RepresentativeService } from 'src/app/modules/common/services/representative.service';
import { LicenseTypeService } from 'src/app/modules/common/services/license-type.service';

import { Select2OptionData } from 'ng2-select2';
import { OrganizationModel } from 'src/app/modules/common/models/organization.model';
import { LicenseTypeModel } from 'src/app/modules/common/models/license-type.model';
import { RepresentativeModel } from 'src/app/modules/common/models/representative.model';
import { InternetLicenseTypeComponent } from '../internet-license-type/internet-license-type.component';
import { InternetLicenseTypeService } from 'src/app/modules/common/services/internet-license-type.service';


@Component({
  selector: 'app-internet-info',
  templateUrl: './internet-info.component.html',
  styleUrls: ['./internet-info.component.css']
})
export class InternetInfoComponent extends BaseComponent implements OnInit {
  model: InternetModel;
  Submitting: boolean = false;
  isEdit: boolean = false;
  representatives: Array<RepresentativeModel> = new Array<RepresentativeModel>();
  organizations: Array<OrganizationModel> = new Array<OrganizationModel>();
  licenseTypes: Array<LicenseTypeModel> = new Array<LicenseTypeModel>();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;

  @ViewChild('addModal') addModal: InternetLicenseTypeComponent;

  constructor(authService: AuthenticationService,
    private dialog: CommonDialogService,
    private router: Router,
    private service: InternetService,
    private representativeService: RepresentativeService,
    private organizationService: OrganizationService,
    private licenseTypeService: LicenseTypeService,
    private InternetLicenseTypeervice: InternetLicenseTypeService,
    private cdChanged: ChangeDetectorRef) {
    super(authService);
  }

  ngOnInit() {
    this.model = new InternetModel();
  }

  getEntity(id) {
    this.service.Get(id).subscribe(r => {
      this.model = r;
    });
  }

  show(isEdit, id) {
    this.isEdit = isEdit;
    this.Submitting = false;
    this.model = new InternetModel();
    this.model.OrganizationID = '';
    this.model.RepresentativeID = '';
    this.model.LicenseTypeID = '';
    this.model.IsOrganization = false;

    this.form.resetForm();
    if (this.isEdit) {
      this.getEntity(id);
    }
    this.getRepresentatives();
    this.getOrganization();
    this.getLicenseType();
    this.cdChanged.detectChanges();
    this.modal.show();
  }

  getRepresentatives() {
    this.representatives = null;
    this.representativeService.GetAll().subscribe(r => {
      if (r) {
        this.representatives = r;
      }
    })
  }

  getOrganization() {
    this.organizations = null;
    this.organizationService.GetAll().subscribe(r => {
      if (r) {
        this.organizations = r;
      }
    })
  }

  getLicenseType() {
    this.licenseTypes = null;
    this.licenseTypeService.GetByType(1).subscribe(r => {
      if (r) {
        this.licenseTypes = r;
      }
    })
  }

  save() {
    if (this.Submitting) return;
    this.Submitting = true;
    if(!this.model.IsOrganization){
      this.model.IsOrganization = false;
    }
    if (this.isEdit) {
      this.service.Edit(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showSwalSuccesAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Internet`, MessageConstant.EDIT_SCCCESS_CONST);
          this.onClose.emit(true);
          this.cancel();
        }
      }, error => {
        this.Submitting = false;
        var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
        this.dialog.showSwalErrorAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Internet`, strMessage);
      });
    }
    else {
      this.service.Create(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showSwalSuccesAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Internet`, MessageConstant.ADD_SUCCESS_CONST);
          this.onClose.emit(true);
          this.cancel();
        }
      }, error => {
        this.Submitting = false;
        var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
        this.dialog.showSwalErrorAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Internet`, strMessage);
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
    var item = this.model.InternetLicenseType[index];
    if (item.ID) {
      this.InternetLicenseTypeervice.Delete(item.ID).subscribe(result => {
        if (result) {
          this.model.InternetLicenseType.splice(index, 1);
          this.dialog.showToastrSuccess(`Xóa Giấy Phép Internrt`, MessageConstant.REQUEST_SUCCESS_CONST);
        }
      });
    } else {
      this.model.InternetLicenseType.splice(index, 1);
      this.dialog.showToastrSuccess(`Xóa Giấy Phép Internrt`, MessageConstant.REQUEST_SUCCESS_CONST);
    }
  }

  onCloseLicenseType(event) {
    if (event && event.LicenseTypeID) {
      if (event.ID) {
        var index = this.model.InternetLicenseType.findIndex(c => c.ID == event.ID);
        if (index >= 0) {
          this.model.InternetLicenseType[index] = event;
        }
      } else {
        this.model.InternetLicenseType.push(event);
      }
    } else {
      this.InternetLicenseTypeervice.GetAllByInternetID(this.model.ID).subscribe(r => {
        this.model.InternetLicenseType = r;
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
