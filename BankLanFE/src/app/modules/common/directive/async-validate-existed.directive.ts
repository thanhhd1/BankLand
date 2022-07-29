import { Directive, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
 
import { BaseComponent } from '../../base.component';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import Global from 'src/app/Global';  

@Directive({
  selector: '[appAsyncValidateExisted]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS, useExisting: AsyncValidateExistedDirective,
    multi: true
  }]
})
export class AsyncValidateExistedDirective extends BaseComponent implements AsyncValidator {

  @Input() urlServer:string;
  @Input() id:string;
link:string;
  constructor(private http: HttpClient,
    private authService: AuthenticationService) {
    super(authService);
   
  }

  validate(control: AbstractControl){
    var value = control.value;
    if(!value){
      return null;
    }
    var url = `${Global.apiUrl}${this.urlServer}/${value}/${this.id?this.id:null}`;
    return new Promise((resolve,reject)=>{
      this.http.post(url,{}).subscribe(r=>{
        if(r){
          resolve({'using':true})
        }
        else{
          return resolve(null)
        }
      }); 
    }); 
  }

}
