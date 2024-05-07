import DoanhThuLuotKhach from "./DoanhThuLuotKhach";
import Pie from "./Pie"
import LoaiBenh from "./LoaiBenh";
import DichVu from "./DichVu";

function Dashboard() {

    return (
        <>
            <h1 className="container-fluid">Dashboard</h1>
            <div className="row">
                <div className="col col-md-7 px-3">
                    <DoanhThuLuotKhach />
                </div>
                <div className="col col-md-5 px-3">
                    <DichVu />
                </div>
                <div>
                    <LoaiBenh />
                </div>
            </div>
        </>
    );
}

export default Dashboard;
