import { Observable } from 'rxjs';
import { MenuModel } from './menu.model';
import { OrderModel } from './order.model';

export class OrderMenuDetailsModel {
  ID: string;
  OrderID: string;
  MenuID: string;
  MenuName: string;
  Price: number;
  Quantity: number;
  UnitName: string;
  Unit: string;
  CheckinDate: Date;
  CheckoutDate: Date;
  Order: OrderModel;
  Menu: MenuModel;
  ThanhTien: number;
}
