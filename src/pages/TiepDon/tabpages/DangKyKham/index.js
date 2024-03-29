import { IFInputText, IFSelect, IFNgay} from '../../../../component/Layout/TabLayout/InputForm';
function DangKyKham() {
    return ( 
    <div>
        <div className='px-3 py-2 bg-primary'>
            Thông tin
        </div>
        <div className='pt-2 border border-primary'>
            <div className="container-fluid mb-2">
                <div className="row py-2">
                    <IFInputText title={"Họ và Tên"} size={4} />
                    <IFSelect title={"Giới tính"} size={1} option={["Nam", "Nữ", "Khác"]} />
                    <IFInputText title={"Địa chỉ"} size={7} />
                </div>
                <div className='row py-2'>
                    <IFNgay title={"Ngày sinh"}/>
                    <IFInputText title={"Tuổi"} size = {1} />
                    <IFInputText title={"CCCD"} size={3} />
                    <IFInputText title={"Số điện thoại"} size={3} />
                    <IFInputText title={"Số điện thoại người thân"} size={3} />
                </div>
                <div className='row py-2'>
                    <IFNgay title={"Ngày khám"} />
                    <IFInputText title={"Bác sĩ"} size={3} />
                    <IFInputText title={"Lý do khám"} size = {4} />
                    <IFInputText title={"Chú thích (nếu có)"} size={3} />
                    </div>
            </div>
        </div>
    </div>
     );
}

export default DangKyKham;