import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { OrganizationModel } from '../models/organization.model';
import { Observable } from 'rxjs';

@Injectable()
export class OrganizationService extends BaseService<OrganizationModel> {
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/Organization`;
  }

  GetAll(){
    var url=`${this.resource}/GetAll`;
    return this.http.get(url) as Observable<Array<OrganizationModel>>;
  }
}
