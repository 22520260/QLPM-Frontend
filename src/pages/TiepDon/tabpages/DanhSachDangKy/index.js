import {
    IFNgay,
    IFSearch,
  } from "../../../../component/Layout/TabLayout/InputForm";
  import ListForm from "../../../../component/Layout/TabLayout/ListForm";
  import { useState, useEffect } from "react";
  import Pagination from "../../../../component/Layout/TabLayout/Pagination";
  
  function DanhSachDangKy() {
    const [page, setPage] = useState(1);
    const limit = 5;
    const [customers, setCustomers] = useState([]);
    const [displayedCustomers, setDisplayedCustomers] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:3001/tiepdon")
        .then((response) => response.json())
        .then((data) => {
          setCustomers(data);
          console.log("Customers:", data);
        })
        .catch((error) => {
          console.error("Error fetching customers:", error);
        });
    }, []);
  
    useEffect(() => {
      // Tính toán danh sách khách hàng được hiển thị trên trang hiện tại
      const startIdx = (page - 1) * limit;
      const endIdx = Math.min(startIdx + limit, customers.length);
      const pageCustomers = customers.slice(startIdx, endIdx);
      setDisplayedCustomers(pageCustomers);
    }, [customers, page, limit]);
  
    const totalPages = Math.ceil(customers.length / limit);
  
    function handlePageChange(value) {
      if (value === "&laquo;" || value === "... ") setPage(1);
      else if (value === "&lsaquo;") {
        if (page !== 1) setPage(page - 1);
      } else if (value === "&rsaquo;") {
        if (page !== totalPages) setPage(page + 1);
      } else if (value === "&raquo;" || value === " ...") {
        setPage(totalPages);
      } else {
        setPage(value);
      }
    }
  
    return (
      <>
        <div className="row py-2">
          <IFNgay title={"Từ ngày"} />
          <IFNgay title={"Đến ngày"} />
          <IFSearch title={"Tìm kiếm từ khóa"} size={4} />
        </div>
  
        <ListForm customers={displayedCustomers} />
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
  