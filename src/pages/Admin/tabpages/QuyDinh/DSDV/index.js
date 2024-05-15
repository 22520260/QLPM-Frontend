import React, { useState, useEffect } from "react";
import {
  IFSearch,
  IFInputText,
  IFSelect,
} from "../../../../../component/Layout/TabLayout/InputForm";
import { ListFormDSDV } from "../../../../../component/Layout/TabLayout/ListForm";
import Pagination from "../../../../../component/Layout/TabLayout/Pagination";
import { usePaginationHandler } from "../../../../../utils/appUtils";
import { fetchAllDichVuAction } from "../../../../../redux/action/fetchDataAction/fetchAllDichVuAction";
import { fetchAllLoaiDichVuAction } from "../../../../../redux/action/fetchDataAction/fetchAllLoaiDichVuAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../../../../setup/axios";

function DSDV() {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services?.data) || [];
  console.log('services', services)
  const loaiDichVu = useSelector((state) => state.loaiDichVu?.data) || [];
  const isLoading = useSelector((state) => state.services?.isloading);
  const [limit, setLimit] = useState(5);
  const [displayServices, setDisplayServices] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const columns = [
    { title: "Mã DV", key: "MADV" },
    { title: "Mã loại DV", key: "MALOAIDV" },
    { title: "Loại dịch vụ", key: "TENLOAIDV" },
    { title: "Tên dịch vụ", key: "TENDV" },
    { title: "Giá tiền", key: "GIADV" },
  ];

  useEffect(() => {
    dispatch(fetchAllDichVuAction());
    dispatch(fetchAllLoaiDichVuAction());
  }, []);

  useEffect(() => {
    if (services) {
      let filteredServices = [...services];

      if (searchKeyword) {
        filteredServices = filteredServices.filter((data) =>
          data.TENDV.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }

      const calculatedTotalPages = Math.ceil(filteredServices.length / limit);
      setTotalPages(calculatedTotalPages);

      const startIdx = (page - 1) * limit;
      const endIdx = Math.min(startIdx + limit, filteredServices.length);
      const pageServices = filteredServices.slice(startIdx, endIdx);

      setDisplayServices(pageServices);
    }
  }, [services, page, limit, searchKeyword]);

  const handleIFSearchChange = (value) => {
    setSearchKeyword(value);
  };

  const handlePageChange = usePaginationHandler(setPage, page, totalPages);

  const defaultFormData = {
    maLDV: 0,
    tenDichVu: "",
    giaDichVu: "",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const defaultObjValidInput = {
    isValidMaLDV: true,
    isValidTenDV: true,
    isValidGiaDV: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleRegister = async (e) => {
    e.preventDefault();
    setObjValidInput(defaultObjValidInput);
    if (!formData.tenDichVu) {
      setObjValidInput({ ...defaultObjValidInput, isValidTenDV: false });
      toast.error("Chưa nhập tên dịch vụ");
      return;
    }
    if (!formData.maLDV || formData.maLDV === 0) {
      setObjValidInput({ ...defaultObjValidInput, isValidMaLDV: false });
      toast.error("Chưa chọn loại dịch vụ");
      return;
    }
    if (!formData.giaDichVu) {
      setObjValidInput({ ...defaultObjValidInput, isValidGiaDV: false });
      toast.error("Chưa nhập giá dịch vụ");
      return;
    }

    const response = await axios.post("/dichvu/insert", formData);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      setFormData(defaultFormData);
      dispatch(fetchAllDichVuAction());
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleCancel = () => {
    setFormData(defaultFormData);
  };

  return (
    <>
      <h4>Danh sách các dịch vụ</h4>
      <div className="row align-items-end">
        <IFSearch
          title={"Tìm kiếm theo tên dịch vụ"}
          size={5}
          onChange={handleIFSearchChange}
        />
        <div className="col col-md-7 d-flex justify-content-end">
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#addDichVu"
          >
            Thêm mới
          </button>
        </div>
      </div>

      <div
        className="modal fade modal-lg"
        id="addDichVu"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Thêm dịch vụ mới
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body ">
              <div className="container-fluid">
                <div className="row py-2">
                  <IFInputText
                    title={"Tên dịch vụ"}
                    size={9}
                    required={"true"}
                    value={formData.tenDichVu}
                    valid={objValidInput.isValidTenDV}
                    onChange={(value) => handleChange("tenDichVu", value)}
                  />
                </div>
                <div className="row py-2">
                  <IFSelect
                    id={"loaiDV"}
                    title={"Loại dịch vụ"}
                    size={7}
                    options={loaiDichVu}
                    keyObj={"MALOAIDV"}
                    showObj={"TENLOAIDV"}
                    value={formData.maLDV}
                    valid={objValidInput.isValidMaLDV}
                    onChange={(value) => handleChange("maLDV", value)}
                  />
                  <IFInputText
                    title={"Giá tiền"}
                    size={5}
                    value={formData.giaDichVu}
                    valid={objValidInput.isValidGiaDV}
                    onChange={(value) => handleChange("giaDichVu", value)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleCancel}
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleRegister}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-3">
        <ListFormDSDV
          columns={columns}
          data={displayServices}
          loading={isLoading}
        />
        <Pagination
          totalPages={totalPages}
          page={page}
          limit={limit}
          siblings={1}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default DSDV;
