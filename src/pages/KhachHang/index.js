import React, { useState, useEffect } from "react";
import { IFNgay, IFSearch } from "../../component/Layout/TabLayout/InputForm";
import { ListFormDSDK } from "../../component/Layout/TabLayout/ListForm";
import { ListFormDSBenhNhan } from "../../component/Layout/TabLayout/ListForm";
import Pagination from "../../component/Layout/TabLayout/Pagination";
import { fetchDSDKAction } from "../../redux/action/fetchDataAction/fetchDSDKAction";
import { fetchAllBenhNhanAction } from "../../redux/action/fetchDataAction/fetchAllBenhNhanAction";
import { useDispatch, useSelector } from "react-redux";
import {
  compareDates,
  usePaginationHandler,
  formatDate,
} from "../../utils/appUtils";

function DanhSachBenhNhan() {
  const dispatch = useDispatch();
  const dsBenhNhan = useSelector((state) => state.fetchAllBenhNhan?.data);
  const isLoadingBenhNhan = useSelector(
    (state) => state.fetchAllBenhNhan?.isLoading
  );
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [displaydsBenhNhan, setDisplaydsBenhNhan] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const columns = [
    { title: "Mã khách hàng", key: "MABN" },
    { title: "CCCD", key: "CCCD" },
    { title: "Họ tên", key: "HOTEN" },
    { title: "Giới tính", key: "GIOITINH" },
    { title: "Ngày sinh", key: "NGAYSINH" },
    { title: "Số điện thoại", key: "SDT" },
    { title: "Địa chỉ", key: "DIACHI" },
  ];

  useEffect(() => {
    dispatch(fetchAllBenhNhanAction());
  }, []);

  console.log(dsBenhNhan);
  useEffect(() => {
    if (dsBenhNhan) {
      console.log(dsBenhNhan);
      let filtereddsBenhNhan = [...dsBenhNhan];

      // Lọc theo từ khóa tìm kiếm
      if (searchKeyword) {
        filtereddsBenhNhan = filtereddsBenhNhan.filter((data) =>
          data.HOTEN.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }

      const formatteddsBenhNhan = filtereddsBenhNhan.map((data) => {
        return {
          ...data,
          NGAYSINH: formatDate(data.NGAYSINH),
        };
      });

      const calculatedTotalPages = Math.ceil(filtereddsBenhNhan.length / limit);
      setTotalPages(calculatedTotalPages);

      const startIdx = (page - 1) * limit;
      const endIdx = Math.min(startIdx + limit, filtereddsBenhNhan.length);
      const pagedsBenhNhan = formatteddsBenhNhan.slice(startIdx, endIdx);

      setDisplaydsBenhNhan(pagedsBenhNhan);
    }
  }, [dsBenhNhan, page, limit, searchKeyword]);

  const handleIFSearchChange = (value) => {
    console.log("handle filter: ", value);
    setSearchKeyword(value);
  };

  const handlePageChange = usePaginationHandler(setPage, page, totalPages);

  return (
    <>
      <div className="container-fluid">
        <h1>Khách hàng</h1>
        <div className="row py-2">
          <IFSearch
            title={"Tìm kiếm theo tên bệnh nhân"}
            size={4}
            onChange={(value) => handleIFSearchChange(value)}
          />
        </div>

        <ListFormDSBenhNhan
          columns={columns}
          data={displaydsBenhNhan}
          loading={isLoadingBenhNhan}
        />
        <Pagination
          totalPages={totalPages}
          page={page}
          limit={limit}
          siblings={1}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default DanhSachBenhNhan;
