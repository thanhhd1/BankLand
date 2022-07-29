import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import Global from 'src/app/Global';
var jwtHelper = new JwtHelperService();
var AuthGuard = /** @class */ (function () {
    function AuthGuard(router) {
        this.router = router;
        this.entry = '';
        this.entry = localStorage.getItem(Global.currentUser);
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        this.entry = localStorage.getItem(Global.currentUser);
        if (this.entry) {
            // logged in so return true
            // Check whether the token is expired and return
            var tk = JSON.parse(this.entry);
            var result = !jwtHelper.isTokenExpired(tk.access_token);
            if (!result) {
                this.router.navigate(['/auth/sign-in'], { queryParams: { returnUrl: state.url } });
            }
            else {
                if (!route.data || (route.data && !route.data.Roles)) {
                    return true;
                }
                else {
                    var roleRight = false;
                    for (var i = 0; i < route.data.Roles.length; i++) {
                        if (tk.Role) {
                            if (route.data.Roles[i] === tk.Role) {
                                roleRight = true;
                                break;
                            }
                        }
                    }
                    if (roleRight === false) {
                        this.router.navigate(['/auth/sign-in'], { queryParams: { returnUrl: state.url } });
                    }
                }
            }
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/sign-in'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    AuthGuard.prototype.canActivateChild = function (route, state) {
        this.entry = localStorage.getItem(Global.currentUser);
        if (this.entry) {
            // Check whether the token is expired and return
            var tk = JSON.parse(this.entry);
            var result = !jwtHelper.isTokenExpired(tk.access_token);
            if (!result) {
                this.router.navigate(['/auth/sign-in'], { queryParams: { returnUrl: state.url } });
            }
            else {
                return true;
            }
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/sign-in'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    AuthGuard = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], AuthGuard);
    return AuthGuard;
}());
export { AuthGuard };
//# sourceMappingURL=guard.js.map