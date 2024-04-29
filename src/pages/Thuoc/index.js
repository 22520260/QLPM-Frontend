import { IFNgay, IFSearch } from "../../component/Layout/TabLayout/InputForm";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { ListFormThuoc } from "../../component/Layout/TabLayout/ListForm";
import { fetchDSDKAction } from "../../redux/action/fetchDataAction/fetchDSDKAction";
import Pagination from "../../component/Layout/TabLayout/Pagination";
import { usePaginationHandler } from "../../utils/appUtils";
import { compareDates, formatDate } from "../../utils/appUtils";

function Thuoc() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.fetchDSDK.data);
    const DSDK = data.data
    const isLoading = useSelector((state) => state.fetchDSDK.loading);
    console.log("THUOC", data)
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [displayDSDK, setDisplayDSDK] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalPages, setTotalPages] = useState(0);

    const columns = [
        { title: "STT", key: "MAPK" },
        { title: "Số lô", key: "MAPK" },
        { title: "Tên thuốc", key: "MAPK" },
        { title: "Hoạt chất", key: "MAPK" },
        { title: "Số lượng nhập", key: "MAPK" },
        { title: "Số lượng tồn", key: "MAPK" },
        { title: "Ngày nhập", key: "MAPK" },
        { title: "HSD", key: "MAPK" },
        { title: "Đơn vị", key: "MAPK" },
        { title: "Giá nhập", key: "MAPK" },
        { title: "Giá bán", key: "MAPK" },
    ];

    useEffect(() => {
        dispatch(fetchDSDKAction());
        console.log("call api DanhSachDangKy");
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

    const handlePageChange = usePaginationHandler(setPage, page, totalPages);

    const handleChange_NBD = (value) => {
        setStartDate(value);
    };

    const handleChange_NKT = (value) => {
        setEndDate(value);
    };

    return (
        <>
            <h1>Thuốc</h1>
            <div className="container-fluid">
                <div className="row py-2">
                    <IFSearch
                        title={"Tìm theo tên thuốc"}
                        size={4}
                        onChange={(value) => handleIFSearchChange(value)}
                    />

                    <IFSearch
                        title={"Tìm theo tên hoạt chất"}
                        size={4}
                        onChange={(value) => handleIFSearchChange(value)}
                    />

                    <IFSearch
                        title={"Tìm theo lượng tồn tối đa"}
                        size={2}
                        onChange={(value) => handleIFSearchChange(value)}
                    />
                </div>

                <ListFormThuoc
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
        </>
    );
}

export default Thuoc;
