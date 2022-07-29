import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var CommonDialogService = /** @class */ (function () {
    function CommonDialogService() {
    }
    CommonDialogService.prototype.showToastrSuccess = function (title, message) {
        toastr.success(message, title);
    };
    CommonDialogService.prototype.showToastrError = function (title, message) {
        toastr.error(message, title);
    };
    CommonDialogService.prototype.showToastrWarning = function (message) {
        toastr.warning(message);
    };
    CommonDialogService.prototype.showSwalSuccesAlert = function (title, message) {
        swal(title, message, 'success');
    };
    CommonDialogService.prototype.showSwalErrorAlert = function (title, message) {
        swal(title, message, 'error');
    };
    CommonDialogService.prototype.showSwalConfirmAlert = function (message) {
        return new Promise(function (resolve, reject) {
            swal({
                title: 'Bạn có chắc?',
                text: message,
                icon: "warning",
                buttons: {
                    cancel: {
                        text: "Không, huỷ ngay!",
                        value: null,
                        visible: true,
                        className: "",
                        closeModal: true,
                    },
                    confirm: {
                        text: "Đúng, Thực hiện ngay!",
                        value: true,
                        visible: true,
                        className: "",
                        closeModal: true
                    }
                }
            }).then(function (isConfirm) {
                resolve(isConfirm);
            });
        });
    };
    CommonDialogService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], CommonDialogService);
    return CommonDialogService;
}());
export { CommonDialogService };
//# sourceMappingURL=dialog.service.js.map