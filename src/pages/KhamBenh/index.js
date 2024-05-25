import React, { useState, useEffect } from "react";
import { IFNgay, IFSearch } from "../../component/Layout/TabLayout/InputForm";
import { ListFormKhamBenh } from "../../component/Layout/TabLayout/ListForm";
import Pagination from "../../component/Layout/TabLayout/Pagination";
import { fetchDSDKAction } from "../../redux/action/fetchDataAction/fetchDSDKAction";
import { useDispatch, useSelector } from "react-redux";
import { compareDates, usePaginationHandler } from "../../utils/appUtils";

function DanhSachDangKy() {
  const dispatch = useDispatch();
  const DSDK = useSelector((state) => state.fetchDSDK?.data);
  console.log("DSDK", DSDK);
  const isLoading = useSelector((state) => state.fetchDSDK?.isLoading);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [displayDSDK, setDisplayDSDK] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchKeywordTENBS, setSearchKeywordTENBS] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const columns = [
    { title: "Mã phiếu", key: "MAPKTG" },
    { title: "STT", key: "STT" },
    { title: "Bệnh nhân", key: "INFOBN" },
    { title: "Bác sĩ", key: "INFOBS" },
    { title: "Dịch vụ", key: "TENDV" },
    // { title: "TTTH PK", key: "TRANGTHAITH" },
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

      // Lọc theo tên bệnh nhân
      if (searchKeyword) {
        filteredDSDK = filteredDSDK.filter((data) =>
          data.TENBN.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }

      // Lọc theo tên bác sĩ
      if (searchKeywordTENBS) {
        console.log(searchKeywordTENBS);
        filteredDSDK = filteredDSDK.filter((data) =>
          data.INFOBS.toLowerCase().includes(searchKeywordTENBS.toLowerCase())
        );
      }

      const calculatedTotalPages = Math.ceil(filteredDSDK.length / limit);
      setTotalPages(calculatedTotalPages);

      const startIdx = (page - 1) * limit;
      const endIdx = Math.min(startIdx + limit, filteredDSDK.length);
      const pageDSDK = filteredDSDK.slice(startIdx, endIdx);

      setDisplayDSDK(pageDSDK);
    }
  }, [
    DSDK,
    page,
    limit,
    searchKeyword,
    searchKeywordTENBS,
    startDate,
    endDate,
  ]);

  const handleIFSearchChange = (value) => {
    setSearchKeyword(value);
  };

  const handleIFSearchChangeTENBS = (value) => {
    setSearchKeywordTENBS(value);
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
      <div className="container-fluid">
        <h1>Khám Bệnh</h1>
        <div className="row p-3 ">
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
            title={"Tìm kiếm theo tên bệnh nhân"}
            size={4}
            onChange={(value) => handleIFSearchChange(value)}
          />
          <IFSearch
            title={"Tìm kiếm theo tên bác sĩ"}
            size={4}
            onChange={(value) => handleIFSearchChangeTENBS(value)}
          />
        </div>
        <div className="px-3">
          <ListFormKhamBenh
            columns={columns}
            data={displayDSDK}
            loading={isLoading}
          />
          <Pagination
            totalPages={totalPages}
            page={page}
            limit={limit}
            siblings={1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

export default DanhSachDangKy;
