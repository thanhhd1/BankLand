import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { OrderModel } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable()
export class OrderService extends BaseService<OrderModel> {
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/Order`;
  }

  GetAll(){
    var url=`${this.resource}/GetAll`;
    return this.http.get(url) as Observable<Array<OrderModel>>;
  }

  SubmitOrder(entity) {
    let url = `${this.resource}/SubmitOrder`;
    return this.httpClient.post(url, entity) as Observable<OrderModel>;
  }


}
