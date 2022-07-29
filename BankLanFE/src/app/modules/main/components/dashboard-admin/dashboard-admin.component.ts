import { Component, OnInit } from '@angular/core';
import { ReportModel } from 'src/app/modules/common/models/report.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { ReportCriteria } from 'src/app/modules/common/criterias/report.criteria';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent extends BaseComponent implements OnInit {
  model: ReportModel = new ReportModel;
  criteria: ReportCriteria = new ReportCriteria();
  constructor(authService: AuthenticationService,
    private dialog: CommonDialogService,
    private router: Router,

  ) {

    super(authService);
  }

  ngOnInit() {
  }

  search() {

  }

  printPdf() {
    let popupWinindow
    const innerContents = this.generateReportHTML();
    $('#iPrint').attr('src', '');
    $('#iPrint').attr('src', 'data:text/html;charset=utf-8,' + innerContents);
  }

  generateReportHTML() {
    var content = $('#exportReport')[0].innerHTML;
    var html = "<!doctype html>";
    html += "<html lang='en'>";
    html += " <head>";
    html += " </head>";
    //html += '<link href="' + Global.siteUrl + '/assets/dest/main.min.css" rel="stylesheet" type="text/css" />';
    //html += '<link href="' + Global.siteUrl + '/assets/content/bootstrap-4.0.0/css/bootstrap.min.css" rel="stylesheet" type="text/css" />';
    html += "      <body onload='window.print()'>";
    html += content;
    html += "      </body>";
    html += "   </html>";
    return html;
  }
}
