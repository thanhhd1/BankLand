import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import {tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TokenService } from './token.service'; 
import { BlockUI, NgBlockUI } from 'ng-block-ui';
declare var $: any;
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    @BlockUI() blockUI: NgBlockUI;
    constructor(public auth: TokenService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.auth.getCurrentUser();
        if (user) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.access_token}`
                }
            });
        }
        //start block ui  
        this.blockUI.start('Processing your request...'); 
        return next.handle(request)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        this.blockUI.stop();
                    }
                }, error => {
                    this.blockUI.stop();
                })
            )
    }
}
