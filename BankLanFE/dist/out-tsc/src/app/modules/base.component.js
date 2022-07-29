import { ImageType } from './common/constant/message.const';
import { RoleConstants } from '../Global';
var BaseComponent = /** @class */ (function () {
    function BaseComponent(authenticationService) {
        this.authenticationService = authenticationService;
        this.maskPhone = [/[0-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
        this.maskZipCode = [/\d/, /\d/, /\d/, /\d/, /\d/];
        this.maskYearInPractice = [/\d/, /\d/];
        this.maskYear = [/\d/, /\d/, /\d/, /\d/];
        this.maskSSN = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        this.historicalSiteTypes = [{ id: 0, name: "Cấp Tỉnh" }, { id: 1, name: "Cấp Quốc Gia" }];
        this.companyTypes = [{ id: 0, name: "Khách Sạn" }, { id: 1, name: "Nhà Nghỉ" }, { id: 2, name: "Homestay" }];
    }
    Object.defineProperty(BaseComponent.prototype, "currentUser", {
        get: function () {
            this._currentUser = this.authenticationService.GetCurrentUser();
            return this._currentUser;
        },
        enumerable: true,
        configurable: true
    });
    BaseComponent.prototype.ngOnInit = function () {
    };
    BaseComponent.prototype.ngAfterViewInit = function () {
    };
    BaseComponent.prototype.getHistoricalType = function (type) {
        var name = '';
        this.historicalSiteTypes.forEach(function (c) {
            if (c.id == type) {
                name = c.name;
                return;
            }
        });
        return name;
    };
    BaseComponent.prototype.getImageTypeFolder = function (type) {
        if (type) {
            return ImageType[type];
        }
        return '';
    };
    BaseComponent.prototype.getCompanyType = function (type) {
        var name = '';
        if (type != undefined) {
            this.companyTypes.forEach(function (ct) {
                if (ct.id == type) {
                    name = ct.name;
                    return;
                }
            });
        }
        return name;
    };
    BaseComponent.prototype.getTitle = function (type) {
        switch (type) {
            case 0:
                return RoleConstants.CompanyAdmin;
            case 1:
                return RoleConstants.User;
            case "0":
                return RoleConstants.CompanyAdmin;
            case "1":
                return RoleConstants.User;
            default:
                return RoleConstants.CompanyAdmin;
        }
    };
    BaseComponent.prototype.getType = function (title) {
        switch (title) {
            case RoleConstants.CompanyAdmin:
                return 0;
            case RoleConstants.User:
                return 1;
        }
    };
    return BaseComponent;
}());
export { BaseComponent };
//# sourceMappingURL=base.component.js.map