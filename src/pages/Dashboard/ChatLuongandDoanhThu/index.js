import ChatLuong from "../ChatLuong";
import DoanhThuLuotKhach from "../DoanhThuLuotKhach";
import { useState, useEffect } from "react";
import { IFSelect } from "../../../component/Layout/TabLayout/InputForm";

function ChatLuongandDoanhThu() {
    const d = new Date();
    const defaultYear = d.getFullYear().toString();
    const [year, setYear] = useState(defaultYear);

    return (
        <div>
            <IFSelect
                title="Năm"
                size={1}
                options={[{ year: '2022' }, { year: '2023' }, { year: '2024' }]}
                def={"Chọn"}
                onChange={(value) => setYear(value === "Chọn" ? defaultYear : value)}
                selected={year}
                keyObj='year'
            />
            <div className="row">
                <div className="col col-md-6">
                    <ChatLuong year={year} />
                </div>
                <div className="col col-md-6">
                    <DoanhThuLuotKhach year={year} />
                </div>
            </div>
        </div>
    );
}

export default ChatLuongandDoanhThu;