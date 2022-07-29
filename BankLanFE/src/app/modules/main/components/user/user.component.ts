import { Component, OnInit, ViewChild } from '@angular/core';
import UserCriteria from 'src/app/modules/common/criterias/user.criteria';
import { BaseComponent } from 'src/app/modules/base.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { UserService } from 'src/app/modules/common/services/user.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { RoleConstants } from 'src/app/Global';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [DatePipe]
})
export class UserComponent extends BaseComponent implements OnInit {
  criteria: UserCriteria = new UserCriteria();
  serverLink = '/api/User/Search';
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('addUser') modal: AddUserComponent;
  @ViewChild('changePassword') modalChangePassword: ChangePasswordComponent;
  @ViewChild('resetPassword') modalResetPassword: ResetPasswordComponent;
  constructor(authService: AuthenticationService,
    private dialog: CommonDialogService,
    private service: UserService,
    private datePipe: DatePipe,
    private router: Router) {
    super(authService);
  }

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[0, 'asc']];
    this.aoColumnDefs = [
      { mData: 'Name', aTargets: [0] },
      { mData: 'Role', aTargets: [1] },
      { mData: 'PhoneNumber', aTargets: [2] },
      { mData: 'Email', aTargets: [3] },
      { mData: "IsInactived", aTargets: [4] },
      { mData: 'Id', bSortable: false, 'aTargets': [5] }];

    this.aoColumns = [
      {
        sTitle: 'Tên',
        sClass: '', 
        mRender: (data, type, oObj) => {
          if (data ) {
            return `<img class='img-fluid rounded-circle' width="30" height="30" src='${oObj.ProfilePicturePath}' /> ${oObj.Name}`;
          }
          return '';
        }
      },
      
      {
        sTitle: 'Vai Trò',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        sTitle: 'Số Điện Thoại',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },      
      {
        sTitle: 'Email',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (data) {
            return '<a class="email" href="mailto:' + data + '">' + data + '</a>';
          }
          return '';
        }
      },
      
      {
        sTitle: 'Trạng Thái',
        sClass: '',
        mRender: (data, type, oObj) => {
          if (oObj) {
            return  !oObj.IsInactived ? '<div class="badge badge-success round">Hoạt Động</div>' : '<div class="badge badge-danger round">Ngưng Hoạt Động</div>';
          }
          return "";
        }
      }
      , {
        sTitle: '',
        sClass: 'text-center',
        mRender: (data, type, oObj) => {
          var action = '';
          action += '<button type="button" title="Edit" method-name="edit"  class="btn btn-outline-info mr-1 btn-sm" param="' + oObj.Id + '"><i class="ft-edit"></i></button> ';
          // if(this.currentUser.Id === oObj.Id){
          //   action += '<button type="button" title="Delete" class="btn btn-outline-danger round  mr-1 btn-sm" disabled ><i class="ft-trash-2"></i></button>';
          // }else{
          //   action += '<button type="button" title="Delete" method-name="remove" class="btn btn-outline-danger round  mr-1 btn-sm" param="' + oObj.Id + '" ><i class="ft-trash-2"></i></button>';
          // }
          

          // If client has email and password. User can change password.
          if (oObj.Email) {
            action += `<div class="btn-group">
                        <button type="button" class="btn btn-outline-secondary mr-1 btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="la la-ellipsis-h "></i>
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="javascript:void(0)" method-name="changepassword" param='` + oObj.Id + `'>Change Password</a>  
                            <a class="dropdown-item" href="javascript:void(0)" method-name="resetpassword" param='` + oObj.Id + `'>Reset Password</a>    
                        </div>
                    </div>
                    `;
          }

          return action;
        }
      }];
  }

  searchGoogleMapAddress(url) {
    window.open(url);
  }

  RefreshTable() {
    this.table.ajax.reload();
  }
  catchTable(event) {
    this.table = event;
  }

  async ngOnInit() {
    this.InitTable();
  }

  parseDateTOString(date) {
    if (date) {
      return this.datePipe.transform(date, 'dd/MM/yyyy');
    }
    return '';
  } 

  SetCriteria(aoData: any) {
    if (aoData) {
      aoData.forEach(element => {
        switch (element.name) {
          case "iDisplayStart":
            this.criteria.CurrentPage = element.value;
            break;
          case "iDisplayLength":
            this.criteria.ItemPerPage = element.value;
            break;
          case "iSortCol_0":
            this.criteria.SortColumn = this.aoColumnDefs[element.value].mData;
            break;
          case "sSortDir_0":
            this.criteria.SortDirection = element.value;
            break;
          case "sSearch":
            this.criteria.SearchText = element.value;
            break;
        }
      });
    }

    this.criteria.CurrentPage = Math.ceil(this.criteria.CurrentPage / this.criteria.ItemPerPage);
    return this.criteria;
  }

  edit(id) {
    this.router.navigateByUrl(`/management/edit-user/${id}`);
  }

  add() {
    if(this.currentUser.Role !== RoleConstants.User){
      this.modal.show();
    }     
      else{
        this.dialog.showSwalErrorAlert('Thêm Mới', 'Bạn không có quyền tạo mới user');
      }
  }

  remove(id) {
    if(this.currentUser.Id != id){
      this.dialog.showSwalConfirmAlert('Bạn Muốn Xóa Người Dùng Này').then(isConfirmed => {
        if (isConfirmed) {
          this.service.Delete(id).subscribe(r => {
            if (r) {
              this.RefreshTable();
              this.dialog.showToastrSuccess('Xóa Người Dùng', MessageConstant.REQUEST_SUCCESS_CONST);
            }
            else {
              this.dialog.showSwalErrorAlert('Xóa Người Dùng', MessageConstant.DEL_ERROR_CONST);
            }
          }, error => {
            this.dialog.showSwalErrorAlert('Xóa Người Dùng', MessageConstant.DEL_ERROR_CONST);
          });
        }
      });
    }
    else{
      this.dialog.showSwalErrorAlert('Xóa Người Dùng', 'Bạn không không nên xóa chính mình');
    }
  }

  changepassword(id) {
    this.modalChangePassword.show(id);
  }
  resetpassword(id){
    this.modalResetPassword.show(id);
  }
}
