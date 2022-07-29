import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';
import { CompanyLicenseTypeModel } from '../models/company-license-type.model';

@Injectable()
export class CompanyLicenseTypeService extends BaseService<CompanyLicenseTypeModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/CompanyLicenseType`;
    }

    GetAllByCompanyID(companyID) {
        var url = `${this.resource}/GetAllByCompanyID/${companyID}`;
        return this.http.get(url) as Observable<Array<CompanyLicenseTypeModel>>;
    }
}
