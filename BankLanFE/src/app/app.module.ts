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
import { registerLocaleData } from '@angular/common';
import localeVI from '@angular/common/locales/vi';

registerLocaleData(localeVI, 'vi');

@NgModule({
  declarations: [AppComponent],
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
export class AppModule {}
