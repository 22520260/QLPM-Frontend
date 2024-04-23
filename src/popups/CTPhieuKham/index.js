import React, { useState } from "react";
import NavTabVertical from '../../component/NavTabVertical'
import { tabsDataCTPK } from "./data";
import { FaEye } from "react-icons/fa";

function CTPhieuKham({props}) {
  // const dispatch = useDispatch();
  // const responseMessage = useSelector((state) => state.postData.status);
  // const [formData, setFormData] = useState({
  //     hoTen: "",
  //     gioiTinh: "",
  //     diaChi: "",
  //     ngaySinh: "",
  //     cccd: "",
  //     soDienThoai: "",
  //     diUng: "",
  //     ngayKham: "",
  //     bacSi: "",
  //     lyDoKham: "",
  //     chuThich: "",
  //     dichVu: "",
  // });
  // const [age, setAge] = useState("");
  // const doctors = useSelector((state) => state.fetchAllBenhNhan.data);

  // const handleChange = (fieldName, value) => {
  //     setFormData({ ...formData, [fieldName]: value });

  //     if (fieldName === "ngaySinh") {
  //         const age = calculateAge(value);
  //         setAge(age);
  //     }
  // };

  // const namesDoctor = extractNames(doctors);
  // const calculateAge = (birthDate) => {
  //     const today = new Date();
  //     const birthDateObj = new Date(birthDate);
  //     let age = today.getFullYear() - birthDateObj.getFullYear();
  //     const monthDiff = today.getMonth() - birthDateObj.getMonth();

  //     if (
  //         monthDiff < 0 ||
  //         (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
  //     ) {
  //         age--;
  //     }

  //     return (age > 0 ? age : 0);
  // };

  // useEffect(() => {
  //     dispatch(fetchAllBenhNhanAction("http://localhost:3001/tiepdon"));
  // }, []);

  // const handleFormSubmit = () => {
  //     dispatch(
  //         submitData({
  //             url: "http://localhost:3001/customer/store",
  //             formData: formData,
  //         })
  //     );
  // };
  console.log('props',props)
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelectList = () => {};

  const renderElement = () => {};
  const handleSave = () => {};

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <FaEye />
      </button>

      <div
        className="modal fade modal-xl"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Thông tin phiếu khám  {props[0]}
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
                <NavTabVertical tabsData={tabsDataCTPK} />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleSave}
              >
                Lưu những thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CTPhieuKham;
