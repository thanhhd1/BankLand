import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginModule } from './modules/login/login.module';
import { MainModule } from './modules/main/main.module';
import { BlockUIModule } from 'ng-block-ui';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './modules/common/services/token.interceptor';
import { RouterModule } from '@angular/router';
import { appRoute } from './app-routing';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent
            ],
            imports: [
                BrowserModule,
                RouterModule.forRoot(appRoute),
                LoginModule,
                MainModule,
                BlockUIModule.forRoot()
            ],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: TokenInterceptor,
                    multi: true
                }
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map