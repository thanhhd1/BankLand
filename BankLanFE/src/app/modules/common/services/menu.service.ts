import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { OrderModel } from '../models/order.model';
import { Observable } from 'rxjs';
import { MenuModel } from '../models/menu.model';

@Injectable()
export class MenuService extends BaseService<MenuModel> {
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/Menu`;
  }

  GetAll(){
    var url=`${this.resource}/GetAll`;
    return this.http.get(url) as Observable<Array<MenuModel>>;
  }
}
