import React, { useEffect, useState } from "react";
import {
    IFInputText,
    IFSelect,
    IFNgay,
    IFSearch,
    IFSearchDV,
} from "../../component/Layout/TabLayout/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { submitData } from "../../redux/action/postDataAction";
import { fetchData } from "../../redux/action/getDataAction";
import { extractNames } from "../../utils/appUtils";

function CTPhieuKham() {
    const dispatch = useDispatch();
    const responseMessage = useSelector((state) => state.postData.status);
    const [formData, setFormData] = useState({
        hoTen: "",
        gioiTinh: "",
        diaChi: "",
        ngaySinh: "",
        cccd: "",
        soDienThoai: "",
        diUng: "",
        ngayKham: "",
        bacSi: "",
        lyDoKham: "",
        chuThich: "",
        dichVu: "",
    });
    const [age, setAge] = useState("");
    const doctors = useSelector((state) => state.getData.data);

    const handleChange = (fieldName, value) => {
        setFormData({ ...formData, [fieldName]: value });

        if (fieldName === "ngaySinh") {
            const age = calculateAge(value);
            setAge(age);
        }
    };

    const namesDoctor = extractNames(doctors);
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

        return (age > 0 ? age : 0);
    };

    useEffect(() => {
        dispatch(fetchData("http://localhost:3001/tiepdon"));
    }, []);

    const handleFormSubmit = () => {
        dispatch(
            submitData({
                url: "http://localhost:3001/customer/store",
                formData: formData,
            })
        );
    };
    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Phieu kham
            </button>

            <div className="modal fade modal-xl" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Thông tin phiếu khám</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body ">

                            <div className="container-fluid">
                                <div className="row">

                                    <div className="col col-md-3">
                                        alW
                                    </div>

                                    <div className="col col-md-9 border py-3">
                                        <div className="row py-2">
                                            <IFInputText
                                                title={"Họ và Tên"}
                                                size={5}
                                                onChange={(value) => handleChange("hoTen", value)}
                                            />
                                            <IFInputText
                                                title={"Địa chỉ"}
                                                size={7}
                                                onChange={(value) => handleChange("diaChi", value)}
                                            />
                                        </div>
                                        <div className="row py-2">
                                            <IFSelect
                                                title={"Giới tính"}
                                                size={3}
                                                option={["Nam", "Nữ", "Khác"]}
                                                onChange={(value) => handleChange("gioiTinh", value)}
                                            />
                                            <IFNgay
                                                title={"Ngày sinh"}
                                                size={4}
                                                onChange={(value) => handleChange("ngaySinh", value)}
                                            />
                                            <IFInputText
                                                title={"Tuổi"}
                                                size={2}
                                                value={age}
                                                readOnly={true}
                                                onChange={(value) => handleChange("tuoi", value)}
                                            />
                                            <IFInputText
                                                title={"CCCD"}
                                                size={3}
                                                onChange={(value) => handleChange("cccd", value)}
                                            />
                                        </div>
                                        <div className="row py-2">
                                            <IFInputText
                                                title={"Số điện thoại"}
                                                size={3}
                                                onChange={(value) => handleChange("soDienThoai", value)}
                                            />
                                            <IFInputText
                                                title={"Dị ứng"}
                                                size={5}
                                                onChange={(value) => handleChange("diUng", value)}
                                            />
                                            <IFNgay
                                                title={"Ngày khám"}
                                                size={4}
                                                onChange={(value) => handleChange("ngayKham", value)}
                                            />
                                        </div>
                                        <div className="row py-2">

                                            <IFSelect
                                                title={"Bác sĩ"}
                                                size={4}
                                                option={namesDoctor}
                                                onChange={(value) => handleChange("bacSi", value)}
                                            />
                                            <IFInputText
                                                title={"Lý do khám"}
                                                size={5}
                                                onChange={(value) => handleChange("lyDoKham", value)}
                                            />
                                            <IFInputText
                                                title={"Chú thích (nếu có)"}
                                                size={3}
                                                onChange={(value) => handleChange("chuThich", value)}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CTPhieuKham;