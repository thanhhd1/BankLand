import { Injectable } from '@angular/core';
declare var swal: any;
declare var toastr:any;
@Injectable()
export class CommonDialogService {
  title: string;
  message: string;
  constructor() {
  }

  showToastrSuccess(title,message){ 
    toastr.success(message, title);
  }

  showToastrError(title,message){
    toastr.error(message, title);
  }

  showToastrWarning(message){
    toastr.warning(message);
  }

  showSwalSuccesAlert(title, message) {
    swal(title, message, 'success');
  }

  showSwalErrorAlert(title, message) {
    swal(title, message, 'error');
  }

  showSwalConfirmAlert(message) {
    return new Promise((resolve, reject) => {
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
      }).then((isConfirm) => {
        resolve(isConfirm);
      });
    });
  }
}
