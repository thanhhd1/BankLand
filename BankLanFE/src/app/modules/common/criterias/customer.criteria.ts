import { BaseCriteria } from './base.criteria';
export class CustomerCriteria extends BaseCriteria {
  Name: string;
  PhoneNumber: string;
  BirthDate?: Date;
  SocialNumber: string;
  Address: string;
  ProviderDate: Date;
  PlaceProvider: string;
  CompanyID: string;
}
