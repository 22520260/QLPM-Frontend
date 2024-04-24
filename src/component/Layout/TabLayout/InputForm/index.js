import DatePicker from "rsuite/DatePicker";
import { FaSearch, FaRedoAlt } from "react-icons/fa";
import { useState } from "react";
import "rsuite/DatePicker/styles/index.css";
import "./style.css";

export function IFSelect({
  title,
  size,
  option,
  indexName,
  onChange,
  required,
}) {
  const style = "col-md-" + size;

  const handleSelectChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  const optionElements = option.map((value, index) => (
    <option key={index} value={Array.isArray(value) ? value[indexName] : value}>
      {Array.isArray(value) ? value[indexName] : value}
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
        required={required}
      >
        <option value="">Chọn</option>
        {optionElements}
      </select>
    </div>
  );
}

export function IFInputText({
  title,
  size,
  value,
  readOnly,
  onChange,
  required,
}) {
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
          required={required}
        />
      </div>
    </div>
  );
}

export function IFNgay({ title, size, defaultValue, onChange }) {
  const style = "col-md-" + size;
  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = new Date(date);
      onChange(formattedDate); 
    } else {
      onChange(""); 
    }
  };

  return (
    <div className={style}>
      <label htmlFor={title} className="form-label">
        {title}
      </label>
      <div className="input-group">
        <DatePicker
          containerProps={{ style: { zIndex: 1056 } }}
          id={title}
          format="dd/MM/yyyy"
          placeholder="dd/mm/yyyy"
          onChange={handleDateChange}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
}

export function IFSearchDV({ title, size, options, onChange }) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value); 
  };

  const handleSelectOption = (selectedValue) => {
    onChange(selectedValue); 
    setSearchValue(""); 
  };

  return (
    <div className={`col-md-${size}`}>
      <label htmlFor="exampleDataList" className="form-label">
        {title}
      </label>
      <div className="input-group">
        <input
          className="form-control"
          list="datalistOptions"
          id="exampleDataList"
          type="text"
          value={searchValue}
          onChange={handleInputChange}
        />
        <datalist id="datalistOptions">
          {Array.isArray(options) ? (
            options.map((option, index) => (
              <option key={index} value={option[2]} />
            ))
          ) : (
            <option value="Loading..." />
          )}
        </datalist>
        <button
          className="input-group-text bg-primary"
          onClick={() => handleSelectOption(searchValue)}
        >
          Add
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
          required
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
