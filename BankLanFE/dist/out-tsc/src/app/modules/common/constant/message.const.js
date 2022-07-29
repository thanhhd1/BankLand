var MessageConstant = /** @class */ (function () {
    function MessageConstant() {
    }
    MessageConstant.DEL_SUCCESS_CONST = "Một mục đã được xoá thành công";
    MessageConstant.ADD_SUCCESS_CONST = "Một mục đã được tạo thành công";
    MessageConstant.EDIT_SCCCESS_CONST = "Một mục đã được cập nhật thành công";
    MessageConstant.REQUEST_SUCCESS_CONST = "Yêu cầu  của bạn đã được thực hiện thành công";
    MessageConstant.REQUEST_CHANGE_PASS_CONST = "Kiểm tra hộp thư của bạn để lấy mật khẩu mới";
    MessageConstant.FAILURE_REQUEST = "Xảy ra lỗi khi xử lý yêu cầu của bạn, vui lòng  nhấn F5 và thử lại.";
    MessageConstant.NOT_FOUND = "No data found.";
    MessageConstant.DEL_ERROR_CONST = "Xoá không thành công, vui lòng kiểm tra lại";
    MessageConstant.ADD_ERROR_CONST = "Tạo mới không thành công, vui lòng kiểm tra lại";
    MessageConstant.EDIT_ERROR_CONST = "Cập nhật không thành công, vui lòng kiểm tra lại";
    return MessageConstant;
}());
export { MessageConstant };
export var CompanyType;
(function (CompanyType) {
    CompanyType[CompanyType["Hotel"] = 0] = "Hotel";
    CompanyType[CompanyType["Motel"] = 1] = "Motel";
    CompanyType[CompanyType["HomeStay"] = 2] = "HomeStay";
})(CompanyType || (CompanyType = {}));
export var ImageType;
(function (ImageType) {
    ImageType[ImageType["Company_Image"] = 1] = "Company_Image";
    ImageType[ImageType["Company_File"] = 2] = "Company_File";
    ImageType[ImageType["Room_Image"] = 3] = "Room_Image";
    ImageType[ImageType["Room_File"] = 4] = "Room_File";
    ImageType[ImageType["RoomService_Image"] = 5] = "RoomService_Image";
    ImageType[ImageType["RoomService_File"] = 6] = "RoomService_File";
    ImageType[ImageType["Karaoke_Image"] = 7] = "Karaoke_Image";
    ImageType[ImageType["Karaoke_File"] = 8] = "Karaoke_File";
    ImageType[ImageType["KaraokeRoom_Image"] = 9] = "KaraokeRoom_Image";
    ImageType[ImageType["KaraokeRoom_File"] = 10] = "KaraokeRoom_File";
    ImageType[ImageType["Internet_Image"] = 11] = "Internet_Image";
    ImageType[ImageType["Internet_File"] = 12] = "Internet_File";
    ImageType[ImageType["HitoricalSite_Image"] = 13] = "HitoricalSite_Image";
    ImageType[ImageType["HistoricalSite_File"] = 14] = "HistoricalSite_File";
})(ImageType || (ImageType = {}));
//# sourceMappingURL=message.const.js.map