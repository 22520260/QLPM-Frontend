import LoaiBenh from "./LoaiBenh";
import DichVu from "./DichVu";
import ChatLuongandDoanhThu from "./ChatLuongandDoanhThu";

function Dashboard() {

    return (
        <div className="container-fluid">
            <h1>Dashboard</h1>
            <ChatLuongandDoanhThu />
            <div>
                <DichVu />
            </div>
            <div>
                <LoaiBenh />
            </div>
        </div>
    );
}

export default Dashboard;
