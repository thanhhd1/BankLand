import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { BaseComponent } from 'src/app/modules/base.component';
import UserModel from 'src/app/modules/common/models/user.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/modules/common/services/user.service';
import Global from 'src/app/Global';
import { CropImageComponent } from 'src/app/modules/common/component/crop-image/crop-image.component';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent extends BaseComponent implements OnInit {
  model: UserModel;
  id: string;
  Submitting: boolean = false;
  type: number = 0;
  stateList: any;
  @ViewChild('cropImageApp') cropImageApp: CropImageComponent;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(
    authService: AuthenticationService,
    private dialog: CommonDialogService,
    private router: Router,
    private service: UserService,
    private activeRouter: ActivatedRoute
  ) {
    super(authService);
    activeRouter.params.subscribe(r => {
      this.id = r['{id}'];
      this.getEntity();
    });
  }

  ngOnInit() {
    this.model = new UserModel();
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

  getEntity() {
    this.service.Get(this.id).subscribe(
      r => {
        this.model = r;
      },
      error => {
        this.dialog.showSwalErrorAlert(
          `Cập Nhật Thông Tin Cái Nhân`,
          MessageConstant.FAILURE_REQUEST
        );
      }
    );
  }

  updateCurrentUser() {
    this.service.GetCurrent().subscribe(r => {
      if (r) {
        this.authenticationService.UpdateCurrentInfo(r);
      }
    });
  }

  save() {
    if (this.Submitting) return;
    this.Submitting = true;
    this.service.Edit(this.model).subscribe(
      result => {
        if (result) {
          this.updateCurrentUser();
          this.Submitting = false;
          this.dialog.showSwalSuccesAlert(
            `Cập Nhật Thông Tin Cái Nhân`,
            MessageConstant.EDIT_SCCCESS_CONST
          );
          this.closeModal.emit(true);
          if (this.currentUser.Role === 'Administrator') {
            this.router.navigate([`/management/users`]);
          } else {
            this.router.navigate([`/management/dashboard`]);
          }
        }
      },
      error => {
        this.Submitting = false;
        var strMessage =
          error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
        this.dialog.showSwalErrorAlert(
          `Cập Nhật Thông Tin Cái Nhân`,
          strMessage
        );
      }
    );
  }

  cancel() {
    if (this.currentUser.Role === 'Administrator') {
      this.router.navigate([`/management/users`]);
    } else {
      this.router.navigate([`/management/dashboard`]);
    }
  }
}
