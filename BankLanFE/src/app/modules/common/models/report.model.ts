export class ReportModel {
    FromDate: Date;
    ToDate: Date;
    //nv quản lý du lịch:
    SoLuongDichVuKhachSan: number;
    SoLuongDichVuKNhaNghi: number;
    SoLuongDichVuKHomeStay: number;
    TongSoLuongDichVuLuuTru: number;
    TongLuongKhachLuuTruTrongHuyen: number;
    TongLuongKhachLuuTruTungDichVu: number;

    //nv quản lý dv văn hoá:
    Karaoke_Quanlity: number;
    Internet_Quanlity: number;

    //nv quản lý di tích:
    HistoricalSiteType_Province: number;
    HistoricalSiteType_National: number;

    // nv quản lý du lich
    Hotel_Quanlity: number;
    Motel_Quanlity: number;
    HomeStay_Quanlity: number;
    Total_Quanlity: number;

    // Quan ly luu tru
    Total_Stay: number;
    ManageStayModelList: any;
}
