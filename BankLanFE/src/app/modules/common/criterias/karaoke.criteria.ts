import { BaseCriteria } from './base.criteria';

export class KaraokeCriteria extends BaseCriteria {
  BusinessName:string;
  LicenseNumber: string;
  LicenseDate: Date; 
  Address: number;
  OrganizationName: string;
  RepresentativeName: string;
  SocialNumber:string;

  LicenseFromDate?:Date;
  LicenseToDate?:Date;
}
