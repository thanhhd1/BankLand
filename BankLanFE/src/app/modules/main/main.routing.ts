import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { ReportTravelServicesComponent } from './components/reports/report-travel-services/report-travel-services.component';
import { ReportHistoricalComponent } from './components/reports/report-historical/report-historical.component';
import { ReportCulturalServicesComponent } from './components/reports/report-cultural-services/report-cultural-services.component';
import { ReportStayInformationManagerComponent } from './components/reports/report-stay-information-manager/report-stay-information-manager.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { InvertorComponent } from './components/invertor/invertor.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { BalanceManagementComponent } from './components/balance-management/balance-management.component';

const main_Routes: Routes = [
  {
    path: 'management',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardAdminComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   Roles: [RoleConstants.CompanyAdmin
        //   ]
        // }
      },
      {
        path: 'report-travel-services',
        component: ReportTravelServicesComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   Roles: [RoleConstants.Administrator,
        //   RoleConstants.Employee_Travel_Services
        //   ]
        // }
      },
      {
        path: 'report-stay-information-manager',
        component: ReportStayInformationManagerComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   Roles: [RoleConstants.Administrator,
        //   RoleConstants.Employee_Travel_Services
        //   ]
        // }
      },

      {
        path: 'report-historical',
        component: ReportHistoricalComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   Roles: [RoleConstants.Administrator,
        //   RoleConstants.Employee_Historical
        //   ]
        // }
      },
      {
        path: 'report-cultural-services',
        component: ReportCulturalServicesComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   Roles: [RoleConstants.Administrator,
        //   RoleConstants.Employee_Cultural_Services
        //   ]
        // }
      },

      {
        path: 'companys',
        component: CompanyComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   Roles: [RoleConstants.Administrator,
        //   RoleConstants.Employee_Travel_Services,
        //   RoleConstants.CompanyAdmin]
        // }
      },
      {
        path: 'customers',
        component: CustomerComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   Roles: [RoleConstants.CompanyAdmin,
        //   RoleConstants.Employee_Travel_Services,
        //   RoleConstants.Administrator]
        // }
      },
      {
        path: 'internets',
        component: InternetComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   Roles: [RoleConstants.Administrator,
        //   RoleConstants.Employee_Cultural_Services]
        // }
      },
      {
        path: 'organization',
        component: OrganizationComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   Roles: [RoleConstants.Administrator,
        //   RoleConstants.Employee_Cultural_Services,
        //   RoleConstants.Employee_Travel_Services
        //   ]
        // }
      },
      {
        path: 'license-types',
        component: LicenseTypeComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   Roles: [RoleConstants.Administrator,
        //   RoleConstants.Employee_Cultural_Services,
        //   RoleConstants.Employee_Travel_Services]
        // }
      },
      {
        path: 'representatives',
        component: RepresentativeComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   Roles: [RoleConstants.Administrator,
        //   RoleConstants.Employee_Cultural_Services,
        //   RoleConstants.Employee_Travel_Services]
        // }
      },
      {
        path: 'historical',
        component: HistoricalSiteComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   Roles: [RoleConstants.Administrator,
        //   RoleConstants.Employee_Historical]
        // }
      },
      {
        path: 'karaokes',
        component: KaraokeComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   Roles: [RoleConstants.Administrator,
        //   RoleConstants.Employee_Cultural_Services]
        // }
      },
      {
        path: 'rooms/:companyId',
        component: RoomComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   Roles: [RoleConstants.Administrator,
        //   RoleConstants.Employee_Travel_Services,
        //   RoleConstants.CompanyAdmin]
        // }
      },
      {
        path: 'room-types',
        component: RoomTypeComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   Roles: [RoleConstants.Administrator,
        //   RoleConstants.Employee_Cultural_Services,
        //   RoleConstants.Employee_Travel_Services]
        // }
      },
      {
        path: 'services-management',
        component: ServicesManagementComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   Roles: [
        //     RoleConstants.Administrator,
        //     RoleConstants.CompanyAdmin,
        //     RoleConstants.Employee_Travel_Services]
        // }
      },
      {
        path: 'users',
        component: UserComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   Roles: [
        //     RoleConstants.Administrator
        //   ]
        // }
      },
      {
        path: 'edit-user/:{id}',
        component: EditUserComponent,
        // canActivate: [AuthGuard],
        // data: { Roles: [RoleConstants.Administrator] }
      },
      {
        path: 'account-profile/:{id}',
        component: AccountProfileComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'company-management',
        component: CompanyManagementComponent,
        //canActivate: [AuthGuard],
        //data: { Roles: [RoleConstants.CompanyAdmin] }
      },
      {
        path: 'invoice',
        component: InvoiceComponent,
        //canActivate: [AuthGuard],
        //data: { Roles: [RoleConstants.CompanyAdmin] }
      },
      {
        path: 'invoice/:{id}',
        component: InvoiceComponent,
        //canActivate: [AuthGuard],
        //data: { Roles: [RoleConstants.CompanyAdmin] }
      },
      {
        path: 'invoice/:{id}/:{roomId}',
        component: InvoiceComponent,
        //canActivate: [AuthGuard],
        //data: { Roles: [RoleConstants.CompanyAdmin] }
      },
      {
        path: 'orders',
        component: OrderComponent,
        //canActivate: [AuthGuard],
        //data: { Roles: [RoleConstants.CompanyAdmin] }
      },
      {
        path: 'room-manager',
        component: RoomManagerComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   Roles: [RoleConstants.CompanyAdmin,
        //   RoleConstants.Administrator,
        //   RoleConstants.Employee_Travel_Services]
        // }
      },
      {
        path: 'deposit/:{id}',
        component: DepositComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'invertor/:{id}',
        component: InvertorComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'withdraw/:{id}',
        component: WithdrawComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'balance-management/:{id}',
        component: BalanceManagementComponent,
        //canActivate: [AuthGuard]
      },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   Roles: [RoleConstants.CompanyAdmin
        //   ]
        // }
      }
    ]
  }
];

export const mainRoutes: ModuleWithProviders = RouterModule.forChild(
  main_Routes
);
