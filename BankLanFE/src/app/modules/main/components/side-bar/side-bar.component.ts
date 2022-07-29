import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router'; 

@Component({
  selector: '[app-side-bar]',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent extends BaseComponent implements OnInit {
  
  @Output() onChangePassword:EventEmitter<boolean> = new EventEmitter();
  constructor(public authService: AuthenticationService,
    private router: Router) {
    super(authService);
  }

  ngOnInit() {
  }

  signOut() {
    this.authService.SignOut();
    this.router.navigate([`/management/auth/sign-in`]);
  }

  changepassword() { 
    this.onChangePassword.emit(true);
  }
}
