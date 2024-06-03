import React, { useEffect, useState } from "react";
import {
  FaEye,
  FaDollarSign,
  FaPencilRuler,
  FaStethoscope,
} from "react-icons/fa";
import {
  ListGroupItem,
  TextArea,
  IFInputText,
  IFNgay,
  IFSelect,
  IFPassword,
} from "../InputForm";
import NavTabVertical from "../../../NavTabVertical";
import { tabsDataCTPK } from "../../../../popups/CTPhieuKham/data";
import { useDispatch, useSelector } from "react-redux";
import { selectRow } from "../../../../redux/slice/other/selectedRowSlice";
import { fetchCTDTByIdAction } from "../../../../redux/action/fetchDataAction/fetchCTDTById";
import { tabsDataCTKB } from "../../../../popups/CTKhamBenh/data";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { fetchAllAccountAction } from "../../../../redux/action/fetchDataAction/fetchAllAccountAction";
import axios from "../../../../setup/axios";
import { fetchAllDichVuAction } from "../../../../redux/action/fetchDataAction/fetchAllDichVuAction";
import { fetchAllBenhAction } from "../../../../redux/action/fetchDataAction/fetchAllBenhAction";
import { fetchAllRoleAction } from "../../../../redux/action/fetchDataAction/fetchAllRoleAction";
import { fetchAllDVTAction } from "../../../../redux/action/fetchDataAction/fetchAllDVTAction";
import { fetchRoleByIdAction } from "../../../../redux/action/fetchDataAction/fetchRoleByIdAction";
import { deFormatDate, getBase64 } from "../../../../utils/appUtils";
import { fetchAllThuocAction } from "../../../../redux/action/fetchDataAction/fetchAllThuocAction";
import { fetchAllThuocKeDonAction } from "../../../../redux/action/fetchDataAction/fetchAllThuocKeDonAction";
import { fetchAllLoThuocAction } from "../../../../redux/action/fetchDataAction/fetchAllLoThuocAction";
import { fetchCheckThuocAction } from "../../../../redux/action/fetchDataAction/fetchCheckThuocAction";
import { ImageUpload } from "./ImageUpload";
import {
  fetchAllBenhNhanAction,
  fetchBenhNhanByIdAction,
} from "../../../../redux/action/fetchDataAction/fetchAllBenhNhanAction";
import { fetchDSHDByIdAction } from "../../../../redux/action/fetchDataAction/fetchHoaDonAction";
import {
  fetchAllClsAction,
  fetchDsClsByIdAction,
} from "../../../../redux/action/fetchDataAction/fetchCLSAction";
import {
  fetchPkByIdHdAction,
  fetchLSKByIdBnAction,
} from "../../../../redux/action/fetchDataAction/fetchDSDKAction";
import { clearSelectedHD } from "../../../../redux/slice/getDataSlice/getHoaDonSlice";
import { fetchDSDKAction } from "../../../../redux/action/fetchDataAction/fetchDSDKAction";
import { clearIsShowHdRow } from "../../../../redux/slice/getDataSlice/getHoaDonSlice";
import { fetchTTKAction } from "../../../../redux/action/fetchDataAction/fetchTTKAction";
import { fetchBenhByIdAction } from "../../../../redux/action/fetchDataAction/fetchBenhByIdAction";
import HoaDon from "../../../../popups/CTPhieuKham/subTabs/HD";
import { StatusIcon, TTCLS, TTK } from "./StatusIcon";
import LichSuKham from "../../../../popups/CTKhamBenh/subTabs/LSK";
import socket from "../../../../setup/socket";

import { RiErrorWarningFill } from "react-icons/ri";
import { fetchAllLoaiDichVuAction } from "../../../../redux/action/fetchDataAction/fetchAllLoaiDichVuAction";
import { fetchAllUserGroupAction } from "../../../../redux/action/fetchDataAction/fetchAllUserGroupAction";
const { format } = require("date-fns");

