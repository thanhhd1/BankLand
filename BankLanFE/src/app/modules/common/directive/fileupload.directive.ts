import {
  Directive,
  Input,
  AfterViewInit,
  ElementRef,
  EventEmitter,
  Output,
  ChangeDetectorRef
} from '@angular/core';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import Global from '../../../Global';
import { NgModel } from '@angular/forms';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';

declare var $: any;
@Directive({
  selector: '[appFileUpload]', 
})
export class FileUploadDirective implements AfterViewInit {
  @Input() link: string;
  @Input() ModelID: string;
  @Output() addedFiles: EventEmitter<any> = new EventEmitter();
  @Input() additionalData: any;
  @Output() onStart: EventEmitter<string> = new EventEmitter();
  @Output() onCallback: EventEmitter<string> = new EventEmitter();
  @Output() onErrorCallback:EventEmitter<boolean> = new EventEmitter();
  @Input() typeUpload: string;
  @Input() fileType: number = 0; //0: image 1 pdf
  uploading: boolean = false;
  constructor(
    private dialog: CommonDialogService,
    private ele: ElementRef,  

    public cdRef: ChangeDetectorRef
  ) { }
  ngAfterViewInit() {
    this.RegisterFileUPload();
  }

  RegisterFileUPload() {
    var option = {
      url: `${Global.apiUrl}${this.link}`,
      acceptFileTypes: /(\.|\/)(gif|png|jpeg|jpg|xlxs)$/i,
      singleFileUploads: false,
      autoUpload: false,
      dropZone: $(this.ele.nativeElement),
      formData: this.additionalData ? this.additionalData : {},
      add: function (e, data) {
        var uploadErrors = [];
        var acceptFileTypes;
        if (this.fileType == 0) {
          acceptFileTypes = /^image\/(gif|jpe?g|png)$/i
        }
        else {
          acceptFileTypes = /^application\/pdf$/i
        }
        if (data.originalFiles) {
          data.originalFiles.forEach(element => {
            if (element['type'] && !acceptFileTypes.test(element['type'])) {
              uploadErrors.push(this.fileType ==0?'Upload têp với định dạng PNG,GIF,JPEG'
              :'Upload tệp với định dạng PDF');
            }
            if (element['size'] && element['size'] > 70000000) {
              uploadErrors.push('Kích thước file cho phép từ 70MB');
            }
          });

          if (uploadErrors.length > 0) {
            alert(uploadErrors.join('\n')); 
            return;
          } else {
            if (data && data.files.length > 0) {
              if (this.uploading) {
                this.dialog.showToastrError(
                  'Upload file',
                  'Đang xử lý upload file,vui lòng chờ ....'
                );
                return;
              }
              this.uploading = true;
              this.onStart.emit('');
              data.submit();
            }
          }
        }
      }.bind(this),

      beforeSend: function (xhr) {
        xhr.setRequestHeader('IDObject', this.ModelID ? this.ModelID : '');
        xhr.setRequestHeader('UploadType', this.typeUpload);
        xhr.setRequestHeader('Authorization', Global.getToken());
      }.bind(this),
      success: function (result, textStatus, jqXHR) {
        if (result) {
          result = `${result}?time=${new Date().toJSON()}`;
          this.onCallback.emit(result);
          this.dialog.showSwalSuccesAlert(
            'Upload File',
            'File của bạn đã được tải thành công.'
          );
        } 
        this.uploading = false;
      }.bind(this),
      fail: function (e, data) {
        this.uploading = false;
        this.onErrorCallback.emit(true);
        this.dialog.showSwalErrorAlert(
          'Lỗi',
          'Xảy ra lỗi khi đang tải file của bạn lên server'
        );
      }.bind(this)
    };
    var element = $(this.ele.nativeElement).parent()
      ? $(this.ele.nativeElement).parent()
      : $(this.ele.nativeElement);
    element.fileupload(option);
  }
}
