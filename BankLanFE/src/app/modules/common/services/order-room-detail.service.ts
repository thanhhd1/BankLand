import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';
import { OrderRoomDetailsModel } from '../models/order-room-detail.model';

@Injectable()
export class OrderRoomDetailService extends BaseService<OrderRoomDetailsModel> {
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/OrderRoomDetail`;
  }

  GetAll() {
    var url = `${this.resource}/GetAll`;
    return this.http.get(url) as Observable<Array<OrderRoomDetailsModel>>;
  }

  GetByRoomId(id: string) {
    let url = `${this.resource}/GetByRoomId/${id}`;
    return this.httpClient.get(url) as Observable<string>;
  }

  GetByOrderId(id: string) {
    let url = `${this.resource}/GetByOrderId/${id}`;
    return this.httpClient.get(url) as Observable<Array<OrderRoomDetailsModel>>;
  }
}
