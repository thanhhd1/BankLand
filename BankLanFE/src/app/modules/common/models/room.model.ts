import { RoomTypeModel } from './room-type.model';

export class RoomModel {
  ID: string;
  Name: string;
  AreaRoom: string;
  Price: number;
  RoomTypeId: string;
  RoomType: RoomTypeModel;
  CompanyID: string;
  Avatar: string = 'https://via.placeholder.com/400x600.png';
}
