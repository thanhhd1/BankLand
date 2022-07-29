import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  ChangeDetectorRef,
  Input
} from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { ImageStorageModel } from 'src/app/modules/common/models/image-storage.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ImageStorageService } from 'src/app/modules/common/services/image-storage.service';

@Component({
  selector: 'app-image-storage-info',
  templateUrl: './image-storage-info.component.html',
  styleUrls: ['./image-storage-info.component.css']
})
export class ImageStorageInfoComponent extends BaseComponent implements OnInit {
  model: ImageStorageModel;
  Uploading: boolean = false;
  defaultImage: string;
  Submitting: boolean = false;
  isEdit: boolean = false;
  @Input() isNotShowAction: boolean = false;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  type: number = 0;//0 image 1:file pdf
  constructor(
    authService: AuthenticationService,
    private dialog: CommonDialogService,
    private service: ImageStorageService,
    private cdChanged: ChangeDetectorRef
  ) {
    super(authService);
  }

  ngOnInit() {
    this.model = new ImageStorageModel();
    this.defaultImage = 'https://via.placeholder.com/400x600.png';
  }

  startUploadImage(event) {
    this.Uploading = true;
  }

  callBackUploadImage(event) {
    this.Uploading = false;
    this.model.Path = event;
  }

  errorCallback(event) {
    this.Uploading = false;
    this.modal.hide();
  }

  show(isEdit, id, ReferenceId, Type, fileType) {
    if (!ReferenceId) return;
    this.isEdit = isEdit;
    this.type = fileType;
    this.Submitting = false;
    this.form.resetForm();
    this.model = new ImageStorageModel();
    this.model.ReferenceId = ReferenceId;
    this.model.Type = Type;
    this.cdChanged.detectChanges();
    this.modal.show();
  }

  save() {
    if (this.Uploading) {
      this.dialog.showToastrWarning(
        'File của  bạn đang được tải lên , vui lòng chờ'
      );
      return;
    }
    if (this.Submitting) return;
    this.Submitting = true;
    if (this.isEdit) {
      this.service.Edit(this.model).subscribe(
        result => {
          if (result) {
            this.Submitting = false;
            this.dialog.showSwalSuccesAlert(
              `${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} File`,
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
            `${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} File`,
            MessageConstant.FAILURE_REQUEST
          );
        }
      );
    } else {
      this.service.Create(this.model).subscribe(
        result => {
          if (result) {
            this.Submitting = false;
            this.dialog.showSwalSuccesAlert(
              `${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} File`,
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
            `${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} File`,
            MessageConstant.FAILURE_REQUEST
          );
        }
      );
    }
  }

  cancel() {
    this.modal.hide();
  }
}
