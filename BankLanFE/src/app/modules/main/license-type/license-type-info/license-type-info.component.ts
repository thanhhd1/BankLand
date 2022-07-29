import { Component, OnInit, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { LicenseTypeModel } from 'src/app/modules/common/models/license-type.model';
import { ModalDirective } from 'ngx-bootstrap';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LicenseTypeService } from 'src/app/modules/common/services/license-type.service';
import { BaseComponent } from 'src/app/modules/base.component';

@Component({
  selector: 'app-license-type-info',
  templateUrl: './license-type-info.component.html',
  styleUrls: ['./license-type-info.component.css']
})
export class LicenseTypeInfoComponent extends BaseComponent implements OnInit {
  model: LicenseTypeModel;
  Submitting: boolean = false;
  isEdit: boolean = false;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  constructor(authService: AuthenticationService,
    private dialog: CommonDialogService,
    private router: Router,
    private service: LicenseTypeService,
    private cdChanged: ChangeDetectorRef) {
    super(authService);
  }

  ngOnInit() {
    this.model = new LicenseTypeModel();
  }

  getEntity(id) {
    this.service.Get(id).subscribe(r => {
      this.model = r;
    });
  }
  show(isEdit, id) {
    
    this.isEdit = isEdit;
    this.Submitting = false;
    this.model = new LicenseTypeModel();
    this.form.resetForm();
    if (this.isEdit) {
      this.getEntity(id);
    }
    this.cdChanged.detectChanges();
    this.modal.show();
  }



  save() {
    if (this.Submitting) return;
    this.Submitting = true;
    if (this.isEdit) {
      this.service.Edit(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showSwalSuccesAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Loại Giấy Phép`, MessageConstant.EDIT_SCCCESS_CONST);
          this.onClose.emit(true);
          this.cancel();
        }
      }, error => {
        this.Submitting = false;
        var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
        this.dialog.showSwalErrorAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Loại Giấy Phép`, strMessage);
      });
    }
    else {
      this.service.Create(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showSwalSuccesAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Loại Giấy Phép`, MessageConstant.ADD_SUCCESS_CONST);
          this.onClose.emit(true);
          this.cancel();
        }
      }, error => {
        this.Submitting = false;
        var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
        this.dialog.showSwalErrorAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Loại Giấy Phép`, strMessage);
      });
    }
  }

  cancel() {
    this.modal.hide();
  }


}
