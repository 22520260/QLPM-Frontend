import LoaiBenh from "./LoaiBenh";
import DichVu from "./DichVu";
import ChatLuongandDoanhThu from "./ChatLuongandDoanhThu";

function Dashboard() {

    return (
        <>
            <h1 className="container-fluid">Dashboard</h1>
            <ChatLuongandDoanhThu />

            <div>
                <DichVu />
            </div>
            <div>
                <LoaiBenh />
            </div>
        </>
    );
}

export default Dashboard;
