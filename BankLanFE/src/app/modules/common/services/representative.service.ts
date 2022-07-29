import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';  
import Global from '../../../Global';
import { RepresentativeModel } from '../models/representative.model';
import { Observable } from 'rxjs';
@Injectable()
export class RepresentativeService extends BaseService<RepresentativeModel>{
  constructor(public http: HttpClient) {
      super(http);
      this.resource = `${Global.apiUrl}/api/Representative`;
  } 

  GetAll(){
    var url=`${this.resource}/GetAll`;
    return this.http.get(url) as Observable<Array<RepresentativeModel>>;
  }
}