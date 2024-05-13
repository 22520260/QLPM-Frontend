import { useEffect, useState } from "react";
import {
  IFInputText,
  IFNgay,
  TextArea,
  IFSearchBenh,
  IFTrangThai,
} from "../../../../component/Layout/TabLayout/InputForm";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllBenhAction } from "../../../../redux/action/fetchDataAction/fetchAllBenhAction";
import { fetchTTKAction } from "../../../../redux/action/fetchDataAction/fetchTTKAction";
import axios from "../../../../setup/axios";
import { toast } from "react-toastify";
import { MdError } from "react-icons/md";
import { ListForm, ListFormDSB } from "../../../../component/Layout/TabLayout/ListForm";
import {
  TTK,
  StatusIcon,
} from "../../../../component/Layout/TabLayout/ListForm/StatusIcon";

function ThongTinKham() {
  const dispatch = useDispatch();
  const selectedPK =
    useSelector((state) => state.selectedRow?.selectedRow) || {};
  const ttkArray = useSelector((state) => state.ttk?.data) || [];
  const ttk = ttkArray ? ttkArray[0] : {};
  const [showError, setShowError] = useState(false);
  const [selectedBenh, setSelectedBenh] = useState([]);
  const benh = useSelector((state) => state.benh?.data) || [];
  const benhById = useSelector((state) => state.benhById?.data) || [];
  console.log('benhById', benhById)

  console.log("benh", benh);
  console.log("selectedBenh", selectedBenh);

  console.log("selectedPK", selectedPK);
  console.log("ttk", ttk);

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
  const [formData, setFormData] = useState('');
  console.log(">>> formData", formData);

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(">>> formData", formData);

    const response = await axios.post("/phieukham/update", formData);
    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      setFormData(defaultFormData);
      // dispatch(fetchTTKAction());
      // cancelBtn.disabled = false;
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  useEffect(() => {
    dispatch(fetchAllBenhAction());
    setFormData('');
  }, []);

  useEffect(() => {
    setFormData(defaultFormData)
  }, [ttk]);

  useEffect(() => {
    setSelectedBenh(benhById)
  }, [benhById]);

  const columns = [
    { title: "Mã bệnh", key: "MABENH" },
    { title: "Mã ICD bệnh", key: "MAICD" },
    { title: "Tên bệnh", key: "TENBENH" },
  ];

  const handleAddBenh = (selected, e) => {
    if (selected) {
      const updatedBenh = [...selectedBenh, selected];
      setSelectedBenh(updatedBenh);
      setFormData({ ...formData, benh: updatedBenh });
    }
    e.target.value = "";
  };

  const handleDeleteBenh = (row) => {
    const updatedBenh = selectedBenh.filter((item) => item.MABENH !== row.MABENH);
    setSelectedBenh(updatedBenh);
    setFormData({ ...formData, benh: updatedBenh });
  };

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
            onChange={(value) => handleChange(1)}
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
            value={formData.trieuChung}
            onChange={(value) => handleChange("trieuChung", value)}
          />
          <TextArea
            title={"Khám lâm sàn"}
            size={4}
            value={formData.tinhTrangCoThe}
            onChange={(value) => handleChange("tinhTrangCoThe", value)}
          />
          <TextArea
            title={"Lời dặn"}
            size={4}
            value={formData.ketLuan}
            onChange={(value) => handleChange("ketLuan", value)}
          />
        </div>

        <div className="container-fluid mb-3">
          <div className="row py-2">
            <IFSearchBenh
              title={"Chẩn đoán bệnh"}
              size={6}
              valid={selectedBenh && selectedBenh.length > 0}
              options={benh}
              onChange={(e) => {
                const value = e.target.value;
                const selected = benh.find((item) => item.TENBENH === value);
                if (selected) {
                  const alreadySelected = selectedBenh.find(
                    (item) => item.MABENH === selected.MABENH
                  );

                  if (alreadySelected) {
                    setShowError(true);
                    e.target.value = "";
                  } else {
                    setShowError(false);
                    handleAddBenh(selected, e);
                  }
                }
              }}
            />
            {showError && selectedBenh.length > 0 && (
              <div className="text-danger">
                <MdError />
                <span> Bệnh này đã được chọn.</span>
              </div>
            )}
          </div>
          {selectedBenh.length > 0 ? (
            <ListFormDSB
              columns={columns}
              data={selectedBenh}
              handleDelete={handleDeleteBenh}
            />
          ) : (
            <div className="d-flex justify-content-center text-danger">
              Chưa thêm bệnh nào.
            </div>
          )}
        </div>

        <div className="px-3 py-2 bg-primary">Chỉ số sinh tồn</div>
        <div className="row py-2">
          <IFInputText
            title={"Huyết áp"}
            size={4}
            value={formData.huyetAp}
            onChange={(value) => handleChange("huyetAp", value)}
          />
          <IFInputText
            title={"Chiều cao"}
            size={4}
            value={formData.chieuCao}
            onChange={(value) => handleChange("chieuCao", value)}
          />
          <IFInputText
            title={"Cân nặng"}
            size={4}
            value={formData.canNang}
            onChange={(value) => handleChange("canNang", value)}
          />
        </div>
        <div className="row py-2 d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-primary ms-auto mx-4 col-auto"
            onClick={handleUpdate}
          >
            Lưu thông tin
          </button>
          {/* <button
            id="cancelBtn"
            type="button"
            className="btn btn-danger mx-4 col-auto"
            onClick={handleCancel}
          >
            Hủy
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default ThongTinKham;
