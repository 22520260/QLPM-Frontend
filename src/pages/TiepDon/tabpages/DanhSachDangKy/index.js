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
      if (searchKeyword) {
        const filteredCustomers = data.filter((customer) =>
          customer[3].toLowerCase().includes(searchKeyword.toLowerCase())
        );      
        
        setTotalPages(Math.ceil(filteredCustomers.length / limit));
        console.log(totalPages)
        const startIdx = (page - 1) * limit;
        const endIdx = Math.min(startIdx + limit, filteredCustomers.length);
        const pageCustomers = filteredCustomers.slice(startIdx, endIdx);
        setDisplayedCustomers(pageCustomers);
      }
      else{
        setTotalPages(Math.ceil(data.length / limit));
        const startIdx = (page - 1) * limit;
        const endIdx = Math.min(startIdx + limit, data.length);
        const pageCustomers = data.slice(startIdx, endIdx);
        setDisplayedCustomers(pageCustomers);
      }
    }
  }, [data, page, limit, searchKeyword]);

  const handleIFSearchChange = (value) => {
    setSearchKeyword(value);
  };

  const handlePageChange = usePaginationHandler(setPage, page, totalPages);


  return (
    <>
      <div className="row py-2">
        <IFNgay title={"Từ ngày"} />
        <IFNgay title={"Đến ngày"} />
        <IFSearch
          title={"Tìm kiếm từ khóa"}
          size={4}
          onChange={(value) => handleIFSearchChange(value)}
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
