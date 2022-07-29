import { Component, OnInit, Output, EventEmitter, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { UserService } from 'src/app/modules/common/services/user.service';
import UserModel  from 'src/app/modules/common/models/user.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent extends BaseComponent implements OnInit {
  model: UserModel;
  id: string;
  type: number = 0;
  Submitting: boolean = false;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  constructor(authService: AuthenticationService,
    private dialog: CommonDialogService,
    private router: Router,
    private service: UserService,
    private activeRouter: ActivatedRoute,
    private cdChanged: ChangeDetectorRef) {
    super(authService);
    activeRouter.params.subscribe(r => {
      this.id = r['{id}'];
      this.getEntity();
    });
  }

  ngOnInit() {
    this.model = new UserModel();
  }

  getEntity() {
    if (this.id) {
      this.service.Get(this.id).subscribe(r => {
        this.model = r;
      }, error => {
        this.dialog.showSwalSuccesAlert(`Đặt Lại Mật Khẩu`, MessageConstant.FAILURE_REQUEST);
      });
    }
  }

  public show(id) {
    this.Submitting = false;
    this.id = id;
    this.form.resetForm();
    this.getEntity();
    this.modal.show();
  } 

  save() {
    this.Submitting = true;
    this.service.ResetPassword(this.model).subscribe(result => {
      if (result) {
        this.Submitting = false;
        this.dialog.showSwalSuccesAlert(`Đặt Lại Mật Khẩu`, MessageConstant.REQUEST_SUCCESS_CONST);
        this.onClose.emit(true);
        this.cancel();
      }
    }, error => {
      this.Submitting = false;
      var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
      this.dialog.showSwalErrorAlert(`Đặt Lại Mật Khẩu`, strMessage);
    });

  }

  cancel() {
    this.modal.hide();
  }
}

