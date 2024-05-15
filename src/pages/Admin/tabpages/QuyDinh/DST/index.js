import React, { useState, useEffect } from "react";
import {
  IFSearch,
  IFInputText,
  IFSelect,
} from "../../../../../component/Layout/TabLayout/InputForm";
import { ListFormDST } from "../../../../../component/Layout/TabLayout/ListForm";
import Pagination from "../../../../../component/Layout/TabLayout/Pagination";
import { usePaginationHandler } from "../../../../../utils/appUtils";
import { fetchAllThuocAction } from "../../../../../redux/action/fetchDataAction/fetchAllThuocAction";
import { fetchAllDVTAction } from "../../../../../redux/action/fetchDataAction/fetchAllDVTAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../../../../setup/axios";

function DST() {
  const dispatch = useDispatch();
  const thuoc = useSelector((state) => state.thuoc?.data) || [];
  console.log('thuoc', thuoc)
  const dvt = useSelector((state) => state.dvt?.data) || [];
  const isLoading = useSelector((state) => state.thuoc?.isloading);
  const [limit, setLimit] = useState(5);
  const [displayThuoc, setDisplayThuoc] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const columns = [
    { title: "Mã thuốc", key: "MATHUOC" },
    { title: "Đơn vị tính", key: "TENDONVI" },
    { title: "Tên thuốc", key: "TENTHUOC" },
    { title: "Thành phần", key: "THANHPHAN" },
  ];

  useEffect(() => {
    dispatch(fetchAllThuocAction());
    dispatch(fetchAllDVTAction());
  }, []);

  useEffect(() => {
    if (thuoc) {
      let filteredThuoc = [...thuoc];

      if (searchKeyword) {
        filteredThuoc = filteredThuoc.filter((data) =>
          data.TENTHUOC.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }

      const calculatedTotalPages = Math.ceil(filteredThuoc.length / limit);
      setTotalPages(calculatedTotalPages);

      const startIdx = (page - 1) * limit;
      const endIdx = Math.min(startIdx + limit, filteredThuoc.length);
      const pageThuoc = filteredThuoc.slice(startIdx, endIdx);

      setDisplayThuoc(pageThuoc);
    }
  }, [thuoc, page, limit, searchKeyword]);

  const handleIFSearchChange = (value) => {
    setSearchKeyword(value);
  };

  const handlePageChange = usePaginationHandler(setPage, page, totalPages);

  const defaultFormData = {
    maDVT: 0,
    tenThuoc: "",
    thanhPhan: "",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const defaultObjValidInput = {
    isValidMaDVT: true,
    isValidTenThuoc: true,
    isValidThanhPhan: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleRegister = async (e) => {
    e.preventDefault();
    setObjValidInput(defaultObjValidInput);
    if (!formData.maDVT || +formData.maDVT === 0) {
      setObjValidInput({ ...defaultObjValidInput, isValidMaDVT: false });
      toast.error("Chưa chọn đơn vị thuốc");
      return;
    }
    if (!formData.tenThuoc ) {
      setObjValidInput({ ...defaultObjValidInput, isValidTenThuoc: false });
      toast.error("Chưa nhập tên thuốc");
      return;
    }
    if (!formData.thanhPhan) {
      setObjValidInput({ ...defaultObjValidInput, isValidThanhPhan: false });
      toast.error("Chưa nhập thành phần thuốc");
      return;
    }

    const response = await axios.post("/thuoc/insert", formData);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      setFormData(defaultFormData);
      dispatch(fetchAllThuocAction());
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
      <h4>Danh sách các thuốc</h4>
      <div className="row align-items-end">
        <IFSearch
          title={"Tìm kiếm theo tên thuốc"}
          size={5}
          onChange={handleIFSearchChange}
        />
        <div className="col col-md-7 d-flex justify-content-end">
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#addThuoc"
          >
            Thêm mới
          </button>
        </div>
      </div>

      <div
        className="modal fade modal-lg"
        id="addThuoc"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Thêm thuốc mới
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
                    title={"Tên thuốc"}
                    size={9}
                    required={"true"}
                    value={formData.tenThuoc}
                    valid={objValidInput.isValidTenThuoc}
                    onChange={(value) => handleChange("tenThuoc", value)}
                  />
                </div>
                <div className="row py-2">
                  <IFSelect
                    id={"loaiDV"}
                    title={"Đơn vị thuốc"}
                    size={7}
                    options={dvt}
                    keyObj={"MADVT"}
                    showObj={"TENDONVI"}
                    value={formData.maDVT}
                    valid={objValidInput.isValidMaDVT}
                    onChange={(value) => handleChange("maDVT", value)}
                  />
                  <IFInputText
                    title={"Thành phần"}
                    size={5}
                    value={formData.thanhPhan}
                    valid={objValidInput.isValidThanhPhan}
                    onChange={(value) => handleChange("thanhPhan", value)}
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
        <ListFormDST
          columns={columns}
          data={displayThuoc}
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

export default DST;
