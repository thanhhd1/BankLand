import { Component, OnInit, Output, ViewChild, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import UserModel from 'src/app/modules/common/models/user.model';
import Global, { RoleConstants } from 'src/app/Global';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/common/services/user.service';
import { Select2OptionData } from 'ng2-select2';
import { CompanyService } from 'src/app/modules/common/services/company.service';
import { RoomComponent } from '../../room/room.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent extends BaseComponent implements OnInit {
  model: UserModel;
  Submitting: boolean = false;
  passwordNotMath: boolean = false;
  isEmailValid: boolean = false;
  roles: Array<Select2OptionData> = new Array<Select2OptionData>();
  companies: Array<Select2OptionData> = new Array<Select2OptionData>();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  constructor(authService: AuthenticationService,
    private dialog: CommonDialogService,
    private router: Router,
    private service: UserService,
    private companyService: CompanyService,
    private cdChanged: ChangeDetectorRef) {
    super(authService);
  }

  ngOnInit() {
    this.model = new UserModel();
    this.isEmailValid = false;
  }
  show() {
    this.form.resetForm();
    this.Submitting = false;
    this.model = new UserModel();
    this.getRoles();
    this.getCompanies();
    this.cdChanged.detectChanges();
    this.modal.show();
  }
  getRoles() {
    this.roles = null;
    this.service.GetAllRole().subscribe(r => {
      if (r) {
        var list = [];
        r.forEach(c => {
          list.push({
            id: c.Name,
            text: this.formatRoleName(c.Name)
          });
        });
        this.roles = list;
      }
    })
  }

  formatRoleName(name) {
    switch (name) {
      case "Administrator":
        return 'Quản Trị Hệ Thống';
      case "CompanyAdmin":
        return 'Chủ Khách Sạn';
      case "User":
        return 'Người Dùng';
      case "Employee_Cultural_Services":
        return 'Nhân Viên Quản Lý Các Dịch Vụ Văn Hóa';
      case "Employee_Travel_Services":
        return 'Nhân Viên Quản Lý Dịch Vụ Du Lịch';
      case "Employee_Historical":
        return 'Nhân Viên Quản Lý Di Tích';
      default:
        return '';
    }
  }

  getCompanies() {
    this.companies = null;
    this.companyService.GetAll().subscribe(r => {
      if (r) {
        var list = [];
        r.forEach(c => {
          list.push({
            id: c.ID,
            text: c.Name
          });
        });
        this.companies = list;
      }
    })
  }
  companyChanged(event) {
    if (event.data && event.data.length > 0) {
      if (event.data[0] && event.data[0].selected) {
        this.model.CompanyID = event.value
      }
      else if (this.model.CompanyID) {
        $(event.data[0].element.parentElement).val(this.model.CompanyID).trigger('change');
      }
      else {
        $(event.data[0].element.parentElement).val(null).trigger('change');
      }
    }
  }
  roleChanged(event) {
    if (event.data && event.data.length > 0) {
      if (event.data[0] && event.data[0].selected) {
        this.model.Role = event.value
      }
      else if (this.model.Role) {
        $(event.data[0].element.parentElement).val(this.model.Role).trigger('change');
      }
      else {
        $(event.data[0].element.parentElement).val(null).trigger('change');
      }
    }
  }
  save() {
    if (this.Submitting) return;
    this.Submitting = true;
    this.service.Create(this.model).subscribe(result => {
      if (result) {
        this.Submitting = false;
        this.dialog.showSwalSuccesAlert(`Thêm Mới Người Dùng`, MessageConstant.ADD_SUCCESS_CONST);
        this.onClose.emit(true);
        this.cancel();
      }
    }, error => {
      this.Submitting = false;
      var strMessage = error && error.error ? this.formatErrorMessage(error.error) : MessageConstant.FAILURE_REQUEST;
      this.dialog.showSwalErrorAlert(`Thêm Mới Người Dùng`, strMessage);
    });

  }

  formatErrorMessage(msg) {
    switch (msg) {
      case 'Email is existed.':
        return 'Email đã tồn tại. Vui lòng nhập lại.'
      default:
        return msg
    }
  }

  cancel() {
    this.modal.hide();
  }


}
