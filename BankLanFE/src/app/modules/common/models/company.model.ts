import { RepresentativeModel } from './representative.model';
import { LicenseTypeModel } from './license-type.model';
import { OrganizationModel } from './organization.model';
import { CompanyType } from '../constant/message.const';
import { CompanyLicenseTypeModel } from './company-license-type.model';

export class CompanyModel {
  ID: string;
  Name: string;
  Address: string;
  CellPhoneNumber: string;
  PhoneNumber: string;
  Email: string;
  LicenseNumber: string;
  LicenseDate: Date;
  ProvideBy: string;
  OrganizationID: string;
  Organization: OrganizationModel;
  Representative: RepresentativeModel;
  LicenseType: LicenseTypeModel;
  IsOrganization: boolean = false;
  RepresentativeID: string;
  LicenseTypeID: string;
  CompanyType: CompanyType;
  Avatar: string = 'https://via.placeholder.com/400x600.png';
  QuanlityRoom: number;
  KindOf: number;
  RoomDetails: string;
  CompanyLicenseType: Array<CompanyLicenseTypeModel> = new Array<CompanyLicenseTypeModel>();
  constructor() {
    this.IsOrganization = false;
  }

}
