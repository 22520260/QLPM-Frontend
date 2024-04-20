import DatePicker from "rsuite/DatePicker";
import { FaSearch, FaRedoAlt } from "react-icons/fa";
import "rsuite/DatePicker/styles/index.css";
import "./style.css";
import { formatDate } from "../../../../utils/appUtils";

export function IFSelect({ title, size, option, onChange }) {
  const style = "col-md-" + size;

  const handleSelectChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  const optionElements = option.map((value, index) => (
    <option key={index} value={value}>
      {value}
    </option>
  ));

  return (
    <div className={style}>
      <label htmlFor={title} className="form-label">
        {title}
      </label>
      <select
        className="form-select"
        id={title}
        aria-label="Default select example"
        onChange={handleSelectChange}
      >
        <option value="">Chọn</option>
        {optionElements}
      </select>
    </div>
  );
}

export function IFInputText({ title, size, value, readOnly, onChange }) {
  const style = "col-md-" + size;

  const handleInputChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <div className={style}>
      <label htmlFor={title} className="form-label">
        {title}
      </label>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          id={title}
          aria-describedby="basic-addon3 basic-addon4"
          onChange={handleInputChange}
          value={value}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
}

export function IFNgay({ title, onChange }) {
  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = new Date(date);
      // const day = formattedDate.getDate().toString().padStart(2, "0"); // Lấy ngày (có thêm số 0 nếu cần)
      // const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng (có thêm số 0 nếu cần)
      // const year = formattedDate.getFullYear(); // Lấy năm
      // const formattedDateString = `${day}-${month}-${year}`; // Định dạng dd-mm-yyyy
      onChange(formattedDate); // Gọi hàm onChange với ngày đã định dạng
    } else {
      onChange(""); // Nếu date là null hoặc undefined, trả về chuỗi rỗng
    }
  };

  return (
    <div className="col-md-2">
      <label htmlFor={title} className="form-label">
        {title}
      </label>
      <div className="input-group">
        <DatePicker
          id={title}
          format="dd/MM/yyyy"
          placeholder="dd/mm/yyyy"
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
}

export function IFSearchDV({ title, size, options, onChange }) {
  const style = "col-md-" + size;
  const handleInputChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <div className={style}>
      <label htmlFor="exampleDataList" className="form-label">
        {title}
      </label>
      <div className="input-group">
        <input
          className="form-control"
          list="datalistOptions"
          id="exampleDataList"
          type="text"
          onChange={handleInputChange}
        />
        <datalist id="datalistOptions">
          {Array.isArray(options) ? (
            options.map((option, index) => (
              <option key={index} value={option} />
            ))
          ) : (
            <option value="Loading..." />
          )}
        </datalist>
        <button className="input-group-text bg-primary">
          <FaSearch />
        </button>
        <button className="input-group-text">
          <FaRedoAlt />
        </button>
      </div>
    </div>
  );
}

export function IFSearch({ title, size, onChange }) {
  const style = "col-md-" + size;
  const handleInputChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <div className={style}>
      <label htmlFor="exampleDataList" className="form-label">
        {title}
      </label>
      <div className="input-group">
        <input
          className="form-control"
          id="exampleDataList"
          type="text"
          onChange={handleInputChange}
        />
        <button className="input-group-text bg-primary">
          <FaSearch />
        </button>
        <button className="input-group-text">
          <FaRedoAlt />
        </button>
      </div>
    </div>
  );
}
