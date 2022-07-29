import { Component, OnInit, EventEmitter, Output, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { RoomTypeModel } from 'src/app/modules/common/models/room-type.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/modules/common/services/room.service';
import { RoomTypeService } from 'src/app/modules/common/services/room-type.service';
import { RoomModel } from 'src/app/modules/common/models/room.model';
import { Select2OptionData } from 'ng2-select2';

@Component({
  selector: 'app-room-info',
  templateUrl: './room-info.component.html',
  styleUrls: ['./room-info.component.css']
})

export class RoomInfoComponent extends BaseComponent implements OnInit {
  model: RoomModel;
  Submitting: boolean = false;
  isEdit: boolean = false; 
  Uploading: boolean = false;
  @Input() companyId:string;
  roomType:  Array<Select2OptionData> = new Array<Select2OptionData>();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  constructor(authService: AuthenticationService,
    private dialog: CommonDialogService,
    private router: Router,
    private service: RoomService,
    private roomTypeService: RoomTypeService, 
    private cdChanged: ChangeDetectorRef) {
    super(authService);
  }

  ngOnInit() {
    this.model = new RoomModel();
  }

  getRoomTypes() {
    this.roomType = null;
    this.roomTypeService.GetAll().subscribe(r => {
      if (r) {
        var list = [];
        r.forEach(c => {
          list.push({
            id: c.ID,
            text: c.Name
          });
        });
        this.roomType = list;
      }
    })
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
    this.model = new RoomModel();

    if (this.isEdit) {
      this.getEntity(id);
    }
    this.getRoomTypes();
    this.cdChanged.detectChanges();
    this.modal.show();
  }

  startUploadAvatar(event) {
    this.Uploading = true;
  }

  callBackUploadAvatar(event) {
    this.Uploading = false;
    this.model.Avatar = event;
  }
  errorCallback(event){
    this.Uploading=false;

  }
  roomChanged(event) {
    if (event.data && event.data.length>0) {
      if (event.data[0] && event.data[0].selected) {
        this.model.RoomTypeId = event.value
      }  
      else if (this.model.RoomTypeId) {
        $(event.data[0].element.parentElement).val(this.model.RoomTypeId).trigger('change');
      }
      else {
        $(event.data[0].element.parentElement).val(null).trigger('change');
      }
    }
  }

  save() {
    if (this.Submitting) return;
    this.Submitting = true; 
    this.model.CompanyID=this.currentUser.CompanyID;
    if (this.isEdit) {
      this.service.Edit( this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showSwalSuccesAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Phòng`, MessageConstant.EDIT_SCCCESS_CONST);
          this.onClose.emit(true);
          this.cancel();
        }
      }, error => {
        this.Submitting = false;
        var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
        this.dialog.showSwalErrorAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Phòng`, strMessage);
      });
    }
    else {
      this.service.Create(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showSwalSuccesAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Phòng`, MessageConstant.ADD_SUCCESS_CONST);
          this.onClose.emit(true);
          this.cancel();
        }
      }, error => {
        this.Submitting = false;
        var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
        this.dialog.showSwalErrorAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Phòng`, strMessage);
      });
    }
  }

  cancel() {
    this.modal.hide();
  }
}


