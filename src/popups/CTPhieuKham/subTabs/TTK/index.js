import React from "react";
import {
  IFInputText,
  TextArea,
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
      <div className="container-fluid mb-2 py-2">
        <div className="row py-2">
          <IFInputText
            title={"Trạng thái"}
            size={3}
            onChange={(value) => handleChange(1)}
          />
          <IFInputText
            title={"Ngày khám"}
            size={3}
            onChange={(value) => handleChange(1)}
          />
          <IFInputText
            title={"Dịch vụ khám"}
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
          <TextArea
            title={"Bệnh sử"}
            size={4}
            onChange={(value) => handleChange(1)}
          />
          <TextArea
            title={"Khám lâm sàn"}
            size={4}
            onChange={(value) => handleChange(1)}
          />
          <TextArea
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
