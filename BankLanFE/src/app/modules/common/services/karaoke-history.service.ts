import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { KaraokeHistoryModel } from '../models/karaoke-history.model';
import { Observable } from 'rxjs';

@Injectable()
export class KaraokeHistoryService extends BaseService<KaraokeHistoryModel>{
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/KaraokeHistory`;
  }

  GetInclude(id) {
    var url = `${this.resource}/Get/${id}`;
    return this.http.get(url) as Observable<KaraokeHistoryModel>;
  }
}
