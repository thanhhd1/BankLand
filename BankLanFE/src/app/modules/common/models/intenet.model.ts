import { InternetLicenseTypeModel } from './internet-license-type.model';

export class InternetModel {
  ID: string;
  LicenseNumber: string;
  LicenseFromDate: Date;
  TotalComputer: number;
  AreaRoom: number;
  OrganizationID: string;
  IsOrganization: boolean = false;
  RepresentativeID: string;
  LicenseTypeID: string;
  Address: string;

  InternetLicenseType: Array<InternetLicenseTypeModel> = new Array<InternetLicenseTypeModel>();
}
