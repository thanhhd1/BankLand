import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { mainRoutes } from './main.routing';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../common/common.module';
import { CustomFormsModule } from 'ng2-validation';
import { ModalModule } from 'ngx-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TextMaskModule } from 'angular2-text-mask';
import { Select2Module } from 'ng2-select2';
import { CompanyComponent } from './components/company/company.component';
import { CompanyInfoComponent } from './components/company/company-info/company-info.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RoomTypeComponent } from './components/room-type/room-type.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerInfoComponent } from './components/customer/customer-info/customer-info.component';
import { InternetComponent } from './components/internet/internet.component';
import { InternetInfoComponent } from './components/internet/internet-info/internet-info.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { OrganizationInfoComponent } from './components/organization/organization-info/organization-info.component';
import { LicenseTypeComponent } from './license-type/license-type.component';
import { LicenseTypeInfoComponent } from './license-type/license-type-info/license-type-info.component';
import { RepresentativeComponent } from './components/representative/representative.component';
import { RepresentativeInfoComponent } from './components/representative/representative-info/representative-info.component';
import { ImageStorageComponent } from './components/image-storage/image-storage.component';
import { ImageStorageInfoComponent } from './components/image-storage/image-storage-info/image-storage-info.component';
import { HistoricalSiteComponent } from './components/historical-site/historical-site.component';
import { HistoricalSiteInfoComponent } from './components/historical-site/historical-site-info/historical-site-info.component';
import { KaraokeComponent } from './components/karaoke/karaoke.component';
import { KaraokeInfoComponent } from './components/karaoke/karaoke-info/karaoke-info.component';
import { KaraokeRoomComponent } from './components/karaoke/karaoke-room/karaoke-room.component';
import { KaraokeRoomInfoComponent } from './components/karaoke/karaoke-room/karaoke-room-info/karaoke-room-info.component';
import { RoomTypeInfoComponent } from './components/room-type/room-type-info/room-type-info.component';
import { RoomComponent } from './components/room/room.component';
import { RoomInfoComponent } from './components/room/room-info/room-info.component';
import { KaraokeHistoryComponent } from './components/karaoke/karaoke-history/karaoke-history.component';
import { ServicesManagementComponent } from './components/services-management/services-management.component';
import { ServicesManagementInfoComponent } from './components/services-management/services-management-info/services-management-info.component';
import { ChangePasswordComponent } from './components/user/change-password/change-password.component';
import { UserComponent } from './components/user/user.component';
import { UserInfoEditComponent } from './components/user/user-info-edit/user-info-edit.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { AccountProfileComponent } from './components/user/account-profile/account-profile.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { CompanyManagementComponent } from './components/company-management/company-management.component';
import { RoomManagerComponent } from './components/room-manager/room-manager.component';
import { OrderComponent } from './components/order/order.component';
import { OrderServicesComponent } from './components/order/order-services/order-services.component';
import { OrderCustomerComponent } from './components/order/order-customers/order-customer.component';
import { OrderRoomComponent } from './components/order/order-rooms/order-room.component';
import { InvoiceComponent } from './components/order/invoice/invoice.component';
import { OrderViewComponent } from './components/order/order-view/order-view.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { ServiceListComponent } from './components/services-management/service-list/service-list.component';
import { OrderRoomDetailComponent } from './components/order/order-rooms/order-room-detail/order-room-detail.component';
import { OrderServiceDetailComponent } from './components/order/order-services/order-service-detail/order-service-detail.component';
var MainModule = /** @class */ (function () {
    function MainModule() {
    }
    MainModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                SharedModule,
                mainRoutes,
                FormsModule,
                CustomFormsModule,
                TextMaskModule,
                ModalModule.forRoot(),
                Select2Module,
                NgxPaginationModule,
                NgMultiSelectDropDownModule.forRoot()
            ],
            declarations: [
                LayoutComponent,
                SideBarComponent,
                DashboardComponent,
                HeaderComponent,
                FooterComponent,
                CompanyComponent,
                CompanyInfoComponent,
                RoomTypeComponent,
                CustomerComponent,
                CustomerInfoComponent,
                InternetComponent,
                InternetInfoComponent,
                OrganizationComponent,
                OrganizationInfoComponent,
                LicenseTypeComponent,
                LicenseTypeInfoComponent,
                RepresentativeComponent,
                RepresentativeInfoComponent,
                ImageStorageComponent,
                ImageStorageInfoComponent,
                HistoricalSiteComponent,
                HistoricalSiteInfoComponent,
                KaraokeComponent,
                KaraokeInfoComponent,
                KaraokeRoomComponent,
                KaraokeRoomInfoComponent,
                RoomTypeInfoComponent,
                RoomComponent,
                RoomInfoComponent,
                KaraokeHistoryComponent,
                ServicesManagementComponent,
                ServicesManagementInfoComponent,
                ChangePasswordComponent,
                UserComponent,
                UserInfoEditComponent,
                EditUserComponent,
                AddUserComponent,
                AccountProfileComponent,
                ResetPasswordComponent,
                CompanyManagementComponent,
                RoomManagerComponent,
                OrderComponent,
                OrderServicesComponent,
                OrderCustomerComponent,
                OrderRoomComponent,
                InvoiceComponent,
                OrderViewComponent,
                CustomerListComponent,
                ServiceListComponent,
                OrderRoomDetailComponent,
                OrderServiceDetailComponent,
            ]
        })
    ], MainModule);
    return MainModule;
}());
export { MainModule };
//# sourceMappingURL=main.module.js.map