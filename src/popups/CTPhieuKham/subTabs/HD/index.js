import React from "react";
import { useSelector } from "react-redux";
import { ListForm } from "../../../../component/Layout/TabLayout/ListForm";
function HoaDon() {
  const doctors = useSelector((state) => state.fetchAllBacSi.doctors);

  const handleChange = (page) => {
    console.log(page);
  };

  const columns = [
    { title: "Mã hóa đơn", key: "0" },
    { title: "Loại", key: "2" },
    { title: "Tổng tiền", key: "3" },
    { title: "Trạng thái", key: "4" },
    { title: "Thời gian thanh toán", key: "5" },
  ];

  return (
    <div className="shadow rounded">
      {/* Thông tin */}
      <div className="px-3 py-2 d-flex justify-content-center bg-primary rounded-top">
        Dịch vụ - Đơn thuốc
      </div>
      <div class="container rounded py-2">
        <div class="table-responsive">
          <table class="table accordion">
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
              {doctors.map((row, rowIndex) =>
                rowIndex === 0 ? (
                  <tr
                    data-bs-toggle="collapse"
                    data-bs-target="#r0"
                    key={rowIndex}
                  >
                    {columns.map((column, colIndex) => (
                      <td key={colIndex}>
                        {column.render ? column.render(row) : row[column.key]}
                      </td>
                    ))}
                  </tr>
                ) : null
              )}
              <tr
                class="collapse accordion-collapse"
                id="r0"
                data-bs-parent=".table"
              >
                <td colspan="5">
                  <div className="py-3 border border-primary">
                    <ListForm columns={columns} data={doctors}></ListForm>
                  </div>
                </td>
              </tr>
              {doctors.map((row, rowIndex) =>
                rowIndex === 1 ? (
                  <tr
                    data-bs-toggle="collapse"
                    data-bs-target="#r1"
                    key={rowIndex}
                  >
                    {columns.map((column, colIndex) => (
                      <td key={colIndex}>
                        {column.render ? column.render(row) : row[column.key]}
                      </td>
                    ))}
                  </tr>
                ) : null
              )}
              <tr
                class="collapse accordion-collapse"
                id="r1"
                data-bs-parent=".table"
              >
                <td colspan="5">
                  <div className="py-3 border border-primary">
                    <ListForm columns={columns} data={doctors}></ListForm>
                  </div>
                </td>
              </tr>
              {doctors.map((row, rowIndex) =>
                rowIndex === 2 ? (
                  <tr
                    data-bs-toggle="collapse"
                    data-bs-target="#r2"
                    key={rowIndex}
                  >
                    {columns.map((column, colIndex) => (
                      <td key={colIndex}>
                        {column.render ? column.render(row) : row[column.key]}
                      </td>
                    ))}
                  </tr>
                ) : null
              )}
              <tr
                class="collapse accordion-collapse"
                id="r2"
                data-bs-parent=".table"
              >
                <td colspan="5">
                  <div className="py-3 border border-primary">
                    <ListForm columns={columns} data={doctors}></ListForm>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HoaDon;
