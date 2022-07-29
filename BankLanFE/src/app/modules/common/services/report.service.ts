import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';
import { RoomModel } from '../models/room.model';
import { Observable } from 'rxjs';
import { ReportModel } from '../models/report.model';
@Injectable()
export class ReportService extends BaseService<ReportModel> {
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/Report`;
    }

    ReportHistoricalSite(criteria) {
        var url = `${this.resource}/ReportHistoricalSite`;
        return this.http.post(url, criteria) as Observable<ReportModel>;
    }

    ReportCulturalServices(criteria) {
        var url = `${this.resource}/ReportCulturalServices`;
        return this.http.post(url, criteria) as Observable<ReportModel>;
    }

    ReportTravelServices(criteria) {
        var url = `${this.resource}/ReportTravelServices`;
        return this.http.post(url, criteria) as Observable<ReportModel>;
    }

    ReportStayInformationManager(criteria) {
        var url = `${this.resource}/ReportStayInformationManager`;
        return this.http.post(url, criteria) as Observable<ReportModel>;
    }
}
