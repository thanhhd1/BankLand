
import { Routes } from '@angular/router';
import { AuthGuard } from './modules/common/guard/guard';
import { DashboardComponent } from './modules/main/components/dashboard/dashboard.component';
 
export const appRoute: Routes = [
  { path: 'management', loadChildren: './modules/main/main.module#MainModule' },
  { path: 'auth', loadChildren: './modules/login/login.module#LoginModule' },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
  // { path: '', component: HomeComponent, 
  // children: [
  //   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  //   {
  //     path: 'dashboard',
  //     component: DashboardComponent,
  //     // canActivate: [AuthGuard],
  //     // data: {
  //     //   Roles: [RoleConstants.CompanyAdmin
  //     //   ]
  //     // }
  //   }]
  // }, //canActivate: [AuthGuard]
];
 