export function ListForm({ columns, data, loading }) {
  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th key={index} scope="col">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 2}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>Loading...</strong>
                  <div className="spinner-border ms-2" role="status"></div>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="text-center">Không tìm thấy dữ liệu</div>
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns?.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export function ListFormDV({
  columns,
  data,
  loading,
  handleDelete,
  buttonColor,
}) {
  function handleRowClick(row) {}

  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th key={index} scope="col">
                {column.title}
              </th>
            ))}
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 2}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>Loading...</strong>
                  <div className="spinner-border ms-2" role="status"></div>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="text-center">Không tìm thấy dữ liệu</div>
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => handleRowClick(row)}>
                {columns?.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
                <td>
                  <button
                    className={`btn ${
                      buttonColor ? buttonColor : "btn-danger"
                    } rounded-circle`}
                    onClick={() => handleDelete(rowIndex)}
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export function ListFormDSB({ columns, data, loading, handleDelete }) {
  function handleRowClick(row) {}

  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th key={index} scope="col">
                {column.title}
              </th>
            ))}
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 2}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>Loading...</strong>
                  <div className="spinner-border ms-2" role="status"></div>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="text-center">Không tìm thấy dữ liệu</div>
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => handleRowClick(row)}>
                {columns?.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
                <td>
                  <button
                    className="btn btn-danger rounded-circle"
                    onClick={() => handleDelete(row)}
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export function ListFormDSDK({ columns, data, loading }) {
  const dispatch = useDispatch();
  const selectedRow = useSelector((state) => state.selectedRow?.selectedRow);
  const selectedHD = useSelector((state) => state.fetchHoaDon?.selectedHD);
  const leTan = useSelector((state) => state.auth?.user) || {};

  const [pttt, setPttt] = useState("Tiền mặt");
  const [tdtt, setTdtt] = useState(new Date());

  const handleRowClick = (row) => {
    dispatch(fetchCTDTByIdAction(row?.MAPK));
    dispatch(fetchBenhNhanByIdAction(row.MABN));
    dispatch(fetchDSHDByIdAction(row?.MAPK));
    dispatch(fetchDsClsByIdAction(row?.MAPK));
    dispatch(fetchPkByIdHdAction(row.MAHDPK));
    dispatch(clearSelectedHD());
    dispatch(selectRow(row));
    dispatch(fetchTTKAction(row.MAPK));
    dispatch(fetchBenhByIdAction(row.MAPK));
  };

  const handleChangePttt = (value) => {
    setPttt(value);
  };
  console.log("tdtt", tdtt);

  const updateTrangThaiPK = async (varTrangThai) => {
    try {
      const response2 = await axios.post("/phieukham/update-trang-thai", {
        maPK: selectedRow.MAPK,
        trangThai: varTrangThai,
      });

      if (response2.status === 200) {
        toast.success("Cập nhật trạng thái phiếu khám thành công");
        socket.emit("send-message", { actionName: "DSDK" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật trạng thái phiếu khám không thành công");
    }
  };

  const handleThanhToan = async () => {
    // if (selectedHD.MALOAIHD === 1) {
    //   await updateTrangThaiPK("Đang thực hiện");
    // }
    console.log("tdtt", tdtt);
    try {
      const response = await axios.post("/hoadon/thanhtoan", {
        ...selectedHD,
        maLT: leTan?.account?.userInfo[0]?.MALT,
        tttt: "Đã thanh toán",
        tdtt: tdtt,
        pttt: pttt,
      });

      if (response.status === 200) {
        toast.success("Thanh toán hóa đơn thành công");
        dispatch(fetchDSHDByIdAction(selectedRow?.MAPK));
        dispatch(fetchDSDKAction());
        socket.emit("send-message", {
          actionName: "DSHD",
          maID: selectedRow?.MAPK,
        });
        socket.emit("send-message", { actionName: "DSDK" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Thanh toán không thành công");
    }
  };

  const handleDongButton = () => {
    dispatch(clearIsShowHdRow());
  };

  const handleUpdatePK = async (trangThai) => {
    if (selectedRow.TRANGTHAITH === "Chưa thực hiện") {
      await updateTrangThaiPK(trangThai);
      dispatch(fetchDSDKAction());
    } else {
      toast.error("Phiếu khám đã được thực hiện");
    }
  };

  return (
    <>
      {/* ListForm */}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th key={index} scope="col">
                {column.title}
              </th>
            ))}
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns?.length + 3}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>Loading...</strong>
                  <div className="spinner-border ms-2" role="status"></div>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 2}>
                <div className="text-center">Không tìm thấy dữ liệu</div>
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => handleRowClick(row)}>
                {columns?.map((column, colIndex) => (
                  <td key={colIndex}>
                    {typeof row[column.key] !== "string" ||
                    row[column.key] === ""
                      ? row[column.key]
                      : row[column.key].split("\n")?.map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                  </td>
                ))}
                <td>
                  <StatusIcon
                    trangThaiThucHien={row.TRANGTHAITH}
                    trangThaiThanhToanPK={row.TTTTPK}
                    trangThaiThanhToanCLS={row.TTTTCLS}
                    trangThaiThanhToanDT={row.TTTTDTH}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary rounded-circle"
                    data-bs-toggle="modal"
                    data-bs-target="#idctpk"
                  >
                    <FaEye />
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary rounded-circle mx-2"
                    data-bs-toggle="modal"
                    data-bs-target="#idtt"
                  >
                    <FaDollarSign />
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger rounded-circle"
                    data-bs-toggle="modal"
                    data-bs-target="#huyPhieu"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal ChiTietPhieuKham */}
      <div
        className="modal fade modal-xl"
        id="idctpk"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Thông tin phiếu khám {selectedRow?.MAPK}
              </h1>
            </div>

            <div className="modal-body ">
              <div className="container-fluid">
                <NavTabVertical
                  tabsData={tabsDataCTPK}
                  maPK={selectedRow?.MAPK}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal ThanhToan */}
      <div
        className="modal fade modal-xl"
        id="idtt"
        tabindex="-1"
        aria-labelledby="thanhtoanModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="thanhtoanModalLabel">
                Thanh toán cho PK{selectedRow?.MAPK}
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
                <div className="row">
                  <div className="col col-9">
                    <HoaDon />
                  </div>
                  <div className="col-3">
                    <ListGroupItem
                      title={"Khách hàng:"}
                      value={selectedRow.TENBN}
                      disable={true}
                    />
                    <ListGroupItem
                      title={"Người bán:"}
                      value={
                        selectedHD.TTTT === "Chưa thanh toán"
                          ? leTan?.account?.userInfo
                            ? leTan.account.userInfo[0].HOTEN
                            : ""
                          : selectedHD.TENLT
                      }
                    />
                    <IFNgay
                      title={"Ngày bán:"}
                      size={12}
                      value={tdtt}
                      onChange={(value) => setTdtt(value)}
                      defaultValue={new Date()}
                    />
                    <ListGroupItem
                      title={"Mã hóa đơn:"}
                      value={selectedHD.MAHD ? "HD" + selectedHD.MAHD : ""}
                      disable={true}
                    />
                    <ListGroupItem
                      title={"Loại hóa đơn:"}
                      value={selectedHD.TENLOAIHD}
                      disable={true}
                    />
                    <ListGroupItem
                      title={"Tổng tiền:"}
                      value={selectedHD.THANHTIEN ? selectedHD.THANHTIEN : ""}
                      disable={true}
                    />
                    {/* <ListGroupItem title={"Giảm giá"} value={"0"} />
                    <ListGroupItem
                      title={"Thành tiền"}
                      value={selectedHD.THANHTIEN ? selectedHD.THANHTIEN : ""}
                      disable={true}
                    /> */}
                    <IFInputText
                      title={"Phương thức TT"}
                      size={12}
                      valid={true}
                      onChange={(value) => handleChangePttt(value)}
                      value={selectedHD.PTTT ? selectedHD.PTTT : pttt}
                    />
                    <TextArea title={"Ghi chú"} onChange={() => {}} />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => handleDongButton()}
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
                data-bs-target="#deleteRole"
                //onClick={() => handleThanhToan()}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*Bạn có chắc muốn thanh toán*/}
      <div
        class="modal fade"
        id="deleteRole"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Cảnh báo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Bạn có chắc chắc muốn thanh toán HD{selectedHD.MAHD}
            </div>
            <div class="modal-footer">
              <button
                id="cancelBtnDelete4"
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#idtt"
              >
                Hủy
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-target="#idtt"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                onClick={handleThanhToan}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*Bạn có chắc muốn hủy phiếu khám*/}
      <div
        class="modal fade"
        id="huyPhieu"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Cảnh báo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Bạn có chắc chắn muốn hủy PK{selectedRow.MAPK}
            </div>
            <div class="modal-footer">
              <button
                id="cancelBtnDelete4"
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => handleUpdatePK("Đã hủy")}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*Bạn có chắc muốn đang thực hiện phiếu khám*/}
      <div
        class="modal fade"
        id="dangThucHien"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Cảnh báo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Bạn có chắc muốn chuyển trạng thái PK{selectedRow.MAPK} sang Đang
              thực hiện
            </div>
            <div class="modal-footer">
              <button
                id="cancelBtnDelete4"
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => handleUpdatePK("Đang thực hiện")}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ListFormThuoc({ columns, data, loading }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [formDelete, setFormDelete] = useState({});
  const thuoc = useSelector((state) => state.thuoc?.data);
  const handleRowClick = (row) => {
    setFormData({
      maLoThuoc: row.MALOTHUOC,
      maThuoc: row.MATHUOC,
      nhaCC: row.NHACC,
      soLuongNhap: row.SOLUONGNHAP,
      soLuongTon: row.SOLUONGTON,
      ngayNhap: deFormatDate(row.NGAYNHAP),
      hanSD: deFormatDate(row.HANSD),
      giaNhap: row.GIANHAP,
      giaBan: row.GIABAN,
    });
    setFormDelete({
      maLoThuoc: row.MALOTHUOC,
    });
  };

  const defaultObjValidInput = {
    isValidNhaCC: true,
    isValidGiaNhap: true,
    isValidGiaBan: true,
    isValidNgayNhap: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  useEffect(() => {
    dispatch(fetchAllThuocAction());
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setObjValidInput(defaultObjValidInput);
    if (!formData.nhaCC) {
      setObjValidInput({ ...defaultObjValidInput, isValidNhaCC: false });
      toast.error("Chưa nhập nhà cung cấp");
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

    const response = await axios.post("/lothuoc/update", formData);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      dispatch(fetchAllLoThuocAction());
      const cancelBtn = document.getElementById("cancelBtn6");
      if (cancelBtn) {
        cancelBtn.click();
      }
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleDelete = async () => {
    const response = await axios.post("/lothuoc/delete", formDelete);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      dispatch(fetchAllLoThuocAction());
      dispatch(fetchCheckThuocAction());
      const cancelBtn = document.getElementById("cancelBtnDelete6");
      if (cancelBtn) {
        cancelBtn.click();
      }
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      {/* ListForm */}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th key={index} scope="col">
                {column.title}
              </th>
            ))}
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 3}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>Loading...</strong>
                  <div className="spinner-border ms-2" role="status"></div>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="text-center">Không tìm thấy dữ liệu</div>
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => handleRowClick(row)}>
                {columns?.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
                <td>
                  <button
                    type="button"
                    className="btn btn-primary rounded-circle"
                    data-bs-toggle="modal"
                    data-bs-target="#updateLoThuoc"
                  >
                    <FaPencilRuler />
                  </button>

                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteLoThuoc"
                    className="btn btn-danger mx-1 rounded-circle"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal update */}
      <div
        className="modal fade modal-xl"
        id="updateLoThuoc"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Thông tin lô thuốc
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
                    title={"Mã lô"}
                    size={2}
                    required={"true"}
                    value={formData.maLoThuoc}
                    readOnly={true}
                    onChange={(value) => handleChange("nhaCC", value)}
                  />
                  <IFSelect
                    title={"Tên thuốc"}
                    size={2}
                    options={thuoc}
                    keyObj={"MATHUOC"}
                    showObj={"TENTHUOC"}
                    required={"true"}
                    value={formData.maThuoc}
                    readOnly={true}
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
                    size={2}
                    value={formData.ngayNhap}
                    onChange={(value) => handleChange("ngayNhap", value)}
                  />
                  <IFNgay
                    title={"Hạn sử dụng"}
                    size={2}
                    value={formData.hanSD}
                    readOnly={true}
                    onChange={(value) => handleChange("hanSD", value)}
                  />
                </div>
                <div className="row py-2">
                  <IFInputText
                    title={"Số lượng nhập"}
                    size={3}
                    value={formData.soLuongNhap}
                    required={true}
                    readOnly={true}
                  />
                  <IFInputText
                    title={"Số lượng tồn"}
                    size={3}
                    value={formData.soLuongTon}
                    required={true}
                    readOnly={true}
                    onChange={(value) => handleChange("soLuongNhap", value)}
                  />
                  <IFInputText
                    title={"Giá nhập"}
                    size={3}
                    readOnly={true}
                    required={true}
                    value={formData.giaNhap}
                    valid={objValidInput.isValidGiaNhap}
                    onChange={(value) => handleChange("giaNhap", value)}
                  />
                  <IFInputText
                    title={"Giá bán"}
                    size={3}
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
                id="cancelBtn6"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Lưu những thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal delete */}
      <div
        class="modal fade"
        id="deleteLoThuoc"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Cảnh báo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Bạn có chắc chắc muốn xóa lô thuốc
              <span className="text-danger"> {formDelete.maLoThuoc} </span>?
            </div>
            <div class="modal-footer">
              <button
                id="cancelBtnDelete6"
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleDelete}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ListFormDSTK({ columns, data, loading }) {
  const dispatch = useDispatch();
  const [formDataTTCN, setFormDataTTCN] = useState({});
  const [formDataTTTK, setFormDataTTTK] = useState({});
  const [formDelete, setFormDelete] = useState({});
  const groupUsersRaw = useSelector((state) => state.groupUsers?.data) || [];
  const [groupUsers, setGroupUsers] = useState(groupUsersRaw);

  useEffect(() => {
    const filteredGroupUsers = groupUsersRaw.filter(
      (item) => item.MANHOM !== 1 && item.MANHOM !== 4
    );
    setGroupUsers(filteredGroupUsers);
  }, [groupUsersRaw]);

  const handleRowClick = (selectedRow) => {
    setFormDataTTCN({
      maBS: selectedRow.MABS,
      maLT: selectedRow.MALT,
      maTK: selectedRow.MATK,
      hoTen: selectedRow.HOTEN,
      vaiTro: selectedRow.MANHOM,
      sdt: selectedRow.SDT,
      trinhDo: selectedRow.TRINHDO,
      chuyenKhoa: selectedRow.CHUYENKHOA,
      cccd: selectedRow.CCCD,
      gioiTinh: selectedRow.GIOITINH,
      ngaySinh: deFormatDate(selectedRow.NGAYSINH),
      diaChi: selectedRow.DIACHI,
      ghiChu: "",
    });
    setFormDataTTTK({
      maTK: selectedRow.MATK,
      username: selectedRow.USERNAME,
      password: selectedRow.PASSWORD,
    });
    setFormDelete({
      maTK: selectedRow.MATK,
      username: selectedRow.USERNAME,
    });
  };

  const defaultObjValidInputTTCN = {
    isValidHoTen: true,
    isValidVaiTro: true,
    isValidCCCD: true,
  };

  const defaultObjValidInputTTTK = {
    isValidUsername: true,
    isValidPassword: true,
  };

  const [objValidInputTTCN, setObjValidInputTTCN] = useState(
    defaultObjValidInputTTCN
  );
  const [objValidInputTTTK, setObjValidInputTTTK] = useState(
    defaultObjValidInputTTTK
  );

  const handleUpdateTTCN = async (e) => {
    e.preventDefault();
    setObjValidInputTTCN(defaultObjValidInputTTCN);
    if (!formDataTTCN.hoTen) {
      setObjValidInputTTCN({ ...objValidInputTTCN, isValidHoTen: false });
      toast.error("Chưa nhập họ tên");
      return;
    }
    if (!formDataTTCN.vaiTro || formDataTTCN.vaiTro === "Chọn") {
      setObjValidInputTTCN({ ...objValidInputTTCN, isValidVaiTro: false });
      toast.error("Chưa nhập vai trò");
      return;
    }
    if (!formDataTTCN.cccd) {
      setObjValidInputTTCN({ ...objValidInputTTCN, isValidCCCD: false });
      toast.error("Chưa nhập CCCD");
      return;
    }
    const selected = groupUsers.find(
      (groupUser) => groupUser.TENNHOM === formDataTTCN.vaiTro
    );
    if (selected) {
      handleChangeTTCN("vaiTro", selected.MANHOM);
    }

    const response = await axios.post("/account/updateTTCN", formDataTTCN);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      dispatch(fetchAllAccountAction());
      const cancelBtn = document.getElementById("cancelBtn");
      if (cancelBtn) {
        cancelBtn.click();
      }
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  const handleUpdateTTTK = async (e) => {
    e.preventDefault();
    setObjValidInputTTTK(defaultObjValidInputTTTK);
    if (!formDataTTTK.username) {
      setObjValidInputTTTK({ ...objValidInputTTTK, isValidUsername: false });
      toast.error("Chưa nhập username");
      return;
    }
    if (!formDataTTTK.password) {
      setObjValidInputTTTK({ ...objValidInputTTTK, isValidPassword: false });
      toast.error("Chưa nhập password");
      return;
    }

    const response = await axios.post("/account/updateTTTK", formDataTTTK);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      const cancelBtn = document.getElementById("cancelBtn");
      if (cancelBtn) {
        cancelBtn.click();
      }
      handleChangeTTTK("password", "");
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  const handleChangeTTCN = (fieldName, value) => {
    setFormDataTTCN({ ...formDataTTCN, [fieldName]: value });
  };

  const handleChangeTTTK = (fieldName, value) => {
    setFormDataTTTK({ ...formDataTTTK, [fieldName]: value });
  };

  const handleDelete = async () => {
    const response = await axios.post("/account/delete", formDelete);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      dispatch(fetchAllAccountAction());
      const cancelBtn = document.getElementById("cancelBtnDelete3");
      if (cancelBtn) {
        cancelBtn.click();
      }
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      {/* ListForm */}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th key={index} scope="col">
                {column.title}
              </th>
            ))}
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 3}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>Loading...</strong>
                  <div className="spinner-border ms-2" role="status"></div>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="text-center">Không tìm thấy dữ liệu</div>
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => handleRowClick(row)}>
                {columns?.map((column, colIndex) => (
                  <td key={colIndex}>{row[column.key] || ""}</td>
                ))}
                <td>
                  <button
                    type="button"
                    className="btn btn-primary rounded-circle"
                    data-bs-toggle="modal"
                    data-bs-target="#updateAccount"
                  >
                    <FaPencilRuler />
                  </button>

                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteAccount"
                    className="btn btn-danger mx-1 rounded-circle"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Modal update */}
      <div
        className="modal fade modal-xl"
        id="updateAccount"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Cập nhật người dùng
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
                <h4>Cập nhật thông tin cá nhân</h4>
                <div className="row py-2">
                  <IFInputText
                    title={"Họ tên"}
                    size={4}
                    required={"true"}
                    value={formDataTTCN.hoTen}
                    valid={objValidInputTTCN.isValidHoTen}
                    onChange={(value) => handleChangeTTCN("hoTen", value)}
                  />
                  <IFNgay
                    title={"Ngày sinh"}
                    size={2}
                    value={formDataTTCN.ngaySinh}
                    onChange={(value) => handleChangeTTCN("ngaySinh", value)}
                  />
                  <IFInputText
                    title={"Địa chỉ"}
                    size={6}
                    value={formDataTTCN.diaChi}
                    onChange={(value) => handleChangeTTCN("diaChi", value)}
                  />
                </div>
                <div className="row py-2">
                  <IFSelect
                    title={"Giới tính"}
                    size={2}
                    options={[
                      { gioiTinh: "Nam" },
                      { gioiTinh: "Nữ" },
                      { gioiTinh: "Khác" },
                    ]}
                    value={formDataTTCN.gioiTinh}
                    keyObj={"gioiTinh"}
                    showObj={"gioiTinh"}
                    onChange={(value) => handleChangeTTCN("gioiTinh", value)}
                  />
                  <IFInputText
                    title={"CCCD"}
                    size={4}
                    value={formDataTTCN.cccd}
                    required={true}
                    valid={objValidInputTTCN.isValidCCCD}
                    onChange={(value) => handleChangeTTCN("cccd", value)}
                  />
                  <IFInputText
                    title={"Số điện thoại"}
                    size={4}
                    value={formDataTTCN.sdt}
                    onChange={(value) => handleChangeTTCN("sdt", value)}
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
                    value={formDataTTCN.vaiTro}
                    valid={objValidInputTTCN.isValidVaiTro}
                    onChange={(value) => handleChangeTTCN("vaiTro", value)}
                  />
                  <IFInputText
                    title={"Chuyên khoa"}
                    size={3}
                    value={formDataTTCN.chuyenKhoa}
                    onChange={(value) => handleChangeTTCN("chuyenKhoa", value)}
                  />
                  <IFInputText
                    title={"Trình độ"}
                    size={3}
                    value={formDataTTCN.trinhDo}
                    onChange={(value) => handleChangeTTCN("trinhDo", value)}
                  />
                </div>
                <div className="row py-2 d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-primary ms-auto col-auto"
                    onClick={handleUpdateTTCN}
                  >
                    Lưu thông tin cá nhân
                  </button>
                </div>

                <div className="py-2 border-bottom border-primary"></div>

                <h4 className="mt-4">Cập nhật thông tin tài khoản</h4>
                <div className="row py-2">
                  <IFInputText
                    title={"Tên tài khoản"}
                    size={3}
                    required={"true"}
                    value={formDataTTTK.username}
                    valid={objValidInputTTTK.isValidUsername}
                    onChange={(value) => handleChangeTTTK("username", value)}
                  />
                  <IFPassword
                    title={"Password"}
                    size={4}
                    required={"true"}
                    value={formDataTTTK.password}
                    valid={objValidInputTTTK.isValidPassword}
                    onChange={(value) => handleChangeTTTK("password", value)}
                  />
                </div>
                <div className="row py-2 d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-primary ms-auto col-auto"
                    onClick={(e) => handleUpdateTTTK(e)}
                  >
                    Lưu thông tin tài khoản
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                id="cancelBtn"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal delete */}
      <div
        class="modal fade"
        id="deleteAccount"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Cảnh báo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Bạn có chắc chắc muốn xóa tài khoản
              <span className="text-danger"> {formDelete.username} </span>?
            </div>
            <div class="modal-footer">
              <button
                id="cancelBtnDelete3"
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleDelete}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ListFormDSDV({ columns, data, loading }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [formDelete, setFormDelete] = useState({});
  const loaiDichVu = useSelector((state) => state.loaiDichVu?.data) || [];
  const handleRowClick = (row) => {
    setFormData({
      maDV: row.MADV,
      maLDV: row.MALOAIDV,
      tenDichVu: row.TENDV,
      giaDichVu: row.GIADV,
    });
    setFormDelete({
      maDV: row.MADV,
      tenDichVu: row.TENDV,
    });
  };

  const defaultObjValidInput = {
    isValidMaLDV: true,
    isValidTenDV: true,
    isValidGiaDV: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setObjValidInput(defaultObjValidInput);
    if (!formData.tenDichVu) {
      setObjValidInput({ ...objValidInput, isValidTenDV: false });
      toast.error("Chưa nhập tên dịch vụ");
      return;
    }
    if (!formData.maLDV || formData.maLDV === 0) {
      setObjValidInput({ ...objValidInput, isValidTenLDV: false });
      toast.error("Chưa chọn loại dịch vụ");
      return;
    }
    if (!formData.giaDichVu) {
      setObjValidInput({ ...objValidInput, isValidGiaDV: false });
      toast.error("Chưa nhập giá dịch vụ");
      return;
    }

    const response = await axios.post("/dichvu/update", formData);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      dispatch(fetchAllDichVuAction());
      const cancelBtn = document.getElementById("cancelBtn");
      if (cancelBtn) {
        cancelBtn.click();
      }
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleDelete = async () => {
    const response = await axios.post("/dichvu/delete", formDelete);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      dispatch(fetchAllDichVuAction());
      const cancelBtn = document.getElementById("cancelBtnDelete");
      if (cancelBtn) {
        cancelBtn.click();
      }
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      {/* ListForm */}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th key={index} scope="col">
                {column.title}
              </th>
            ))}
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 3}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>Loading...</strong>
                  <div className="spinner-border ms-2" role="status"></div>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="text-center">Không tìm thấy dữ liệu</div>
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => handleRowClick(row)}>
                {columns?.map((column, colIndex) => (
                  <td key={colIndex}>{row[column.key] || ""}</td>
                ))}
                <td>
                  <button
                    type="button"
                    className="btn btn-primary rounded-circle"
                    data-bs-toggle="modal"
                    data-bs-target="#updateDichVu"
                  >
                    <FaEye />
                  </button>

                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteDichVu"
                    className="btn btn-danger mx-1 rounded-circle"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Modal update */}
      <div
        className="modal fade modal-lg"
        id="updateDichVu"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Thông tin tài khoản
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
                id="cancelBtn"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal delete */}
      <div
        class="modal fade"
        id="deleteDichVu"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Cảnh báo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Bạn có chắc chắc muốn xóa dịch vụ
              <span className="text-danger"> {formDelete.tenDichVu} </span>?
            </div>
            <div class="modal-footer">
              <button
                id="cancelBtnDelete"
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleDelete}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ListFormDST({ columns, data, loading }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [formDelete, setFormDelete] = useState({});
  const dvt = useSelector((state) => state.dvt?.data) || [];
  const handleRowClick = (row) => {
    setFormData({
      maThuoc: row.MATHUOC,
      maDVT: row.MADVT,
      tenThuoc: row.TENTHUOC,
      thanhPhan: row.THANHPHAN,
    });
    setFormDelete({
      maThuoc: row.MATHUOC,
      tenThuoc: row.TENTHUOC,
    });
  };

  const defaultObjValidInput = {
    isValidMaDVT: true,
    isValidTenThuoc: true,
    isValidThanhPhan: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setObjValidInput(defaultObjValidInput);
    if (!formData.maDVT || +formData.maDVT === 0) {
      setObjValidInput({ ...defaultObjValidInput, isValidMaDVT: false });
      toast.error("Chưa chọn đơn vị thuốc");
      return;
    }
    if (!formData.tenThuoc) {
      setObjValidInput({ ...defaultObjValidInput, isValidTenThuoc: false });
      toast.error("Chưa nhập tên thuốc");
      return;
    }
    if (!formData.thanhPhan) {
      setObjValidInput({ ...defaultObjValidInput, isValidThanhPhan: false });
      toast.error("Chưa nhập thành phần thuốc");
      return;
    }

    const response = await axios.post("/thuoc/update", formData);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      dispatch(fetchAllThuocAction());
      const cancelBtn = document.getElementById("cancelBtn5");
      if (cancelBtn) {
        cancelBtn.click();
      }
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleDelete = async () => {
    const response = await axios.post("/thuoc/delete", formDelete);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      dispatch(fetchAllThuocAction());
      const cancelBtn = document.getElementById("cancelBtnDelete5");
      if (cancelBtn) {
        cancelBtn.click();
      }
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      {/* ListForm */}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th key={index} scope="col">
                {column.title}
              </th>
            ))}
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 3}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>Loading...</strong>
                  <div className="spinner-border ms-2" role="status"></div>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="text-center">Không tìm thấy dữ liệu</div>
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => handleRowClick(row)}>
                {columns?.map((column, colIndex) => (
                  <td key={colIndex}>{row[column.key] || ""}</td>
                ))}
                <td>
                  <button
                    type="button"
                    className="btn btn-primary rounded-circle"
                    data-bs-toggle="modal"
                    data-bs-target="#updateThuoc"
                  >
                    <FaEye />
                  </button>

                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteThuoc"
                    className="btn btn-danger mx-1 rounded-circle"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Modal update */}
      <div
        className="modal fade modal-lg"
        id="updateThuoc"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Thông tin tài khoản
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
                id="cancelBtn5"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal delete */}
      <div
        class="modal fade"
        id="deleteThuoc"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Cảnh báo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Bạn có chắc chắc muốn xóa thuốc
              <span className="text-danger"> {formDelete.tenThuoc} </span>?
            </div>
            <div class="modal-footer">
              <button
                id="cancelBtnDelete5"
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleDelete}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ListFormDSLB({ columns, data, loading }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [formDelete, setFormDelete] = useState({});

  const handleRowClick = (row) => {
    setFormData({
      maBenh: row.MABENH,
      maICD: row.MAICD,
      tenBenh: row.TENBENH,
    });
    setFormDelete({
      maBenh: row.MABENH,
      tenBenh: row.TENBENH,
    });
  };

  const defaultObjValidInput = {
    isValidMaICD: true,
    isValidTenBenh: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleUpdate = async (e) => {
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

    const response = await axios.post("/benh/update", formData);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      dispatch(fetchAllBenhAction());
      const cancelBtn = document.getElementById("cancelBtn1");
      if (cancelBtn) {
        cancelBtn.click();
      }
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleDelete = async () => {
    const response = await axios.post("/benh/delete", formDelete);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      dispatch(fetchAllBenhAction());
      const cancelBtn = document.getElementById("cancelBtnDelete1");
      if (cancelBtn) {
        cancelBtn.click();
      }
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      {/* ListForm */}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th key={index} scope="col">
                {column.title}
              </th>
            ))}
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 3}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>Loading...</strong>
                  <div className="spinner-border ms-2" role="status"></div>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="text-center">Không tìm thấy dữ liệu</div>
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => handleRowClick(row)}>
                {columns?.map((column, colIndex) => (
                  <td key={colIndex}>{row[column.key] || ""}</td>
                ))}
                <td>
                  <button
                    type="button"
                    className="btn btn-primary rounded-circle"
                    data-bs-toggle="modal"
                    data-bs-target="#updateBenh"
                  >
                    <FaEye />
                  </button>

                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteBenh"
                    className="btn btn-danger mx-1 rounded-circle"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Modal update */}
      <div
        className="modal fade "
        id="updateBenh"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Cập nhật thông tin bệnh
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
                id="cancelBtn1"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal delete */}
      <div
        class="modal fade"
        id="deleteBenh"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Cảnh báo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Bạn có chắc chắc muốn xóa bệnh
              <span className="text-danger"> {formDelete.tenBenh} </span>?
            </div>
            <div class="modal-footer">
              <button
                id="cancelBtnDelete1"
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleDelete}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ListFormDSLDV({ columns, data, loading }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [formDelete, setFormDelete] = useState({});

  const handleRowClick = (row) => {
    setFormData({
      maLDV: row.MALOAIDV,
      tenLDV: row.TENLOAIDV,
    });
    setFormDelete({
      maLDV: row.MALOAIDV,
      tenLDV: row.TENLOAIDV,
    });
  };

  const defaultObjValidInput = {
    isValidMaLDV: true,
    isValidTenLDV: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setObjValidInput(defaultObjValidInput);
    if (!formData.tenLDV) {
      setObjValidInput({ ...defaultObjValidInput, isValidTenLDV: false });
      toast.error("Chưa nhập tên loại dịch vụ");
      return;
    }

    const response = await axios.post("/ldv/update", formData);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      dispatch(fetchAllLoaiDichVuAction());
      const cancelBtn = document.getElementById("cancelBtn11");
      if (cancelBtn) {
        cancelBtn.click();
      }
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleDelete = async () => {
    const response = await axios.post("/ldv/delete", formDelete);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      dispatch(fetchAllLoaiDichVuAction());
      const cancelBtn = document.getElementById("cancelBtnDelete11");
      if (cancelBtn) {
        cancelBtn.click();
      }
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      {/* ListForm */}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th key={index} scope="col">
                {column.title}
              </th>
            ))}
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 3}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>Loading...</strong>
                  <div className="spinner-border ms-2" role="status"></div>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="text-center">Không tìm thấy dữ liệu</div>
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => handleRowClick(row)}>
                {columns?.map((column, colIndex) => (
                  <td key={colIndex}>{row[column.key] || ""}</td>
                ))}
                <td>
                  <button
                    type="button"
                    className="btn btn-primary rounded-circle"
                    data-bs-toggle="modal"
                    data-bs-target="#updateLDV"
                  >
                    <FaEye />
                  </button>

                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteLDV"
                    className="btn btn-danger mx-1 rounded-circle"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Modal update */}
      <div
        className="modal fade "
        id="updateLDV"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Cập nhật thông tin loại dịch vụ
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
                id="cancelBtn11"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal delete */}
      <div
        class="modal fade"
        id="deleteLDV"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Cảnh báo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Bạn có chắc chắc muốn xóa loại dịch vụ
              <span className="text-danger"> {formDelete.tenLDV} </span>?
            </div>
            <div class="modal-footer">
              <button
                id="cancelBtnDelete11"
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleDelete}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ListFormDVT({ columns, data, loading }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [formDelete, setFormDelete] = useState({});

  const handleRowClick = (row) => {
    setFormData({
      maDVT: row.MADVT,
      tenDVT: row.TENDONVI,
    });
    setFormDelete({
      maDVT: row.MADVT,
      tenDVT: row.TENDONVI,
    });
  };

  const defaultObjValidInput = {
    isValidTenDVT: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setObjValidInput(defaultObjValidInput);
    if (!formData.tenDVT) {
      setObjValidInput({ ...defaultObjValidInput, isValidTenDVT: false });
      toast.error("Chưa nhập tên đơn vị tính");
      return;
    }

    const response = await axios.post("/dvt/update", formData);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      dispatch(fetchAllDVTAction());
      const cancelBtn = document.getElementById("cancelBtn2");
      if (cancelBtn) {
        cancelBtn.click();
      }
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleDelete = async () => {
    const response = await axios.post("/dvt/delete", formDelete);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      dispatch(fetchAllDVTAction());
      const cancelBtn = document.getElementById("cancelBtnDelete2");
      if (cancelBtn) {
        cancelBtn.click();
      }
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      {/* ListForm */}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th key={index} scope="col">
                {column.title}
              </th>
            ))}
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 3}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>Loading...</strong>
                  <div className="spinner-border ms-2" role="status"></div>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="text-center">Không tìm thấy dữ liệu</div>
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => handleRowClick(row)}>
                {columns?.map((column, colIndex) => (
                  <td key={colIndex}>{row[column.key] || ""}</td>
                ))}
                <td>
                  <button
                    type="button"
                    className="btn btn-primary rounded-circle"
                    data-bs-toggle="modal"
                    data-bs-target="#updateDVT"
                  >
                    <FaEye />
                  </button>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteDVT"
                    className="btn btn-danger mx-1 rounded-circle"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Modal update */}
      <div
        className="modal fade "
        id="updateDVT"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Cập nhật đơn vị tính
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
                id="cancelBtn2"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal delete */}
      <div
        class="modal fade"
        id="deleteDVT"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Cảnh báo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Bạn có chắc chắc muốn xóa đơn vị thuốc
              <span className="text-danger"> {formDelete.tenDVT} </span>?
            </div>
            <div class="modal-footer">
              <button
                id="cancelBtnDelete2"
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleDelete}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ListFormNND({ columns, data, loading }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [formDelete, setFormDelete] = useState({});

  const handleRowClick = (row) => {
    setFormData({
      maNhom: row.MANHOM,
      tenNhom: row.TENNHOM,
    });
    setFormDelete({
      maNhom: row.MANHOM,
      tenNhom: row.TENNHOM,
    });
  };

  const defaultObjValidInput = {
    isValidTenNhom: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setObjValidInput(defaultObjValidInput);
    if (!formData.tenNhom) {
      setObjValidInput({ ...defaultObjValidInput, isValidTenNhom: false });
      toast.error("Chưa nhập tên nhóm người dùng");
      return;
    }

    const response = await axios.post("/usergroup/update", formData);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      dispatch(fetchAllUserGroupAction());
      const cancelBtn = document.getElementById("cancelBtn12");
      if (cancelBtn) {
        cancelBtn.click();
      }
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleDelete = async () => {
    const response = await axios.post("/usergroup/delete", formDelete);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      dispatch(fetchAllUserGroupAction());
      const cancelBtn = document.getElementById("cancelBtnDelete12");
      if (cancelBtn) {
        cancelBtn.click();
      }
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      {/* ListForm */}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th key={index} scope="col">
                {column.title}
              </th>
            ))}
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 3}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>Loading...</strong>
                  <div className="spinner-border ms-2" role="status"></div>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="text-center">Không tìm thấy dữ liệu</div>
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => handleRowClick(row)}>
                {columns?.map((column, colIndex) => (
                  <td key={colIndex}>{row[column.key] || ""}</td>
                ))}
                <td>
                  <button
                    type="button"
                    className="btn btn-primary rounded-circle"
                    data-bs-toggle="modal"
                    data-bs-target="#updateNND"
                  >
                    <FaEye />
                  </button>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteNND"
                    className="btn btn-danger mx-1 rounded-circle"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Modal update */}
      <div
        className="modal fade "
        id="updateNND"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Cập nhật nhóm người dùng
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
                id="cancelBtn12"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal delete */}
      <div
        class="modal fade"
        id="deleteNND"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Cảnh báo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Bạn có chắc chắc muốn xóa nhóm người dùng
              <span className="text-danger"> {formDelete.tenNhom} </span>?
            </div>
            <div class="modal-footer">
              <button
                id="cancelBtnDelete12"
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleDelete}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ListFormPQ({
  columns,
  data,
  loading,
  selectedDefault,
  selectedVaiTro,
  sendDataToParent,
}) {
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState([]);
  const [formData, setFormData] = useState({});
  const [formDelete, setFormDelete] = useState({});

  useEffect(() => {
    setSelectedRows([...selectedDefault]);
  }, [selectedDefault]);

  const handleRowClick = (row) => {
    setFormData({
      maVaiTro: row.MAVAITRO,
      url: row.URL,
      moTa: row.MOTA,
    });
    setFormDelete({
      maVaiTro: row.MAVAITRO,
      url: row.URL,
    });
  };

  const isChecked = (selected) => {
    return selectedRows.includes(selected);
  };

  const defaultObjValidInput = {
    isValidURL: true,
    isValidMota: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleUpdate = async (e) => {
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

    const response = await axios.post("/role/update", formData);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      dispatch(fetchAllRoleAction());
      const cancelBtn = document.getElementById("cancelBtn3");
      if (cancelBtn) {
        cancelBtn.click();
      }
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleCheckboxChange = (e, selected) => {
    if (e.target.checked) {
      setSelectedRows([...selectedRows, selected]);
    } else {
      setSelectedRows(selectedRows.filter((row) => row !== selected));
    }
  };

  const buildDataToSave = () => {
    const result = selectedRows?.map((item) => {
      let data = { MANHOM: +selectedVaiTro, MAVAITRO: +item };
      return data;
    });
    return result ? result : [];
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (selectedVaiTro === 0 || selectedVaiTro === "0") {
      toast.error("Chưa chọn vai trò");
      return;
    }
    const data = buildDataToSave();
    const response = await axios.post("/role/assignRoleToGroup", data);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      dispatch(fetchRoleByIdAction({ selectedVaiTro }));
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }

    sendDataToParent(selectedRows);
  };

  const handleDelete = async () => {
    const response = await axios.post("/role/delete", formDelete);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      dispatch(fetchAllRoleAction());
      const cancelBtn = document.getElementById("cancelBtnDelete4");
      if (cancelBtn) {
        cancelBtn.click();
      }
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      {/* ListForm */}
      <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
        <table className="table table-striped table-hover overflow-auto">
          <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <tr>
              <th style={{ width: "5%" }}>Chọn</th>
              {columns?.map((column, index) => (
                <th key={index} scope="col">
                  {column.title}
                </th>
              ))}
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 3}>
                  <div className="d-flex align-items-center justify-content-between">
                    <strong>Loading...</strong>
                    <div className="spinner-border ms-2" role="status"></div>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1}>
                  <div className="text-center">Không tìm thấy dữ liệu</div>
                </td>
              </tr>
            ) : (
              data?.map((row, rowIndex) => (
                <tr key={rowIndex} onClick={() => handleRowClick(row)}>
                  <td>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id={rowIndex}
                        checked={isChecked(row.MAVAITRO)}
                        onChange={(e) => handleCheckboxChange(e, row.MAVAITRO)}
                      />
                      <label className="form-check-label" htmlFor={rowIndex} />
                    </div>
                  </td>
                  {columns?.map((column, colIndex) => (
                    <td key={colIndex}>{row[column.key] || ""}</td>
                  ))}
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary rounded-circle"
                      data-bs-toggle="modal"
                      data-bs-target="#updateRole"
                    >
                      <FaEye />
                    </button>
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteRole"
                      className="btn btn-danger mx-1 rounded-circle"
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Save button */}
      <div className="d-flex justify-content-center px-3 py-2">
        <button
          className="btn btn-primary"
          type="button"
          onClick={(e) => handleSave(e)}
        >
          Lưu
        </button>
      </div>
      {/* Modal update */}
      <div
        className="modal fade "
        id="updateRole"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Cập nhật quyền
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
                id="cancelBtn3"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal delete */}
      <div
        class="modal fade"
        id="deleteRole"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Cảnh báo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Bạn có chắc chắc muốn xóa quyền
              <span className="text-danger"> {formDelete.url} </span>?
            </div>
            <div class="modal-footer">
              <button
                id="cancelBtnDelete4"
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleDelete}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ListFormKhamBenh({ columns, data, loading }) {
  const dispatch = useDispatch();
  const selectedRow = useSelector((state) => state.selectedRow?.selectedRow);
  const bacSi = useSelector((state) => state.auth?.user) || {};

  const handleRowClick = (row) => {
    dispatch(fetchCTDTByIdAction(row?.MAPK));
    dispatch(selectRow(row)); // Gửi hành động selectRow với dữ liệu hàng được chọn
    dispatch(fetchAllThuocKeDonAction());
    dispatch(fetchTTKAction(row.MAPK));
    dispatch(fetchBenhByIdAction(row.MAPK));
    dispatch(fetchDsClsByIdAction(row?.MAPK));
    dispatch(fetchLSKByIdBnAction(row?.MABN));
    if (row.TRANGTHAITH === "Đã hủy") {
      toast.error("Phiếu khám đã bị hủy, không thể khám bệnh");
    }
    if (
      bacSi?.account?.groupName === "Bác sĩ" &&
      bacSi.account.userInfo[0].MABS !== row.MABS
    ) {
      toast.error("Bệnh nhân này không phải của bạn");
    }
  };
  const handleCancel = (row) => {};

  return (
    <>
      {/* ListForm */}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th key={index} scope="col">
                {column.title}
              </th>
            ))}
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 3}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>Loading...</strong>
                  <div className="spinner-border ms-2" role="status"></div>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="text-center">Không tìm thấy dữ liệu</div>
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => handleRowClick(row)}>
                {columns?.map((column, colIndex) => (
                  <td key={colIndex}>
                    {typeof row[column.key] !== "string" ||
                    row[column.key] === ""
                      ? row[column.key]
                      : row[column.key].split("\n")?.map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                  </td>
                ))}
                <td>
                  <StatusIcon
                    trangThaiThucHien={row.TRANGTHAITH}
                    trangThaiThanhToanPK={row.TTTTPK}
                    trangThaiThanhToanCLS={row.TTTTCLS}
                    trangThaiThanhToanDT={row.TTTTDTH}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary rounded-circle"
                    data-bs-toggle="modal"
                    data-bs-target="#idkb"
                  >
                    <FaStethoscope />
                  </button>
                  {/* <button className="btn btn-danger mx-1 rounded-circle">
                    <MdDeleteForever />
                  </button> */}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal KhamBenh */}
      <div
        className="modal fade modal-xl"
        id="idkb"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Thông tin phiếu khám {selectedRow?.MAPK}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {}}
              ></button>
            </div>

            <div className="modal-body ">
              <div className="container-fluid">
                <NavTabVertical
                  tabsData={tabsDataCTKB}
                  MAPK={selectedRow?.MAPK}
                />
              </div>
            </div>
            {/* <div className="modal-footer">
              <button
                id="cancelBtn"
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
                onClick={() => handleSave}
              >
                Lưu những thay đổi
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Modal CLS */}
      <div
        className="modal fade modal-xl"
        id="ketquacls"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <CLSForm
              formData={selectedRow}
              handleChange={() => {}}
              handleImageUpload={() => {}}
            />
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#idkb"
                id="closeBtn10"
                onClick={handleCancel}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const CLSForm = ({
  formData,
  handleChange,
  handleUpdate,
  handleImageUpload,
  handleCancel,
}) => {
  return (
    // <div className="modal-dialog modal-dialog-scrollable">
    //   <div className="modal-content">
    <>
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">
          Thông tin phiếu CLS{formData?.MAKQ}
        </h1>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>

      <div className="modal-body py-0">
        <div className="container-fluid p-0">
          <table className="table">
            <tr className="row">
              <th className="border col col-md-1">Bệnh nhân</th>
              <td className="border col col-md-3">{formData?.TENBN}</td>
              <th className="border col col-md-1">Bác sĩ chỉ định</th>
              <td className="border col col-md-3">{formData?.INFOBSCD}</td>
              <th className="border col col-md-1">Trạng thái</th>
              <td className="border col col-md-3">{formData?.TRANGTHAITH}</td>
            </tr>
            <tr className="row">
              <th className="border col col-md-1">Dịch vụ</th>
              <td className="border col col-md-3">{formData?.TENDV}</td>
              <th className="border col col-md-1">Bác sĩ thực hiện</th>
              <td className="border col col-md-3">{formData?.INFOBSTH}</td>
              <th className="border col col-md-1">Thời gian</th>
              <td className="border col col-md-3">
                {formData?.NGAYKHAM
                  ? format(formData?.NGAYKHAM, "dd/MM/yyyy - HH:mm")
                  : ""}
              </td>
            </tr>
          </table>

          <div className="row">
            <div className="col col-md-6">
              <TextArea
                title={"Mô tả"}
                size={12}
                row={10}
                value={formData.MOTA ? formData.MOTA : ""}
                onChange={(value) => handleChange("MOTA", value)}
              />
              <div className="row p-2">
                <TextArea
                  title={"Kết luận"}
                  size={6}
                  row={3}
                  value={formData.KETLUANCLS ? formData.KETLUANCLS : ""}
                  onChange={(value) => handleChange("KETLUANCLS", value)}
                />
              </div>
            </div>
            <div className="col col-md-6">
              {/* khong biet lay mapk*/}
              {formData.MAPK && (
                <ImageUpload
                  imageUrl={formData.IMAGE}
                  onImageUpload={handleImageUpload}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
    // {/* <div className="modal-footer">
    //   <button
    //     type="button"
    //     className="btn btn-secondary"
    //     data-bs-dismiss="modal"
    //     id="closeBtn10"
    //     onClick={handleCancel}
    //   >
    //     Đóng
    //   </button>
    //   <button
    //     type="button"
    //     className="btn btn-primary"
    //     onClick={handleUpdate}
    //   >
    //     Lưu những thay đổi
    //   </button>
    // </div> */}
    //   </div>
    // </div>
  );
};

export function ListFormCLS({ columns, data, loading }) {
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState({});
  const [formData, setFormData] = useState({});
  const [resetKey, setResetKey] = useState(Date.now());

  const handleRowClick = (row) => {
    console.log("row:", row);
    setFormData({
      MAPK: row.MAPK,
      MAKQ: row.MAKQ,
      TRANGTHAITH: row.TRANGTHAITH,
      MOTA: row.MOTA === null ? "" : row.MOTA,
      KETLUANCLS: row.KETLUANCLS === null ? "" : row.KETLUANCLS,
      TENBN: row.TENBN,
      INFOBSCD: row.INFOBSCD,
      TENDV: row.TENDV,
      INFOBSTH: row.INFOBSTH,
      NGAYKHAM: row.NGAYKHAM,
      IMAGE: !row.IMAGE || row.IMAGE === null ? null : row.IMAGE,
      MABN: row.MABN,
    });
  };

  const handleUpdate = async (e) => {
    console.log("formData: ", formData);
    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }
    const response = await axios.post("/cls/update-cls", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      dispatch(fetchAllClsAction());
      socket.emit("send-message", { actionName: "DSCLS" });
      socket.emit("send-message", {
        actionName: "CLSBYIDPK",
        maID: formData.MAPK,
        maBN: formData.MABN,
        title: "Kết quả " + formData.TENDV,
        message: `Mời BN ${formData.TENBN} nhận kết quả ${formData.TENDV} tại phòng khám. Xem kết quả và hình ảnh chụp tại mục Quy trình khám trên app BCarefull`,
      });

      const closeBtn = document.getElementById("closeBtn10");
      if (closeBtn) {
        closeBtn.click();
      }
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleImageUpload = (files) => {
    setFormData({ ...formData, image: files[0] });
    toast.success("Cập nhật ảnh thành công");
  };

  const handleCancel = () => {
    setResetKey(Date.now());
  };

  return (
    <>
      {/* ListForm */}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col">
                {column.title}
              </th>
            ))}
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 3}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>Loading...</strong>
                  <div className="spinner-border ms-2" role="status"></div>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="text-center">Không tìm thấy dữ liệu</div>
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => handleRowClick(row)}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {typeof row[column.key] !== "string" ||
                    row[column.key] === ""
                      ? row[column.key]
                      : row[column.key].split("\n")?.map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                  </td>
                ))}
                <td>
                  <div className="pt-2 d-flex" style={{ gap: "10px" }}>
                    <TTK value={row.TRANGTHAITH} />
                    <TTCLS value={row.TTTT} />
                  </div>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary rounded-circle"
                    data-bs-toggle="modal"
                    data-bs-target="#idcls"
                  >
                    <FaStethoscope />
                  </button>
                  {/* <button
                    type="button"
                    className="btn btn-danger mx-1"
                    data-bs-toggle="modal"
                    data-bs-target="#huyPhieu"
                  >
                    Hủy
                  </button> */}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal CLS */}
      <div
        className="modal fade modal-xl"
        id="idcls"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        key={resetKey}
      >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <CLSForm
              formData={formData}
              handleChange={handleChange}
              handleImageUpload={handleImageUpload}
            />
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="closeBtn10"
                onClick={handleCancel}
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Lưu những thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*Bạn có chắc muốn hủy phiếu CLS*/}
      <div
        class="modal fade"
        id="huyPhieu"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <CLSForm
              formData={formData}
              handleChange={handleChange}
              handleImageUpload={handleImageUpload}
            />
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="closeBtn10"
                onClick={handleCancel}
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Lưu những thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ListFormDVCLS({ columns, data, loading, handleDelete }) {
  const dispatch = useDispatch();
  const handleInspectKQ = (row) => {
    dispatch(selectRow(row));
  };

  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th key={index} scope="col">
                {column.title}
              </th>
            ))}
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 2}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>Loading...</strong>
                  <div className="spinner-border ms-2" role="status"></div>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="text-center">Không tìm thấy dữ liệu</div>
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns?.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
                <td>
                  <button
                    className="btn btn-primary rounded-circle"
                    data-bs-toggle="modal"
                    data-bs-target="#ketquacls"
                    onClick={() => handleInspectKQ(row)}
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export function ListFormDSBenhNhan({ columns, data, loading }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const selectedRow = useSelector((state) => state.selectedRow?.selectedRow);
  const lichSuKham = useSelector((state) => state.fetchDSDK.lskByIdBn) || [];

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age > 0 ? age : 0;
  };

  const handleRowClick = (row) => {
    dispatch(fetchLSKByIdBnAction(row?.MABN));
    dispatch(selectRow(row));
    setFormData({
      maBN: row.MABN,
      hoTen: row.HOTEN,
      email: row.EMAIL,
      cccd: row.CCCD,
      gioiTinh: row.GIOITINH,
      ngaySinh: new Date(row.NGAYSINH),
      soDienThoai: row.SDT,
      diaChi: row.DIACHI,
      tienSuBenh: row.TIENSUBENH,
      diUng: row.DIUNG,
    });
  };

  const defaultObjValidInput = {
    isValidHoTen: true,
    isValidEmail: true,
    isValidCCCD: true,
    isValidGioiTinh: true,
    isValidNgaySinh: true,
    isValidSoDienThoai: true,
    isValidDiaChi: true,
    isValidTienSuBenh: true,
    isValidDiUng: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setObjValidInput(defaultObjValidInput);
    if (!formData.hoTen) {
      setObjValidInput({ ...objValidInput, isValidHoTen: false });
      toast.error("Chưa nhập tên bệnh nhân");
      return;
    }
    if (!formData.email) {
      setObjValidInput({ ...objValidInput, isValidEmail: false });
      toast.error("Chưa nhập email");
      return;
    }
    if (!formData.gioiTinh || formData.gioiTinh === 0) {
      setObjValidInput({ ...objValidInput, isValidGioiTinh: false });
      toast.error("Chưa chọn giới tính");
      return;
    }
    if (!formData.ngaySinh || formData.ngaySinh === 0) {
      setObjValidInput({ ...objValidInput, isValidNgaySinh: false });
      toast.error("Chưa nhập ngày sinh");
      return;
    }
    if (!formData.soDienThoai || formData.soDienThoai === 0) {
      setObjValidInput({ ...objValidInput, isValidSoDienThoai: false });
      toast.error("Chưa nhập số diện thoại");
      return;
    }
    if (!formData.diaChi) {
      setObjValidInput({ ...objValidInput, isValidDiaChi: false });
      toast.error("Chưa nhập địa chỉ");
      return;
    }
    if (!formData.tienSuBenh) {
      setObjValidInput({ ...objValidInput, isValidTienSuBenh: false });
      toast.error("Chưa nhập tiền sử bệnh");
      return;
    }
    if (!formData.diUng) {
      setObjValidInput({ ...objValidInput, isValidDiUng: false });
      toast.error("Chưa nhập dị ứng");
      return;
    }

    const response = await axios.post("/benhnhan/update", formData);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      dispatch(fetchAllBenhNhanAction());
      const cancelBtn = document.getElementById("cancelBtn7");
      if (cancelBtn) {
        cancelBtn.click();
      }
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  return (
    <>
      {/* ListForm */}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col">
                {column.title}
              </th>
            ))}
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 3}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>Loading...</strong>
                  <div className="spinner-border ms-2" role="status"></div>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="text-center">Không tìm thấy dữ liệu</div>
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => handleRowClick(row)}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {typeof row[column.key] !== "string" ||
                    row[column.key] === ""
                      ? row[column.key]
                      : row[column.key].split("\n").map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                  </td>
                ))}
                <td>
                  <button
                    type="button"
                    className="btn btn-primary rounded-circle"
                    data-bs-toggle="modal"
                    data-bs-target="#updateBenhNhan"
                  >
                    <FaEye />
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary mx-1 rounded-circle"
                    data-bs-toggle="modal"
                    data-bs-target="#lichsukham"
                  >
                    <FaStethoscope />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Modal update */}
      <div
        className="modal fade modal-lg"
        id="updateBenhNhan"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Thông tin khách hàng
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row py-2">
                  <IFInputText
                    title={"Mã KH"}
                    readOnly={true}
                    size={2}
                    value={formData.maBN}
                    valid={objValidInput.isValidGioiTinh}
                  />
                  <IFInputText
                    title={"Tên khách hàng"}
                    size={4}
                    required={"true"}
                    value={formData.hoTen}
                    valid={objValidInput.isValidHoTen}
                    onChange={(value) => handleChange("hoTen", value)}
                  />
                  <IFInputText
                    title={"Email"}
                    size={4}
                    required={"true"}
                    value={formData.email}
                    valid={objValidInput.isValidEmail}
                    onChange={(value) => handleChange("email", value)}
                  />
                  <IFSelect
                    title={"Giới tính"}
                    size={2}
                    required={"true"}
                    keyObj={"gioiTinh"}
                    showObj={"gioiTinh"}
                    options={[
                      { gioiTinh: "Nam" },
                      { gioiTinh: "Nữ" },
                      { gioiTinh: "Khác" },
                    ]}
                    value={formData.gioiTinh}
                    valid={objValidInput.isValidGioiTinh}
                    onChange={(value) => handleChange("gioiTinh", value)}
                  />
                </div>
                <div className="row py-2">
                  <IFNgay
                    title={"Ngày sinh"}
                    size={3}
                    required={"true"}
                    value={formData.ngaySinh}
                    valid={objValidInput.isValidNgaySinh}
                    onChange={(value) => handleChange("ngaySinh", value)}
                  />
                  <IFInputText
                    title={"Tuổi"}
                    readOnly={true}
                    size={2}
                    value={calculateAge(formData.ngaySinh)}
                    onChange={(value) => handleChange(1)}
                  />
                  <IFInputText
                    title={"CCCD"}
                    size={4}
                    required={"true"}
                    value={formData.cccd}
                    valid={objValidInput.isValidCCCD}
                    onChange={(value) => handleChange("cccd", value)}
                  />
                  <IFInputText
                    title={"Số điện thoại"}
                    size={3}
                    required={"true"}
                    value={formData.soDienThoai}
                    valid={objValidInput.isValidSoDienThoai}
                    onChange={(value) => handleChange("soDienThoai", value)}
                  />
                </div>
                <div className="row py-2">
                  <IFInputText
                    title={"Địa chỉ"}
                    size={7}
                    value={formData.diaChi}
                    valid={objValidInput.isValidSoDienThoai}
                    onChange={(value) => handleChange("diaChi", value)}
                  />
                  <IFInputText
                    title={"Dị ứng"}
                    size={5}
                    value={formData.diUng}
                    valid={objValidInput.isValidDiUng}
                    onChange={(value) => handleChange("diUng", value)}
                  />
                </div>
                <div className="row py-2">
                  <IFInputText
                    title={"Tiền sử bệnh"}
                    size={12}
                    value={formData.tienSuBenh}
                    valid={objValidInput.isValidTienSuBenh}
                    onChange={(value) => handleChange("tienSuBenh", value)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                id="cancelBtn7"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Lịch sử khám */}
      <div
        className="modal fade modal-xl"
        id="lichsukham"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Lịch sử khám của BN{selectedRow?.MABN}: {selectedRow.HOTEN}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <LichSuKham />
              </div>
            </div>
            <div className="modal-footer">
              {/* <button
                id="cancelBtn"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleSave}
              >
                Lưu những thay đổi
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
