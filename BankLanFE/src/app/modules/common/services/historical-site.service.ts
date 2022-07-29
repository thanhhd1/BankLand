import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';  
import Global from '../../../Global';
import { HistoricalSiteModel } from '../models/history-site.model';
@Injectable()
export class HistoricalSiteService extends BaseService<HistoricalSiteModel>{
  constructor(public http: HttpClient) {
      super(http);
      this.resource = `${Global.apiUrl}/api/HistoricalSite`;
  } 
}