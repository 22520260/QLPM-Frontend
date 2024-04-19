import React, { useEffect, useState } from "react";
import {
  IFInputText,
  IFSelect,
  IFNgay,
  IFSearch,
} from "../../../../component/Layout/TabLayout/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { submitData } from "../../../../redux/action/postDataAction";
import { fetchData } from "../../../../redux/action/getDataAction";
import { extractNames } from "../../../../utils/appUtils";

function DangKyKham() {
  const dispatch = useDispatch();
  const responseMessage = useSelector((state) => state.postData.status);
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
    dichVu: "",
  });
  const [age, setAge] = useState("");
  const doctors = useSelector(state => state.getData.data);

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });

    if (fieldName === "ngaySinh") {
      const age = calculateAge(value);
      setAge(age);
    }
  };

  const namesDoctor = extractNames(doctors);
  console.log(formData)

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

    return age;
  };

  useEffect(() => {
    dispatch(fetchData("http://localhost:3001/tiepdon"));
  }, []);


  const handleFormSubmit = () => {
    dispatch(
      submitData({
        url: "http://localhost:3001/customer/store",
        formData: formData,
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
              size={1}
              option={["Nam", "Nữ", "Khác"]}
              onChange={(value) => handleChange("gioiTinh", value)}
            />
            <IFInputText
              title={"Địa chỉ"}
              size={7}
              onChange={(value) => handleChange("diaChi", value)}
            />
          </div>
          <div className="row py-2">
            <IFNgay
              title={"Ngày sinh"}
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
              onChange={(value) => handleChange("ngayKham", value)}
            />
            <IFSelect
              title={"Bác sĩ"}
              size={3}
              option={namesDoctor}
              onChange={(value) => handleChange("bacSi", value)}
            />
            <IFInputText
              title={"Lý do khám"}
              size={4}
              onChange={(value) => handleChange("lyDoKham", value)}
            />
            <IFInputText
              title={"Chú thích (nếu có)"}
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
            <IFSearch
              title={"Nhập dịch vụ"}
              size={6}
              options={namesDoctor}
              onChange={(value) => {
                handleChange("dichVu", value);
              }}
            />
          </div>
        </div>
      </div>


      <div className="px-3 py-2 bg-primary">
        <button onClick={handleFormSubmit}>Create</button>
      </div>
    </div>
  );
}

export default DangKyKham;
