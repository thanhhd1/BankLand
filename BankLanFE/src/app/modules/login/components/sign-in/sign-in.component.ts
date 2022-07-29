import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../common/services/authentication.service';
import UserModel from '../../../common/models/user.model';
import { BaseComponent } from '../../../base.component';
import { RoleConstants } from 'src/app/Global';
@Component({
  selector: '[app-sign-in]',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent extends BaseComponent implements OnInit {
  returnUrl: string;
  model: UserModel;
  isError: boolean = false;
  Submitting: boolean = false;
  errorMessage: string = 'Mật Khẩu hoặc Email không chính xác.';
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    public authenticateService: AuthenticationService
  ) {
    super(authenticateService);
    activeRoute.parent.params.subscribe(r => {
      this.model = new UserModel();
      this.returnUrl =
        this.activeRoute.snapshot.queryParams['returnUrl'] || '/';
    });
  }

  ngOnInit() { }

  redirectUrl() {
    var curUser = this.authenticateService.GetCurrentUser();
    if (curUser) {
      if (curUser.Role == RoleConstants.Administrator) {
        window.location.href = `/management/users`;
      } else if (curUser.Role == RoleConstants.CompanyAdmin) {
        window.location.href = `/management/dashboard`;
      }
      else if (curUser.Role == RoleConstants.Employee_Travel_Services) {
        window.location.href = `/management/report-travel-services`;
      }
      else if (curUser.Role == RoleConstants.Employee_Historical) {
        window.location.href = `/management/report-historical`;
      }
      else if (curUser.Role == RoleConstants.Employee_Cultural_Services) {
        window.location.href = `/management/report-cultural-services`;
      }
      else {
        window.location.href = `/management/dashboard`;
      }
    }
  }

  login() {
    window.location.href = ``;
    //TODO
    // this.isError = false;
    // this.Submitting = true;
    // this.authenticateService
    //   .Login(this.model.Email, this.model.Password)
    //   .subscribe(
    //     result => {
    //       this.Submitting = false;
    //       if (result) {
    //         this.authenticateService.SetCurrentUser(
    //           JSON.stringify({
    //             access_token: result.access_token,
    //             expires_in: result.expires_in,
    //             Email: result.Email,
    //             Role: result.Role,
    //             Name: result.Name,
    //             Id: result.Id,
    //             CompanyID: result.CompanyID,
    //             ProfilePicturePath: result.ProfilePicturePath
    //           })
    //         );
    //         this.redirectUrl();
    //       } else {
    //         this.isError = false;
    //       }
    //     },
    //     error => {
    //       this.Submitting = false;
    //       this.isError = true;
    //       this.errorMessage = 'Mật Khẩu hoặc Email không chính xác.';// error.error
    //       // ? error.error
    //       // : 'Mật Khẩu hoặc Email không chính xác.';
    //     }
    //   );
  }
}
