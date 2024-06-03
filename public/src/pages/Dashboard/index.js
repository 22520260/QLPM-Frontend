import LoaiBenh from "./LoaiBenh";
import DichVu from "./DichVu";
import ChatLuongandDoanhThu from "./ChatLuongandDoanhThu";
import Thuoc from "./Thuoc";
import Navtab from "../../component/Navtab";

const tabsDataTD = [
  {
    title: "Doanh Thu & Chất Lượng",
    content: "thongke-dt-cl",
    component: ChatLuongandDoanhThu,
  },
  { title: "Thống Kê Dịch Vụ", content: "thongke-dv", component: DichVu },
  { title: "Thống Kê Loại Bệnh", content: "thongke-lb", component: LoaiBenh },
  { title: "Thống Kê Thuốc", content: "thongke-t", component: Thuoc },
];

function Dashboard() {
  return (
    <div>
      <h1 className="container-fluid">Thống Kê</h1>
      <Navtab tabsData={tabsDataTD} />
    </div>
  );
}

export default Dashboard;
