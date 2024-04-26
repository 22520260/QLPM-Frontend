import React, { useState } from "react";
import CTPhieuKham from "../../../../popups/CTPhieuKham";
import ThanhToan from "../../../../popups/ThanhToan";
import { FaEye, FaDollarSign } from "react-icons/fa";
import NavTabVertical from "../../../NavTabVertical";
import Navtab from "../../../Navtab";
import { tabsDataCTPK } from "../../../../popups/CTPhieuKham/data";
import { tabsDataTT } from "../../../../popups/ThanhToan/data";
import { ListGroupItem, TextArea } from "../InputForm";

export function ListForm({ columns, data, loading, onDeleteService }) {
  function handleRowClick(row) {
    console.log(row); // Log row object when clicked
  }

  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            {columns.map((column, index) => (
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
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => handleRowClick(row)}>
                <td>{rowIndex + 1}</td>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDeleteService(rowIndex)}
                  >
                    Xóa
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

export function ListFormAddBtnThanhToanAndChiTiet({ columns, data, loading }) {
  const [selectedRow, setSelectedRow] = useState([]);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    console.log("selectedRow", selectedRow);
  };
  const handleSave = () => {
    console.log("SAVE");
  };

  const handleThanhToan = () => {
    console.log("Thanh toan");
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
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => handleRowClick(row)}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
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
                  {/* <CTPhieuKham info={selectedRow} id={rowIndex}/>
                  <ThanhToan props={selectedRow} /> */}
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
                Thông tin phiếu khám {selectedRow[0]}
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
                <NavTabVertical tabsData={tabsDataCTPK} />
              </div>
            </div>
            <div className="modal-footer">
              <button
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
              </button>
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
                Thanh toán
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
                  <div className="col-9">
                    <Navtab tabsData={tabsDataTT} />
                  </div>
                  <div className="col-3">
                    <ListGroupItem
                      title={"Khách hàng"}
                      value={"Doan Danh Du"}
                      disable={true}
                    />
                    <ListGroupItem
                      title={"Người bán"}
                      value={"Le Thi Thanh Thao"}
                    />
                    <ListGroupItem title={"Ngày bán"} value={"25/4/2004"} />
                    <ListGroupItem title={"Mã phiếu"} value={selectedRow[0]} disable={true}/>
                    <ListGroupItem title={"Tổng tiền"} value={"4.370.000"} disable={true}/>
                    <ListGroupItem title={"Giảm giá"} value={"0"} />
                    <ListGroupItem title={"Thành tiền"} value={"4.370.000"} disable={true}/>
                    <ListGroupItem
                      title={"Phương thức TT"}
                      value={"Tiền mặt"}
                    />
                    <TextArea title={"Ghi chú"} value={""} />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleThanhToan}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ListFormThuoc({ columns, data, loading }) {
  const [selectedRow, setSelectedRow] = useState([]);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    console.log("selectedRow", selectedRow);
  };
  const handleSave = () => {
    console.log("SAVE");
  };

  const handleThanhToan = () => {
    console.log("Thanh toan");
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
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => handleRowClick(row)}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
                <td>
                  <button
                    type="button"
                    className="btn btn-primary rounded-circle"
                    data-bs-toggle="modal"
                    data-bs-target="#idctlt"
                  >
                    <FaEye />
                  </button>
                  
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal ChiTietLoThuoc */}
      <div
        className="modal fade modal-xl"
        id="idctlt"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Thông tin phiếu khám {selectedRow[0]}
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
                <NavTabVertical tabsData={tabsDataCTPK} />
              </div>
            </div>
            <div className="modal-footer">
              <button
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
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
