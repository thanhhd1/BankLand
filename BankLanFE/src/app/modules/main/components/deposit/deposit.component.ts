import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';

// export class NgxQrCode {
//   text: string;
// }

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit, AfterViewInit, OnChanges {
  public qrdata: string = null;
  public value : string = null;
  public errorCorrectionLevel : NgxQrcodeErrorCorrectionLevels = null;
  public elementType : NgxQrcodeElementTypes = null;

  constructor(private dialog: CommonDialogService) {
    this.value = 'https://testnet.bscscan.com/address/0x732dc16a98ec8061a1f577617b6f7d4c421d8a7d';
    this.errorCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
    this.elementType = NgxQrcodeElementTypes.CANVAS;
  }
  ngOnInit() {
    
  }
  ngAfterViewInit() {

  }

  ngOnChanges() {
  }

  changeValue(newValue: string): void {
    this.qrdata = newValue;
  }
}
