import React, { useState, useEffect } from "react";
import {
  IFInputText,
  IFSelect,
  IFSearch,
} from "../../../../component/Layout/TabLayout/InputForm";
import { ListFormPQ } from "../../../../component/Layout/TabLayout/ListForm";
import { fetchRoleByIdAction } from "../../../../redux/action/fetchDataAction/fetchRoleByIdAction";
import { fetchAllRoleAction } from "../../../../redux/action/fetchDataAction/fetchAllRoleAction";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../../setup/axios";

function PhanQuyen() {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles?.data) || [];
  const isLoading = useSelector((state) => state.roles?.isloading);
  const groupUsers = useSelector((state) => state.groupUsers?.data) || [];
  const roleById = useSelector((state) => state.roleById?.data) || [];
  const selectedMAVAITRO =
    roleById.length > 0 ? roleById.map((item) => item.MAVAITRO) : [];
  const [displayRoles, setDisplayRoles] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedVaiTro, setSelectedVaiTro] = useState(0);

  const columns = [
    { title: "Mã vai trò", key: "MAVAITRO" },
    { title: "URL", key: "URL" },
    { title: "Mô tả", key: "MOTA" },
  ];

  useEffect(() => {
    dispatch(fetchAllRoleAction());
  }, []);

  useEffect(() => {
      dispatch(fetchRoleByIdAction({ selectedVaiTro }));
  }, [selectedVaiTro]);

  useEffect(() => {
    if (roles) {
      let filteredRoles = [...roles];

      if (searchKeyword) {
        filteredRoles = filteredRoles.filter((data) =>
          data.URL.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }

      setDisplayRoles(filteredRoles);
    }
  }, [roles, searchKeyword]);

  const defaultFormData = {
    url: "",
    moTa: "",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const defaultObjValidInput = {
    isValidURL: true,
    isValidMota: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleRegister = async (e) => {
    e.preventDefault();
    setObjValidInput(defaultObjValidInput);
    if (!formData.url) {
      setObjValidInput({ ...defaultObjValidInput, isValidURL: false });
      toast.error("Chưa nhập đường dẫn");
      return;
    }
    if (!formData.moTa) {
      setObjValidInput({ ...defaultObjValidInput, isValidMota: false });
      toast.error("Chưa nhập mô tả");
      return;
    }

    const response = await axios.post("/role/insert", formData);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      setFormData(defaultFormData);
      dispatch(fetchAllRoleAction());
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleCancel = () => {
    setObjValidInput(defaultObjValidInput);
    setFormData(defaultFormData);
  };

  const handleIFSearchChange = (value) => {
    setSearchKeyword(value);
  };

  const handleDataFromChild = (data) => {
    console.log('Data from child:', data);
  };

  return (
    <div className="container-fluid">
      <div className="row py-2 align-items-end">
        <IFSelect
          title={"Vai trò"}
          size={4}
          options={groupUsers}
          value={selectedVaiTro}
          keyObj={"MANHOM"}
          showObj={"TENNHOM"}
          onChange={(value) => setSelectedVaiTro(value)}
        />
        <IFSearch
          title={"Tìm theo URL"}
          size={4}
          onChange={(value) => handleIFSearchChange(value)}
        />
        <div className="col col-md-4 d-flex justify-content-end">
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
                Thêm quyền mới
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
                    title={"URL"}
                    size={12}
                    required={"true"}
                    value={formData.url}
                    valid={objValidInput.isValidURL}
                    onChange={(value) => handleChange("url", value)}
                  />
                  <IFInputText
                    title={"Mô tả"}
                    size={12}
                    value={formData.moTa}
                    valid={objValidInput.isValidMota}
                    onChange={(value) => handleChange("moTa", value)}
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
                Thêm mới
              </button>
            </div>
          </div>
        </div>
      </div>

      <ListFormPQ
        columns={columns}
        data={displayRoles}
        loading={isLoading}
        selectedDefault={selectedMAVAITRO}
        selectedVaiTro={selectedVaiTro}
        sendDataToParent={handleDataFromChild}
      />


    </div>
  );
}

export default PhanQuyen;
