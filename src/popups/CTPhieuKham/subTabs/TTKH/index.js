import React from "react";
import {
  IFInputText,
  IFSelect,
  IFNgay,
} from "../../../../component/Layout/TabLayout/InputForm";
import { useSelector } from "react-redux";
function ThongTinKhachHang() {
  const doctors = useSelector((state) => state.fetchAllBacSi.doctors);

  const handleChange = (page) => {
    console.log(page);
  };

  return (
    <div className="shadow rounded">
      {/* Thông tin */}
      <div className="px-3 py-2 bg-primary rounded-top">Thông tin khách hàng</div>
        <div className="container-fluid mb-">
          <div className="row py-2">
            <IFInputText
              title={"Mã KH"}
              size={2}
              onChange={(value) => handleChange(1)}
            />
            <IFInputText
              title={"Họ và Tên"}
              size={4}
              onChange={(value) => handleChange(1)}
            />
            <IFInputText
              title={"Giới tính"}
              size={2}
              onChange={(value) => handleChange(1)}
            />

            <IFNgay
              title={"Ngày sinh"}
              size={3}
              onChange={(value) => handleChange(1)}
            />
            <IFInputText
              title={"Tuổi"}
              size={1}
              readOnly={true}
              onChange={(value) => handleChange(1)}
            />
          </div>
          <div className="row py-2">
            <IFInputText
              title={"CCCD"}
              size={3}
              onChange={(value) => handleChange(1)}
            />
            <IFInputText
              title={"Số điện thoại"}
              size={3}
              onChange={(value) => handleChange(1)}
            />

            <IFInputText
              title={"Địa chỉ"}
              size={6}
              onChange={(value) => handleChange(1)}
            />
          </div>
          <div className="row py-2">
            <IFInputText
              title={"Tiền sử bệnh"}
              size={5}
              onChange={(value) => handleChange(1)}
            />
            <IFInputText
              title={"Dị ứng"}
              size={7}
              onChange={(value) => handleChange(1)}
            />
          </div>
        </div>
    </div>
  );
}

export default ThongTinKhachHang;
