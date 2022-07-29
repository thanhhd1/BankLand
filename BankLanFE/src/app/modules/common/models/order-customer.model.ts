import { OrderModel } from './order.model';
import CustomerModel from './customer.model';

export class OrderCustomerModel {
  ID: string;
  OrderID: string;
  CustomerID: string;
  Order: OrderModel;
  Customer: CustomerModel;
}
