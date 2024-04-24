import React, { useEffect, useState } from "react";
import {
  IFInputText,
  IFSelect,
  IFNgay,
  IFSearchDV,
} from "../../../../component/Layout/TabLayout/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { submitData } from "../../../../redux/action/postDataAction";
import { fetchAllBacSiAction } from "../../../../redux/action/fetchDataAction/fetchAllBacSiAction";
import { fetchAllDichVuAction } from "../../../../redux/action/fetchDataAction/fetchAllDichVuAction";
import { fetchAllBenhNhanAction } from "../../../../redux/action/fetchDataAction/fetchAllBenhNhanAction";
import { extractNames } from "../../../../utils/appUtils";
import { ListForm } from "../../../../component/Layout/TabLayout/ListForm";

function DangKyKham() {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.fetchAllBacSi.doctors);
  const services = useSelector((state) => state.fetchAllDichVu.services);
  const patients = useSelector((state) => state.fetchAllBenhNhan.patients);

  const [age, setAge] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);

  const [formData, setFormData] = useState({
    hoTen: "",
    gioiTinh: "",
    diaChi: "",
    ngaySinh: "",
    cccd: "",
    soDienThoai: "",
    diUng: "",
    ngayKham: "",
    bacSi: "",
    lyDoKham: "",
    chuThich: "",
    dichVu: [],
  });

  const columns = [
    { title: "Mã dịch vụ", key: "0" },
    { title: "Tên dịch vụ", key: "2" },
    { title: "Giá dịch vụ", key: "3" },
  ];

  useEffect(() => {
    dispatch(fetchAllBacSiAction());
    dispatch(fetchAllDichVuAction());
    dispatch(fetchAllBenhNhanAction());
  }, []);

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });

    if (fieldName === "ngaySinh") {
      const age = calculateAge(value);
      setAge(age);
    }
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

  // hàm này phải dùng để insert hồ sơ bệnh nhân lẫn phiếu khám, chưa làm
  const handleFormSubmit = () => {
    dispatch(
      submitData({
        url: "http://localhost:3001/patient/store",
        formData: formData,
      })
    );
  };

  const handleAddService = (selectedService) => {
    if (selectedService) {
      const updatedServices = [...selectedServices, selectedService];
      setSelectedServices(updatedServices);
      setFormData({ ...formData, dichVu: updatedServices });
    }
  };

  const handleDeleteService = (index) => {
    const updatedServices = [...selectedServices];
    updatedServices.splice(index, 1);
    setSelectedServices(updatedServices);
    setFormData({ ...formData, dichVu: updatedServices });
  };

  // Cái này dùng để insert phiếu khám cho các bệnh nhân đã từng khám
  // tức là chỉ insert phiếu khám thôi, maBN, maBS, maDV lấy từ lựa chọn trên UI
  const handleJustPKSubmit = () => {
    const pkFormData = {
      maBN: patients[0][0],
      maBS: doctors[0][0],
      maDV: services[0][0],
      maPhong: 999,
      ngayKham: formData.ngayKham,
      lyDoKham: formData.lyDoKham,
      STT: 999,
      trangThai: "Chưa thực hiện",
    };
    dispatch(
      submitData({
        url: "http://localhost:3001/phieukham/insert-pk",
        formData: pkFormData,
      })
    );
  };

  return (
    <div>
      {/* Thông tin */}
      <div className="px-3 py-2 bg-primary">Thông tin</div>
      <div className="py-3 border border-primary">
        <div className="container-fluid mb-">
          <div className="row py-2">
            <IFInputText
              title={"Họ và Tên"}
              size={4}
              onChange={(value) => handleChange("hoTen", value)}
            />
            <IFSelect
              title={"Giới tính"}
              size={2}
              option={["Nam", "Nữ", "Khác"]}
              onChange={(value) => handleChange("gioiTinh", value)}
            />
            <IFInputText
              title={"Địa chỉ"}
              size={6}
              onChange={(value) => handleChange("diaChi", value)}
            />
          </div>
          <div className="row py-2">
            <IFNgay
              title={"Ngày sinh"}
              size={2}
              onChange={(value) => handleChange("ngaySinh", value)}
            />
            <IFInputText
              title={"Tuổi"}
              size={1}
              value={age}
              readOnly={true}
              onChange={(value) => handleChange("tuoi", value)}
            />
            <IFInputText
              title={"CCCD"}
              size={3}
              onChange={(value) => handleChange("cccd", value)}
            />
            <IFInputText
              title={"Số điện thoại"}
              size={3}
              onChange={(value) => handleChange("soDienThoai", value)}
            />
            <IFInputText
              title={"Dị ứng"}
              size={3}
              onChange={(value) => handleChange("diUng", value)}
            />
          </div>
          <div className="row py-2">
            <IFNgay
              title={"Ngày khám"}
              size={2}
              onChange={(value) => handleChange("ngayKham", value)}
            />
            <IFSelect
              title={"Bác sĩ"}
              size={3}
              option={doctors}
              indexName={3}
              onChange={(value) => handleChange("bacSi", value)}
            />
            <IFInputText
              title={"Lý do khám"}
              size={4}
              onChange={(value) => handleChange("lyDoKham", value)}
            />
            <IFInputText
              title={"Tiền sử bệnh"}
              size={3}
              onChange={(value) => handleChange("chuThich", value)}
            />
          </div>
        </div>
      </div>

      {/* Dịch vụ */}
      <div className="px-3 py-2 bg-primary">Dịch vụ</div>
      <div className="py-3 border border-primary">
        <div className="container-fluid mb-3">
          <div className="row py-2">
            <IFSearchDV
              title={"Nhập dịch vụ"}
              size={6}
              options={services}
              onChange={(value) => {
                const selected = services.find(
                  (service) => service[2] === value
                );
                handleAddService(selected);
              }}
            />
          </div>
          {selectedServices.length > 0 ? (
            <ListForm
              columns={columns}
              data={selectedServices}
              onDeleteService={handleDeleteService}
            />
          ) : (
            <div className="d-flex justify-content-center">
              Chưa thêm dịch vụ nào.
            </div>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-center px-3 py-2">
        <button className="btn btn-primary" onClick={handleFormSubmit}>
          Đăng kí
        </button>
      </div>
    </div>
  );
}

export default DangKyKham;
