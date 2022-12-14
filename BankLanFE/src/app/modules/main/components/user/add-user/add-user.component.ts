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
        return 'Qu???n Tr??? H??? Th???ng';
      case "CompanyAdmin":
        return 'Ch??? Kh??ch S???n';
      case "User":
        return 'Ng?????i D??ng';
      case "Employee_Cultural_Services":
        return 'Nh??n Vi??n Qu???n L?? C??c D???ch V??? V??n H??a';
      case "Employee_Travel_Services":
        return 'Nh??n Vi??n Qu???n L?? D???ch V??? Du L???ch';
      case "Employee_Historical":
        return 'Nh??n Vi??n Qu???n L?? Di T??ch';
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
        this.dialog.showSwalSuccesAlert(`Th??m M???i Ng?????i D??ng`, MessageConstant.ADD_SUCCESS_CONST);
        this.onClose.emit(true);
        this.cancel();
      }
    }, error => {
      this.Submitting = false;
      var strMessage = error && error.error ? this.formatErrorMessage(error.error) : MessageConstant.FAILURE_REQUEST;
      this.dialog.showSwalErrorAlert(`Th??m M???i Ng?????i D??ng`, strMessage);
    });

  }

  formatErrorMessage(msg) {
    switch (msg) {
      case 'Email is existed.':
        return 'Email ???? t???n t???i. Vui l??ng nh???p l???i.'
      default:
        return msg
    }
  }

  cancel() {
    this.modal.hide();
  }


}
