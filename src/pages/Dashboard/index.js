import DoanhThuLuotKhach from "./DoanhThuLuotKhach";
import Pie from "./Pie"

function Dashboard() {

    return (
        <>
            <h1 className="container-fluid">Dashboard</h1>
            <div className="row">
                <div className="col col-md-7 px-3">
                    <DoanhThuLuotKhach />
                </div>
                <div className="col col-md-5 px-3">
                    <Pie />
                </div>
            </div>
        </>
    );
}

export default Dashboard;
