import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
var loginrouting = [
    {
        path: 'auth', component: LoginComponent,
        children: [
            { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
            { path: 'sign-in', component: SignInComponent },
            //{ path: 'sign-up', component: SignUpComponent },  
            { path: '**', redirectTo: 'sign-in', pathMatch: 'full' },
        ]
    }
];
export var loginRoutes = RouterModule.forChild(loginrouting);
//# sourceMappingURL=login.routing.js.map