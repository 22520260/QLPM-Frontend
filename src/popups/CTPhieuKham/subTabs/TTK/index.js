import { useEffect, useState } from "react";
import {
  IFInputText,
  IFNgay,
  TextArea,
} from "../../../../component/Layout/TabLayout/InputForm";
import { useSelector } from "react-redux";
import { ListForm } from "../../../../component/Layout/TabLayout/ListForm";

function ThongTinKham() {
  const ttkArray = useSelector((state) => state.ttk?.data) || [];
  const ttk = ttkArray ? ttkArray[0] : {};
  const [selectedBenh, setSelectedBenh] = useState([]);
  const benhById = useSelector((state) => state.benhById?.data) || [];

  useEffect(() => {
    setSelectedBenh(benhById);
  }, [benhById]);

  const columns = [
    { title: "Mã bệnh", key: "MABENH" },
    { title: "Mã ICD bệnh", key: "MAICD" },
    { title: "Tên bệnh", key: "TENBENH" },
  ];

  return (
    <div className="shadow rounded">
      <div className="px-3 py-2 bg-primary rounded-top">Thông tin khám</div>
      <div className="container-fluid mb-2 py-2">
        <div className="row py-2">
          <IFInputText
            title={"Trạng thái"}
            size={3}
            value={ttk?.TRANGTHAITH}
            readOnly={true}
          />

          <IFNgay
            title={"Ngày khám"}
            size={3}
            value={new Date(ttk?.NGAYKHAM)}
            readOnly={true}
          />
          <IFInputText
            title={"Dịch vụ khám"}
            size={6}
            value={ttk?.TENDV}
            readOnly={true}
          />
        </div>
        <div className="row py-2">
          <IFInputText
            title={"Lý do khám"}
            size={5}
            value={ttk?.LYDOKHAM}
            readOnly={true}
          />
          <IFInputText
            title={"Phòng khám"}
            size={3}
            value={ttk?.TENPHONG + " (" + "Tầng " + ttk?.TANG + ")"}
            readOnly={true}
          />
          <IFInputText
            title={"Bác sĩ khám"}
            size={4}
            value={"BS" + " " + ttk?.TRINHDO + " " + ttk?.HOTEN}
            readOnly={true}
          />
        </div>
        <div className="row py-2">
          <IFInputText
            title={"Tiền sử bệnh"}
            size={6}
            value={ttk?.TIENSUBENH}
            readOnly={true}
          />
          <IFInputText
            title={"Dị ứng"}
            size={6}
            value={ttk?.DIUNG}
            readOnly={true}
          />
        </div>
        <div className="row py-2">
          <TextArea
            title={"Bệnh sử"}
            size={4}
            value={ttk?.TRIEUCHUNGBENH}
            readOnly={true}
          />
          <TextArea
            title={"Khám lâm sàn"}
            size={4}
            value={ttk?.TINHTRANGCOTHE}
            readOnly={true}
          />
          <TextArea
            title={"Lời dặn"}
            size={4}
            value={ttk?.KETLUAN}
            readOnly={true}
          />
        </div>

        <div className="px-3 py-2 bg-primary">Chẩn đoán bệnh</div>
        <div className="container">
          <div className="row py-2">
            {selectedBenh.length > 0 ? (
              <ListForm columns={columns} data={selectedBenh} />
            ) : (
              <div className="d-flex justify-content-center text-danger">
                Chưa có kết luận bệnh nào.
              </div>
            )}
          </div>
        </div>
        <div className="px-3 py-2 bg-primary">Chỉ số sinh tồn</div>
        <div className="row py-2">
          <IFInputText
            title={"Huyết áp"}
            size={4}
            value={ttk?.HUYETAP}
            readOnly={true}
          />
          <IFInputText
            title={"Chiều cao"}
            size={4}
            value={ttk?.CHIEUCAO}
            readOnly={true}
          />
          <IFInputText
            title={"Cân nặng"}
            size={4}
            value={ttk?.CANNANG}
            readOnly={true}
          />
        </div>
      </div>
    </div>
  );
}

export default ThongTinKham;
