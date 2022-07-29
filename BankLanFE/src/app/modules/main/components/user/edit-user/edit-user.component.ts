import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent extends BaseComponent implements OnInit {

  id: string = ''; 
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  isFirstHACClick: boolean = false;
  constructor(authService: AuthenticationService,
    private router: Router,
    private activeRouter: ActivatedRoute) {
    super(authService);
    activeRouter.params.subscribe(r => {
      this.id = r['{id}']; 
    });
  }

  ngOnInit() {

  }

  // selectCalendar() {
  //   if (!this.isFirstHACClick) {
  //     this.isFirstHACClick = true; 
  //   }
  // }

}
