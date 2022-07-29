import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guard/guard';
import { CommonDialogService } from './services/dialog.service';
import { UserService } from './services/user.service';
import { TokenService } from './services/token.service';
import { AuthenticationService } from './services/authentication.service';
import { PagingTableDirective } from './directive/paging-table.directive';
import { ModalModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';
import { InitMenuDirective } from './directive/init-menu.directive';
import { CompanyService } from './services/company.service';
import { ColorPickerDirective } from './directive/color-picker.directive';
import { FileUploadDirective } from './directive/fileupload.directive';
import { GreateThanToDirective } from './directive/greate-than-to.directive';
import { EqualToControlDirective } from './directive/equal-to-control.directive';
import { ExistObjectDirective } from './directive/exist-object.directive';
import { CropImageComponent } from './component/crop-image/crop-image.component';
import { ActionCardButtonDirective } from './directive/action-card-button.directive';
import { ICheckDirective } from './directive/i-check.directive';
import { CustomerService } from './services/customer.service';
import { InternetService } from './services/internet.service';
import { OrganizationService } from './services/organization.service';
import { LicenseTypeService } from './services/license-type.service';
import { RepresentativeService } from './services/representative.service';
import { HistoricalSiteService } from './services/historical-site.service';
import { KaraokeService } from './services/karaoke.service';
import { KaraokeRoomService } from './services/karaoke-room.service';
import { ImageStorageService } from './services/image-storage.service';
import { RoomTypeService } from './services/room-type.service';
import { RoomService } from './services/room.service';
import { KaraokeHistoryService } from './services/karaoke-history.service';
import { ServicesManagementService } from './services/services-management.service';
import { OrderService } from './services/order.service';
import { OrderRoomDetailService } from './services/order-room-detail.service';
import { OrderCustomerService } from './services/order-customer.service';
import { OrderMenuDetailService } from './services/order-menu-details.service';
import { MenuService } from './services/menu.service';
import { DateTimePickerComponent } from './component/date-time-picker/date-time-picker.component';
import { AsyncValidateExistedDirective } from './directive/async-validate-existed.directive';
export function jwtOptionsFactory(tokenService) {
    return {
        tokenGetter: function () {
            return tokenService.getAccessToken();
        }
    };
}
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                HttpClientModule,
                JwtModule.forRoot({
                    jwtOptionsProvider: {
                        provide: JWT_OPTIONS,
                        useFactory: jwtOptionsFactory,
                        deps: [TokenService]
                    },
                    config: {
                    //whitelistedDomains: ['localhost:44356']
                    }
                }),
                FormsModule,
                ModalModule.forRoot()
            ],
            declarations: [
                PagingTableDirective,
                InitMenuDirective,
                FileUploadDirective,
                ColorPickerDirective,
                GreateThanToDirective,
                EqualToControlDirective,
                ExistObjectDirective,
                CropImageComponent,
                ActionCardButtonDirective,
                ICheckDirective,
                DateTimePickerComponent,
                AsyncValidateExistedDirective
            ],
            exports: [
                PagingTableDirective,
                InitMenuDirective,
                FileUploadDirective,
                ColorPickerDirective,
                GreateThanToDirective,
                EqualToControlDirective,
                CropImageComponent,
                ActionCardButtonDirective,
                ICheckDirective,
                DateTimePickerComponent,
                AsyncValidateExistedDirective
            ],
            providers: [
                AuthenticationService,
                AuthGuard,
                CommonDialogService,
                UserService,
                TokenService,
                CompanyService,
                CustomerService,
                InternetService,
                OrganizationService,
                LicenseTypeService,
                RepresentativeService,
                HistoricalSiteService,
                KaraokeService,
                KaraokeRoomService,
                ImageStorageService,
                RoomTypeService,
                RoomService,
                KaraokeHistoryService,
                ServicesManagementService,
                OrderService,
                OrderRoomDetailService,
                OrderCustomerService,
                OrderMenuDetailService,
                MenuService
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=common.module.js.map