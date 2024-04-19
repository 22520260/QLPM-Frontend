import React, { useState, useEffect } from "react";
import {
  IFNgay,
  IFSearch,
} from "../../../../component/Layout/TabLayout/InputForm";
import ListForm from "../../../../component/Layout/TabLayout/ListForm";
import Pagination from "../../../../component/Layout/TabLayout/Pagination";
import { usePaginationHandler } from "../../../../utils/appUtils";
import { fetchData } from "../../../../redux/action/getDataAction";
import { useDispatch, useSelector } from "react-redux";

function DanhSachDangKy() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.getData.data);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [displayedCustomers, setDisplayedCustomers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const columns = [
    { title: "ID", key: "0" },
    { title: "Name", key: "1" },
    { title: "Bill", key: "2" },
    { title: "Status", key: "3" },
    { title: "Other", key: "4" },
  ];

  useEffect(() => {
    dispatch(fetchData("http://localhost:3001/tiepdon"));
  }, []);

  useEffect(() => {
    if (data) {
      let filteredCustomers = [...data]; // Tạo một bản sao của data để tránh thay đổi trực tiếp data

      // Lọc theo ngày bắt đầu và ngày kết thúc
      if (startDate && endDate) {
        filteredCustomers = filteredCustomers.filter((customer) => {
          const customerDate = new Date(customer[4]); // Thay "date" bằng thuộc tính chứa ngày trong đối tượng customer

          return customerDate >= startDate && customerDate <= endDate;
        });
      } else if (startDate) {
        // Chỉ có ngày bắt đầu
        filteredCustomers = filteredCustomers.filter((customer) => {
          const customerDate = new Date(customer[4]); // Thay "date" bằng thuộc tính chứa ngày trong đối tượng customer

          return customerDate >= startDate;
        });
      } else if (endDate) {
        // Chỉ có ngày kết thúc
        filteredCustomers = filteredCustomers.filter((customer) => {
          const customerDate = new Date(customer[4]); // Thay "date" bằng thuộc tính chứa ngày trong đối tượng customer

          return customerDate <= endDate;
        });
      }

      // Lọc theo từ khóa tìm kiếm
      if (searchKeyword) {
        filteredCustomers = filteredCustomers.filter((customer) =>
          customer[3].toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }

      const calculatedTotalPages = Math.ceil(filteredCustomers.length / limit);
      setTotalPages(calculatedTotalPages);

      const startIdx = (page - 1) * limit;
      const endIdx = Math.min(startIdx + limit, filteredCustomers.length);
      const pageCustomers = filteredCustomers.slice(startIdx, endIdx);
      setDisplayedCustomers(pageCustomers);
    }
  }, [data, page, limit, searchKeyword, startDate, endDate]);

  const handleIFSearchChange = (value) => {
    setSearchKeyword(value);
  };

  const handlePageChange = usePaginationHandler(setPage, page, totalPages);

  const handleChange_NBD = (value) => {
    setStartDate(value);
  };

  const handleChange_NKT = (value) => {
    setEndDate(value);
  };

  return (
    <>
      <div className="row py-2">
        <IFNgay title={"Từ ngày"} onChange={(value) => handleChange_NBD(value)} />
        <IFNgay title={"Đến ngày"} onChange={(value) => handleChange_NKT(value)} />
        <IFSearch
          title={"Tìm kiếm từ khóa"}
          size={4}
          onChange={handleIFSearchChange}
        />
      </div>

      <ListForm columns={columns} data={displayedCustomers} />
      <Pagination
        totalPages={totalPages}
        page={page}
        limit={limit}
        siblings={1}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default DanhSachDangKy;
