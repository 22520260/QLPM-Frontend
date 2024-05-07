import React, { useState, useEffect } from "react";
import {
    IFSearch, IFSelect, IFNgay
} from "../../../../component/Layout/TabLayout/InputForm";
import { ListFormPQ } from "../../../../component/Layout/TabLayout/ListForm";
import Pagination from "../../../../component/Layout/TabLayout/Pagination";
import { usePaginationHandler } from "../../../../utils/appUtils";
import { fetchDSDKAction } from "../../../../redux/action/fetchDataAction/fetchDSDKAction";

import { useDispatch, useSelector } from "react-redux";
import { compareDates, formatDate } from "../../../../utils/appUtils";

function DSTaiKhoan() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.fetchDSDK.data);
    const DSDK = data.data;
    const isLoading = useSelector((state) => state.fetchDSDK.loading);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [displayDSDK, setDisplayDSDK] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [role, setRole] = useState("");

    const columns = [
        { title: "URL", key: "MAPK" },
    ];

    const roles = [
        {title: "Lễ tân", key: "0"},
        {title: "Bác sĩ", key: "1"},
    ]

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

            const calculatedTotalPages = Math.ceil(filteredDSDK.length / limit);
            setTotalPages(calculatedTotalPages);

            const startIdx = (page - 1) * limit;
            const endIdx = Math.min(startIdx + limit, filteredDSDK.length);
            const pageDSDK = filteredDSDK.slice(startIdx, endIdx);

            setDisplayDSDK(pageDSDK);
        }
    }, [DSDK, page, limit, searchKeyword, startDate, endDate]);



    const handlePageChange = usePaginationHandler(setPage, page, totalPages);

    return (
        <div className="container-fluid">
            <div className="row py-2 align-items-end">
                <IFSelect
                    title={"Vai trò"}
                    size={4}
                    options={roles}
                    // def='Tất cả'
                    onChange={(value) => setRole(value)}
                    keyObj={'title'}
                />
                
                <div className="col col-md-8 d-flex justify-content-end">
                    <button
                        className="btn btn-primary"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#idtm"
                    >
                        Thêm mới
                    </button>
                </div>
            </div>


            <ListFormPQ columns={columns} data={displayDSDK} loading={isLoading} />
            <Pagination
                totalPages={totalPages}
                page={page}
                limit={limit}
                siblings={1}
                onPageChange={handlePageChange}
            />


        </div>
    );
}

export default DSTaiKhoan;
