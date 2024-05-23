import React, { useState, useEffect } from "react";
import {
  IFSearch,
  IFInputText,
  IFNgay,
  IFSelect,
  IFPassword,
} from "../../../../component/Layout/TabLayout/InputForm";
import { ListFormDSTK } from "../../../../component/Layout/TabLayout/ListForm";
import Pagination from "../../../../component/Layout/TabLayout/Pagination";
import { usePaginationHandler } from "../../../../utils/appUtils";
import { fetchAllAccountAction } from "../../../../redux/action/fetchDataAction/fetchAllAccountAction";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../../setup/axios";
import { toast } from "react-toastify";
import { fetchAllUserGroupAction } from "../../../../redux/action/fetchDataAction/fetchAllUserGroupAction";
import { formatDate } from "../../../../utils/appUtils";

function DSTaiKhoan() {
  const dispatch = useDispatch();
  const groupUsersRaw = useSelector((state) => state.groupUsers?.data) || [];
  const accounts = useSelector((state) => state.account?.data) || [];
  const isLoading = useSelector((state) => state.account.data?.isLoading);
  const [groupUsers, setGroupUsers] = useState(groupUsersRaw);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [displayAccounts, setDisplayAccounts] = useState([]);
  const [roleKeyword, setRoleKeyword] = useState("");
  const [nameKeyword, setNameKeyword] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const columns = [
    { title: "Họ tên", key: "HOTEN" },
    { title: "Vai trò", key: "TENNHOM" },
    { title: "Tên tài khoản", key: "USERNAME" },
    { title: "Giới tính", key: "GIOITINH" },
    { title: "SĐT", key: "SDT" },
    { title: "Ngày sinh", key: "NGAYSINH" },
  ];

  const defaultFormData = {
    username: "",
    password: "",
    hoTen: "",
    vaiTro: 0,
    sdt: "",
    trinhDo: "",
    chuyenKhoa: "",
    cccd: "",
    gioiTinh: 0,
    ngaySinh: null,
    diaChi: "",
    ghiChu: "",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const defaultObjValidInput = {
    isValidUsername: true,
    isValidPassword: true,
    isValidHoTen: true,
    isValidVaiTro: true,
    isValidCCCD: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  useEffect(() => {
    const filteredGroupUsers = groupUsersRaw.filter(
      (item) => item.MANHOM !== 1 && item.MANHOM !== 4
    );
    console.log("filteredGroupUsers", filteredGroupUsers);
    setGroupUsers(filteredGroupUsers);
  }, [groupUsersRaw]);

  useEffect(() => {
    dispatch(fetchAllAccountAction());
    dispatch(fetchAllUserGroupAction());
  }, []);

  useEffect(() => {
    if (accounts) {
      let filteredAccounts = [...accounts];

      // Lọc theo vai trò
      if (roleKeyword) {
        filteredAccounts = filteredAccounts.filter((data) =>
          data.TENNHOM.includes(roleKeyword)
        );
      }
      // Lọc theo tên
      if (nameKeyword) {
        filteredAccounts = filteredAccounts.filter((data) =>
          data.HOTEN?.includes(nameKeyword)
        );
      }

      const calculatedTotalPages = Math.ceil(filteredAccounts.length / limit);
      setTotalPages(calculatedTotalPages);

      // const formatedAccounts = filteredAccounts.map(account => account.NGAYSINH = formatDate(account.NGAYSINH))

      const formatedAccounts = filteredAccounts.map((account) => {
        const { NGAYSINH, ...others } = account;
        const formattedNgaySinh = formatDate(NGAYSINH);

        return { ...others, NGAYSINH: formattedNgaySinh };
      });
      const startIdx = (page - 1) * limit;
      const endIdx = Math.min(startIdx + limit, filteredAccounts.length);
      const pageAccounts = formatedAccounts.slice(startIdx, endIdx);

      setDisplayAccounts(pageAccounts);
    }
  }, [accounts, page, limit, roleKeyword, nameKeyword]);

  const handleIFRoleChange = (value) => {
    setRoleKeyword(value);
  };

  const handleIFNameChange = (value) => {
    setNameKeyword(value);
  };

  const handlePageChange = usePaginationHandler(setPage, page, totalPages);

  const handleRegister = async (e) => {
    e.preventDefault();
    setObjValidInput(defaultObjValidInput);
    if (!formData.username) {
      setObjValidInput({ ...defaultObjValidInput, isValidUsername: false });
      toast.error("Chưa nhập username");
      return;
    }
    if (!formData.password) {
      setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
      toast.error("Chưa nhập password");
      return;
    }
    if (!formData.hoTen) {
      setObjValidInput({ ...defaultObjValidInput, isValidHoTen: false });
      toast.error("Chưa nhập họ tên");
      return;
    }
    if (!formData.vaiTro) {
      setObjValidInput({ ...defaultObjValidInput, isValidVaiTro: false });
      toast.error("Chưa nhập vai trò");
      return;
    }
    if (!formData.cccd) {
      setObjValidInput({ ...defaultObjValidInput, isValidCCCD: false });
      toast.error("Chưa nhập CCCD");
      return;
    }

    const response = await axios.post("/account/insert", formData);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      setFormData(defaultFormData);
      dispatch(fetchAllAccountAction());
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
    <div className="container-fluid">
      <div className="row py-2 align-items-end">
        <IFSearch
          title={"Tìm theo vai trò"}
          size={4}
          onChange={(value) => handleIFRoleChange(value)}
        />
        <IFSearch
          title={"Tìm theo tên"}
          size={4}
          onChange={(value) => handleIFNameChange(value)}
        />
        <div className="col col-md-4 d-flex justify-content-end">
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#addAccount"
          >
            Thêm mới
          </button>
        </div>
      </div>
      {/* Modal thêm mới BACSI & LETAN */}
      <div
        className="modal fade modal-xl"
        id="addAccount"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Thêm mới tài khoản
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
                    title={"Tên tài khoản"}
                    size={3}
                    required={"true"}
                    value={formData.username}
                    valid={objValidInput.isValidUsername}
                    onChange={(value) => handleChange("username", value)}
                  />
                  <IFPassword
                    title={"Password"}
                    size={3}
                    required={"true"}
                    value={formData.password}
                    valid={objValidInput.isValidPassword}
                    onChange={(value) => handleChange("password", value)}
                  />
                  <IFInputText
                    title={"Họ tên"}
                    size={4}
                    required={"true"}
                    value={formData.hoTen}
                    valid={objValidInput.isValidHoTen}
                    onChange={(value) => handleChange("hoTen", value)}
                  />
                  <IFNgay
                    title={"Ngày sinh"}
                    size={2}
                    value={formData.ngaySinh}
                    onChange={(value) => handleChange("ngaySinh", value)}
                  />
                </div>
                <div className="row py-2">
                  <IFSelect
                    title={"Vai trò"}
                    size={2}
                    options={groupUsers}
                    keyObj={"MANHOM"}
                    showObj={"TENNHOM"}
                    required={"true"}
                    value={formData.vaiTro}
                    valid={objValidInput.isValidVaiTro}
                    onChange={(value) => handleChange("vaiTro", value)}
                  />
                  <IFSelect
                    title={"Giới tính"}
                    size={2}
                    options={[
                      { gioiTinh: "Nam" },
                      { gioiTinh: "Nữ" },
                      { gioiTinh: "Khác" },
                    ]}
                    value={formData.gioiTinh}
                    keyObj={"gioiTinh"}
                    showObj={"gioiTinh"}
                    onChange={(value) => handleChange("gioiTinh", value)}
                  />

                  <IFInputText
                    title={"CCCD"}
                    size={4}
                    value={formData.cccd}
                    required={true}
                    valid={objValidInput.isValidCCCD}
                    onChange={(value) => handleChange("cccd", value)}
                  />
                  <IFInputText
                    title={"Số điện thoại"}
                    size={4}
                    value={formData.sdt}
                    onChange={(value) => handleChange("sdt", value)}
                  />
                </div>
                <div className="row py-2">
                  <IFInputText
                    title={"Chuyên khoa"}
                    size={3}
                    value={formData.chuyenKhoa}
                    onChange={(value) => handleChange("chuyenKhoa", value)}
                  />
                  <IFInputText
                    title={"Trình độ"}
                    size={3}
                    value={formData.trinhDo}
                    onChange={(value) => handleChange("trinhDo", value)}
                  />
                  <IFInputText
                    title={"Địa chỉ"}
                    size={6}
                    value={formData.diaChi}
                    onChange={(value) => handleChange("diaChi", value)}
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
      <ListFormDSTK
        columns={columns}
        data={displayAccounts}
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
  );
}

export default DSTaiKhoan;
