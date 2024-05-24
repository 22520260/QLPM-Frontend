import React, { useState, useEffect } from "react";
import {
  IFSearch,
  IFInputText,
} from "../../../../../component/Layout/TabLayout/InputForm";
import { ListFormDVT } from "../../../../../component/Layout/TabLayout/ListForm";
import Pagination from "../../../../../component/Layout/TabLayout/Pagination";
import { usePaginationHandler } from "../../../../../utils/appUtils";
import { fetchAllDVTAction } from "../../../../../redux/action/fetchDataAction/fetchAllDVTAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../../../../setup/axios";

function DVT() {
  const dispatch = useDispatch();
  const dvt = useSelector((state) => state.dvt?.data) || [];
  const isLoading = useSelector((state) => state.dvt?.isLoading);
  const [limit, setLimit] = useState(5);
  const [displayDVT, setDisplayDVT] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const columns = [
    { title: "Mã đơn vị", key: "MADVT" },
    { title: "Tên đơn vị", key: "TENDONVI" },
  ];

  useEffect(() => {
    dispatch(fetchAllDVTAction());
  }, []);

  useEffect(() => {
    if (dvt) {
      let filteredDVT = [...dvt];

      // Lọc theo từ khóa tìm kiếm
      if (searchKeyword) {
        filteredDVT = filteredDVT.filter((data) =>
          data.TENDONVI.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }

      const calculatedTotalPages = Math.ceil(filteredDVT.length / limit);
      setTotalPages(calculatedTotalPages);

      const startIdx = (page - 1) * limit;
      const endIdx = Math.min(startIdx + limit, filteredDVT.length);
      const pageDVT = filteredDVT.slice(startIdx, endIdx);

      setDisplayDVT(pageDVT);
    }
  }, [dvt, page, limit, searchKeyword]);

  const handleIFSearchChange = (value) => {
    setSearchKeyword(value);
  };

  const handlePageChange = usePaginationHandler(setPage, page, totalPages);

  const defaultFormData = {
    tenDVT: "",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const defaultObjValidInput = {
    isValidTenDVT: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleRegister = async (e) => {
    e.preventDefault();
    setObjValidInput(defaultObjValidInput);
    if (!formData.tenDVT) {
      setObjValidInput({ ...defaultObjValidInput, isValidTenDVT: false });
      toast.error("Chưa nhập tên đơn vị thuốc");
      return;
    }

    const response = await axios.post("/dvt/insert", formData);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      setFormData(defaultFormData);
      dispatch(fetchAllDVTAction())
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
      <h4>Danh sách các đơn vị thuốc</h4>
      <div className="row align-items-end">
        <IFSearch
          title={"Tìm kiếm theo tên đơn vị"}
          size={7}
          onChange={handleIFSearchChange}
        />
        <div className="col col-md-5 d-flex justify-content-end">
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#addDVT"
          >
            Thêm mới
          </button>
        </div>
      </div>

      <div
        className="modal fade "
        id="addDVT"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Thêm mới đơn vị thuốc
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
                    title={"Tên đơn vị"}
                    size={12}
                    required={"true"}
                    value={formData.tenDVT}
                    valid={objValidInput.isValidTenDVT}
                    onChange={(value) => handleChange("tenDVT", value)}
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
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleRegister}
              >
                Thêm mới
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-3">
        <ListFormDVT columns={columns} data={displayDVT} loading={isLoading} />
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

export default DVT;
