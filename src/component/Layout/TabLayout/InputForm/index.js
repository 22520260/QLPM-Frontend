import DatePicker from "rsuite/DatePicker";
import { FaSearch, FaRedoAlt } from "react-icons/fa";
import { useState } from "react";
import "rsuite/DatePicker/styles/index.css";
import "./style.css";

export function IFSelect({
  title,
  size,
  option,
  selected,
  indexName,
  onChange,
  required,
}) {
  const style = "col-md-" + size;

  const handleSelectChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };

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
        value={selected}
      >
        <option selected>Chọn</option>
        {option.map((value, index) => (
          <option
            key={index}
            value={Array.isArray(value) ? value[indexName] : value}
          >
            {Array.isArray(value) ? value[indexName] : value}
          </option>
        ))}
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
      <label htmlFor={title} className="form-label d-flex align-items-center">
        <span>{title}</span>
        {required && <div className="text-danger ms-1">*</div>}
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

export function IFNgay({ title, size, defaultValue, value, onChange }) {
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
          value={value}
        />
      </div>
    </div>
  );
}

export function IFSearchDV({ title, size, options, onChange }) {
  const handleChange = (e) => {
    const value = e.target.value;
    onChange(value);
    e.target.value = "";
  };

  return (
    <div className={`col-md-${size}`}>
      <label htmlFor="servicesDataList" className="form-label">
        {title}
      </label>
      <div className="input-group">
        <input
          className="form-control rounded"
          list="servicesDatalist"
          id="servicesDataList"
          type="text"
          onChange={handleChange}
        />
        <datalist id="servicesDatalist">
          {Array.isArray(options) ? (
            options.map((option, index) => (
              <option key={index} value={option[2]} />
            ))
          ) : (
            <option value="Loading..." />
          )}
        </datalist>
      </div>
    </div>
  );
}

export function IFSearchHT({ title, size, options, required, onChange }) {
  const handleInputChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <div className={`col-md-${size}`}>
      <label
        htmlFor="hoTenInput"
        className="form-label d-flex align-items-center"
      >
        <span>{title}</span>
        {required && <div className="text-danger ms-1">*</div>}
      </label>

      <div className="input-group">
        <input
          className="form-control rounded"
          list="hoTenDatalist"
          id="hoTenInput"
          onChange={handleInputChange}
          required
        />
        <datalist id="hoTenDatalist">
          {Array.isArray(options) ? (
            options.map((option, index) => (
              <option key={index} value={option[3]} />
            ))
          ) : (
            <option value="Loading..." />
          )}
        </datalist>
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
