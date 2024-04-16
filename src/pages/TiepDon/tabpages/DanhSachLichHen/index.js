import { IFNgay, IFSearch } from "../../../../component/Layout/TabLayout/InputForm";
import ListForm from "../../../../component/Layout/TabLayout/ListForm";
import { useState } from "react";
import { getData, getLength } from "./data";
import Pagination from "../../../../component/Layout/TabLayout/Pagination";
import { usePaginationHandler } from "../../../../utils/appUtils";

function DanhSachLichHen() {

    const columns = [
        { title: 'ID', key: 'id' },
        { title: 'Ngày hẹn', key: 'date' },
        { title: 'Info', render: (row) => (
            <div>{row.info.name}<br />{row.info.age} - {row.info.gender}<br />{row.info.phone}</div>
        ) },
        { title: 'Nội dung', key: 'content' },
        { title: 'Bác sĩ', key: 'doctor' },
        { title: 'Status', key: 'status' },
        { title: 'Other', key: 'other' }
    ];

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    let totalPages = Math.ceil(getLength() / limit);

    const handlePageChange = usePaginationHandler(setPage, page, totalPages);
    return (
        <>
            <div className="row py-2">
                <IFNgay title={"Từ ngày"} />
                <IFNgay title={"Đến ngày"} />
                <IFSearch title={"Tìm kiếm từ khóa"} size={4} />
            </div>

            <ListForm columns={columns} data={getData(page, limit)} />
            <Pagination totalPages={totalPages} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
        </>
    );
}

export default DanhSachLichHen;