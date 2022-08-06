import { Component, OnInit } from '@angular/core';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';

@Component({
  selector: 'app-invertor',
  templateUrl: './invertor.component.html',
  styleUrls: ['./invertor.component.css']
})
export class InvertorComponent implements OnInit {
  constructor(private dialog: CommonDialogService) {}
  ngOnInit() {}
}
