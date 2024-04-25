import React, { useState } from "react";
import { FaEye, FaCommentDollar } from "react-icons/fa";
import CTPhieuKham from "../../../../popups/CTPhieuKham";

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
                <td>{rowIndex + 1}</td>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
                <td>
                  <CTPhieuKham props={row}/>
                  <button className="btn btn-primary ml-">
                    <FaCommentDollar />
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

export function ListFormThuoc({ columns, data, loading }) {
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
                <td>{rowIndex + 1}</td>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
                <td>
                  <CTPhieuKham props={row}/>
                  <button className="btn btn-primary ml-">
                    <FaCommentDollar />
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