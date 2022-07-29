import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';
import { OrderMenuDetailsModel } from '../models/order-menu-detail.model';

@Injectable()
export class OrderMenuDetailService extends BaseService<OrderMenuDetailsModel> {
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/OrderMenuDetail`;
  }

  GetAll() {
    var url = `${this.resource}/GetAll`;
    return this.http.get(url) as Observable<Array<OrderMenuDetailsModel>>;
  }

  GetByOrderId(id: string) {
    let url = `${this.resource}/GetByOrderId/${id}`;
    return this.httpClient.get(url) as Observable<Array<OrderMenuDetailsModel>>;
  } 
}
