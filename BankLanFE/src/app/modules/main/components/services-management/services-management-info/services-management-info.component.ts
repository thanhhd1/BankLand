import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { ServicesManagementModel } from 'src/app/modules/common/models/services-management.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { ServicesManagementService } from 'src/app/modules/common/services/services-management.service';

@Component({
  selector: 'app-services-management-info',
  templateUrl: './services-management-info.component.html',
  styleUrls: ['./services-management-info.component.css']
})
export class ServicesManagementInfoComponent extends BaseComponent
  implements OnInit {
  model: ServicesManagementModel;
  Submitting: boolean = false;
  isEdit: boolean = false;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  constructor(
    authService: AuthenticationService,
    private dialog: CommonDialogService,
    private router: Router,
    private service: ServicesManagementService,
    private cdChanged: ChangeDetectorRef
  ) {
    super(authService);
  }

  ngOnInit() {
    this.model = new ServicesManagementModel();
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
    this.model = new ServicesManagementModel();

    if (this.isEdit) {
      this.getEntity(id);
    }
    this.cdChanged.detectChanges();
    this.modal.show();
  }

  save() {
    if (this.Submitting) return;
    this.Submitting = true;
    if (this.isEdit) {
      this.service.Edit(this.model).subscribe(
        result => {
          if (result) {
            this.Submitting = false;
            this.dialog.showSwalSuccesAlert(
              `${this.isEdit ? 'Ch???nh S???a' : 'Th??m M???i'} D???ch v???`,
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
            `${this.isEdit ? 'Ch???nh S???a' : 'Th??m M???i'} D???ch v???`,
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
              `${this.isEdit ? 'Ch???nh S???a' : 'Th??m M???i'} D???ch v???`,
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
            `${this.isEdit ? 'Ch???nh S???a' : 'Th??m M???i'} D???ch v???`,
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
