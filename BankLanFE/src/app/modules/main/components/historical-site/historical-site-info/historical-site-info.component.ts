import { Component, OnInit, EventEmitter, Output, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { HistoricalSiteModel } from 'src/app/modules/common/models/history-site.model';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { HistoricalSiteService } from 'src/app/modules/common/services/historical-site.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
declare const $: any;

@Component({
  selector: 'app-historical-site-info',
  templateUrl: './historical-site-info.component.html',
  styleUrls: ['./historical-site-info.component.css']
})
export class HistoricalSiteInfoComponent extends BaseComponent implements OnInit, AfterViewInit {
  model: HistoricalSiteModel;
  Submitting: boolean = false;
  isEdit: boolean = false;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;


  options: Object = {
    placeholderText: 'Nhập nội dung ở đây!',
    charCounterCount: false,
    height: 500
  };

  constructor(authService: AuthenticationService,
    private dialog: CommonDialogService,
    private router: Router,
    private service: HistoricalSiteService,
    private cdChanged: ChangeDetectorRef) {
    super(authService);
  }

  ngOnInit() {
    this.model = new HistoricalSiteModel();
  }

  getEntity(id) {
    this.service.Get(id).subscribe(r => {
      this.model = r;
      $('#summernote').summernote('code', this.model.Profile);
    });
  }
  show(isEdit, id) {

    this.isEdit = isEdit;
    this.Submitting = false;
    this.model = new HistoricalSiteModel();
    this.form.resetForm();
    if (this.isEdit) {
      this.getEntity(id);
    }
    this.cdChanged.detectChanges();
    this.modal.show();
  }

  save() {
    if (this.Submitting) return;
    this.Submitting = true;
    this.model.Profile = $('#summernote').summernote('code');
    if (this.isEdit) {
      this.service.Edit(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showSwalSuccesAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Di Tích Lịch Sử`, MessageConstant.EDIT_SCCCESS_CONST);
          this.onClose.emit(true);
          this.cancel();
        }
      }, error => {
        this.Submitting = false;
        var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
        this.dialog.showSwalErrorAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Di Tích Lịch Sử`, strMessage);
      });
    }
    else {
      this.service.Create(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showSwalSuccesAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Di Tích Lịch Sử`, MessageConstant.ADD_SUCCESS_CONST);
          this.onClose.emit(true);
          this.cancel();
        }
      }, error => {
        this.Submitting = false;
        var strMessage = error && error.error ? error.error : MessageConstant.FAILURE_REQUEST;
        this.dialog.showSwalErrorAlert(`${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Di Tích Lịch Sử`, strMessage);
      });
    }
  }

  cancel() {
    this.modal.hide();
  }


  ngAfterViewInit(): void {
    $('#summernote').summernote({
      height: 400,
      placeholder: 'Nội dung'
    });
  }
}

