import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../common/services/authentication.service';
declare var $:any;
@Component({
  selector: '[app-login]',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService) {

  }

  ngOnInit() {
    $('body').attr('class','horizontal-layout horizontal-menu 1-column  bg-full-screen-image blank-page');
    $('body').attr('data-col','1-column');
  }

   

}