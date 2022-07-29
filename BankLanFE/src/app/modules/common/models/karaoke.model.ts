import { LicenseTypeModel } from './license-type.model';
import { OrganizationModel } from './organization.model';
import { RepresentativeModel } from './representative.model';
import { KaraokeLicenseTypeModel } from './karaoke-license-type.model';
import { KaraokeRoomModel } from './karaoke-room.model';

export class KaraokeModel {
  ID: string;
  BusinessName: string;
  LicenseNumber: string;
  LicenseDate: Date;
  Address: number;
  IsOrganization: boolean = false;
  OrganizationID: string;
  RepresentativeID: string;
  LicenseTypeID: string;
  Avatar: string = 'https://via.placeholder.com/400x600.png';
  LicenseType: LicenseTypeModel;
  Organization: OrganizationModel;
  Representative: RepresentativeModel;
  IsExistFiles: boolean = false;
  QuanlityRooms: number;
  RoomsDetails: string;
  KaraokeLicenseTypes: Array<KaraokeLicenseTypeModel> = new Array<KaraokeLicenseTypeModel>();
  Rooms: Array<KaraokeRoomModel> = new Array<KaraokeRoomModel>();
}
