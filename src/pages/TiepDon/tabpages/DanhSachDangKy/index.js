import React, { useState, useEffect } from "react";
import {
  IFNgay,
  IFSearch,
} from "../../../../component/Layout/TabLayout/InputForm";
import { ListFormAddBtnThanhToanAndChiTiet } from "../../../../component/Layout/TabLayout/ListForm";
import Pagination from "../../../../component/Layout/TabLayout/Pagination";
import { usePaginationHandler } from "../../../../utils/appUtils";
import { fetchAllBenhNhanAction } from "../../../../redux/action/fetchDataAction/fetchAllBenhNhanAction";
import { useDispatch, useSelector } from "react-redux";
import { compareDates, formatDate } from "../../../../utils/appUtils";

function DanhSachDangKy() {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.fetchAllBenhNhan.patients);
  const isLoading = useSelector((state) => state.fetchAllBenhNhan.loading);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [displayedPatients, setDisplayedPatients] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const columns = [
    { title: "Mã phiếu", key: "MABN" },
    { title: "STT", key: "MABN" },
    { title: "Họ Tên", key: "HOTEN" },
    { title: "Tên Bác sĩ", key: "HOTEN" },
    { title: "Tổng tiền", key: "HOTEN" },
    { title: "Trạng thái", key: "HOTEN" },
  ];

  useEffect(() => {
    dispatch(fetchAllBenhNhanAction());
  }, []);

  useEffect(() => {
    if (patients) {
      let filteredPatients = [...patients]; // Tạo một bản sao của data để tránh thay đổi trực tiếp data
      // Lọc theo ngày bắt đầu và ngày kết thúc
      if (startDate && endDate) {
        filteredPatients = filteredPatients.filter((patient) => {
          const patientDate = new Date(patient.NGAYSINH);
          return (
            compareDates(startDate, patientDate) >= 0 &&
            compareDates(patientDate, endDate) >= 0
          );
        });
      } else if (startDate) {
        // Chỉ có ngày bắt đầu
        filteredPatients = filteredPatients.filter((patient) => {
          const patientDate = new Date(patient.NGAYSINH);

          return compareDates(startDate, patientDate) >= 0;
        });
      } else if (endDate) {
        // Chỉ có ngày kết thúc
        filteredPatients = filteredPatients.filter((patient) => {
          const patientDate = new Date(patient.NGAYSINH);

          return compareDates(patientDate, endDate) >= 0;
        });
      }

      // Lọc theo từ khóa tìm kiếm
      if (searchKeyword) {
        filteredPatients = filteredPatients.filter((patient) =>
          patient.HOTEN.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }

      const formattedPatients = filteredPatients.map((patient) => {
        const {
          MABN,
          MATK,
          CCCD,
          HOTEN,
          NGAYSINH,
          GIOITINH,
          SDT,
          DIACHI,
          TIENSUBENH,
          DIUNG,
        } = patient;
        const formattedNgaySinh = formatDate(NGAYSINH);

        return {
          MABN,
          MATK,
          CCCD,
          HOTEN,
          formattedNgaySinh,
          GIOITINH,
          SDT,
          DIACHI,
          TIENSUBENH,
          DIUNG,
        };
      });

      const calculatedTotalPages = Math.ceil(filteredPatients.length / limit);
      setTotalPages(calculatedTotalPages);

      const startIdx = (page - 1) * limit;
      const endIdx = Math.min(startIdx + limit, filteredPatients.length);
      const pagePatients = formattedPatients.slice(startIdx, endIdx);

      setDisplayedPatients(pagePatients);
    }
  }, [patients, page, limit, searchKeyword, startDate, endDate]);

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
        <IFNgay
          title={"Từ ngày"}
          size={2}
          onChange={(value) => handleChange_NBD(value)}
        />
        <IFNgay
          title={"Đến ngày"}
          size={2}
          onChange={(value) => handleChange_NKT(value)}
        />
        <IFSearch
          title={"Tìm kiếm từ khóa"}
          size={4}
          onChange={(value) => handleIFSearchChange(value)}
        />
      </div>

      <ListFormAddBtnThanhToanAndChiTiet
        columns={columns}
        data={displayedPatients}
        loading={isLoading}
      />
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
