import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';
import { InternetLicenseTypeModel } from '../models/internet-license-type.model';

@Injectable()
export class InternetLicenseTypeService extends BaseService<InternetLicenseTypeModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/InternetLicenseType`;
    }

    GetAllByInternetID(internetID) {
        var url = `${this.resource}/GetAllByInternetID/${internetID}`;
        return this.http.get(url) as Observable<Array<InternetLicenseTypeModel>>;
    }
}
