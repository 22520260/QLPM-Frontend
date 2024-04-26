import { IFNgay, IFSearch } from "../../component/Layout/TabLayout/InputForm";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { ListFormThuoc } from "../../component/Layout/TabLayout/ListForm";
import { fetchAllBenhNhanAction } from "../../redux/action/fetchDataAction/fetchAllBenhNhanAction";
import Pagination from "../../component/Layout/TabLayout/Pagination";
import { usePaginationHandler } from "../../utils/appUtils";
import { compareDates, formatDate } from "../../utils/appUtils";

function KhamBenh() {
    const dispatch = useDispatch();
    const patients = useSelector((state) => state.fetchAllBenhNhan.patients);
    const isLoading = useSelector((state) => state.fetchAllBenhNhan.loading);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [displayedCustomers, setDisplayedCustomers] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalPages, setTotalPages] = useState(0);

    const columns = [
        { title: "STT", key: "0" },
        { title: "Số lô", key: "1" },
        { title: "Tên thuốc", key: "2" },
        { title: "Hoạt chất", key: "3" },
        { title: "Số lượng nhập", key: "4" },
        { title: "Số lượng tồn", key: "5" },
        { title: "Ngày nhập", key: "6" },
        { title: "HSD", key: "7" },
        { title: "Đơn vị", key: "8" },
        { title: "Giá nhập", key: "9" },
        { title: "Giá bán", key: "10" },
    ];

    useEffect(() => {
        dispatch(fetchAllBenhNhanAction());
        console.log("call api DanhSachDangKy");
    }, []);

    useEffect(() => {
        if (patients) {
            let filteredCustomers = [...patients]; // Tạo một bản sao của data để tránh thay đổi trực tiếp data

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

            const formattedCustomers = filteredCustomers.map((customer) => {
                const [
                    mabn,
                    matk,
                    cccd,
                    hoTen,
                    ngaySinh,
                    gioiTinh,
                    sdt,
                    diaChi,
                    tienSuBenh,
                    diUng,
                ] = customer;

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
                    diUng,
                ];
            });

            const calculatedTotalPages = Math.ceil(filteredCustomers.length / limit);
            setTotalPages(calculatedTotalPages);

            const startIdx = (page - 1) * limit;
            const endIdx = Math.min(startIdx + limit, filteredCustomers.length);
            const pageCustomers = formattedCustomers.slice(startIdx, endIdx);

            setDisplayedCustomers(pageCustomers);
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
                    data={displayedCustomers}
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

export default KhamBenh;
