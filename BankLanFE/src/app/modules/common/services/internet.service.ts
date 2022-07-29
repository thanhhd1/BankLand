import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { InternetModel } from '../models/intenet.model';

@Injectable()
export class InternetService extends BaseService<InternetModel>{
  constructor(public http: HttpClient) {
      super(http);
      this.resource = `${Global.apiUrl}/api/Internet`;
  } 
}
