import {
  IFNgay,
  IFSearch,
} from "../../../../component/Layout/TabLayout/InputForm";
import ListForm from "../../../../component/Layout/TabLayout/ListForm";
import { useState, useEffect } from "react";
import Pagination from "../../../../component/Layout/TabLayout/Pagination";
import { usePaginationHandler } from "../../../../utils/appUtils";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../../redux/action/getDataAction";
import { compareDates, formatDate } from "../../../../utils/appUtils";

function DanhSachLichHen() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.getData.data);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [displayedCustomers, setDisplayedCustomers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const columns = [
    { title: "ID", key: "0" },
    { title: "Ngày hẹn", key: "1" },
    { title: "Info", key: "2" },
    { title: "Nội dung", key: "3" },
    { title: "Bác sĩ", key: "4" },
    { title: "Status", key: "5" },
    { title: "Other", key: "6" },
  ];

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
  useEffect(() => {
    dispatch(fetchData("http://localhost:3001/tiepdon"));
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

      const formattedCustomers = filteredCustomers.map(customer => {
        const [mabn, matk, cccd, hoTen, ngaySinh, gioiTinh, sdt, diaChi, tienSuBenh, diUng] = customer;
  
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
          diUng
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
        <IFSearch title={"Tìm kiếm từ khóa"} size={4} onChange={(value) => handleIFSearchChange(value)}/>
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

export default DanhSachLichHen;
