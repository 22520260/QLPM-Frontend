import React from "react";
import {
  IFInputText,
  IFNgay,
} from "../../../../component/Layout/TabLayout/InputForm";
import { useSelector } from "react-redux";

function ThongTinKhachHang() {
  const selectedBN = useSelector((state) => state.fetchAllBenhNhan?.patientById);

  const handleChange = (page) => {
    console.log(page);
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age > 0 ? age : 0;
  };

  return (
    <div className="shadow rounded">
      {/* Thông tin */}
      <div className="px-3 py-2 bg-primary rounded-top">
        Thông tin khách hàng
      </div>
      <div className="container-fluid mb-2 py-2">
        <div className="row py-2">
          <IFInputText
            title={"Mã KH"}
            valid={true}
            readOnly={true}
            size={3}
            value={selectedBN.MABN}
            onChange={(value) => handleChange(1)}
          />
          <IFInputText
            title={"Họ và Tên"}
            valid={true}
            readOnly={true}
            size={6}
            value={selectedBN.HOTEN}
            onChange={(value) => handleChange(1)}
          />
          <IFInputText
            title={"Giới tính"}
            valid={true}
            readOnly={true}
            size={3}
            value={selectedBN.GIOITINH}
            onChange={(value) => handleChange(1)}
          />
        </div>
        <div className="row py-2">
          <IFNgay
            title={"Ngày sinh"}
            valid={true}
            readOnly={true}
            size={3}
            value={new Date(selectedBN.NGAYSINH)}
            onChange={(value) => handleChange(1)}
          />
          <IFInputText
            title={"Tuổi"}
            valid={true}
            readOnly={true}
            size={2}
            value={calculateAge(new Date(selectedBN.NGAYSINH))}
            onChange={(value) => handleChange(1)}
          />
          <IFInputText
            title={"CCCD"}
            valid={true}
            readOnly={true}
            size={4}
            value={selectedBN.CCCD}
            onChange={(value) => handleChange(1)}
          />
          <IFInputText
            title={"Số điện thoại"}
            valid={true}
            readOnly={true}
            size={3}
            value={selectedBN.SDT}
            onChange={(value) => handleChange(1)}
          />
        </div>
        <div className="row py-2">
          <IFInputText
            title={"Địa chỉ"}
            valid={true}
            readOnly={true}
            size={7}
            value={selectedBN.DIACHI}
            onChange={(value) => handleChange(1)}
          />

          <IFInputText
            title={"Dị ứng"}
            valid={true}
            readOnly={true}
            size={5}
            value={selectedBN.DIUNG}
            onChange={(value) => handleChange(1)}
          />
        </div>

        <div className="row py-2">
          <IFInputText
            title={"Tiền sử bệnh"}
            valid={true}
            readOnly={true}
            size={12}
            value={selectedBN.TIENSUBENH}
            onChange={(value) => handleChange(1)}
          />
        </div>
      </div>
    </div>
  );
}

export default ThongTinKhachHang;
