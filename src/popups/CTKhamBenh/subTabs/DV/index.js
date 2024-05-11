import React, { useEffect, useState } from "react";
import { IFSearchDV } from "../../../../component/Layout/TabLayout/InputForm";
import axios from "../../../../setup/axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBacSiAction } from "../../../../redux/action/fetchDataAction/fetchAllBacSiAction";
import { fetchAllDichVuAction } from "../../../../redux/action/fetchDataAction/fetchAllDichVuAction";
import { fetchAllBenhNhanAction } from "../../../../redux/action/fetchDataAction/fetchAllBenhNhanAction";
import { toast } from "react-toastify";
import { ListForm } from "../../../../component/Layout/TabLayout/ListForm";

function DichVu() {
  const dispatch = useDispatch();

  const services = useSelector((state) => state.services?.data) || [];

  const [showError, setShowError] = useState(false);

  const [selectedServices, setSelectedServices] = useState([]);

  const defaultObjValidInput = {
    isValidHoTen: true,
    isValidCCCD: true,
    isValidDichVu: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const columns = [
    { title: "Mã dịch vụ", key: "MADV" },
    { title: "Tên loại dịch vụ", key: "TENLOAIDV" },
    { title: "Tên dịch vụ", key: "TENDV" },
    { title: "Giá dịch vụ", key: "GIADV" },
  ];

  useEffect(() => {
    dispatch(fetchAllDichVuAction());
  }, []);

  const insertPK = async (maBN, maHD) => {};

  const handleFormSubmit = async () => {
    setObjValidInput(defaultObjValidInput);
    if (selectedServices.length > 0) {
      let maHDinserted = "";
      // thêm hóa đơn mới
      try {
        const response1 = await axios.post("/hoadon/insert", {
          maLT: 1,
          maLHD: 1,
          tttt: "Chưa thanh toán",
        });
        if (response1.status === 200) {
          maHDinserted = response1.data.MAHD;
          alert("Thêm hóa đơn thành công!!!");
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

  const handleAddService = (selected, e) => {
    if (selected) {
      const updatedServices = [...selectedServices, selected];
      const selectedNoServices = updatedServices.map(
        (selectedService) => selectedService.MADV
      );
      setSelectedServices(updatedServices);
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
  };
  return (
    <div className="shadow rounded">
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
                    handleAddService(selected, e);
                  }
                }
              }}
            />
            {showError && selectedServices.length > 0 && (
              <div className="text-danger">Dịch vụ này đã được chọn.</div>
            )}
          </div>
          {selectedServices.length > 0 ? (
            <ListForm
              columns={columns}
              data={selectedServices}
              onDeleteService={handleDeleteService}
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
          Chỉ định
        </button>
      </div>
    </div>
  );
}

export default DichVu;
