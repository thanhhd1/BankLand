import UserModel from "./common/models/user.model";
import { OnInit, AfterViewInit } from "@angular/core";
import { AuthenticationService } from "./common/services/authentication.service";
import { Select2TemplateFunction, Select2OptionData } from "ng2-select2";
import { ImageType } from './common/constant/message.const';
import { RoleConstants } from '../Global';
import { OrderModel } from './common/models/order.model';

declare var $: any;
export class BaseComponent implements OnInit, AfterViewInit {

    _currentUser: UserModel;
    get currentUser() {
        this._currentUser = this.authenticationService.GetCurrentUser();
        return this._currentUser;
    }

    public maskPhone = [/[0-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/];
    public maskZipCode = [/\d/, /\d/, /\d/, /\d/, /\d/];
    public maskYearInPractice = [/\d/, /\d/];
    public maskYear = [/\d/, /\d/, /\d/, /\d/];
    public maskSSN = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public maskCMND = [/[0-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/,' ', /\d/, /\d/, /\d/];

    public historicalSiteTypes = [{ id: 0, name: "Cấp Tỉnh" }, { id: 1, name: "Cấp Quốc Gia" }]
    public companyTypes = [{ id: 0, name: "Khách Sạn" }, { id: 1, name: "Nhà Nghỉ" }, { id: 2, name: "Homestay" }];
    constructor(public authenticationService: AuthenticationService) {

    }

    ngOnInit() {
    }

    ngAfterViewInit() {

    }


    getHistoricalType(type) {
        var name = '';
        this.historicalSiteTypes.forEach(c => {
            if (c.id == type) {
                name = c.name;
                return;
            }
        });
        return name;
    }

    getImageTypeFolder(type) {
        if (type) {
            return ImageType[type];
        }
        return '';
    }

    getCompanyType(type) {
        var name = '';
        if (type != undefined) {
            this.companyTypes.forEach(ct => {
                if (ct.id == type) {
                    name = ct.name; return;
                }
            });
        }
        return name;
    }

    getTitle(type) {
        switch (type) {
            case 0:
                return RoleConstants.CompanyAdmin;
            case 1:
                return RoleConstants.User
            case "0":
                return RoleConstants.CompanyAdmin;
            case "1":
                return RoleConstants.User
            default:
                return RoleConstants.CompanyAdmin;
        }
    }

    getType(title) {
        switch (title) {
            case RoleConstants.CompanyAdmin:
                return 0;
            case RoleConstants.User:
                return 1;
        }
    }    
}
