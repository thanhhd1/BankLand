import { Component, OnInit, Output, ViewChild, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { KaraokeRoomModel } from 'src/app/modules/common/models/karaoke-room.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { KaraokeRoomService } from 'src/app/modules/common/services/karaoke-room.service';

@Component({
  selector: 'app-karaoke-room-info',
  templateUrl: './karaoke-room-info.component.html',
  styleUrls: ['./karaoke-room-info.component.css']
})
export class KaraokeRoomInfoComponent extends BaseComponent implements OnInit {
  model: KaraokeRoomModel;
  Submitting: boolean = false;
  isEdit: boolean = false;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  constructor(authService: AuthenticationService,
    private dialog: CommonDialogService,
    private service: KaraokeRoomService,
    private cdChanged: ChangeDetectorRef) {
    super(authService);
  }

  ngOnInit() {
    this.model = new KaraokeRoomModel();
  }

  getEntity(id) {
    this.service.Get(id).subscribe(r => {
      this.model = r;
    });
  }
  show(isEdit, id, karaokeID) {
    if (!karaokeID) return;
    this.isEdit = isEdit;
    this.Submitting = false;
    this.form.resetForm();
    this.model = new KaraokeRoomModel();
    this.model.KaraokeID = karaokeID;
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
      this.service.Edit(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showSwalSuccesAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Phòng Karaoke`, MessageConstant.EDIT_SCCCESS_CONST);
          this.onClose.emit(true);
          this.cancel();
        }
      }, error => {
        this.Submitting = false;
        var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
        this.dialog.showSwalErrorAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Phòng Karaoke`, strMessage);
      });
    }
    else {
      this.service.Create(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showSwalSuccesAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Phòng Karaoke`, MessageConstant.ADD_SUCCESS_CONST);
          this.onClose.emit(true);
          this.cancel();
        }
      }, error => {
        this.Submitting = false;
        var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
        this.dialog.showSwalErrorAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Phòng Karaoke`, strMessage);
      });
    }
  }

  cancel() {
    this.modal.hide();
  }


}
