import { Component, OnInit } from '@angular/core';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  constructor(private dialog: CommonDialogService) {}
  ngOnInit() {}
}
