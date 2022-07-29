import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global'; 
import { KaraokeModel } from '../models/karaoke.model';
import { Observable } from 'rxjs';

@Injectable()
export class KaraokeService extends BaseService<KaraokeModel>{
  constructor(public http: HttpClient) {
      super(http);
      this.resource = `${Global.apiUrl}/api/Karaoke`;
  } 

  MoveHistory(id){
    var url = `${this.resource}/MoveHistory/${id}`;
    return this.http.post(url,id) as Observable<boolean>;
  }
}
