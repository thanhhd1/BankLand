import { RouterModule } from '@angular/router';
import { AuthGuard } from '../common/guard/guard';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoleConstants } from 'src/app/Global';
import { CompanyComponent } from './components/company/company.component';
import { CustomerComponent } from './components/customer/customer.component';
import { InternetComponent } from './components/internet/internet.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { LicenseTypeComponent } from './license-type/license-type.component';
import { RepresentativeComponent } from './components/representative/representative.component';
import { HistoricalSiteComponent } from './components/historical-site/historical-site.component';
import { KaraokeComponent } from './components/karaoke/karaoke.component';
import { RoomComponent } from './components/room/room.component';
import { RoomTypeComponent } from './components/room-type/room-type.component';
import { ServicesManagementComponent } from './components/services-management/services-management.component';
import { UserComponent } from './components/user/user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { AccountProfileComponent } from './components/user/account-profile/account-profile.component';
import { CompanyManagementComponent } from './components/company-management/company-management.component';
import { RoomManagerComponent } from './components/room-manager/room-manager.component';
import { OrderComponent } from './components/order/order.component';
import { InvoiceComponent } from './components/order/invoice/invoice.component';
var main_Routes = [
    {
        path: 'management',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [AuthGuard],
                data: {
                    Roles: [RoleConstants.CompanyAdmin, RoleConstants.User]
                }
            },
            {
                path: 'companys',
                component: CompanyComponent
                // canActivate: [AuthGuard],
                // data: {
                //   Roles: [RoleConstants.Administrator, RoleConstants.CompanyAdmin]
                // }
            },
            {
                path: 'customers',
                component: CustomerComponent,
                canActivate: [AuthGuard],
                data: {
                    Roles: [RoleConstants.CompanyAdmin, RoleConstants.User]
                }
            },
            {
                path: 'internets',
                component: InternetComponent,
                canActivate: [AuthGuard],
                data: { Roles: [RoleConstants.Administrator] }
            },
            {
                path: 'organization',
                component: OrganizationComponent,
                canActivate: [AuthGuard],
                data: { Roles: [RoleConstants.Administrator] }
            },
            {
                path: 'license-types',
                component: LicenseTypeComponent,
                canActivate: [AuthGuard],
                data: { Roles: [RoleConstants.Administrator] }
            },
            {
                path: 'representatives',
                component: RepresentativeComponent,
                canActivate: [AuthGuard],
                data: { Roles: [RoleConstants.Administrator] }
            },
            {
                path: 'historical',
                component: HistoricalSiteComponent,
                canActivate: [AuthGuard],
                data: { Roles: [RoleConstants.Administrator] }
            },
            {
                path: 'karaokes',
                component: KaraokeComponent,
                canActivate: [AuthGuard],
                data: { Roles: [RoleConstants.Administrator] }
            },
            {
                path: 'rooms/:companyId',
                component: RoomComponent,
                canActivate: [AuthGuard]
                //data: { Roles: [RoleConstants.Administrator] }
            },
            {
                path: 'room-types',
                component: RoomTypeComponent,
                canActivate: [AuthGuard]
                //data: { Roles: [RoleConstants.Administrator] }
            },
            {
                path: 'services-management',
                component: ServicesManagementComponent,
                canActivate: [AuthGuard],
                data: { Roles: [RoleConstants.CompanyAdmin, RoleConstants.User] }
            },
            {
                path: 'users',
                component: UserComponent,
                canActivate: [AuthGuard],
                data: { Roles: [RoleConstants.Administrator, RoleConstants.CompanyAdmin] }
            },
            {
                path: 'edit-user/:{id}',
                component: EditUserComponent,
                canActivate: [AuthGuard]
                //data: { Roles: [RoleConstants.Administrator] }
            },
            {
                path: 'account-profile/:{id}',
                component: AccountProfileComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'company-management',
                component: CompanyManagementComponent,
                canActivate: [AuthGuard],
                data: { Roles: [RoleConstants.CompanyAdmin, RoleConstants.User] }
            },
            {
                path: 'invoice',
                component: InvoiceComponent,
                canActivate: [AuthGuard],
                data: { Roles: [RoleConstants.CompanyAdmin, RoleConstants.User] }
            },
            {
                path: 'invoice/:{id}',
                component: InvoiceComponent,
                canActivate: [AuthGuard],
                data: { Roles: [RoleConstants.CompanyAdmin, RoleConstants.User] }
            },
            {
                path: 'orders',
                component: OrderComponent,
                canActivate: [AuthGuard],
                data: { Roles: [RoleConstants.CompanyAdmin, RoleConstants.User] }
            },
            {
                path: 'room-manager',
                component: RoomManagerComponent,
                canActivate: [AuthGuard],
                data: { Roles: [RoleConstants.CompanyAdmin, RoleConstants.User] }
            },
            { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];
export var mainRoutes = RouterModule.forChild(main_Routes);
//# sourceMappingURL=main.routing.js.map