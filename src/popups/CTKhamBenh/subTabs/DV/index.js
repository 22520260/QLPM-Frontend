import React, { useEffect, useState } from "react";
import { IFSearchDV, } from "../../../../component/Layout/TabLayout/InputForm";
import axios from "../../../../setup/axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBacSiAction } from "../../../../redux/action/fetchDataAction/fetchAllBacSiAction";
import { fetchAllDichVuAction } from "../../../../redux/action/fetchDataAction/fetchAllDichVuAction";
import { fetchAllBenhNhanAction } from "../../../../redux/action/fetchDataAction/fetchAllBenhNhanAction";
import { toast } from "react-toastify";
import { ListForm } from "../../../../component/Layout/TabLayout/ListForm";

function DichVu() {
    const dispatch = useDispatch();

    const services = useSelector((state) => state.fetchAllDichVu.services) || [];

    const patients = useSelector((state) => state.fetchAllBenhNhan.patients) || [];

    const doctors = useSelector((state) => state.fetchAllBacSi.doctors) || [];

    const [showError, setShowError] = useState(false);
    const [oldPatientID, setOldPatientID] = useState(0);

    const [age, setAge] = useState("");
    const [selectedServices, setSelectedServices] = useState([]);

    const [formData, setFormData] = useState({
        hoTen: "",
        gioiTinh: "",
        diaChi: "",
        ngaySinh: "",
        cccd: "",
        soDienThoai: "",
        diUng: "",
        ngayKham: new Date(),
        maBS: "",
        lyDoKham: "",
        tienSuBenh: "",
        dichVu: [],
    });

    const defaultObjValidInput = {
        isValidHoTen: true,
        isValidCCCD: true,
        isValidDichVu: true
    };
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

    const columns = [
        { title: "Mã dịch vụ", key: "MADV" },
        { title: "Mã loại dịch vụ", key: "MALOAIDV" },
        { title: "Tên dịch vụ", key: "TENDV" },
        { title: "Giá dịch vụ", key: "GIADV" },
    ];

    useEffect(() => {
        dispatch(fetchAllDichVuAction());
        dispatch(fetchAllBenhNhanAction());
        dispatch(fetchAllBacSiAction());

    }, []);

    const checkPatientExistence = (fullName) => {
        const patient = patients.find((patient) => patient.HOTEN === fullName);
        return patient ? patient : null;
    };

    const handleChange = (fieldName, value) => {
        if (fieldName === "hoTen") {
            const patient = checkPatientExistence(value);
            if (patient) {
                setFormData({
                    ...formData,
                    hoTen: patient.HOTEN,
                    gioiTinh: patient.GIOITINH,
                    diaChi: patient.DIACHI,
                    ngaySinh: new Date(patient.NGAYSINH),
                    cccd: patient.CCCD,
                    soDienThoai: patient.SDT,
                    diUng: patient.DIUNG,
                    tienSuBenh: patient.TIENSUBENH,
                });
                setOldPatientID(patient.MABN);

                const age = calculateAge(patient.NGAYSINH);
                setAge(age);
            } else {
                setFormData({ ...formData, [fieldName]: value });
            }
        } else {
            setFormData({ ...formData, [fieldName]: value });

            if (fieldName === "ngaySinh") {
                const age = calculateAge(value);
                setAge(age);
            }
        }
    };

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
        ) {
            age--;
        }
        return age > 0 ? age : 0;
    };

    function timeout(delay) {
        return new Promise((res) => setTimeout(res, delay));
    }

    const insertPK = async (maBN, maHD) => {
        // với mỗi dịch vụ thì gọi 1 api tạo phiếu khám cho DV đó
        formData.dichVu.forEach(async (maDV) => {
            let bodyReq = formData;
            bodyReq.dichVu = maDV;
            bodyReq["maBN"] = maBN;
            bodyReq["maHD"] = maHD;
            try {
                const response = await axios.post(
                    "/phieukham/insert-just-pk",
                    bodyReq
                );
                if (response.status === 200) {
                    alert("Thêm phiếu khám thành công!!!");
                }
            } catch (error) {
                alert("Thêm phiếu khám không thành công");
            }
        });
    };

    const handleFormSubmit = async () => {
        setObjValidInput(defaultObjValidInput);
        if (selectedServices.length > 0) {
            if (formData.hoTen === "") {
                setObjValidInput({ ...defaultObjValidInput, isValidHoTen: false });
                toast.error("Chưa nhập họ tên");
                return;
            }
            if (formData.cccd === "") {
                setObjValidInput({ ...defaultObjValidInput, isValidCCCD: false });
                toast.error("Chưa nhập CCCD");
                return;
            }
            let maHDinserted = "";
            // thêm hóa đơn mới
            try {
                const response1 = await axios.post(
                    "/hoadon/insert",
                    { maLT: 1, maLHD: 1, tttt: "Chưa thanh toán" }
                );
                if (response1.status === 200) {
                    maHDinserted = response1.data.MAHD;
                    alert("Thêm hóa đơn thành công!!!");
                }
            } catch (error) {
                console.log(error);
                alert("Thêm hóa đơn không thành công");
            }
            // nếu là bệnh nhân mới thì thêm hồ sơ bệnh nhân trước
            if (oldPatientID === 0) {
                let maBNinserted = "";
                try {
                    const response2 = await axios.post(
                        "/benhnhan/insert",
                        formData
                    );
                    if (response2.status === 200) {
                        maBNinserted = response2.data.MABN;
                        alert("Thêm bệnh nhân thành công!!!");
                        await insertPK(maBNinserted, maHDinserted);
                    }
                } catch (error) {
                    console.log(error);
                    alert("Thêm bệnh nhân không thành công");
                }
            } else {
                await insertPK(oldPatientID, maHDinserted);
            }
            // chờ 1 giây đề các api call thực hiện xong rồi mới load lại trang
            await timeout(1000);
            window.location.reload();
        } else {
            setObjValidInput({ ...defaultObjValidInput, isValidDichVu: false });
            toast.error("Chưa thêm dịch vụ nào.");
        }
    };

    const handleAddService = (selected, e) => {
        if (selected) {
            const updatedServices = [...selectedServices, selected];
            const selectedNoServices = updatedServices.map(
                (selectedService) => selectedService.MADV
            );
            setSelectedServices(updatedServices);
            setFormData({ ...formData, dichVu: selectedNoServices });
        }
        e.target.value = "";
    };

    const handleDeleteService = (index) => {
        const updatedServices = [...selectedServices];
        updatedServices.splice(index, 1);
        setSelectedServices(updatedServices);
        const selectedNoServices = updatedServices.map(
            (selectedService) => selectedService.MADV
        );
        setFormData({ ...formData, dichVu: selectedNoServices });
    };
    return (
        <div className="shadow rounded">
            {/* Thông tin */}
            <div className="px-3 py-2 bg-primary rounded-top">Chọn dịch vụ</div>
            <div className="container-fluid mb-2 py-2">
                <div className="container-fluid mb-3">
                    <div className="row py-2">
                        <IFSearchDV
                            title={"Nhập dịch vụ"}
                            valid={objValidInput.isValidDichVu}
                            size={6}
                            options={services}
                            onChange={(e) => {
                                const value = e.target.value;
                                const selected = services.find(
                                    (service) => service.TENDV === value
                                );
                                if (selected) {
                                    const alreadySelected = selectedServices.find(
                                        (item) => item.MADV === selected.MADV
                                    );

                                    if (alreadySelected) {
                                        setShowError(true);
                                    } else {
                                        setShowError(false);
                                        handleAddService(selected, e);
                                    }
                                }
                            }}
                        />
                        {showError && selectedServices.length > 0 && (
                            <div className="text-danger">Dịch vụ này đã được chọn.</div>
                        )}
                    </div>
                    {selectedServices.length > 0 ? (
                        <ListForm
                            columns={columns}
                            data={selectedServices}
                            onDeleteService={handleDeleteService}
                        />
                    ) : (
                        <div className="d-flex justify-content-center text-danger">
                            Chưa thêm dịch vụ nào.
                        </div>
                    )}
                </div>
            </div>

            <div className="d-flex justify-content-center px-3 py-2">
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleFormSubmit}
                >
                    Đăng kí
                </button>
            </div>
        </div>
    );
}

export default DichVu;