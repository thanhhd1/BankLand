import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global'; 
import { KaraokeRoomModel } from '../models/karaoke-room.model';

@Injectable()
export class KaraokeRoomService extends BaseService<KaraokeRoomModel>{
  constructor(public http: HttpClient) {
      super(http);
      this.resource = `${Global.apiUrl}/api/KaraokeRoom`;
  } 
}
