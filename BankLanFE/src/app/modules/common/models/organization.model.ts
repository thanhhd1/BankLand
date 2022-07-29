import { RepresentativeModel } from './representative.model';

export class OrganizationModel {
  ID: string;
  Name: string;
  Address: string;
  RepresentativeID: string;
  Representative: RepresentativeModel;
}
