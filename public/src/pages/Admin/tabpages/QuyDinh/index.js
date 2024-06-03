import { IFInputText } from "../../../../component/Layout/TabLayout/InputForm";
import DSDV from "./DSDV";
import DSLB from "./DSLB";
import DVT from "./DVT";
import DSLDV from "./DSLDV";
import DST from "./DST";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../../setup/axios";
import { fetchThamSoAction } from "../../../../redux/action/fetchDataAction/fetchThamSoAction";
import DSNND from "./DSNND";

function QuyDinh() {
  const dispatch = useDispatch();
  const thamso = useSelector((state) => state.thamso?.data) || [];
  const isLoading = useSelector((state) => state.thamso?.isLoading);

  useEffect(() => {
    dispatch(fetchThamSoAction());
  }, []);

  const defaultFormData = {
    tenThamSo: "SoLuongKhamToiDa",
    giaTri: "",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const defaultObjValidInput = {
    isValidGiaTri: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setObjValidInput(defaultObjValidInput);
    if (!formData.giaTri) {
      setObjValidInput({ ...defaultObjValidInput, isValidGiaTri: false });
      toast.error("Chưa nhập giá trị tham số");
      return;
    }
    const response = await axios.post("/admin/updateThamSo", formData);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      setFormData(defaultFormData);
      dispatch(fetchThamSoAction());
      const cancelBtn = document.getElementById("cancelBtn");
      if (cancelBtn) {
        cancelBtn.click();
      }
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleCancel = () => {
    setFormData(defaultFormData);
  };
  return (
    <>
      <div className="container-fluid">
        {/* So BN tối đa */}
        <div className="row py-3 align-items-end border border-primary">
          <IFInputText
            title={"Số lượt khám tối đa"}
            size={2}
            readOnly={true}
            value={thamso[0]?.GIATRI}
          />
          <div className="col col-md-auto">
            <button
              className="btn btn-primary"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#idtmbn"
            >
              Thay đổi
            </button>
          </div>
        </div>

        {/* Modal thay doi tham so */}
        <div
          className="modal fade"
          id="idtmbn"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Cập nhật giá trị tham số
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body ">
                <div className="container-fluid">
                  <IFInputText
                    title={"Số bệnh nhân tối đa"}
                    size={12}
                    value={formData.giaTri}
                    valid={objValidInput.isValidGiaTri}
                    onChange={(value) => handleChange("giaTri", +value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  id="cancelBtn"
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col col-md-6 py-3 border border-primary">
            <div className="h-100">
              <DSDV />
            </div>
          </div>
          <div className="col col-md-6 py-3 border border-primary">
            <div className="h-100">
              <DSLDV />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col col-md-6 py-3 border border-primary">
            <div className="h-100">
              <DST />
            </div>
          </div>
          <div className="col col-md-6 py-3 border border-primary">
            <div className="h-100">
              <DVT />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col col-md-6 py-3 border border-primary">
            <div className="h-100">
              <DSLB />
            </div>
          </div>
          <div className="col col-md-6 py-3 border border-primary">
            <div className="h-100">
              <DSNND />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuyDinh;
