import React, { useState, useEffect } from "react";
import {
  IFNgay,
  IFSearch,
} from "../../../../component/Layout/TabLayout/InputForm";
import { ListFormDSDK } from "../../../../component/Layout/TabLayout/ListForm";
import Pagination from "../../../../component/Layout/TabLayout/Pagination";
import { usePaginationHandler } from "../../../../utils/appUtils";
import { fetchDSDKAction } from "../../../../redux/action/fetchDataAction/fetchDSDKAction";
import { useDispatch, useSelector } from "react-redux";
import { compareDates, formatDate } from "../../../../utils/appUtils";


function DanhSachDangKy() {
  const dispatch = useDispatch();
  const DSDK = useSelector((state) => state.fetchDSDK?.data);
  const isLoading = useSelector((state) => state.fetchDSDK?.isLoading);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [displayDSDK, setDisplayDSDK] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const columns = [
    { title: "Mã phiếu", key: "MAPKTG" }, 
    { title: "STT", key: "STT" },
    { title: "Bệnh nhân", key: "INFOBN" },
    { title: "Bác sĩ", key: "INFOBS" },
    { title: "Dịch vụ", key: "TENDV" },
    // { title: "TTTT HDPK", key: "TTTTPK" },
    // { title: "TTTT HDCLS", key: "TTTTCLS" },
    // { title: "TTTT HDTH", key: "TTTTDTH" },
  ];

  useEffect(() => {
    dispatch(fetchDSDKAction());
  }, []);

  useEffect(() => {
    if (DSDK) {
      let filteredDSDK = [...DSDK];
      // Lọc theo ngày bắt đầu và ngày kết thúc
      if (startDate && endDate) {
        filteredDSDK = filteredDSDK.filter((data) => {
          const formatedNGAYKHAM = new Date(data.NGAYKHAM);
          return (
            compareDates(startDate, formatedNGAYKHAM) >= 0 &&
            compareDates(formatedNGAYKHAM, endDate) >= 0
          );
        });
      } else if (startDate) {
        // Chỉ có ngày bắt đầu
        filteredDSDK = filteredDSDK.filter((data) => {
          const formatedNGAYKHAM = new Date(data.NGAYKHAM);

          return compareDates(startDate, formatedNGAYKHAM) >= 0;
        });
      } else if (endDate) {
        // Chỉ có ngày kết thúc
        filteredDSDK = filteredDSDK.filter((data) => {
          const formatedNGAYKHAM = new Date(data.NGAYKHAM);

          return compareDates(formatedNGAYKHAM, endDate) >= 0;
        });
      }

      // Lọc theo từ khóa tìm kiếm
      if (searchKeyword) {
        filteredDSDK = filteredDSDK.filter((data) =>
          data.TENBN.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }

      // const formattedDSDK = filteredDSDK.map(data => {
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

      const calculatedTotalPages = Math.ceil(filteredDSDK.length / limit);
      setTotalPages(calculatedTotalPages);

      const startIdx = (page - 1) * limit;
      const endIdx = Math.min(startIdx + limit, filteredDSDK.length);
      const pageDSDK = filteredDSDK.slice(startIdx, endIdx);

      setDisplayDSDK(pageDSDK);
    }
  }, [DSDK, page, limit, searchKeyword, startDate, endDate]);

  const handleIFSearchChange = (value) => {
    setSearchKeyword(value);
  };

  const handleChange_NBD = (value) => {
    setStartDate(value);
  };

  const handleChange_NKT = (value) => {
    setEndDate(value);
  };

  const handlePageChange = usePaginationHandler(setPage, page, totalPages);

  return (
    <>
      <div className="row p-3">
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

      <div className="px-3">
        <ListFormDSDK columns={columns} data={displayDSDK} loading={isLoading} />
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

export default DanhSachDangKy;
