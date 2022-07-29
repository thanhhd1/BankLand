import { Observable } from 'rxjs';
import { CompanyModel } from './company.model';

export class ServicesManagementModel {
  ID: string;
  CompanyName: string;
  Name: string;
  Price: number;
  UnitName: string;
  Unit: number;
  CompanyID: string;
  Company: Observable<Array<CompanyModel>>;
}
