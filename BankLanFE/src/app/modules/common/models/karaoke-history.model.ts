
import { KaraokeRoomHistoryModel } from './karaoke-room-history.model';
import { KaraokeLicenseTypeHistoryModel } from './karaoke-license-type-history.model';
export class KaraokeHistoryModel {
  ID: string;
  Avatar: string;
  KaraokeID: string;
  Note: string;
  HistoryDate: Date;
  BusinessName: string;
  Address: string;
  QuanlityRooms: number;
  IsOrganization: boolean;
  OrganizationID: string;
  OrganizationName: string;
  RepresentativeID: string;
  RepresentativeName: string;
  RepresentativePhone: string;
  Rooms: Array<KaraokeRoomHistoryModel> = new Array<KaraokeRoomHistoryModel>();
  KaraokeLicenseTypeHistory: Array<KaraokeLicenseTypeHistoryModel> = new Array<KaraokeLicenseTypeHistoryModel>();
}
