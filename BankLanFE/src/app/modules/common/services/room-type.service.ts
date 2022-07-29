import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';  
import Global from '../../../Global';
import { RoomTypeModel } from '../models/room-type.model';
import { Observable } from 'rxjs';
@Injectable()
export class RoomTypeService extends BaseService<RoomTypeModel>{
  constructor(public http: HttpClient) {
      super(http);
      this.resource = `${Global.apiUrl}/api/RoomType`;
  } 

  GetAll(){
    var url=`${this.resource}/GetAll`;
    return this.http.get(url) as Observable<Array<RoomTypeModel>>;
  }
}