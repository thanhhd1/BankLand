import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { KaraokeLicenseTypeModel } from 'src/app/modules/common/models/karaoke-license-type.model';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { LicenseTypeService } from 'src/app/modules/common/services/license-type.service';
import { LicenseTypeModel } from 'src/app/modules/common/models/license-type.model';
import { KaraokeLicenseTypeService } from 'src/app/modules/common/services/karaoke-license-type.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';

@Component({
  selector: 'app-karaoke-license-type',
  templateUrl: './karaoke-license-type.component.html',
  styleUrls: ['./karaoke-license-type.component.css']
})
export class KaraokeLicenseTypeComponent extends BaseComponent implements OnInit {
  model: KaraokeLicenseTypeModel;
  Submitting: boolean = false;
  isEdit: boolean = false;
  id: string;
  karaokeID: string;
  @Output() onClosed: EventEmitter<KaraokeLicenseTypeModel> = new EventEmitter();
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  linkCheckUsingRoom: string = '';
  licenseTypes: Array<LicenseTypeModel>;
  constructor(
    private authenticate: AuthenticationService,
    private licenseTypeService: LicenseTypeService,
    private service: KaraokeLicenseTypeService,
    private dialog: CommonDialogService
  ) {
    super(authenticate);
  }

  ngOnInit() {
    this.model = new KaraokeLicenseTypeModel();
    this.getLicenseType();
  }

  getLicenseType() {
    this.licenseTypes = null;
    this.licenseTypeService.GetByType(2).subscribe(r => {
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

  show(karaokeID, id, isEdit) {
    this.karaokeID = karaokeID;
    this.isEdit = isEdit;
    this.model = new KaraokeLicenseTypeModel();
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
    var entity = Object.assign({}, this.model);
    this.onClosed.emit(entity);
    this.form.resetForm();
    this.modal.hide();
    // if (!this.isEdit) {
    //   if(this.karaokeID){
    //     this.model.KaraokeID = this.karaokeID;
    //     this.service.Create(this.model).subscribe(r => {
    //       if (r) {
    //         this.dialog.showToastrSuccess(`Thêm Giấy Phép Karaoke`, MessageConstant.REQUEST_SUCCESS_CONST);
    //         this.onClosed.emit(null);
    //         this.form.resetForm();
    //         this.modal.hide();
    //       }
    //     });
    //   }else{
    //     var entity = Object.assign({}, this.model);
    //     this.onClosed.emit(entity);
    //     this.form.resetForm();
    //     this.modal.hide();
    //   }

    // } else {
    //   this.service.Edit(this.model).subscribe(r => {
    //     if (r) {
    //       this.dialog.showToastrSuccess(`Thêm Giấy Phép Karaoke`, MessageConstant.REQUEST_SUCCESS_CONST);
    //       this.onClosed.emit(null);
    //       this.form.resetForm();
    //       this.modal.hide();
    //     }
    //   });
    // }
  }
}
