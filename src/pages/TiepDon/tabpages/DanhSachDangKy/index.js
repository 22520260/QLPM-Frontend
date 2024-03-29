import { IFNgay, IFSearch } from "../../../../component/Layout/TabLayout/InputForm";
import ListForm from "../../../../component/Layout/TabLayout/ListForm";
import { sampleCustomers } from "../../../../component/Layout/TabLayout/ListForm/data";

function DanhSachDangKy() {
    return (
        <>
            <div className="row py-2">
                <IFNgay title={"Từ ngày"} />
                <IFNgay title={"Đến ngày"} />
                <IFSearch title={"Tìm kiếm từ khóa"} size={4} />
            </div>

            <ListForm customers={sampleCustomers} />
        </>
    );
}

export default DanhSachDangKy;