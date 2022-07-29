import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import UserModel from 'src/app/modules/common/models/user.model';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { UserService } from 'src/app/modules/common/services/user.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends BaseComponent implements OnInit {
  model: UserModel;
  isError: boolean = false;
  Submitting: boolean = false
  constructor(private router: Router,
    private userService:UserService,
    private dialog:CommonDialogService,
    public authenticateService: AuthenticationService) {
    super(authenticateService);
  }

  ngOnInit() {
    this.model = new UserModel();
  }


  save(){
    this.isError=false;
    this.Submitting = true;
    this.userService.Register(this.model).subscribe(r=>{
      this.Submitting=false;
      if(r){
        this.isError=false;
        this.router.navigate(['/','auth','sign-in']);
        this.dialog.showSwalSuccesAlert('Sign-up','Your account created successfully, Please check your inbox to acitve your account now.');
      }
      else{
        this.isError = true;
      }
    },error=>{
      this.Submitting=false;
      this.isError=true;
      var msg = error && error.error ? error.error:MessageConstant.FAILURE_REQUEST;
      this.dialog.showToastrError('Sign-up',msg);
    });
  }

}
