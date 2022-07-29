import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import UserModel from 'src/app/modules/common/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/modules/common/services/user.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {
  returnUrl: string;
  model: UserModel;
  isError: boolean = false;
  Submitting: boolean = false
  errorMessage: string = "Mật khẩu hoặc Email không chính xác.";
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private dialog: CommonDialogService,
    public authenticateService: AuthenticationService) {
    super(authenticateService);
    activeRoute.params.subscribe(r => {
      this.model = new UserModel();
      // if(!r['{email}']){
      //   this.router.navigate(['/','auth','sign-in']);
      // }
      // this.model.Email = r['{email}'];
    });
  }

  ngOnInit() {

  } 

  send() {
    this.isError = false;
    this.Submitting = true;
    this.userService.ResetPassword(this.model)
      .subscribe(result => {
        this.Submitting = false;
        if (result) {
          this.dialog.showToastrSuccess('Đặt lại mật khẩu', 'Mật khẩu của bạn đã thay đổi thành công.');
          this.router.navigate(['/', 'auth', 'sign-in']);
        } else {
          this.isError = false;
          this.errorMessage =  "Không thể đặt lại mật khẩu của bạn cho tài khoản này.";
        }
      },
        error => {
          this.Submitting = false;
          this.isError = true;
          this.errorMessage = error.error ? error.error : "Không thể đặt lại mật khẩu của bạn cho tài khoản này.";
        });
  }
}

