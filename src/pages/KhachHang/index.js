import React, { useState, useEffect } from "react";
import { IFNgay, IFSearch } from "../../component/Layout/TabLayout/InputForm";
import ListForm from "../../component/Layout/TabLayout/ListForm";
import Pagination from "rsuite/esm/Pagination/Pagination";
import { usePaginationHandler } from "../../utils/appUtils";
import { fetchData } from "../../redux/action/getDataAction";
import { useDispatch, useSelector } from "react-redux";

function KhachHang() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.getData.data);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5); 
  const [displayedCustomers, setDisplayedCustomers] = useState([]);

  const columns = [
    { title: "ID", key: "0" },
    { title: "Name", key: "1" },
    { title: "Bill", key: "2" },
    { title: "Status", key: "3" },
    { title: "Other", key: "4" },
  ];

  const totalPages = data ? Math.ceil(data.length / limit) : 0;

  const handlePageChange = usePaginationHandler(setPage, page, totalPages);

  useEffect(() => {
    dispatch(fetchData("http://localhost:3001/tiepdon"));
  }, []);

  useEffect(() => {
    if (data) {
      const startIdx = (page - 1) * limit;
      const endIdx = Math.min(startIdx + limit, data.length);
      const pageCustomers = data.slice(startIdx, endIdx);
      setDisplayedCustomers(pageCustomers);
    }
  }, [data, page, limit]);

  return (
    <>
      <div className="row py-2">
        <IFNgay title={"Từ ngày"} />
        <IFNgay title={"Đến ngày"} />
        <IFSearch title={"Tìm kiếm từ khóa"} size={4} />
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

export default KhachHang;
