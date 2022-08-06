import { Component, OnInit } from '@angular/core';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';

@Component({
  selector: 'app-balance-management',
  templateUrl: './balance-management.component.html',
  styleUrls: ['./balance-management.component.css']
})
export class BalanceManagementComponent implements OnInit {
  constructor(private dialog: CommonDialogService) {}
  ngOnInit() {}
}
