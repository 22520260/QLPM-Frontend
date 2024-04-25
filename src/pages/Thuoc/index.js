import { useState } from "react";
import { IFSearch } from "../../component/Layout/TabLayout/InputForm";

function Thuoc() {
    const [searchKeyword, setSearchKeyword] = useState("");
    const handleIFSearchChange = (value) => {
        setSearchKeyword(value);
    }

    const columns = [
        { title: "Mã phiếu", key: "0" },
        { title: "STT", key: "1" },
        { title: "Họ Tên", key: "2" },
        { title: "Tên Bác sĩ", key: "3" },
        { title: "Tổng tiền", key: "4" },
        { title: "Trạng thái", key: "5" },
      ];

    return (
        <>
            <h1 className="container-fluid">Thuốc</h1>
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
                        title={"Tìm theo số lượng tồn tối đa"}
                        size={2}
                        onChange={(value) => handleIFSearchChange(value)}
                    />
                </div>


            </div>
        </>
    );
}

export default Thuoc;