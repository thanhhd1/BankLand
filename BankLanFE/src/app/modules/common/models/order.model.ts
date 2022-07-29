
import { CompanyModel } from './company.model';
import { OrderCustomerModel } from './order-customer.model';
import { OrderMenuDetailsModel } from './order-menu-detail.model';
import { OrderRoomDetailsModel } from './order-room-detail.model';

export class OrderModel {
  ID: string;
  OrderDate: Date;
  OrderInvoice: string;
  IsCompleted: boolean;
  CompanyID: string;
  Company: CompanyModel;
  OrderCustomers: Array<OrderCustomerModel> = new Array<OrderCustomerModel>();
  OrderMenuDetails: Array<OrderMenuDetailsModel> = new Array<OrderMenuDetailsModel>();
  OrderRoomDetails: Array<OrderRoomDetailsModel> = new Array<OrderRoomDetailsModel>();
  Total: number = 0;
  
  constructor() {
    this.OrderDate = new Date();
  }
}
