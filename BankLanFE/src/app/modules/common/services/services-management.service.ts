import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';
import { ServicesManagementModel } from '../models/services-management.model';
import { Observable } from 'rxjs';
@Injectable()
export class ServicesManagementService extends BaseService<
  ServicesManagementModel
> {
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/Menu`;
  }

  GetAll() {
    var url = `${this.resource}/GetAll`;
    return this.http.get(url) as Observable<Array<ServicesManagementModel>>;
  }
}
