import { Component, OnInit, ViewChild } from '@angular/core'; 
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service'; 
declare var $:any;
@Component({
  selector: '[app-layout]',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent extends BaseComponent implements OnInit {
  stringChange:string = new Date().toJSON(); 
  constructor(authService:AuthenticationService) {
    super(authService);
   }

  ngOnInit() {
     
    $('body').attr('class','horizontal-layout horizontal-menu 2-columns');
    $('body').attr('data-col','2-column');

    
  }

  changeMode(event){
    this.stringChange= new Date().toJSON();
  }

  changepassword() {
    if (this.currentUser) {
      
    }  
  }
}
