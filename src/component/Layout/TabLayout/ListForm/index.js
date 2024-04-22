import React, { useState } from "react";

function ListForm({ columns, data, loading }) {
  const [selectedId, setSelectedId] = useState(null);

  function handleRowClick(row) {
    console.log(row); // Log row object when clicked
  }

  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            // <tr>
            //   <div class="d-flex align-items-center" colSpan={columns.length}>
            //     <strong role="status">Loading...</strong>
            //     <div class="spinner-border ms-auto" aria-hidden="true"></div>
            //   </div>
            // </tr>
            <tr>
              <td colSpan={columns.length}>
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
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default ListForm;
