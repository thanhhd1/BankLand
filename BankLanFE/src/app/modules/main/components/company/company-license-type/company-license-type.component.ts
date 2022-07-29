import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { LicenseTypeService } from 'src/app/modules/common/services/license-type.service';
import { LicenseTypeModel } from 'src/app/modules/common/models/license-type.model';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { CompanyLicenseTypeModel } from 'src/app/modules/common/models/company-license-type.model';
import { CompanyLicenseTypeService } from 'src/app/modules/common/services/company-license-type.service';

@Component({
  selector: 'app-company-license-type',
  templateUrl: './company-license-type.component.html',
  styleUrls: ['./company-license-type.component.css']
})
export class CompanyLicenseTypeComponent extends BaseComponent implements OnInit {
  model: CompanyLicenseTypeModel;
  Submitting: boolean = false;
  isEdit: boolean = false;
  id: string;
  CompanyID: string;
  @Output() onClosed: EventEmitter<CompanyLicenseTypeModel> = new EventEmitter();
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  linkCheckUsingRoom: string = '';
  licenseTypes: Array<LicenseTypeModel>;
  constructor(
    private authenticate: AuthenticationService,
    private licenseTypeService: LicenseTypeService,
    private service: CompanyLicenseTypeService,
    private dialog: CommonDialogService
  ) {
    super(authenticate);
  }

  ngOnInit() {
    this.model = new CompanyLicenseTypeModel();
    this.getLicenseType();
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
      this.modal.show();
    });
  }

  show(CompanyID, id, isEdit) {
    this.CompanyID = CompanyID;
    this.isEdit = isEdit;
    this.model = new CompanyLicenseTypeModel();
    if (id) {
      this.getEntity(id);
    } else {
      this.modal.show();
    }
  }

  cancel() {
    this.onClosed.emit();
    this.form.resetForm();
    this.modal.hide();
  }

  save() {
    if (!this.isEdit) {
      if (this.CompanyID) {
        this.model.CompanyID = this.CompanyID;
        this.service.Create(this.model).subscribe(r => {
          if (r) {
            this.dialog.showToastrSuccess(`Thêm Giấy Phép Company`, MessageConstant.REQUEST_SUCCESS_CONST);
            this.onClosed.emit(null);
            this.form.resetForm();
            this.modal.hide();
          }
        });
      } else {
        var entity = Object.assign({}, this.model);
        this.onClosed.emit(entity);
        this.form.resetForm();
        this.modal.hide();
      }

    } else {
      this.service.Edit(this.model).subscribe(r => {
        if (r) {
          this.dialog.showToastrSuccess(`Thêm Giấy Phép Company`, MessageConstant.REQUEST_SUCCESS_CONST);
          this.onClosed.emit(null);
          this.form.resetForm();
          this.modal.hide();
        }
      });
    }
  }
}


