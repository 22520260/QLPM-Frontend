import React from "react";
import {
  IFInputText,
  IFSelect,
  IFNgay,
} from "../../../../component/Layout/TabLayout/InputForm";
import { useSelector } from "react-redux";
function ThongTinKham() {
  const doctors = useSelector((state) => state.fetchAllBacSi.doctors);

  const handleChange = (page) => {
    console.log(page);
  };

  return (
    <div className="shadow rounded">
      {/* Thông tin */}
      <div className="px-3 py-2 bg-primary rounded-top">Thông tin khám</div>
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
              title={"Lý do khám"}
              size={5}
              onChange={(value) => handleChange(1)}
            />
            <IFInputText
              title={"Phòng khám"}
              size={3}
              onChange={(value) => handleChange(1)}
            />
            <IFInputText
              title={"Bác sĩ khám"}
              size={4}
              onChange={(value) => handleChange(1)}
            />
          </div>
          <div className="row py-2">
            <IFInputText
              title={"Tiền sử bệnh"}
              size={6}
              onChange={(value) => handleChange(1)}
            />
            <IFInputText
              title={"Dị ứng"}
              size={6}
              onChange={(value) => handleChange(1)}
            />
          </div>
          <div className="row py-2">
            <IFInputText
              title={"Bệnh sử"}
              size={4}
              onChange={(value) => handleChange(1)}
            />
            <IFInputText
              title={"Khám lâm sàn"}
              size={4}
              onChange={(value) => handleChange(1)}
            />
            <IFInputText
              title={"Lời dặn"}
              size={4}
              onChange={(value) => handleChange(1)}
            />
          </div>
          <div className="px-3 py-2 bg-primary">Chỉ số sinh tồn</div>
          <div className="row py-2">
            <IFInputText
              title={"Huyết áp"}
              size={4}
              onChange={(value) => handleChange(1)}
            />
            <IFInputText
              title={"Chiều cao"}
              size={4}
              onChange={(value) => handleChange(1)}
            />
            <IFInputText
              title={"Cân nặng"}
              size={4}
              onChange={(value) => handleChange(1)}
            />
          </div>
        </div>
    </div>
  );
}

export default ThongTinKham;
