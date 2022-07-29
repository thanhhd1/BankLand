import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';
import { OrderCustomerModel } from '../models/order-customer.model';

@Injectable()
export class OrderCustomerService extends BaseService<OrderCustomerModel> {
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/OrderCustomer`;
  }

  GetAll(){
    var url=`${this.resource}/GetAll`;
    return this.http.get(url) as Observable<Array<OrderCustomerModel>>;
  }
}
