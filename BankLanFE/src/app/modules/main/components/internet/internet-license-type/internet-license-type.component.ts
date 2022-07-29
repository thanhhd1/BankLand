import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { LicenseTypeService } from 'src/app/modules/common/services/license-type.service';
import { LicenseTypeModel } from 'src/app/modules/common/models/license-type.model';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { InternetLicenseTypeModel } from 'src/app/modules/common/models/internet-license-type.model';
import { InternetLicenseTypeService } from 'src/app/modules/common/services/internet-license-type.service';

@Component({
  selector: 'app-internet-license-type',
  templateUrl: './internet-license-type.component.html',
  styleUrls: ['./internet-license-type.component.css']
})
export class InternetLicenseTypeComponent extends BaseComponent implements OnInit {
  model: InternetLicenseTypeModel;
  Submitting: boolean = false;
  isEdit: boolean = false;
  id: string;
  InternetID: string;
  @Output() onClosed: EventEmitter<InternetLicenseTypeModel> = new EventEmitter();
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  linkCheckUsingRoom: string = '';
  licenseTypes: Array<LicenseTypeModel>;
  constructor(
    private authenticate: AuthenticationService,
    private licenseTypeService: LicenseTypeService,
    private service: InternetLicenseTypeService,
    private dialog: CommonDialogService
  ) {
    super(authenticate);
  }

  ngOnInit() {
    this.model = new InternetLicenseTypeModel();
    this.getLicenseType();
  }

  getLicenseType() {
    this.licenseTypes = null;
    this.licenseTypeService.GetByType(1).subscribe(r => {
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

  show(InternetID, id, isEdit) {
    this.InternetID = InternetID;
    this.isEdit = isEdit;
    this.model = new InternetLicenseTypeModel();
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
      if(this.InternetID){
        this.model.InternetID = this.InternetID;
        this.service.Create(this.model).subscribe(r => {
          if (r) {
            this.dialog.showToastrSuccess(`Thêm Giấy Phép Internet`, MessageConstant.REQUEST_SUCCESS_CONST);
            this.onClosed.emit(null);
            this.form.resetForm();
            this.modal.hide();
          }
        });
      }else{
        var entity = Object.assign({}, this.model);
        this.onClosed.emit(entity);
        this.form.resetForm();
        this.modal.hide();
      }
     
    } else {
      this.service.Edit(this.model).subscribe(r => {
        if (r) {
          this.dialog.showToastrSuccess(`Thêm Giấy Phép Internet`, MessageConstant.REQUEST_SUCCESS_CONST);
          this.onClosed.emit(null);
          this.form.resetForm();
          this.modal.hide();
        }
      });
    }
  }
}

