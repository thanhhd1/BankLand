import { BaseCriteria } from './base.criteria';

export class InternetCriteria extends BaseCriteria {
    LicenseNumber: string;
    LicenseFromDate?: Date;
    LicenseToDate?: Date;
    TotalComputer?: number;
    AreaRoom?: number;
    Address: string;
    ProvideBy: string;

    OrganizationName: string;
    RepresentativeName: string;
    SocialNumber: string;
    Birthday?: Date;
    ProvideDate?:Date;
    PlaceProvide: string;
    Phone: string;
    Email: string;
    LicenseTypeID: string;
}
