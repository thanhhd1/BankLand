import { environment } from '../environments/environment';
var Global = /** @class */ (function () {
    function Global() {
    }
    Global.getToken = function () {
        var currentUser = JSON.parse(localStorage.getItem(Global.currentUser));
        if (currentUser && currentUser.access_token) {
            return 'Bearer ' + currentUser.access_token;
        }
        return '';
    };
    Global.apiUrl = environment.apiUrl;
    Global.currentUser = '___csm_client_admin__current_user___';
    Global.defaultDateKey = '____defaultDate___';
    return Global;
}());
export default Global;
var RoleConstants = /** @class */ (function () {
    function RoleConstants() {
    }
    RoleConstants.Administrator = "Administrator";
    RoleConstants.CompanyAdmin = "CompanyAdmin";
    RoleConstants.User = "User";
    return RoleConstants;
}());
export { RoleConstants };
//# sourceMappingURL=Global.js.map