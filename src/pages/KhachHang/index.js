import React, { useState, useEffect } from "react";
import { IFNgay, IFSearch } from "../../component/Layout/TabLayout/InputForm";
import { ListFormDSDK } from "../../component/Layout/TabLayout/ListForm";
import { ListFormdsBenhNhan } from "../../component/Layout/TabLayout/ListForm";
import Pagination from "../../component/Layout/TabLayout/Pagination";
import { fetchDSDKAction } from "../../redux/action/fetchDataAction/fetchDSDKAction";
import { fetchAllBenhNhanAction } from "../../redux/action/fetchDataAction/fetchAllBenhNhanAction";
import { useDispatch, useSelector } from "react-redux";
import { compareDates, usePaginationHandler } from "../../utils/appUtils";

function DanhSachBenhNhan() {
  const dispatch = useDispatch();
  const dsBenhNhan = useSelector((state) => state.fetchAllBenhNhan?.data);
  const isLoadingBenhNhan = useSelector((state) => state.fetchAllBenhNhan?.isLoading);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [displaydsBenhNhan, setDisplaydsBenhNhan] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [totalPages, setTotalPages] = useState(0);


  const columns = [
    { title: "Mã Bệnh Nhân", key: "MABN" },
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
          data.TENBN.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }

      // const formatteddsBenhNhan = filtereddsBenhNhan.map(data => {
      //   const {MABN, MATK, CCCD, HOTEN, NGAYSINH, GIOITINH, SDT, DIACHI, TIENSUBENH, DIUNG} = patient;
      //   const formattedNgaySinh = formatDate(NGAYSINH);

      //   return {
      //     MABN,
      //     MATK,
      //     CCCD,
      //     HOTEN,
      //     formattedNgaySinh,
      //     GIOITINH,
      //     SDT,
      //     DIACHI,
      //     TIENSUBENH,
      //     DIUNG
      //   };
      // });

      const calculatedTotalPages = Math.ceil(filtereddsBenhNhan.length / limit);
      setTotalPages(calculatedTotalPages);

      const startIdx = (page - 1) * limit;
      const endIdx = Math.min(startIdx + limit, filtereddsBenhNhan.length);
      const pagedsBenhNhan = filtereddsBenhNhan.slice(startIdx, endIdx);

      setDisplaydsBenhNhan(pagedsBenhNhan);
    }
  }, [dsBenhNhan, page, limit, searchKeyword]);




  const handleIFSearchChange = (value) => {
    setSearchKeyword(value);
  };

  const handlePageChange = usePaginationHandler(setPage, page, totalPages);

  return (
    <>
      <div className="container-fluid">
        <div className="row py-2">
          <IFSearch
            title={"Tìm kiếm từ khóa"}
            size={4}
            onChange={(value) => handleIFSearchChange(value)}
          />
        </div>

        <ListFormdsBenhNhan
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
