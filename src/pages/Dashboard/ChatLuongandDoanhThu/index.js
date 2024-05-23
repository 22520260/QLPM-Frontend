import ChatLuong from "../ChatLuong";
import DoanhThuLuotKhach from "../DoanhThuLuotKhach";
import { useState, useEffect } from "react";
import { IFSelect } from "../../../component/Layout/TabLayout/InputForm";

function ChatLuongandDoanhThu() {
  const d = new Date();
  const defaultYear = d.getFullYear().toString();
  const [year, setYear] = useState(defaultYear);

  return (
    <div className="shadow rounded pt-4">
      <h2 className="d-flex justify-content-center">
        Biểu Đồ Doanh Thu và Chất Lượng
      </h2>
      <div className="d-flex justify-content-center">
        <IFSelect
          title="Năm"
          size={1}
          options={[{ year: "2022" }, { year: "2023" }, { year: "2024" }]}
          def={"Chọn"}
          onChange={(value) => setYear(value === "Chọn" ? defaultYear : value)}
          value={year}
          keyObj="year"
          showObj={"year"}
        />
      </div>

      <div className="row">
        <div className="col col-md-6">
          <h4 className="d-flex justify-content-center">Biểu đồ chất lượng</h4>
          <ChatLuong year={year} />
        </div>
        <div className="col col-md-6">
          <h4 className="d-flex justify-content-center">Biểu đồ doanh thu</h4>
          <DoanhThuLuotKhach year={year} />
        </div>
      </div>
    </div>
  );
}

export default ChatLuongandDoanhThu;
