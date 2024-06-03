import React, { useState, useEffect } from "react";
import {
  IFSearch,
  IFInputText,
} from "../../../../../component/Layout/TabLayout/InputForm";
import { ListFormNND } from "../../../../../component/Layout/TabLayout/ListForm";
import Pagination from "../../../../../component/Layout/TabLayout/Pagination";
import { usePaginationHandler } from "../../../../../utils/appUtils";
import { fetchAllUserGroupAction } from "../../../../../redux/action/fetchDataAction/fetchAllUserGroupAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../../../../setup/axios";

function DSNND() {
  const dispatch = useDispatch();
  const groupUsers = useSelector((state) => state.groupUsers?.data) || [];
  const isLoading = useSelector((state) => state.groupUsers?.isLoading);
  const [limit, setLimit] = useState(5);
  const [displayDVT, setDisplayDVT] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const columns = [
    { title: "Mã nhóm", key: "MANHOM" },
    { title: "Tên nhóm", key: "TENNHOM" },
  ];

  useEffect(() => {
    dispatch(fetchAllUserGroupAction());
  }, []);

  useEffect(() => {
    if (groupUsers) {
      let filteredGroupUsers = [...groupUsers];

      // Lọc theo từ khóa tìm kiếm
      if (searchKeyword) {
        filteredGroupUsers = filteredGroupUsers.filter((data) =>
          data.TENNHOM.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }

      const calculatedTotalPages = Math.ceil(filteredGroupUsers.length / limit);
      setTotalPages(calculatedTotalPages);

      const startIdx = (page - 1) * limit;
      const endIdx = Math.min(startIdx + limit, filteredGroupUsers.length);
      const pageDVT = filteredGroupUsers.slice(startIdx, endIdx);

      setDisplayDVT(pageDVT);
    }
  }, [groupUsers, page, limit, searchKeyword]);

  const handleIFSearchChange = (value) => {
    setSearchKeyword(value);
  };

  const handlePageChange = usePaginationHandler(setPage, page, totalPages);

  const defaultFormData = {
    tenNhom: "",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const defaultObjValidInput = {
    isValidTenNhom: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleRegister = async (e) => {
    e.preventDefault();
    setObjValidInput(defaultObjValidInput);
    if (!formData.tenNhom) {
      setObjValidInput({ ...defaultObjValidInput, isValidTenNhom: false });
      toast.error("Chưa nhập tên nhóm");
      return;
    }

    const response = await axios.post("/usergroup/insert", formData);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      setFormData(defaultFormData);
      dispatch(fetchAllUserGroupAction());
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
      <h4>Danh sách các nhóm người dùng</h4>
      <div className="row align-items-end">
        <IFSearch
          title={"Tìm kiếm theo tên nhóm người dùng"}
          size={7}
          onChange={handleIFSearchChange}
        />
        <div className="col col-md-5 d-flex justify-content-end">
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#addGroupUsers"
          >
            Thêm mới
          </button>
        </div>
      </div>

      <div
        className="modal fade "
        id="addGroupUsers"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Thêm mới nhóm người dùng
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
                    title={"Tên nhóm người dùng"}
                    size={12}
                    required={"true"}
                    value={formData.tenNhom}
                    valid={objValidInput.isValidTenNhom}
                    onChange={(value) => handleChange("tenNhom", value)}
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
        <ListFormNND columns={columns} data={displayDVT} loading={isLoading} />
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

export default DSNND;
