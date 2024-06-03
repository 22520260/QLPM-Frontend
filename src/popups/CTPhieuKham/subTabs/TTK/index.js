import { useEffect, useState } from "react";
import {
  IFInputText,
  IFNgay,
  TextArea,
} from "../../../../component/Layout/TabLayout/InputForm";
import { useSelector, useDispatch } from "react-redux";
import { ListForm } from "../../../../component/Layout/TabLayout/ListForm";
import { toast } from "react-toastify";
import socket from "../../../../setup/socket";
import axios from "../../../../setup/axios";
import { fetchDSDKAction } from "../../../../redux/action/fetchDataAction/fetchDSDKAction";
import { fetchTTKAction } from "../../../../redux/action/fetchDataAction/fetchTTKAction";

function ThongTinKham() {
  const dispatch = useDispatch();
  const ttkArray = useSelector((state) => state.ttk?.data) || [];
  const ttk = ttkArray ? ttkArray[0] : {};
  const [selectedBenh, setSelectedBenh] = useState([]);
  const benhById = useSelector((state) => state.benhById?.data) || [];

  const defaultFormData = {
    maPK: ttk?.MAPK,
    trieuChung: ttk?.TRIEUCHUNGBENH || null,
    tinhTrangCoThe: ttk?.TINHTRANGCOTHE || null,
    ketLuan: ttk?.KETLUAN || null,
    huyetAp: ttk?.HUYETAP || null,
    chieuCao: ttk?.CHIEUCAO || null,
    canNang: ttk?.CANNANG || null,
    benh: benhById,
  };
  const [formData, setFormData] = useState("");

  useEffect(() => {
    setSelectedBenh(benhById);
  }, [benhById]);

  useEffect(() => {
    setFormData(defaultFormData);
  }, [ttk]);

  const columns = [
    { title: "Mã bệnh", key: "MABENH" },
    { title: "Mã ICD bệnh", key: "MAICD" },
    { title: "Tên bệnh", key: "TENBENH" },
  ];
  const [resetKey, setResetKey] = useState(Date.now);

  const handleCancel = () => {
    setFormData({
      trieuChung: null,
      tinhTrangCoThe: null,
      ketLuan: null,
      huyetAp: null,
      chieuCao: null,
      canNang: null,
    });
    setResetKey(Date.now());
  };

  const updateTrangThaiPK = async (varTrangThai) => {
    try {
      const response2 = await axios.post("/phieukham/update-trang-thai", {
        maPK: ttk?.MAPK,
        trangThai: varTrangThai,
      });

      if (response2.status === 200) {
        toast.success("Cập nhật trạng thái phiếu khám thành công");
        socket.emit("send-message", { actionName: "DSDK" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật trạng thái phiếu khám không thành công");
    }
  };

  const handleUpdateTrangThai = async () => {
    if (ttk?.TRANGTHAITH === "Chưa thực hiện") {
      await updateTrangThaiPK("Đang thực hiện");
      dispatch(fetchDSDKAction());
      dispatch(fetchTTKAction(ttk?.MAPK));
    } else {
      toast.error("Phiếu khám đã được thực hiện");
    }
  };

  return (
    <div className="shadow rounded" key={resetKey}>
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
            value={
              ttk?.TENPHONG
                ? ttk?.TENPHONG + " (" + "Tầng " + ttk?.TANG + ")"
                : null
            }
            readOnly={true}
          />
          <IFInputText
            title={"Bác sĩ khám"}
            size={4}
            value={
              ttk?.HOTEN ? "BS" + " " + ttk?.TRINHDO + " " + ttk?.HOTEN : null
            }
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
            value={formData.trieuChung}
            readOnly={true}
          />
          <TextArea
            title={"Khám lâm sàn"}
            size={4}
            value={formData.tinhTrangCoThe}
            readOnly={true}
          />
          <TextArea
            title={"Lời dặn"}
            size={4}
            value={formData.ketLuan}
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
            value={formData.huyetAp}
            readOnly={true}
          />
          <IFInputText
            title={"Chiều cao"}
            size={4}
            value={formData.chieuCao}
            readOnly={true}
          />
          <IFInputText
            title={"Cân nặng"}
            size={4}
            value={formData.canNang}
            readOnly={true}
          />
        </div>

        <div className="row py-2 d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-primary ms-auto mx-4 col-auto"
            onClick={() => updateTrangThaiPK("Đang thực hiện")}
            data-bs-dismiss="modal"
          >
            Chuyển trạng thái
          </button>
          <button
            type="button"
            className="btn btn-secondary me-4 col-auto"
            onClick={handleCancel}
            data-bs-dismiss="modal"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThongTinKham;
