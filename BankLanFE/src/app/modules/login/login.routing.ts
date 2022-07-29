import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { SignInComponent } from './components/sign-in/sign-in.component'; 
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
const loginrouting: Routes = [
    {
        path: 'auth', component: LoginComponent,
         children: [ 
            { path: '', redirectTo: 'sign-in'  , pathMatch:'full'}, 
            { path: 'sign-in', component: SignInComponent },
            { path: 'sign-up', component: SignUpComponent },  
            { path: 'forgot-password', component: ForgotPasswordComponent },  
            { path: '**', redirectTo: 'sign-in'  , pathMatch:'full' },
        ]
    }
];
export const loginRoutes: ModuleWithProviders = RouterModule.forChild(loginrouting);