import React from "react";
import { useSelector } from "react-redux";
import { ListForm } from "../../../../component/Layout/TabLayout/ListForm";
function ThongTinKhachHang() {
  const doctors = useSelector((state) => state.fetchAllBacSi.doctors);

  const handleChange = (page) => {
    console.log(page);
  };

  const columns = [
    { title: "Mã dịch vụ", key: "0" },
    { title: "Tên dịch vụ", key: "2" },
    { title: "Giá dịch vụ", key: "3" },
  ];

  return (
    <div>
      {/* Thông tin */}
      <div className="px-3 py-2 d-flex justify-content-center bg-primary">
        Dịch vụ - Đơn thuốc
      </div>
      <br></br>
      <div className="py-3 border border-primary">
        <div className="container-fluid mb-">
          <div className="px-3 py-2 text-primary">Dịch vụ khám</div>
          <ListForm columns={columns} data={doctors}></ListForm>
        </div>
      </div>
      <br></br>
      <div className="py-3 border border-primary">
        <div className="container-fluid mb-">
          <div className="px-3 py-2 text-primary">Dịch vụ cận lâm sàn</div>
          <ListForm columns={columns} data={doctors}></ListForm>
        </div>
      </div>
      <br></br>
      <div className="py-3 border border-primary">
        <div className="container-fluid mb-">
          <div className="px-3 py-2 text-primary">Đơn thuốc</div>
          <ListForm columns={columns} data={doctors}></ListForm>
        </div>
      </div>
    </div>
  );
}

export default ThongTinKhachHang;
