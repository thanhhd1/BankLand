import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import UserModel from '../models/user.model';
import Global from 'src/app/Global';

const jwtHelper = new JwtHelperService();

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    entry = '';

    constructor(private router: Router) {

        this.entry = localStorage.getItem(Global.currentUser);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.entry = localStorage.getItem(Global.currentUser);
        if (this.entry) {
            // logged in so return true
            // Check whether the token is expired and return
            const tk = JSON.parse(this.entry) as UserModel;
            const result = !jwtHelper.isTokenExpired(tk.access_token);

            if (!result) {
                this.router.navigate(['/auth/sign-in'], { queryParams: { returnUrl: state.url } });
            } else {
                if (!route.data || (route.data && !route.data.Roles)) {
                    return true;
                } else {
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
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.entry = localStorage.getItem(Global.currentUser);
        if (this.entry) {
            // Check whether the token is expired and return
            const tk = JSON.parse(this.entry) as UserModel;
            const result = !jwtHelper.isTokenExpired(tk.access_token);

            if (!result) {
                this.router.navigate(['/auth/sign-in'], { queryParams: { returnUrl: state.url } });
            } else {
                return true;
            }
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/sign-in'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
