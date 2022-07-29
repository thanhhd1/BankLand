import { BaseCriteria } from './base.criteria';
import { Observable } from 'rxjs';
import { CompanyModel } from '../models/company.model';

export class ServicesManagementCriteria extends BaseCriteria {
  Name: string;
  UnitName: string;
  Price: number;
  Unit: number;
  CompanyID: string;
  Company: Observable<Array<CompanyModel>>;
}
