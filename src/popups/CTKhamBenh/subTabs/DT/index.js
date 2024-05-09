import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  IFInputText,
  IFSearchThuoc,
  TextArea,
  IFSelect,
  IFNgay,
  IFOptional,
} from "../../../../component/Layout/TabLayout/InputForm";
import { ListForm } from "../../../../component/Layout/TabLayout/ListForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllThuocAction } from "../../../../redux/action/fetchDataAction/fetchAllThuocAction";
import { fetchCTDTByIdAction } from "../../../../redux/action/fetchDataAction/fetchCTDTById";
import { toast } from "react-toastify";

function DonThuoc() {
  const dispatch = useDispatch();
  const dsThuoc = useSelector((state) => state.fetchAllThuoc.dsThuoc) || [];
  const selectedPK = useSelector((state) => state.selectedRow.selectedRow) || {};
  let existedCTDT = useSelector((state) => state.existedCTDT.data) || [];

  const [formula, setFormula] = useState("");
  const [unit, setUnit] = useState("");
  const [note, setNote] = useState("");
  const [day, setDay] = useState(0);
  const [medicines, setMedicines] = useState([]);

  const [rowData, setRowData] = useState({
    MATHUOC: "",
    TENTHUOC: "",
    THANHPHAN: "",
    GHICHU: "",
    TENDONVI: "",
    SOLUONGTHUOC: 0,
    GIABAN: 0,
    thanhTien: 0,
    soLuongTon: 0,
    // cần sửa lại code để 2 trường này cập nhật tự động khi bs nhập liều dùng
    SOLANUONG: 0,
    SOLUONGUONG: 0,
  });

  const checkThuocExistence = (TENTHUOC) => {
    const thuocExisted = dsThuoc.find((thuoc) => thuoc.TENTHUOC === TENTHUOC);
    return thuocExisted ? thuocExisted : null;
  };

  const handleFormChange = (fieldName, value) => {
    if (fieldName === "TENTHUOC") {
      const thuocExisted = checkThuocExistence(value);
      if (thuocExisted) {
        setRowData({
          ...rowData,
          MATHUOC: thuocExisted.MATHUOC,
          TENTHUOC: thuocExisted.TENTHUOC,
          THANHPHAN: thuocExisted.THANHPHAN,
          TENDONVI: thuocExisted.TENDONVI,
          GIABAN: thuocExisted.GIABAN,
          soLuongTon: thuocExisted.SOLUONGTON,
        });
      } else {
        setRowData({ ...rowData, [fieldName]: value });
      }
    } else {
      setRowData({ ...rowData, [fieldName]: value });
    }
  };

  const handleFormulaChange = (value) => {
    setFormula(value);
    generateDosage(value, unit, note, day);
  };

  const handleUnitChange = (value) => {
    setUnit(value);
    generateDosage(formula, value, note, day);
  };

  const handleDayChange = (value) => {
    setDay(value);
    generateDosage(formula, unit, note, value);
  };

  const handleNoteChange = (value) => {
    setNote(value);
    generateDosage(formula, unit, value, day);
  };

  const generateDosage = (formula, unit, note, day) => {
    const newRowData = { ...rowData };
    const conversionTable = {
      s: "Sáng",
      c: "Chiều",
      t: "Tối",
      n: "ngày",
    };

    const parts = formula.split(/\s+/);
    let dosageText = "";
    let timeParts = [];
    let doseParts = [];
    let totalDailyDose = 0;

    parts.forEach((part) => {
      if (part !== "") {
        const match = part.match(/^([a-z])(\d+)$/i);
        if (match) {
          const letter = match[1].toLowerCase();
          const number = match[2];
          if (letter in conversionTable) {
            if (letter === "n") {
              totalDailyDose += parseInt(number);
            } else {
              timeParts.push({
                time: conversionTable[letter],
                number: parseInt(number),
              });
              totalDailyDose += parseInt(number);
            }
          } else {
            doseParts.push(part);
          }
        } else {
          doseParts.push(part);
        }
      }
    });

    // Sort time parts by time of day
    timeParts.sort((a, b) => {
      const timeOrder = { Sáng: 1, Chiều: 2, Tối: 3, Đêm: 4 };
      return timeOrder[a.time] - timeOrder[b.time];
    });

    // Construct dosage text
    timeParts.forEach((part, index) => {
      dosageText += part.time + " " + part.number + " " + unit;
      if (index < timeParts.length - 1 || totalDailyDose > 0) {
        dosageText += ", ";
      }
    });

    // Add total daily dose if 'n' is specified
    if (totalDailyDose > 0 && !parts.includes("n")) {
      dosageText += totalDailyDose + " " + unit + "/ngày";
      console.log(totalDailyDose.toString());

      let bien = totalDailyDose * parseInt(day);
      newRowData.SOLUONGTHUOC = bien;
      newRowData.thanhTien = bien * newRowData.GIABAN;
    }

    // Add dose parts if any
    if (doseParts.length > 0) {
      dosageText += " " + doseParts.join(" ");
    }

    // Add note if exists
    if (note) {
      dosageText += " " + note.trim() + ".";
    }
    newRowData.GHICHU = dosageText.trim();
    setRowData(newRowData);
  };

  const handleAddMedicine = () => {
    if (rowData.SOLUONGTHUOC > rowData.soLuongTon) {
      toast.error("Số lượng tồn không đủ");
      return;
    }
    setMedicines([...medicines, rowData]);
    const newRowData = {
      MATHUOC: "",
      TENTHUOC: "",
      THANHPHAN: "",
      GHICHU: "",
      TENDONVI: "",
      SOLUONGTHUOC: 0,
      GIABAN: 0,
      thanhTien: 0,
      soLuongTon: 0,
      SOLANUONG: 0,
      SOLUONGUONG: 0,
    };
    setRowData(newRowData);
  };

  const columns = [
    { title: "STT", key: "" }, //STT
    { title: "Tên thuốc", key: "TENTHUOC" },
    { title: "Liều dùng", key: "GHICHU" },
    { title: "Đơn vị thuốc", key: "TENDONVI" },
    { title: "Số lượng thuốc", key: "SOLUONGTHUOC" },
    { title: "Đơn giá", key: "GIABAN" }, //Giá 1 đơn vị thuốc
    { title: "Thành tiền", key: "thanhTien" }, //Giá 1 đơn vị x số lượng thuốc
  ];

  const handleDeleteMedicine = (index) => {
    const updatedMedicines = [...medicines];
    updatedMedicines.splice(index, 1);
    setMedicines(updatedMedicines);
  };

  const insertCTDT = async (medicines, maDT) => {
    const flag = await medicines.map(async (medicine) => {
      try {
        const response = await axios.post(
          "http://localhost:3001/donthuoc/insert-ctdt",
          { ...medicine, maDT },
          { withCredentials: true }
        );
        if (response.status === 200) {
          toast("Thêm chi tiết đơn thuốc thành công");
          dispatch(fetchAllThuocAction());
          return true;
        }
      } catch (error) {
        console.log(error);
        toast.error("Thêm chi tiết đơn thuốc không thành công");
      }
    });

    if (flag && flag.length !== 0) {
      for (const isComplete of flag) {
        if (isComplete === false) {
          return false;
        }
      }
      return true;
    }
  };

  const handleAddDonThuoc = async () => {
    let maDTinserted = "";
    try {
      const response = await axios.post(
        "http://localhost:3001/donthuoc/insert",
        { maPK: selectedPK.MAPK, maLT: 999 },
        { withCredentials: true }
      );
      if (response.status === 200) {
        maDTinserted = response.data.MADT;
        toast("Thêm hóa đơn và đơn thuốc thành công");
        const isComplete = await insertCTDT(medicines, maDTinserted);
        if (isComplete === true) {
          setMedicines([]);
          dispatch(fetchCTDTByIdAction(selectedPK.MAPK));
          setFormula("");
          setUnit("");
          setDay(0);
          setNote("");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Thêm đơn thuốc không thành công");
    }
  };

  return (
    <div className="shadow rounded">
      <div className="px-3 py-2 bg-primary rounded-top">Kê đơn thuốc</div>
      <div className="container-fluid mb-2 py-2">
        <div className="row py-2">
          <IFSearchThuoc
            title={"Tên Thuốc"}
            size={5}
            options={dsThuoc}
            name={"TENTHUOC"}
            required={true}
            onChange={(value) => handleFormChange("TENTHUOC", value)}
          />
          <IFInputText
            title={"Số ngày"}
            size={3}
            onChange={handleDayChange}
            value={day}
          />
          <IFInputText
            title={"Công thức"}
            size={4}
            onChange={handleFormulaChange}
            value={formula}
          />
        </div>

        <div className="row py-2">
          <IFInputText
            title={"Hoạt chất"}
            size={3}
            readOnly={"true"}
            value={rowData.THANHPHAN}
          />
          <IFInputText
            title={"Đơn vị thuốc"}
            size={2}
            readOnly={"true"}
            value={rowData.TENDONVI}
          />
          <IFInputText
            title={"Đơn giá"}
            size={3}
            readOnly={"true"}
            value={rowData.GIABAN}
          />
          <IFInputText
            title={"Ghi chú (VD: Sau ăn, trước ăn,...)"}
            size={4}
            onChange={handleNoteChange}
            value={note}
          />
        </div>
        <div className="row py-2">
          <IFInputText
            title={"Đơn vị kê"}
            size={2}
            onChange={handleUnitChange}
            value={unit}
          />
          <IFInputText
            title={"Số thuốc tồn"}
            size={2}
            value={rowData.soLuongTon}
          />
          <IFInputText
            title={"Số thuốc kê đơn"}
            size={2}
            value={rowData.SOLUONGTHUOC}
            readOnly={false}
            onChange={(value) => handleFormChange("SOLUONGTHUOC", value)}
          />
          <IFInputText
            title={"Liều dùng"}
            size={6}
            value={rowData.GHICHU}
            readOnly={false}
            onChange={(value) => handleFormChange("GHICHU", value)}
          />
        </div>
        <div className="d-flex justify-content-center px-3 py-2">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleAddMedicine}
          >
            Thêm thuốc
          </button>
        </div>
      </div>

      <div className="px-3 py-2 bg-primary">Đơn thuốc</div>
      <ListForm
        columns={columns}
        data={
          existedCTDT.length === 0
            ? medicines
            : existedCTDT.map((item) => ({
                ...item,
                thanhTien: item.GIABAN * item.SOLUONGTHUOC,
              }))
        } // Truyền dữ liệu các loại thuốc vào ListForm
        loading={false}
        onDeleteService={handleDeleteMedicine}
      />
      <div className="d-flex justify-content-center px-3 py-2">
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleAddDonThuoc}
        >
          Kê Đơn Thuốc
        </button>
      </div>
    </div>
  );
}

export default DonThuoc;
