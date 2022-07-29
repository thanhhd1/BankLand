import { Observable } from 'rxjs';
import { RoomModel } from './room.model';
import { OrderModel } from './order.model';

export class OrderRoomDetailsModel {
  ID: string;
  OrderID: string;
  RoomID: string;
  RoomName: string;
  Price: number;
  CheckinDate?: Date;
  CheckinDateView?: Date;
  CheckoutDate?: Date;
  CheckoutDateView?: Date;
  Order: OrderModel;
  Room: RoomModel;
  IsManualPrice: boolean;
  ThanhTien: number;
}
