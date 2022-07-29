import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';
import { KaraokeLicenseTypeModel } from '../models/karaoke-license-type.model';

@Injectable()
export class KaraokeLicenseTypeService extends BaseService<KaraokeLicenseTypeModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/KaraokeLicenseType`;
    }

    GetAllByKaraokeID(karaokeID) {
        var url = `${this.resource}/GetAllByKaraokeID/${karaokeID}`;
        return this.http.get(url) as Observable<Array<KaraokeLicenseTypeModel>>;
    }
}
