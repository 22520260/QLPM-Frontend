import {
  IFNgay,
  IFSearch,
  IFSelect,
  IFInputText,
} from "../../component/Layout/TabLayout/InputForm";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { ListFormThuoc } from "../../component/Layout/TabLayout/ListForm";
import { fetchAllLoThuocAction } from "../../redux/action/fetchDataAction/fetchAllLoThuocAction";
import { fetchAllThuocAction } from "../../redux/action/fetchDataAction/fetchAllThuocAction";
import Pagination from "../../component/Layout/TabLayout/Pagination";
import { usePaginationHandler } from "../../utils/appUtils";
import { formatDate } from "../../utils/appUtils";
import { toast } from "react-toastify";
import axios from "../../setup/axios";

function Thuoc() {
  const dispatch = useDispatch();
  const loThuoc = useSelector((state) => state.loThuoc.data);
  const thuoc = useSelector((state) => state.thuoc.data);
  const isLoading = useSelector((state) => state.loThuoc.isloading);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [displayLoThuoc, setDisplayLoThuoc] = useState([]);
  const [searchTENTHUOC, setSearchTENTHUOC] = useState("");
  const [searchNHACC, setSearchNHACC] = useState("");
  const [searchSOLUONGTON, setSearchSOLUONGTON] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const columns = [
    { title: "Mã lô", key: "MALOTHUOC" },
    { title: "Tên thuốc", key: "TENTHUOC" },
    { title: "Nhà cung cấp", key: "NHACC" },
    { title: "Số lượng nhập", key: "SOLUONGNHAP" },
    { title: "Số lượng tồn", key: "SOLUONGTON" },
    { title: "Ngày nhập", key: "NGAYNHAP" },
    { title: "HSD", key: "HANSD" },
    { title: "Giá nhập", key: "GIANHAP" },
    { title: "Giá bán", key: "GIABAN" },
  ];

  useEffect(() => {
    dispatch(fetchAllLoThuocAction());
    dispatch(fetchAllThuocAction());
  }, []);

  useEffect(() => {
    if (loThuoc) {
      let filteredLoThuoc = [...loThuoc];

      // Lọc theo tên thuốc
      if (searchTENTHUOC) {
        filteredLoThuoc = filteredLoThuoc.filter((data) =>
          data.TENTHUOC.toLowerCase().includes(searchTENTHUOC.toLowerCase())
        );
      }
      // Lọc theo tên hoạt chất
      if (searchNHACC) {
        filteredLoThuoc = filteredLoThuoc.filter((data) =>
          data.NHACC.toLowerCase().includes(searchNHACC.toLowerCase())
        );
      }
      // Lọc theo số lượng tồn
      if (searchSOLUONGTON) {
        filteredLoThuoc = filteredLoThuoc.filter(
          (data) => data.SOLUONGTON <= searchSOLUONGTON
        );
      }

      const formattedLoThuoc = filteredLoThuoc.map((data) => {
        return {
          ...data,
          NGAYNHAP: formatDate(data.NGAYNHAP),
          HANSD: formatDate(data.HANSD),
        };
      });

      const calculatedTotalPages = Math.ceil(filteredLoThuoc.length / limit);
      setTotalPages(calculatedTotalPages);

      const startIdx = (page - 1) * limit;
      const endIdx = Math.min(startIdx + limit, filteredLoThuoc.length);
      const pageLoThuoc = formattedLoThuoc.slice(startIdx, endIdx);

      setDisplayLoThuoc(pageLoThuoc);
    }
  }, [loThuoc, page, limit, searchTENTHUOC, searchNHACC, searchSOLUONGTON]);

  const handleIFSearchTENTHUOCChange = (value) => {
    setSearchTENTHUOC(value);
  };

  const handleIFSearchNHACCChange = (value) => {
    setSearchNHACC(value);
  };

  const handleIFSearchSOLUONGTONChange = (value) => {
    setSearchSOLUONGTON(value);
  };

  const handlePageChange = usePaginationHandler(setPage, page, totalPages);

  const defaultFormData = {
    maThuoc: 0,
    nhaCC: "",
    hanSD: null,
    soLuongNhap: '',
    giaNhap: "",
    giaBan: "",
    ngayNhap: null,
  };
  const [formData, setFormData] = useState(defaultFormData);

  const defaultObjValidInput = {
    isValidMaThuoc: true,
    isValidNhaCC: true,
    isValidHanSD: true,
    isValidSoLuongNhap: true,
    isValidGiaNhap: true,
    isValidGiaBan: true,
    isValidNgayNhap: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleRegister = async (e) => {
    e.preventDefault();
    setObjValidInput(defaultObjValidInput);
    if (!formData.maThuoc || +formData.maThuoc === 0) {
      setObjValidInput({ ...defaultObjValidInput, isValidMaThuoc: false });
      toast.error("Chưa chọn tên thuốc");
      return;
    }
    if (!formData.nhaCC) {
      setObjValidInput({ ...defaultObjValidInput, isValidNhaCC: false });
      toast.error("Chưa nhập nhà cung cấp");
      return;
    }
    if (!formData.hanSD) {
      setObjValidInput({ ...defaultObjValidInput, isValidHanSD: false });
      toast.error("Chưa nhập hạn sử dụng");
      return;
    }
    if (!formData.soLuongNhap) {
      setObjValidInput({ ...defaultObjValidInput, isValidSoLuongNhap: false });
      toast.error("Chưa nhập số lượng nhập");
      return;
    }
    if (!formData.giaNhap) {
      setObjValidInput({ ...defaultObjValidInput, isValidGiaNhap: false });
      toast.error("Chưa nhập giá nhập");
      return;
    }
    if (!formData.giaBan) {
      setObjValidInput({ ...defaultObjValidInput, isValidGiaBan: false });
      toast.error("Chưa nhập giá bán");
      return;
    }
    if (!formData.ngayNhap) {
      setObjValidInput({ ...defaultObjValidInput, isValidNgayNhap: false });
      toast.error("Chưa nhập ngày nhập");
      return;
    }

    console.log(">>> formData", formData);

    const response = await axios.post("/lothuoc/insert", formData);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      setFormData(defaultFormData);
      dispatch(fetchAllLoThuocAction());
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
      <div className="container-fluid">
        <h1>Quản lý kho thuốc</h1>
        <div className="row py-2 align-items-end">
          <IFSearch
            title={"Tìm theo tên thuốc"}
            size={3}
            onChange={(value) => handleIFSearchTENTHUOCChange(value)}
          />

          <IFSearch
            title={"Tìm theo tên nhà cung cấp"}
            size={3}
            onChange={(value) => handleIFSearchNHACCChange(value)}
          />

          <IFSearch
            title={"Tìm theo số lượng tồn tối đa"}
            size={3}
            onChange={(value) => handleIFSearchSOLUONGTONChange(value)}
          />
          <div className="col col-md-3 d-flex justify-content-end">
            <button
              className="btn btn-primary"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#addLoThuoc"
            >
              Thêm mới
            </button>
          </div>
        </div>
        {/* Modal thêm mới LOTHUOC */}
        <div
          className="modal fade modal-xl"
          id="addLoThuoc"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Thêm mới lô thuốc
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
                    <IFSelect
                      title={"Tên thuốc"}
                      size={2}
                      options={thuoc}
                      keyObj={"MATHUOC"}
                      showObj={"TENTHUOC"}
                      required={"true"}
                      value={formData.maThuoc}
                      valid={objValidInput.isValidMaThuoc}
                      onChange={(value) => handleChange("maThuoc", value)}
                    />
                    <IFInputText
                      title={"Nhà cung cấp"}
                      size={4}
                      required={"true"}
                      value={formData.nhaCC}
                      valid={objValidInput.isValidNhaCC}
                      onChange={(value) => handleChange("nhaCC", value)}
                    />
                    <IFNgay
                      title={"Ngày nhập"}
                      size={3}
                      value={formData.ngayNhap}
                      onChange={(value) => handleChange("ngayNhap", value)}
                    />
                    <IFNgay
                      title={"Hạn sử dụng"}
                      size={3}
                      value={formData.hanSD}
                      onChange={(value) => handleChange("hanSD", value)}
                    />
                  </div>
                  <div className="row py-2">
                    <IFInputText
                      title={"Số lượng nhập"}
                      size={4}
                      value={formData.soLuongNhap}
                      required={true}
                      valid={objValidInput.isValidSoLuongNhap}
                      onChange={(value) => handleChange("soLuongNhap", value)}
                    />
                    <IFInputText
                      title={"Giá nhập"}
                      size={4}
                      required={true}
                      value={formData.giaNhap}
                      valid={objValidInput.isValidGiaNhap}
                      onChange={(value) => handleChange("giaNhap", value)}
                    />
                    <IFInputText
                      title={"Giá bán"}
                      size={4}
                      required={true}
                      value={formData.giaBan}
                      valid={objValidInput.isValidGiaBan}
                      onChange={(value) => handleChange("giaBan", value)}
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
        <ListFormThuoc
          columns={columns}
          data={displayLoThuoc}
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

export default Thuoc;
