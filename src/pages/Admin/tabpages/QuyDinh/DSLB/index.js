import React, { useState, useEffect } from "react";
import {
  IFSearch,
  IFInputText,
  IFNgay,
} from "../../../../../component/Layout/TabLayout/InputForm";
import { ListFormDSLB } from "../../../../../component/Layout/TabLayout/ListForm";
import Pagination from "../../../../../component/Layout/TabLayout/Pagination";
import { usePaginationHandler } from "../../../../../utils/appUtils";
import { fetchAllBenhAction } from "../../../../../redux/action/fetchDataAction/fetchAllBenhAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from '../../../../../setup/axios'

function DSLB() {
  const dispatch = useDispatch();
  const dsBenh = useSelector((state) => state.benh?.data) || [];
  const isLoading = useSelector((state) => state.benh?.isLoading);
  const [limit, setLimit] = useState(5);
  const [displayDSB, setDisplayDSB] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const columns = [
    { title: "Mã bệnh", key: "MABENH" },
    { title: "Mã ICD", key: "MAICD" },
    { title: "Tên bệnh", key: "TENBENH" },
  ];

  useEffect(() => {
    dispatch(fetchAllBenhAction());
  }, []);

  useEffect(() => {
    if (dsBenh) {
      let filteredDSB = [...dsBenh];

      // Lọc theo từ khóa tìm kiếm
      if (searchKeyword) {
        filteredDSB = filteredDSB.filter((data) =>
          data.TENBENH.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }

      const calculatedTotalPages = Math.ceil(filteredDSB.length / limit);
      setTotalPages(calculatedTotalPages);

      const startIdx = (page - 1) * limit;
      const endIdx = Math.min(startIdx + limit, filteredDSB.length);
      const pageDSB = filteredDSB.slice(startIdx, endIdx);

      setDisplayDSB(pageDSB);
    }
  }, [dsBenh, page, limit, searchKeyword]);

  const handleIFSearchChange = (value) => {
    setSearchKeyword(value);
  };

  const handlePageChange = usePaginationHandler(setPage, page, totalPages);

  const defaultFormData = {
    maICD: "",
    tenBenh: "",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const defaultObjValidInput = {
    isValidMaICD: true,
    isValidTenBenh: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleRegister = async (e) => {
    e.preventDefault();
    setObjValidInput(defaultObjValidInput);
    if (!formData.maICD) {
      setObjValidInput({ ...defaultObjValidInput, isValidMaICD: false });
      toast.error("Chưa nhập mã bệnh ICD");
      return;
    }
    if (!formData.tenBenh) {
      setObjValidInput({ ...defaultObjValidInput, isValidTenBenh: false });
      toast.error("Chưa nhập tên bệnh");
      return;
    }

    const response = await axios.post("/benh/insert", formData);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      setFormData(defaultFormData);
      dispatch(fetchAllBenhAction());
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
          title={"Tìm kiếm theo tên bệnh"}
          size={7}
          onChange={handleIFSearchChange}
        />
        <div className="col col-md-5 d-flex justify-content-end">
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#addBenh"
          >
            Thêm mới
          </button>
        </div>
      </div>

      <div
        className="modal fade "
        id="addBenh"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Thêm mới bệnh
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
                    title={"Mã ICD"}
                    size={3}
                    required={"true"}
                    value={formData.maICD}
                    onChange={(value) => handleChange("maICD", value)}
                  />
                  <IFInputText
                    title={"Tên bệnh"}
                    size={9}
                    required={"true"}
                    value={formData.tenBenh}
                    onChange={(value) => handleChange("tenBenh", value)}
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
        <ListFormDSLB columns={columns} data={displayDSB} loading={isLoading} />
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

export default DSLB;
