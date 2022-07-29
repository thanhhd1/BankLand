import { Component, OnInit } from '@angular/core';
import { ReportModel } from 'src/app/modules/common/models/report.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { ReportCriteria } from 'src/app/modules/common/criterias/report.criteria';
import { ReportService } from 'src/app/modules/common/services/report.service';



@Component({
  selector: 'app-report-stay-information-manager',
  templateUrl: './report-stay-information-manager.component.html',
  styleUrls: ['./report-stay-information-manager.component.css']
})
export class ReportStayInformationManagerComponent extends BaseComponent implements OnInit {
  model: ReportModel = new ReportModel;
  criteria: ReportCriteria = new ReportCriteria();
  IsShow: boolean = false;
  constructor(authService: AuthenticationService,
    private service: ReportService,
    private dialog: CommonDialogService,
    private router: Router,

  ) {
    super(authService);
  }

  ngOnInit() {
    this.IsShow = false;
  }

  search() {
    this.IsShow = true;
    this.service.ReportStayInformationManager(this.criteria).subscribe(r => {
      this.model = r;
    });
  }

  printReport() {
    let popupWinindow
    const innerContents = this.generateReportHTML();
    $('#iPrint').attr('src', '');
    $('#iPrint').attr('src', 'data:text/html;charset=utf-8,' + innerContents);
  }

  exportExcel() {
    const innerContents = this.generateReportHTML();
    var data_type = 'data:application/vnd.ms-excel';
    window.open(data_type + ', ' + encodeURIComponent(innerContents));
  }

  generateReportHTML() {
    var content = $('#exportReport')[0].innerHTML;
    var html = "<!doctype html>";
    html += "<html lang='en'>";
    html += " <head>";
    html += " </head>";
    html += "      <body onload='window.print()'>";
    html += content;
    html += "      </body>";
    html += "   </html>";
    return html;
  }
}
