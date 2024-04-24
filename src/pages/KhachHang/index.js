import React, { useState, useEffect } from "react";
import { IFNgay, IFSearch } from "../../component/Layout/TabLayout/InputForm";
import {ListForm} from "../../component/Layout/TabLayout/ListForm";
import Pagination from "rsuite/esm/Pagination/Pagination";
import { usePaginationHandler } from "../../utils/appUtils";
import { fetchAllBenhNhanAction } from "../../redux/action/fetchDataAction/fetchAllBenhNhanAction";
import { useDispatch, useSelector } from "react-redux";
import { compareDates, formatDate } from "../../utils/appUtils";
import CTPhieuKham from "../../popups/CTPhieuKham";

function KhachHang() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchAllBenhNhan.patients);
  const isLoading = useSelector((state) => state.fetchAllBenhNhan.loading);

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
    dispatch(fetchAllBenhNhanAction());
  }, []);

  useEffect(() => {
    if (data) {
      let filteredCustomers = [...data]; // Tạo một bản sao của data để tránh thay đổi trực tiếp data

      // Lọc theo ngày bắt đầu và ngày kết thúc
      if (startDate && endDate) {
        filteredCustomers = filteredCustomers.filter((customer) => {
          const customerDate = new Date(customer[4]);
          return (
            compareDates(startDate, customerDate) >= 0 &&
            compareDates(customerDate, endDate) >= 0
          );
        });
      } else if (startDate) {
        // Chỉ có ngày bắt đầu
        filteredCustomers = filteredCustomers.filter((customer) => {
          const customerDate = new Date(customer[4]);

          return compareDates(startDate, customerDate) >= 0;
        });
      } else if (endDate) {
        // Chỉ có ngày kết thúc
        filteredCustomers = filteredCustomers.filter((customer) => {
          const customerDate = new Date(customer[4]);

          return compareDates(customerDate, endDate) >= 0;
        });
      }

      // Lọc theo từ khóa tìm kiếm
      if (searchKeyword) {
        filteredCustomers = filteredCustomers.filter((customer) =>
          customer[3].toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }

      const formattedCustomers = filteredCustomers.map((customer) => {
        const [
          mabn,
          matk,
          cccd,
          hoTen,
          ngaySinh,
          gioiTinh,
          sdt,
          diaChi,
          tienSuBenh,
          diUng,
        ] = customer;

        const formattedNgaySinh = formatDate(ngaySinh);

        return [
          mabn,
          matk,
          cccd,
          hoTen,
          formattedNgaySinh,
          gioiTinh,
          sdt,
          diaChi,
          tienSuBenh,
          diUng,
        ];
      });

      const calculatedTotalPages = Math.ceil(filteredCustomers.length / limit);
      setTotalPages(calculatedTotalPages);

      const startIdx = (page - 1) * limit;
      const endIdx = Math.min(startIdx + limit, filteredCustomers.length);
      const pageCustomers = formattedCustomers.slice(startIdx, endIdx);
      setDisplayedCustomers(pageCustomers);
    }
  }, [data, page, limit, searchKeyword, startDate, endDate]);

  const handleChange_NBD = (value) => {
    setStartDate(value);
  };

  const handleChange_NKT = (value) => {
    setEndDate(value);
  };

  const handleIFSearchChange = (value) => {
    setSearchKeyword(value);
  };

  const handlePageChange = usePaginationHandler(setPage, page, totalPages);

  return (
    <>
      <h1 className="container-fluid">Khách hàng</h1>

      <div className="mx-4">
        <div className="row py-2">
          <IFNgay
            title={"Từ ngày"}
            onChange={(value) => handleChange_NBD(value)}
          />
          <IFNgay
            title={"Đến ngày"}
            onChange={(value) => handleChange_NKT(value)}
          />
          <IFSearch
            title={"Tìm kiếm từ khóa"}
            size={4}
            onChange={(value) => handleIFSearchChange(value)}
          />
        </div>
        <ListForm columns={columns} data={displayedCustomers} loading={isLoading}/>
        <Pagination
          totalPages={totalPages}
          page={page}
          limit={limit}
          siblings={1}
          onPageChange={handlePageChange}
        />
      </div>

  {/* <CTPhieuKham /> */}
    </>
  );
}

export default KhachHang;
