import React, { useEffect, useState } from "react";
import {
  IFInputText,
  IFSelect,
  IFNgay,
  IFSearchDV,
  IFSearchHT,
  IFSearch,
} from "../../../../component/Layout/TabLayout/InputForm";
import axios from "../../../../setup/axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBacSiAction } from "../../../../redux/action/fetchDataAction/fetchAllBacSiAction";
import { fetchAllDichVuAction } from "../../../../redux/action/fetchDataAction/fetchAllDichVuAction";
import { fetchAllBenhNhanAction } from "../../../../redux/action/fetchDataAction/fetchAllBenhNhanAction";
import { toast } from "react-toastify";
import { ListFormDV } from "../../../../component/Layout/TabLayout/ListForm";
import { MdError } from "react-icons/md";
import socket from "../../../../setup/socket";

function DangKyKham() {
  const dispatch = useDispatch();

  const services = useSelector((state) => state.services?.data) || [];

  const patients = useSelector((state) => state.fetchAllBenhNhan?.data) || [];
  const doctors = useSelector((state) => state.fetchAllBacSi?.data) || [];
  const leTan = useSelector((state) => state.auth?.user) || {};

  const [showError, setShowError] = useState(false);
  const [oldPatientID, setOldPatientID] = useState(0);

  const [age, setAge] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);

  const formDataDefault = {
    hoTen: "",
    email: "",
    gioiTinh: 0,
    diaChi: "",
    ngaySinh: null,
    cccd: "",
    soDienThoai: "",
    diUng: "",
    ngayKham: new Date(),
    maBS: "",
    lyDoKham: "",
    tienSuBenh: "",
    dichVu: [],
  };

  const [formData, setFormData] = useState(formDataDefault);

  const defaultObjValidInput = {
    isValidHoTen: true,
    isValidEmail: true,
    isValidCCCD: true,
    isValidBacSiKham: true,
    isValidDichVu: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const columns = [
    { title: "Mã dịch vụ", key: "MADV" },
    { title: "Loại dịch vụ", key: "TENLOAIDV" },
    { title: "Tên dịch vụ", key: "TENDV" },
    { title: "Giá dịch vụ", key: "GIADV" },
  ];

  useEffect(() => {
    dispatch(fetchAllDichVuAction());
    dispatch(fetchAllBenhNhanAction());
    dispatch(fetchAllBacSiAction());
  }, []);

  const checkPatientExistence = (fullName) => {
    const patient = patients.find((patient) => patient.HOTEN === fullName);
    return patient ? patient : null;
  };

  const handleChange = (fieldName, value) => {
    if (fieldName === "hoTen") {
      const patient = checkPatientExistence(value);
      if (patient) {
        setFormData({
          ...formDataDefault,
          hoTen: patient.HOTEN,
          email: patient.EMAIL,
          gioiTinh: patient.GIOITINH,
          diaChi: patient.DIACHI,
          ngaySinh: new Date(patient.NGAYSINH),
          cccd: patient.CCCD,
          soDienThoai: patient.SDT,
          diUng: patient.DIUNG,
          tienSuBenh: patient.TIENSUBENH,
        });
        setOldPatientID(patient.MABN);

        const age = calculateAge(patient.NGAYSINH);
        setAge(age);
      } else {
        setFormData({ ...formDataDefault, [fieldName]: value });
        setAge("");
        setOldPatientID(0);
      }
    } else {
      setFormData({ ...formData, [fieldName]: value });
      if (fieldName === "ngaySinh") {
        const age = calculateAge(value);
        setAge(age);
      }
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

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const insertPK = async (maBN, maHD) => {
    // với mỗi dịch vụ thì gọi 1 api tạo phiếu khám cho DV đó
    formData.dichVu.forEach(async (maDV) => {
      let bodyReq = formData;
      bodyReq.dichVu = maDV;
      bodyReq["maBN"] = maBN;
      bodyReq["maHD"] = maHD;
      try {
        const response = await axios.post("/phieukham/insert-just-pk", bodyReq);
        if (response.status === 200) {
          toast.success("Thêm phiếu khám thành công!!!");
          socket.emit("send-message", { actionName: "DSDK" });
          socket.emit("send-message", { actionName: "LSKBYIDBN", maID: maBN });

        }
      } catch (error) {
        toast.error("Thêm phiếu khám không thành công");
      }
    });
  };

  const handleFormSubmit = async () => {
    setObjValidInput(defaultObjValidInput);
    if (selectedServices.length > 0) {
      if (formData.hoTen === "") {
        setObjValidInput({ ...defaultObjValidInput, isValidHoTen: false });
        toast.error("Chưa nhập họ tên");
        return;
      }
      if (formData.email === "") {
        setObjValidInput({ ...defaultObjValidInput, isValidEmail: false });
        toast.error("Chưa nhập email");
        return;
      }
      if (!formData.cccd) {
        setObjValidInput({ ...defaultObjValidInput, isValidCCCD: false });
        toast.error("Chưa nhập CCCD");
        return;
      }
      if (!formData.maBS || +formData.maBS === 0) {
        setObjValidInput({ ...defaultObjValidInput, isValidBacSiKham: false });
        toast.error("Chưa chọn bác sĩ khám");
        return;
      }
      let maHDinserted = "";
      // thêm hóa đơn mới
      try {
        const response1 = await axios.post("/hoadon/insert", {
          maLT: leTan?.account?.userInfo[0]?.MALT,
          maLHD: 1,
          tttt: "Chưa thanh toán",
        });
        if (response1.status === 200) {
          maHDinserted = response1.data.MAHD;
          toast.success("Thêm hóa đơn thành công!!!");
        }
      } catch (error) {
        console.log(error);
        toast.error("Thêm hóa đơn không thành công");
      }
      // nếu là bệnh nhân mới thì thêm hồ sơ bệnh nhân trước
      if (oldPatientID === 0) {
        let maBNinserted = "";
        try {
          const response2 = await axios.post("/benhnhan/insert", formData);
          if (response2.status === 200) {
            maBNinserted = response2.data.MABN;
            toast.success("Thêm bệnh nhân thành công!!!");
            socket.emit("send-message", { actionName: "DSBN" });
            await insertPK(maBNinserted, maHDinserted);
          }
        } catch (error) {
          console.log(error);
          toast.error("Thêm bệnh nhân không thành công");
        }
      } else {
        await insertPK(oldPatientID, maHDinserted);
      }
      // chờ 1 giây đề các api call thực hiện xong rồi mới load lại trang
      await timeout(1000);
      setFormData(formDataDefault);
      setSelectedServices([]);
      setAge(null);
      // window.location.reload();
    } else {
      setObjValidInput({ ...defaultObjValidInput, isValidDichVu: false });
      toast.error("Chưa thêm dịch vụ nào.");
    }
  };

  const handleAddService = (selected, e) => {
    if (selected) {
      const updatedServices = [...selectedServices, selected];
      const selectedNoServices = updatedServices.map(
        (selectedService) => selectedService.MADV
      );
      setSelectedServices(updatedServices);
      setFormData({ ...formData, dichVu: selectedNoServices });
    }
    e.target.value = "";
  };

  const handleDeleteService = (index) => {
    const updatedServices = [...selectedServices];
    updatedServices.splice(index, 1);
    setSelectedServices(updatedServices);
    const selectedNoServices = updatedServices.map(
      (selectedService) => selectedService.MADV
    );
    setFormData({ ...formData, dichVu: selectedNoServices });
  };

  return (
    <div>
      <form class="needs-validation" novalidate>
        {/* Thông tin */}
        <div className="px-3 py-2 bg-primary">Thông tin</div>
        <div className="py-3">
          <div className="container-fluid mb-">
            <div className="row py-2">
              <IFSearchHT
                title={"Họ và Tên"}
                valid={objValidInput.isValidHoTen}
                value={formData.hoTen}
                size={3}
                options={patients}
                required={true}
                onChange={(value) => handleChange("hoTen", value)}
              />
              <IFInputText
                title={"Email"}
                valid={objValidInput.isValidEmail}
                value={formData.email}
                size={3}
                required={true}
                onChange={(value) => handleChange("email", value)}
              />
              <IFSelect
                title={"Giới tính"}
                size={2}
                keyObj={"gioiTinh"}
                showObj={"gioiTinh"}
                options={[
                  { gioiTinh: "Nam" },
                  { gioiTinh: "Nữ" },
                  { gioiTinh: "Khác" },
                ]}
                onChange={(value) => handleChange("gioiTinh", value)}
                value={formData.gioiTinh}
              />
              <IFInputText
                title={"Địa chỉ"}
                size={4}
                valid={true}
                onChange={(value) => handleChange("diaChi", value)}
                value={formData.diaChi}
              />
            </div>
            <div className="row py-2">
              <IFNgay
                title={"Ngày sinh"}
                size={2}
                onChange={(value) => handleChange("ngaySinh", value)}
                value={formData.ngaySinh}
              />
              <IFInputText
                title={"Tuổi"}
                size={1}
                value={age}
                readOnly={true}
              />
              <IFInputText
                title={"CCCD"}
                valid={objValidInput.isValidCCCD}
                size={3}
                onChange={(value) => handleChange("cccd", value)}
                required={true}
                value={formData.cccd}
              />
              <IFInputText
                title={"Số điện thoại"}
                size={3}
                valid={true}
                onChange={(value) => handleChange("soDienThoai", value)}
                value={formData.soDienThoai}
              />
              <IFInputText
                title={"Dị ứng"}
                size={3}
                valid={true}
                onChange={(value) => handleChange("diUng", value)}
                value={formData.diUng}
              />
            </div>
            <div className="row py-2">
              <IFNgay
                title={"Ngày khám"}
                size={2}
                onChange={(value) => handleChange("ngayKham", value)}
                defaultValue={new Date()}
              />
              <IFSelect
                title={"Bác sĩ"}
                size={3}
                required={true}
                valid={objValidInput.isValidBacSiKham}
                value={formData.maBS}
                options={doctors}
                onChange={(value) => {
                  handleChange("maBS", value);
                }}
                keyObj={"MABS"}
                showObj={"HOTEN"}
              />
              <IFInputText
                title={"Lý do khám"}
                size={4}
                valid={true}
                value={formData.lyDoKham}
                onChange={(value) => handleChange("lyDoKham", value)}
              />
              <IFInputText
                title={"Tiền sử bệnh"}
                size={3}
                valid={true}
                value={formData.tienSuBenh}
                onChange={(value) => handleChange("tienSuBenh", value)}
              />
            </div>
          </div>
        </div>

        {/* Dịch vụ */}
        <div className="px-3 py-2 bg-primary">Dịch vụ</div>
        <div className="py-3 border">
          <div className="container-fluid mb-3">
            <div className="row py-2">
              <IFSearchDV
                title={"Nhập dịch vụ"}
                valid={objValidInput.isValidDichVu}
                size={6}
                options={services.filter(
                  (service) =>
                    service.MALOAIDV === 100 || service.MALOAIDV === 102
                )}
                onChange={(e) => {
                  const value = e.target.value;
                  const selected = services.find(
                    (service) => service.TENDV === value
                  );
                  if (selected) {
                    const alreadySelected = selectedServices.find(
                      (item) => item.MADV === selected.MADV
                    );

                    if (alreadySelected) {
                      setShowError(true);
                      e.target.value = "";
                    } else {
                      setShowError(false);
                      handleAddService(selected, e);
                    }
                  }
                }}
              />
              {showError && selectedServices.length > 0 && (
                <div className="text-danger">
                  <MdError />
                  <span> Dịch vụ này đã được chọn.</span>
                </div>
              )}
            </div>
            {selectedServices.length > 0 ? (
              <ListFormDV
                columns={columns}
                data={selectedServices}
                handleDelete={handleDeleteService}
              />
            ) : (
              <div className="d-flex justify-content-center text-danger">
                Chưa thêm dịch vụ nào.
              </div>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-center px-3 py-2">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleFormSubmit}
          >
            Đăng kí
          </button>
        </div>
      </form>
    </div>
  );
}

export default DangKyKham;
