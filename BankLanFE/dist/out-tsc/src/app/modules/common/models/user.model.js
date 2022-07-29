var UserModel = /** @class */ (function () {
    function UserModel() {
        this.OldPassword = '';
        this.Password = '';
        this.SecondPassword = '';
    }
    Object.defineProperty(UserModel.prototype, "ProfilePicturePath", {
        get: function () {
            if (!this._ProfilePicturePath) {
                this._ProfilePicturePath =
                    'https://s3.amazonaws.com/zumedic-network-storage/User/Images/avatar.png';
            }
            return this._ProfilePicturePath;
        },
        set: function (value) {
            if (!value) {
                this._ProfilePicturePath =
                    'https://s3.amazonaws.com/zumedic-network-storage/User/Images/avatar.png';
            }
            this._ProfilePicturePath = value;
        },
        enumerable: true,
        configurable: true
    });
    return UserModel;
}());
export default UserModel;
//# sourceMappingURL=user.model.js.map