export default class UserModel {
  Id: string;
  access_token: string;
  expires_in: string;

  Name: string;
  _ProfilePicturePath: string;
  get ProfilePicturePath() {
    if (!this._ProfilePicturePath) {
      this._ProfilePicturePath =
        'https://s3.amazonaws.com/zumedic-network-storage/User/Images/avatar.png';
    }
    return this._ProfilePicturePath;
  }
  set ProfilePicturePath(value) {
    if (!value) {
      this._ProfilePicturePath =
        'https://s3.amazonaws.com/zumedic-network-storage/User/Images/avatar.png';
    }
    this._ProfilePicturePath = value;
  }
  UserName: string;
  IsInactived: boolean;
  Email: string;
  OldPassword: string = '';
  Password: string = '';
  SecondPassword: string = '';
  PhoneNumber: string;
  Role: string;
  CompanyID: string;
  BusinessName: string;
}
