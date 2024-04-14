import { IFNgay, IFSearch } from "../../../../component/Layout/TabLayout/InputForm";
import ListForm from "../../../../component/Layout/TabLayout/ListForm";
import { useState } from "react";
import { getCustomer, getLength } from "../../../../component/Layout/TabLayout/ListForm/data";
import Pagination from "../../../../component/Layout/TabLayout/Pagination";

function DanhSachDangKy() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    let totalPages = Math.ceil(getLength() / limit);

    function handlePageChange(value) {
        if (value === "&laquo;" || value === "... ")
            setPage(1);
        else if (value === "&lsaquo;") {
            if (page !== 1)
                setPage(page - 1);
        }
        else if (value === "&rsaquo;") {
            if (page !== totalPages)
                setPage(page + 1);
        }
        else if (value === "&raquo;" || value === " ...") {
            setPage(totalPages);
        }
        else {
            setPage(value);
        }
    }
    return (
        <>
            <div className="row py-2">
                <IFNgay title={"Từ ngày"} />
                <IFNgay title={"Đến ngày"} />
                <IFSearch title={"Tìm kiếm từ khóa"} size={4} />
            </div>

            <ListForm customers={getCustomer(page, limit)} />
            <Pagination totalPages={totalPages} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
        </>
    );
}

export default DanhSachDangKy;