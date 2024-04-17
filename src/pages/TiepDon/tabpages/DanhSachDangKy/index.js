import { IFNgay, IFSearch } from "../../../../component/Layout/TabLayout/InputForm";
import ListForm from "../../../../component/Layout/TabLayout/ListForm";
import { useState, useEffect } from "react";
import Pagination from "../../../../component/Layout/TabLayout/Pagination";
import { usePaginationHandler } from "../../../../utils/appUtils";


function DanhSachDangKy() {
    const columns = [
        { title: 'ID', key: '0' },
        { title: 'Name', key: '1' },
        { title: 'Bill', key: '2' },
        { title: 'Status', key: '3' },
        { title: 'Other', key: '4' }
    ];

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [customers, setCustomers] = useState([]);
    const [displayedCustomers, setDisplayedCustomers] = useState([]);

    let totalPages = Math.ceil(customers.length / limit);
    const handlePageChange = usePaginationHandler(setPage, page, totalPages);
  
    useEffect(() => {
        fetch("http://localhost:3001/tiepdon")
            .then((response) => response.json())
            .then((data) => {
                setCustomers(data);
                console.log("Customers:", data);
            })
            .catch((error) => {
                console.error("Error fetching customers:", error);
            });
    }, []);

    useEffect(() => {
        const startIdx = (page - 1) * limit;
        const endIdx = Math.min(startIdx + limit, customers.length);
        const pageCustomers = customers.slice(startIdx, endIdx);
        setDisplayedCustomers(pageCustomers);
    }, [customers, page, limit]);
  
    return (
        <>
            <div className="row py-2">
                <IFNgay title={"Từ ngày"} />
                <IFNgay title={"Đến ngày"} />
                <IFSearch title={"Tìm kiếm từ khóa"} size={4} />
            </div>

            <ListForm columns={columns} data={displayedCustomers} />
            <Pagination totalPages={totalPages} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
        </>
    );
}

export default DanhSachDangKy;
