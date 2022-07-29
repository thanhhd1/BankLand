import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
  ChangeDetectorRef
} from '@angular/core';
import UserModel from 'src/app/modules/common/models/user.model';
import { CropImageComponent } from 'src/app/modules/common/component/crop-image/crop-image.component';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/modules/common/services/user.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import Global, { RoleConstants } from 'src/app/Global';
import { Select2OptionData } from 'ng2-select2';
import { CompanyService } from 'src/app/modules/common/services/company.service';

@Component({
  selector: 'app-user-info-edit',
  templateUrl: './user-info-edit.component.html',
  styleUrls: ['./user-info-edit.component.css']
})
export class UserInfoEditComponent extends BaseComponent implements OnInit {
  model: UserModel;
  id: string;
  Submitting: boolean = false;
  passwordNotMath: boolean = false;
  isEmailValid: boolean = false;
  type: number = 0;
  stateList: any;
  roles: Array<Select2OptionData> = new Array<Select2OptionData>();
  companies: Array<Select2OptionData> = new Array<Select2OptionData>();
  // @Input() type: number = 0;
  @ViewChild('cropImageApp') cropImageApp: CropImageComponent;
  constructor(
    authService: AuthenticationService,
    private dialog: CommonDialogService,
    private router: Router,
    private service: UserService,
    private companyService: CompanyService,
    private cdChanged: ChangeDetectorRef,
    private activeRouter: ActivatedRoute
  ) {
    super(authService);
    activeRouter.params.subscribe(r => {
      this.id = r['{id}'];
      this.type = r['{type}'];
      this.GetEntity();
    });
  }

  ngOnInit() {
    this.model = new UserModel();
    this.isEmailValid = false;
  }

  cropImage() {
    this.cropImageApp.ModelID = this.id;
    this.cropImageApp.show();
  }

  changeAvatar(event) {
    if (event) {
      this.model.ProfilePicturePath = event;
    }
  }

  getReturnUrl() {
    this.router.navigate(['/', 'management', 'users']);
  }

  GetEntity() {
    if (this.id) {
      this.service.Get(this.id).subscribe(
        r => {
          this.model = r;
          this.getRoles();
          this.getCompanies();
          this.cdChanged.detectChanges();
        },
        error => {
          var strMessage =
            error && error.error
              ? error.error
              : MessageConstant.FAILURE_REQUEST;
          this.dialog.showSwalErrorAlert(
            `Cập Nhật ${this.getTitle(this.type)}`,
            strMessage
          );
          //this.getReturnUrl();
        }
      );
    } else {
      this.getReturnUrl();
    }
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
    });
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
    });
  }
  companyChanged(event) {
    if (event.data && event.data.length > 0) {
      if (event.data[0] && event.data[0].selected) {
        this.model.CompanyID = event.value;
      } else if (this.model.CompanyID) {
        $(event.data[0].element.parentElement)
          .val(this.model.CompanyID)
          .trigger('change');
      } else {
        $(event.data[0].element.parentElement)
          .val(null)
          .trigger('change');
      }
    }
  }
  roleChanged(event) {
    if (event.data && event.data.length > 0) {
      if (event.data[0] && event.data[0].selected) {
        this.model.Role = event.value;
      } else if (this.model.Role) {
        $(event.data[0].element.parentElement)
          .val(this.model.Role)
          .trigger('change');
      } else {
        $(event.data[0].element.parentElement)
          .val(null)
          .trigger('change');
      }
    }
  }
  save() {
    if (this.Submitting) return;
    this.Submitting = true;
    this.service.Edit(this.model).subscribe(
      result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showToastrSuccess(
            `Cập Nhật ${this.getTitle(this.type)}`,
            MessageConstant.EDIT_SCCCESS_CONST
          );
          this.getReturnUrl();
        }
      },
      error => {
        this.Submitting = false;
        var strMessage =
          error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
        this.dialog.showSwalErrorAlert(
          `Cập Nhật ${this.getTitle(this.type)}`,
          strMessage
        );
      }
    );
  }

  cancel() {
    this.getReturnUrl();
  }
}
