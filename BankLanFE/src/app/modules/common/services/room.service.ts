import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';
import { RoomModel } from '../models/room.model';
import { Observable } from 'rxjs';
@Injectable()
export class RoomService extends BaseService<RoomModel> {
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/Room`;
  }

  GetAll() {
    var url = `${this.resource}/GetAll`;
    return this.http.get(url) as Observable<Array<RoomModel>>;
  }

  GetByCompany() {
    var url = `${this.resource}/GetByCompany`;
    return this.http.get(url) as Observable<Array<RoomModel>>;
  }

  GetEmptyByCompany(id: string) {
    var url = `${this.resource}/GetEmptyByCompany/${id}`;
    return this.http.get(url) as Observable<Array<RoomModel>>;
  }
}
