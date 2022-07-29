import * as tslib_1 from "tslib";
import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import Global from '../../../../Global';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { BlockUI } from 'ng-block-ui';
var CropImageComponent = /** @class */ (function () {
    function CropImageComponent(dialog) {
        this.dialog = dialog;
        this.Submitting = false;
        this.urlFinal = '';
        this.onClose = new EventEmitter();
        this.blobToFile = function (theBlob, fileName) {
            //A Blob() is almost a File() - it's just missing the two properties below which we will add
            theBlob.lastModifiedDate = new Date();
            theBlob.FileName = fileName;
            return theBlob;
        };
    }
    CropImageComponent.prototype.ngOnInit = function () {
        this.register();
    };
    CropImageComponent.prototype.register = function () {
        var options = {
            aspectRatio: 1 / 1,
            autoCropArea: 1,
            viewMode: 1
        };
        this.$image = $('#image').cropper(options);
        this.registerImageBold();
    };
    CropImageComponent.prototype.registerImageBold = function () {
        // Import image
        this.$inputImage = $('#inputImage');
        var URL = window.URL;
        var blobURL;
        if (URL) {
            this.$inputImage.change(function (event) {
                var files = this.$inputImage[0].files;
                var file;
                if (!this.$image.data('cropper')) {
                    return;
                }
                if (files && files.length) {
                    file = files[0];
                    if (/^image\/\w+$/.test(file.type)) {
                        this.urlFinal = blobURL = URL.createObjectURL(file);
                        this.$image.one('built.cropper', function () {
                            // Revoke when load complete
                            URL.revokeObjectURL(blobURL);
                        }).cropper('reset').cropper('replace', blobURL);
                        this.$inputImage.val('');
                    }
                    else {
                        window.alert('Please choose an image file.');
                    }
                }
            }.bind(this));
        }
        else {
            this.$inputImage.prop('disabled', true).parent().addClass('disabled');
        }
    };
    CropImageComponent.prototype.cropImage = function () {
        var _this = this;
        this.$image.cropper('getCroppedCanvas').toBlob(function (blob) {
            if (blob) {
                var url = window.URL.createObjectURL(blob);
                _this.urlFinal = url;
                _this.$image.one('built.cropper', function () {
                    // Revoke when load complete
                    URL.revokeObjectURL(url);
                }).cropper('reset').cropper('replace', url);
                _this.$inputImage.val('');
            }
        });
    };
    CropImageComponent.prototype.cropImageAndSave = function () {
        var _this = this;
        if (this.Submitting)
            return;
        this.Submitting = true;
        this.$image.cropper('getCroppedCanvas').toBlob(function (blob) {
            _this.blockUI.start();
            if (blob) {
                var url = window.URL.createObjectURL(blob);
                _this.urlFinal = url;
                _this.$image.one('built.cropper', function () {
                    // Revoke when load complete
                    URL.revokeObjectURL(url);
                }).cropper('reset').cropper('replace', url);
                _this.$inputImage.val('');
                var myBlob = _this.blobToFile(blob, 'avatar_file_.png');
                if (myBlob) {
                    var formData = new FormData();
                    formData.append('croppedImage', myBlob, "croppedImage.png");
                    var serverUrl = "" + Global.apiUrl + _this.link;
                    $.ajax(serverUrl, {
                        method: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('IDObject', (this.ModelID ? this.ModelID : ''));
                            xhr.setRequestHeader('UploadType', this.typeUpload);
                            xhr.setRequestHeader('Authorization', Global.getToken());
                        }.bind(_this),
                        success: function (result) {
                            this.Submitting = false;
                            this.blockUI.stop();
                            if (result) {
                                result = result + "?time=" + new Date().toJSON();
                                this.onClose.emit(result);
                                this.hide();
                                //this.dialog.showAlert({ title: 'Upload Image', message: 'Your Image uploaded successful.' })
                                this.dialog.showSwalSuccesAlert("Upload Image", "Your Image uploaded successful.");
                            }
                        }.bind(_this),
                        error: function () {
                            this.Submitting = false;
                            this.blockUI.stop();
                            this.hide();
                            //this.dialog.showAlert({ title: 'Error', message: 'Occured error during upload your image.' });
                            this.dialog.showSwalErrorAlert("Error", 'Occured error during upload your image.');
                        }.bind(_this),
                    });
                }
                else {
                    _this.Submitting = false;
                    _this.blockUI.stop();
                    //this.dialog.showAlert({ title: 'Error', message: 'Occured error during upload your image.' });
                    _this.dialog.showSwalErrorAlert("Error", 'Occured error during upload your image.');
                }
            }
            else {
                _this.Submitting = false;
                _this.blockUI.stop();
            }
        });
    };
    CropImageComponent.prototype.saveImage = function () {
        if (this.urlFinal) {
            //get blod from urlFinal
            var xhr = new XMLHttpRequest();
            xhr.open('GET', this.urlFinal, true);
            xhr.responseType = 'blob';
            xhr.onload = function (e) {
                this.blockUI.start('Processing your request...'); // Start blocking
                if (e && e.currentTarget && e.currentTarget.status == 200) {
                    var dataBlod = e.currentTarget.response;
                    var myBlob = this.blobToFile(dataBlod, 'avatar_file_.png');
                    // myBlob is now the blob that the object URL pointed to.
                    if (myBlob) {
                        var formData = new FormData();
                        formData.append('croppedImage', myBlob, "croppedImage.png");
                        var serverUrl = "" + Global.apiUrl + this.link;
                        $.ajax(serverUrl, {
                            method: "POST",
                            data: formData,
                            processData: false,
                            contentType: false,
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('IDObject', (this.ModelID ? this.ModelID : ''));
                                xhr.setRequestHeader('Upload-Type', this.typeUpload);
                                xhr.setRequestHeader('Authorization', Global.getToken());
                            }.bind(this),
                            success: function (result) {
                                this.blockUI.stop();
                                if (result) {
                                    result = result + "?time=" + new Date().toJSON();
                                    this.onClose.emit(result);
                                    this.hide();
                                    //this.dialog.showAlert({ title: 'Upload Image', message: 'Your Image uploaded successful.' })
                                    this.dialog.showSwalSuccesAlert("Upload Image", "Your Image uploaded successful.");
                                }
                            }.bind(this),
                            error: function () {
                                this.blockUI.stop();
                                this.hide();
                                //this.dialog.showAlert({ title: 'Error', message: 'Occured error during upload your image.' });
                                this.dialog.showSwalErrorAlert("Error", 'Occured error during upload your image.');
                            }.bind(this),
                        });
                    }
                    else {
                        this.blockUI.stop();
                        //this.dialog.showAlert({ title: 'Error', message: 'Occured error during upload your image.' });
                        this.dialog.showSwalErrorAlert("Error", 'Occured error during upload your image.');
                    }
                }
                else {
                    this.blockUI.stop();
                }
            }.bind(this);
            xhr.send();
        }
    };
    CropImageComponent.prototype.show = function () {
        this.urlFinal = '';
        this.register();
        this.modal.show();
    };
    CropImageComponent.prototype.hide = function () {
        this.$image.cropper('destroy');
        this.modal.hide();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], CropImageComponent.prototype, "link", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], CropImageComponent.prototype, "ModelID", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], CropImageComponent.prototype, "typeUpload", void 0);
    tslib_1.__decorate([
        ViewChild('childModal'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], CropImageComponent.prototype, "modal", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], CropImageComponent.prototype, "onClose", void 0);
    tslib_1.__decorate([
        BlockUI(),
        tslib_1.__metadata("design:type", Object)
    ], CropImageComponent.prototype, "blockUI", void 0);
    CropImageComponent = tslib_1.__decorate([
        Component({
            selector: 'app-crop-image',
            templateUrl: './crop-image.component.html',
            styleUrls: ['./crop-image.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [CommonDialogService])
    ], CropImageComponent);
    return CropImageComponent;
}());
export { CropImageComponent };
//# sourceMappingURL=crop-image.component.js.map