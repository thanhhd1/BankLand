import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { loginRoutes } from './login.routing';
import { LoginComponent } from './login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CustomFormsModule } from 'ng2-validation';
import { SharedModule } from '../common/common.module';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule,
                HttpClientModule,
                FormsModule,
                CustomFormsModule,
                SharedModule,
                loginRoutes
            ],
            declarations: [
                LoginComponent,
                SignInComponent,
                SignUpComponent,
                ResetPasswordComponent
            ],
            providers: []
        })
    ], LoginModule);
    return LoginModule;
}());
export { LoginModule };
//# sourceMappingURL=login.module.js.map