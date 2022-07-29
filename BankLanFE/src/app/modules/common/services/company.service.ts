import { Injectable } from '@angular/core';
import { CompanyModel } from '../models/company.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';

@Injectable()
export class CompanyService extends BaseService<CompanyModel> {
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/Company`;
  }

  GetAll() {
    let url = `${this.resource}/GetAll`;
    return this.httpClient.get(url) as Observable<Array<CompanyModel>>;
  }

  GetByCurrentUser() {
    let url = `${this.resource}/GetByCurrentUser`;
    return this.httpClient.get(url) as Observable<CompanyModel>;
  }
}
