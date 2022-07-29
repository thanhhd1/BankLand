import { BaseCriteria } from './base.criteria';
import { CompanyModel } from '../models/company.model';
import { Observable } from 'rxjs';
import { OrderCustomerModel } from '../models/order-customer.model';
import { OrderMenuDetailsModel } from '../models/order-menu-detail.model';
import { OrderRoomDetailsModel } from '../models/order-room-detail.model';

export class OrderCriteria extends BaseCriteria {
  OrderDate: Date;
  OrderInvoice: string;
  IsCompleted?: boolean;
  Company: Observable<Array<CompanyModel>>;
  CompanyID: string;
  OrderCustomers: Observable<Array<OrderCustomerModel>>;
  OrderMenuDetails: Observable<Array<OrderMenuDetailsModel>>;
  OrderRoomDetails: Observable<Array<OrderRoomDetailsModel>>;
}
