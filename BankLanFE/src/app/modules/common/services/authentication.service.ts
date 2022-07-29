import { Injectable } from '@angular/core';
import Global from '../../../Global';
import UserModel from '../models/user.model'; 
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
    urlLogin: string = Global.apiUrl + '/token';

    constructor(private http: HttpClient) {
    }
    
    Login(email: string, password: string) {
        localStorage.removeItem(Global.currentUser);
        let urlData = `username=${email}&password=${password}`;
        let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
         

        return this.http.post(this.urlLogin, urlData,{headers: headers}) as Observable<UserModel>; 
    }

    SetDefaultDate(date){
        var obj = this.GetDefaultDate();
        if(!obj){
            obj = {date:date};
        }
        else{
            obj.date = date;
        }
        localStorage.setItem(Global.defaultDateKey, JSON.stringify(obj));
    }

    SetReceivedDate(date){
        var obj = this.GetDefaultDate();
        if(!obj){
            obj = {receivedDate:date};
        }
        else{
            obj.receivedDate = date;
        }
        localStorage.setItem(Global.defaultDateKey, JSON.stringify(obj));
    }

    GetDefaultDate(){
        var strValue = localStorage.getItem(Global.defaultDateKey);
        if (strValue) {
            return JSON.parse(strValue);
        }
        return null;
    }

    SetCurrentUser(userInfo: any) {
        localStorage.setItem(Global.currentUser, userInfo);
    }

    GetCurrentUser(): UserModel {
        var strValue = localStorage.getItem(Global.currentUser);
        if (strValue) {
            return JSON.parse(strValue) as UserModel;
        }
        return null;
    }

    SignOut() {
        localStorage.removeItem(Global.currentUser);
    }

    UpdateCurrentInfo(user){
        var cUser = this.GetCurrentUser();
        if(cUser && user){
            cUser.Name = user.Name;  
            cUser.ProfilePicturePath = user.ProfilePicturePath;

            this.SetCurrentUser(JSON.stringify(cUser));
        }
    }
}
