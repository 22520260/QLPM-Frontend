import React, { useEffect, useState } from "react";
import {
  IFSearchDV,
  IFSelect,
} from "../../../../component/Layout/TabLayout/InputForm";
import axios from "../../../../setup/axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBacSiAction } from "../../../../redux/action/fetchDataAction/fetchAllBacSiAction";
import { fetchAllDichVuAction } from "../../../../redux/action/fetchDataAction/fetchAllDichVuAction";
import { fetchDsClsByIdAction } from "../../../../redux/action/fetchDataAction/fetchCLSAction";
import { fetchDSDKAction } from "../../../../redux/action/fetchDataAction/fetchDSDKAction";
import { toast } from "react-toastify";
import { ListFormDV } from "../../../../component/Layout/TabLayout/ListForm";

function DichVu() {
  const dispatch = useDispatch();

  const selectedPK =
    useSelector((state) => state.selectedRow?.selectedRow) || {};
  const existedDsCls = useSelector((state) => state.fetchCLS?.dsClsById) || [];
  const services = useSelector((state) => state.services?.data) || [];
  const doctors = useSelector((state) => state.fetchAllBacSi?.data) || [];
  const leTan = useSelector((state) => state.auth?.user) || {};

  const [selectedBS, setSelectedBS] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  const defaultObjValidInput = {
    isValidHoTen: true,
    isValidCCCD: true,
    isValidDichVu: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);
  const [showError, setShowError] = useState(false);

  const columns = [
    { title: "Mã dịch vụ", key: "MADV" },
    { title: "Tên loại dịch vụ", key: "TENLOAIDV" },
    { title: "Tên dịch vụ", key: "TENDV" },
    { title: "Giá dịch vụ", key: "GIADV" },
    { title: "Bác sĩ thực hiện", key: "HOTEN" },
  ];

  useEffect(() => {
    dispatch(fetchAllDichVuAction());
    dispatch(fetchAllBacSiAction());
  }, []);

  const handleChangeBS = (maBS) => {
    const selectedDoctor = doctors.filter((doctor) => doctor.MABS == maBS);
    setSelectedBS(selectedDoctor[0]);
  };
  const handleChangeService = (service) => {
    setSelectedService(service);
  };

  const insertCLS = async (MAPK, MAHD) => {
    const flag = await selectedServices.map(async (service) => {
      try {
        const response = await axios.post("/cls/insert-just-cls", {
          ...service,
          MAPK,
          MAHD,
        });
        if (response.status === 200) {
          toast.success("Thêm chỉ định CLS thành công");
          return true;
        }
      } catch (error) {
        console.log(error);
        toast.error("Thêm chỉ định CLS không thành công");
      }
    });

    if (flag && flag.length !== 0) {
      for (const isComplete of flag) {
        if (isComplete === false) {
          return false;
        }
      }
      return true;
    }
  };

  const handleFormSubmit = async () => {
    setObjValidInput(defaultObjValidInput);
    if (selectedServices.length > 0) {
      let maHDinserted = "";
      // thêm hóa đơn mới
      try {
        const response1 = await axios.post("/hoadon/insert", {
          maLT: leTan.account.userInfo[0].MALT,
          maLHD: 2,
          tttt: "Chưa thanh toán",
        });
        if (response1.status === 200) {
          maHDinserted = response1.data.MAHD;
          toast.success("Thêm hóa đơn thành công!!!");
          const isComplete = await insertCLS(selectedPK?.MAPK, maHDinserted);
          if (isComplete) {
            dispatch(fetchDsClsByIdAction(selectedPK.MAPK));
            dispatch(fetchDSDKAction());
            setSelectedServices([]);
          }
        }
      } catch (error) {
        console.log(error);
        alert("Thêm hóa đơn không thành công");
      }
    } else {
      setObjValidInput({ ...defaultObjValidInput, isValidDichVu: false });
      toast.error("Chưa thêm dịch vụ nào.");
    }
  };

  const handleAddService = () => {
    if (!selectedService) {
      toast.error("Chưa chọn Dịch vụ");
    }
    if (!selectedBS) {
      toast.error("Chưa chọn Bác sĩ");
    }
    if (selectedService && selectedBS) {
      const updatedServices = [
        ...selectedServices,
        { ...selectedService, ...selectedBS },
      ];
      setSelectedServices(updatedServices);
      setSelectedService(null);
      setSelectedBS(null);
    }
  };

  const handleDeleteService = (index) => {
    const updatedServices = [...selectedServices];
    updatedServices.splice(index, 1);
    setSelectedServices(updatedServices);
  };
  const [resetKey, setResetKey] = useState(Date.now);

  const handleCancel = () => {
    setResetKey(Date.now());
  };

  return (
    <div className="shadow rounded" key={resetKey}>
      {/* Thông tin */}
      <div className="px-3 py-2 bg-primary rounded-top">Chọn dịch vụ</div>
      <div className="container-fluid mb-2 py-2">
        <div className="container-fluid mb-3">
          <div className="row py-2">
            <IFSearchDV
              title={"Nhập dịch vụ"}
              valid={objValidInput.isValidDichVu}
              size={6}
              options={services.filter((service) => service.MALOAIDV === 101)}
              value={selectedService ? selectedService.TENDV : ""}
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
                  } else {
                    setShowError(false);
                    handleChangeService(selected);
                  }
                }
              }}
            />
            <IFSelect
              title={"Bác sĩ"}
              size={3}
              options={doctors}
              value={selectedBS ? selectedBS.MABS : ""}
              onChange={(value) => handleChangeBS(value)}
              keyObj={"MABS"}
              showObj={"HOTEN"}
            />
            <div className="col-md-3 d-flex align-items-end">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleAddService}
              >
                Thêm dịch vụ
              </button>
            </div>
            {showError && selectedServices.length > 0 && (
              <div className="text-danger">Dịch vụ này đã được chọn.</div>
            )}
          </div>

          {selectedServices.length > 0 || existedDsCls.length > 0 ? (
            <ListFormDV
              columns={columns}
              data={existedDsCls.length > 0 ? existedDsCls : selectedServices}
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
          className="btn btn-primary ms-auto mx-4 col-auto"
          type="button"
          onClick={handleFormSubmit}
        >
          Chỉ định
        </button>
        <button
          type="button"
          className="btn btn-secondary me-4 col-auto"
          onClick={handleCancel}
          data-bs-dismiss="modal"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}

export default DichVu;
