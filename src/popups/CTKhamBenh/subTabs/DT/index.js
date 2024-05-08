import {
    IFInputText,
    TextArea,
    IFSelect,
    IFNgay,
    IFOptional,
} from "../../../../component/Layout/TabLayout/InputForm";
import { useState } from "react";
import { ListForm } from "../../../../component/Layout/TabLayout/ListForm";

function DonThuoc() {
    const handleChange = (page) => {
        console.log(page);
    };
    const [formula, setFormula] = useState('');
    const [unit, setUnit] = useState('');
    const [note, setNote] = useState('');
    const [dosage, setDosage] = useState('');
    const [day, setDay] = useState('');
    const [totalDosage, setTotalDosage] = useState(0);
    const [medicines, setMedicines] = useState([]);

    const [formData, setFormData] = useState({
        hoTen: "",
        gioiTinh: 0,
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
        const conversionTable = {
            's': 'Sáng',
            'c': 'Chiều',
            't': 'Tối',
            'n': 'ngày'
        };

        const parts = formula.split(/\s+/);
        let dosageText = "";
        let timeParts = [];
        let doseParts = [];
        let totalDailyDose = 0;

        parts.forEach(part => {
            if (part !== "") {
                const match = part.match(/^([a-z])(\d+)$/i);
                if (match) {
                    const letter = match[1].toLowerCase();
                    const number = match[2];
                    if (letter in conversionTable) {
                        if (letter === 'n') {
                            totalDailyDose += parseInt(number);
                        } else {
                            timeParts.push({ time: conversionTable[letter], number: parseInt(number) });
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
            const timeOrder = { 'Sáng': 1, 'Chiều': 2, 'Tối': 3, 'Đêm': 4 };
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
        if (totalDailyDose > 0 && !parts.includes('n')) {
            dosageText += totalDailyDose + " " + unit + "/ngày";
            setTotalDosage(totalDailyDose * day);
        }

        // Add dose parts if any
        if (doseParts.length > 0) {
            dosageText += " " + doseParts.join(" ");
        }

        // Add note if exists
        if (note) {
            dosageText += " " + note.trim() + ".";
        }

        setDosage(dosageText.trim());
    };

    const handleAddMedicine = () => {
        const newMedicine = {
            MADT: "1",
            TENTHUOC: "Tên",
            GHICHU: "Sáng 1 viên sau ăn",
            TENDONVI: "viên",
            SOLUONGUONG: "20",
        };

        setMedicines([...medicines, newMedicine]);
    };

    const columns = [
        { title: "STT", key: "" }, //STT
        { title: "Tên thuốc", key: "TENTHUOC" },
        { title: "Liều dùng", key: "GHICHU" },
        { title: "Đơn vị thuốc", key: "TENDONVI" },
        { title: "Số lượng thuốc", key: "SOLUONGUONG" },
        { title: "Đơn giá", key: "1" }, //Giá 1 đơn vị thuốc
        { title: "Thành tiền", key: "2" }, //Giá 1 đơn vị x số lượng thuốc
        { title: "Thanh toán", key: "3" }, //Yes/no
    ];

    const handleDeleteMedicine = (index) => {
        const updatedMedicines = [...medicines];
        updatedMedicines.splice(index, 1);
        setMedicines(updatedMedicines);
        const selectedNoMedicines = updatedMedicines.map(
            (updatedMedicines) => updatedMedicines.MADV
        );
        setFormData({ ...formData, dichVu: selectedNoMedicines });
    };



    return (
        <div className="shadow rounded">
            <div className="px-3 py-2 bg-primary rounded-top">Kê đơn thuốc</div>
            <div className="container-fluid mb-2 py-2">
                <div className="row py-2">
                    <IFInputText
                        title={"Tên thuốc"}
                        size={5}
                        onChange={(value) => handleChange(1)}
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
                        readOnly={'true'}
                        onChange={(value) => handleChange(1)}
                    />
                    <IFInputText
                        title={"Đơn vị thuốc"}
                        size={2}
                        readOnly={'true'}
                        onChange={(value) => handleChange(1)}
                    />
                    <IFInputText
                        title={"Đơn giá"}
                        size={3}
                        readOnly={'true'}
                        onChange={(value) => handleChange(1)}
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
                        onChange={(value) => handleChange(1)}
                    />
                    <IFInputText
                        title={"Số thuốc kê đơn"}
                        size={2}
                        value={totalDosage}
                        onChange={(value) => handleChange(1)}
                    />
                    <IFInputText
                        title={"Liều dùng"}
                        size={6}
                        value={dosage}
                        onChange={(value) => handleChange(1)}

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
                data={medicines} // Truyền dữ liệu các loại thuốc vào ListForm
                loading={false}
                onDeleteService={handleDeleteMedicine}
            />
        </div>
    );
}

export default DonThuoc;