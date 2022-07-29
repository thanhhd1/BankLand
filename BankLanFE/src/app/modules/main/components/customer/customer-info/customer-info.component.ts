import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import CustomerModel from 'src/app/modules/common/models/customer.model';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/modules/common/services/customer.service';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { Select2OptionData } from 'ng2-select2';
import { CompanyService } from 'src/app/modules/common/services/company.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent extends BaseComponent implements OnInit {
  model: CustomerModel;
  Submitting: boolean = false;
  isEdit: boolean = false;
  companies: Array<Select2OptionData> = new Array<Select2OptionData>();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  constructor(
    authService: AuthenticationService,
    private dialog: CommonDialogService,
    private router: Router,
    private companyService: CompanyService,
    private service: CustomerService,
    private cdChanged: ChangeDetectorRef
  ) {
    super(authService);
  }

  ngOnInit() {
    this.model = new CustomerModel();
  }

  getEntity(id) {
    this.service.Get(id).subscribe(r => {
      this.model = r;
    });
  }

  show(isEdit, id) {
    this.form.resetForm();
    this.isEdit = isEdit;
    this.Submitting = false;
    this.model = new CustomerModel();

    if (this.isEdit) {
      this.getEntity(id);
    }
    this.model.CompanyID = this.currentUser.CompanyID;
    this.cdChanged.detectChanges();
    this.modal.show();
  }

  // getCompanies() {
  //   this.companies = null;
  //   this.companyService.GetAll().subscribe(r => {
  //     if (r) {
  //       var list = [];
  //       r.forEach(c => {
  //         list.push({
  //           id: c.ID,
  //           text: c.Name
  //         });
  //       });
  //       this.companies = list;
  //     }
  //   });
  // }
  // companyChanged(event) {
  //   if (event.data && event.data.length > 0) {
  //     if (event.data[0] && event.data[0].selected) {
  //       this.model.CompanyID = event.value;
  //     } else if (this.model.CompanyID) {
  //       $(event.data[0].element.parentElement)
  //         .val(this.model.CompanyID)
  //         .trigger('change');
  //     } else {
  //       $(event.data[0].element.parentElement)
  //         .val(null)
  //         .trigger('change');
  //     }
  //   }
  // }

  save() {
    if (this.Submitting) return;
    this.Submitting = true;
    if (this.isEdit) {
      this.service.Edit(this.model).subscribe(
        result => {
          if (result) {
            this.Submitting = false;
            this.dialog.showSwalSuccesAlert(
              `${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Khách Hàng`,
              MessageConstant.EDIT_SCCCESS_CONST
            );
            this.onClose.emit(true);
            this.cancel();
          }
        },
        error => {
          this.Submitting = false;
          var strMessage =
            error && error.error
              ? error.error
              : MessageConstant.FAILURE_REQUEST;
          this.dialog.showSwalErrorAlert(
            `${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Khách Hàng`,
            strMessage
          );
        }
      );
    } else {
      this.service.Create(this.model).subscribe(
        result => {
          if (result) {
            this.Submitting = false;
            this.dialog.showSwalSuccesAlert(
              `${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Khách Hàng`,
              MessageConstant.ADD_SUCCESS_CONST
            );
            this.onClose.emit(true);
            this.cancel();
          }
        },
        error => {
          this.Submitting = false;
          var strMessage =
            error && error.error
              ? error.error
              : MessageConstant.FAILURE_REQUEST;
          this.dialog.showSwalErrorAlert(
            `${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Khách Hàng`,
            strMessage
          );
        }
      );
    }
  }

  cancel() {
    this.modal.hide();
  }
}
