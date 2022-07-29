import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { LicenseTypeModel } from 'src/app/modules/common/models/license-type.model';
import { Observable } from 'rxjs';

@Injectable()
export class LicenseTypeService extends BaseService<LicenseTypeModel>{
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/LicenseType`;
  }

  GetAll() {
    var url = `${this.resource}/GetAll`;
    return this.http.get(url) as Observable<Array<LicenseTypeModel>>;
  }

  GetByType(type) {
    var url = `${this.resource}/GetByType/${type}`;
    return this.http.get(url) as Observable<Array<LicenseTypeModel>>;
  }
}
