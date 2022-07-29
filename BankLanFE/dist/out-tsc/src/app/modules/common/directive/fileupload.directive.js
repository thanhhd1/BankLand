import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import Global from '../../../Global';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
var FileUploadDirective = /** @class */ (function () {
    function FileUploadDirective(dialog, ele, cdRef) {
        this.dialog = dialog;
        this.ele = ele;
        this.cdRef = cdRef;
        this.addedFiles = new EventEmitter();
        this.onStart = new EventEmitter();
        this.onCallback = new EventEmitter();
        this.onErrorCallback = new EventEmitter();
        this.fileType = 0; //0: image 1 pdf
        this.uploading = false;
    }
    FileUploadDirective.prototype.ngAfterViewInit = function () {
        this.RegisterFileUPload();
    };
    FileUploadDirective.prototype.RegisterFileUPload = function () {
        var option = {
            url: "" + Global.apiUrl + this.link,
            acceptFileTypes: /(\.|\/)(gif|png|jpeg|jpg|xlxs)$/i,
            singleFileUploads: false,
            autoUpload: false,
            dropZone: $(this.ele.nativeElement),
            formData: this.additionalData ? this.additionalData : {},
            add: function (e, data) {
                var _this = this;
                var uploadErrors = [];
                var acceptFileTypes;
                if (this.fileType == 0) {
                    acceptFileTypes = /^image\/(gif|jpe?g|png)$/i;
                }
                else {
                    acceptFileTypes = /^application\/pdf$/i;
                }
                if (data.originalFiles) {
                    data.originalFiles.forEach(function (element) {
                        if (element['type'] && !acceptFileTypes.test(element['type'])) {
                            uploadErrors.push(_this.fileType == 0 ? 'Upload têp với định dạng PNG,GIF,JPEG'
                                : 'Upload tệp với định dạng PDF');
                        }
                        if (element['size'] && element['size'] > 70000000) {
                            uploadErrors.push('Kích thước file cho phép từ 70MB');
                        }
                    });
                    if (uploadErrors.length > 0) {
                        alert(uploadErrors.join('\n'));
                        return;
                    }
                    else {
                        if (data && data.files.length > 0) {
                            if (this.uploading) {
                                this.dialog.showToastrError('Upload file', 'Đang xử lý upload file,vui lòng chờ ....');
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
                    result = result + "?time=" + new Date().toJSON();
                    this.onCallback.emit(result);
                    this.dialog.showSwalSuccesAlert('Upload File', 'File của bạn đã được tải thành công.');
                }
                this.uploading = false;
            }.bind(this),
            fail: function (e, data) {
                this.uploading = false;
                this.onErrorCallback.emit(true);
                this.dialog.showSwalErrorAlert('Lỗi', 'Xảy ra lỗi khi đang tải file của bạn lên server');
            }.bind(this)
        };
        var element = $(this.ele.nativeElement).parent()
            ? $(this.ele.nativeElement).parent()
            : $(this.ele.nativeElement);
        element.fileupload(option);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], FileUploadDirective.prototype, "link", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], FileUploadDirective.prototype, "ModelID", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], FileUploadDirective.prototype, "addedFiles", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], FileUploadDirective.prototype, "additionalData", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], FileUploadDirective.prototype, "onStart", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], FileUploadDirective.prototype, "onCallback", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], FileUploadDirective.prototype, "onErrorCallback", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], FileUploadDirective.prototype, "typeUpload", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], FileUploadDirective.prototype, "fileType", void 0);
    FileUploadDirective = tslib_1.__decorate([
        Directive({
            selector: '[appFileUpload]',
        }),
        tslib_1.__metadata("design:paramtypes", [CommonDialogService,
            ElementRef,
            ChangeDetectorRef])
    ], FileUploadDirective);
    return FileUploadDirective;
}());
export { FileUploadDirective };
//# sourceMappingURL=fileupload.directive.js.map