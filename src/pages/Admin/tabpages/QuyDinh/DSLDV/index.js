import React, { useState, useEffect } from "react";
import {
  IFSearch,
  IFInputText,
  IFNgay,
} from "../../../../../component/Layout/TabLayout/InputForm";
import { ListFormDSLDV } from "../../../../../component/Layout/TabLayout/ListForm";
import Pagination from "../../../../../component/Layout/TabLayout/Pagination";
import { usePaginationHandler } from "../../../../../utils/appUtils";
import { fetchAllBenhAction } from "../../../../../redux/action/fetchDataAction/fetchAllBenhAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from '../../../../../setup/axios'
import { fetchAllLoaiDichVuAction } from "../../../../../redux/action/fetchDataAction/fetchAllLoaiDichVuAction";

function DSLDV() {
  const dispatch = useDispatch();
  const dsLDV = useSelector((state) => state.loaiDichVu?.data) || [];
  const isLoading = useSelector((state) => state.loaiDichVu?.isLoading);
  const [limit, setLimit] = useState(5);
  const [displayLDV, setDisplayLDV] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const columns = [
    { title: "Mã loại dịch vụ", key: "MALOAIDV" },
    { title: "Tên loại dịch vụ", key: "TENLOAIDV" },
  ];

  useEffect(() => {
    dispatch(fetchAllLoaiDichVuAction());
  }, []);

  useEffect(() => {
    if (dsLDV) {
      let filteredDSLDV = [...dsLDV];

      // Lọc theo từ khóa tìm kiếm
      if (searchKeyword) {
        filteredDSLDV = filteredDSLDV.filter((data) =>
          data.TENLOAIDV.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }

      const calculatedTotalPages = Math.ceil(filteredDSLDV.length / limit);
      setTotalPages(calculatedTotalPages);

      const startIdx = (page - 1) * limit;
      const endIdx = Math.min(startIdx + limit, filteredDSLDV.length);
      const pageLDV = filteredDSLDV.slice(startIdx, endIdx);

      setDisplayLDV(pageLDV);
    }
  }, [dsLDV, page, limit, searchKeyword]);

  const handleIFSearchChange = (value) => {
    setSearchKeyword(value);
  };

  const handlePageChange = usePaginationHandler(setPage, page, totalPages);

  const defaultFormData = {
    tenLDV: "",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const defaultObjValidInput = {
    isValidTenLDV: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleRegister = async (e) => {
    e.preventDefault();
    setObjValidInput(defaultObjValidInput);
    if (!formData.tenLDV) {
      setObjValidInput({ ...defaultObjValidInput, isValidTenLDV: false });
      toast.error("Chưa nhập tên loại dịch vụ");
      return;
    }

    const response = await axios.post("/ldv/insert", formData);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      setFormData(defaultFormData);
      dispatch(fetchAllLoaiDichVuAction());
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
      <h4>Danh sách các loại bệnh</h4>
      <div className="row align-items-end">
        <IFSearch
          title={"Tìm kiếm theo tên loại dịch vụ"}
          size={7}
          onChange={handleIFSearchChange}
        />
        <div className="col col-md-5 d-flex justify-content-end">
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#addLDV"
          >
            Thêm mới
          </button>
        </div>
      </div>

      <div
        className="modal fade "
        id="addLDV"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Thêm mới loại dịch vụ
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
                    title={"Tên loại dịch vụ"}
                    size={12}
                    required={"true"}
                    value={formData.tenLDV}
                    onChange={(value) => handleChange("tenLDV", value)}
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
        <ListFormDSLDV columns={columns} data={displayLDV} loading={isLoading} />
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

export default DSLDV;
