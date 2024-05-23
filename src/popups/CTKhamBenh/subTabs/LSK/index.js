import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IFInputText,
  IFNgay,
  TextArea,
} from "../../../../component/Layout/TabLayout/InputForm";
import { ListForm } from "../../../../component/Layout/TabLayout/ListForm";
import { fetchBenhByIdAction } from "../../../../redux/action/fetchDataAction/fetchBenhByIdAction";
import { fetchTTKAction } from "../../../../redux/action/fetchDataAction/fetchTTKAction";
import { fetchCTDTByIdAction } from "../../../../redux/action/fetchDataAction/fetchCTDTById";

function LichSuKham() {
  const dispatch = useDispatch();
  const lichSuKham = useSelector((state) => state.fetchDSDK.lskByIdBn) || [];
  const ttkArray = useSelector((state) => state.ttk?.data) || [];
  const ttk = ttkArray ? ttkArray[0] : {};
  const benhById = useSelector((state) => state.benhById?.data) || [];
  let existedCTDT = useSelector((state) => state.existedCTDT?.data) || [];

  const [activeTab, setActiveTab] = useState(0);

  const columnsBenh = [
    { title: "Mã bệnh", key: "MABENH" },
    { title: "Mã ICD bệnh", key: "MAICD" },
    { title: "Tên bệnh", key: "TENBENH" },
  ];

  const columnsDT = [
    { title: "Tên thuốc", key: "TENTHUOC" },
    { title: "Liều dùng", key: "GHICHU" },
    { title: "Đơn vị thuốc", key: "TENDONVI" },
    { title: "Số lượng thuốc", key: "SOLUONGTHUOC" },
    { title: "Đơn giá", key: "GIABAN" }, //Giá 1 đơn vị thuốc
    { title: "Thành tiền", key: "thanhTien" }, //Giá 1 đơn vị x số lượng thuốc
  ];

  useEffect(() => {
    setActiveTab(0);
    if (lichSuKham.length > 0) {
      dispatch(fetchTTKAction(lichSuKham[0].MAPK));
      dispatch(fetchBenhByIdAction(lichSuKham[0]?.MAPK));
      dispatch(fetchCTDTByIdAction(lichSuKham[0]?.MAPK));
    }
  }, [lichSuKham]);

  const handleTabClick = (phieuKham, index) => {
    setActiveTab(index);
    dispatch(fetchTTKAction(phieuKham?.MAPK));
    dispatch(fetchBenhByIdAction(phieuKham?.MAPK));
    dispatch(fetchCTDTByIdAction(phieuKham?.MAPK));
  };

  return (
    <>
      {lichSuKham.length === 0 || lichSuKham.filter(phieuKham => phieuKham.TRANGTHAITH === "Đã hoàn thành").length === 0 ? (
        <h2>Không có lịch sử khám</h2>
      ) : (
        <div className="shadow rounded">
          <ul className="nav nav-pills list-group-horizontal-scroll position-relative overflow-auto">
            {lichSuKham?.map((phieuKham, index) => {
              if (phieuKham.TRANGTHAITH === "Đã hoàn thành") {
                return (
                  <li className="nav-item mr-3 shadow rounded" key={index}>
                    <a
                      className={`nav-link ${
                        activeTab === index ? "active" : ""
                      }`}
                      onClick={() => handleTabClick(phieuKham, index)}
                    >
                      {"PK" + phieuKham.MAPK + " - " + phieuKham.NGAYKHAMMIN}
                    </a>
                  </li>
                );
              }
            })}
          </ul>

          <div className="px-3 py-2 my-1 bg-primary rounded-top">
            Thông tin khám
          </div>
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
                {benhById?.length > 0 ? (
                  <ListForm columns={columnsBenh} data={benhById} />
                ) : (
                  <div className="d-flex justify-content-center text-danger">
                    Chưa có kết luận bệnh nào.
                  </div>
                )}
              </div>
            </div>

            <div className="px-3 py-2 bg-primary">Đơn thuốc</div>
            {existedCTDT.length === 0 ? null : (
              <ListForm
                columns={columnsDT}
                data={existedCTDT.map((item) => ({
                  ...item,
                  thanhTien: item.GIABAN * item.SOLUONGTHUOC,
                }))}
                loading={false}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default LichSuKham;
