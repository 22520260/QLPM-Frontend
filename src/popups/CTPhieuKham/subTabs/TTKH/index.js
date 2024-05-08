import React from "react";
import {
  IFInputText,
  IFNgay,
} from "../../../../component/Layout/TabLayout/InputForm";
import { useSelector } from "react-redux";

function ThongTinKhachHang() {
  const data = useSelector((state) => state.selectedRow.selectedRow);

  const handleChange = (page) => {
    console.log(page);
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
            onChange={(value) => handleChange(1)}
          />
          <IFInputText
            title={"Họ và Tên"}
            valid={true}
            readOnly={true}
            size={6}
            value={data.TENBN}
            onChange={(value) => handleChange(1)}
          />
          <IFInputText
            title={"Giới tính"}
            valid={true}
            readOnly={true}
            size={3}
            value={data.GIOITINH}
            onChange={(value) => handleChange(1)}
          />
        </div>
        <div className="row py-2">
          <IFNgay
            title={"Ngày sinh"}
            valid={true}
            readOnly={true}
            size={3}
            value={new Date(data.NGAYSINH)}
            onChange={(value) => handleChange(1)}
          />
          <IFInputText
            title={"Tuổi"}
            valid={true}
            readOnly={true}
            size={2}
            onChange={(value) => handleChange(1)}
          />
          <IFInputText
            title={"CCCD"}
            valid={true}
            readOnly={true}
            size={4}
            value={data.CCCD}
            onChange={(value) => handleChange(1)}
          />
          <IFInputText
            title={"Số điện thoại"}
            valid={true}
            readOnly={true}
            size={3}
            value={data.SDT}
            onChange={(value) => handleChange(1)}
          />
        </div>
        <div className="row py-2">
          <IFInputText
            title={"Địa chỉ"}
            valid={true}
            readOnly={true}
            size={7}
            onChange={(value) => handleChange(1)}
          />

          <IFInputText
            title={"Dị ứng"}
            valid={true}
            readOnly={true}
            size={5}
            onChange={(value) => handleChange(1)}
          />
        </div>

        <div className="row py-2">
          <IFInputText
            title={"Tiền sử bệnh"}
            valid={true}
            readOnly={true}
            size={12}
            onChange={(value) => handleChange(1)}
          />
        </div>
      </div>
    </div>
  );
}

export default ThongTinKhachHang;
