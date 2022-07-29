import { Observable } from 'rxjs';
import { CompanyModel } from './company.model';

export class MenuModel {
  ID: string;
  Name: string;
  Price: number;
  UnitName: string;
  Unit: string;
  CompanyID: string;
  Company: Observable<Array<CompanyModel>>;
}
