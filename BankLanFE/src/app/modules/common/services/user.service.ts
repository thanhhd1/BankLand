import { BaseService, PageData } from './base.service';
import UserModel from '../models/user.model';
import Global from '../../../Global';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import RoleModel from '../models/role.model';

@Injectable()
export class UserService extends BaseService<UserModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = Global.apiUrl + '/api/User';
    } 

    GetCurrent(){
        let url = `${this.resource}/GetCurrent`;
        return this.httpClient.get(url) as Observable<UserModel>;
    }

    GetAllRole() {
        let url = `${this.resource}/GetAllRole`;
            return this.httpClient.get(url) as Observable<Array<RoleModel>>;
    }
    ChangePassword(entity) {
        let url = `${this.resource}/ChangePassword`;
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }

    ResetPassword(entity){
        let url = `${this.resource}/ResetPassword`;
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }
    Register(entity){
        let url = `${this.resource}/Register`;
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }
    
}