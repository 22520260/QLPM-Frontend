import DatePicker from "rsuite/DatePicker";
import { FaSearch, FaRedoAlt } from "react-icons/fa";
import { useState } from "react";
import "rsuite/DatePicker/styles/index.css";
import "./style.css";
import { RiEyeCloseLine, RiEyeFill } from "react-icons/ri";

export function IFSelect({
  def = "Chọn",
  title,
  size,
  options,
  value,
  onChange,
  keyObj,
  showObj,
  required,
  readOnly,
}) {
  const style = "col-md-" + size;

  const handleSelectChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <div className={style}>
      <label htmlFor={title} className="form-label d-flex align-items-center">
        <span>{title}</span>
        {required && <div className="text-danger ms-1">*</div>}
      </label>
      <select
        className="form-select"
        id={title}
        aria-label="Default select example"
        onChange={handleSelectChange}
        required={required}
        value={value}
        disabled={readOnly}
      >
        <option value={0}>{def}</option>
        {options.map((value, index) => (
          <option key={index} value={value[keyObj]}>
            {value[showObj]}
          </option>
        ))}
      </select>
    </div>
  );
}

export function IFInputText({
  title,
  valid = true,
  size,
  value,
  readOnly,
  onChange,
  required,
  type = "text",
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
          type={type}
          className={valid ? "form-control" : "form-control is-invalid"}
          id={title}
          aria-describedby="basic-addon3 basic-addon4"
          onChange={handleInputChange}
          value={value}
          disabled={readOnly}
          required={required}
        />
      </div>
    </div>
  );
}

export function IFPassword({ title, valid, size, value, readOnly, onChange }) {
  const style = "col-md-" + size;

  const handleInputChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  const [isViewPass, setIsViewPass] = useState(false);
  const [btnClass, setBtnClass] = useState("btn btn-outline-primary");

  const toggleEye = () => {
    setIsViewPass(!isViewPass);
    setBtnClass(isViewPass ? "btn btn-outline-primary" : "btn btn-primary");
  };

  return (
    <div className={style}>
      <label htmlFor={title} className="form-label d-flex align-items-center">
        <span>{title}</span>
        <div className="text-danger ms-1">*</div>
      </label>

      <div className="input-group">
        <input
          type={isViewPass ? "text" : "password"}
          className={valid ? "form-control" : "form-control is-invalid"}
          id={title}
          aria-describedby="basic-addon3 basic-addon4"
          onChange={handleInputChange}
          value={value}
          readOnly={readOnly}
          required="true"
        />

        <button
          className={btnClass}
          type="button"
          id="button-addon2"
          onClick={toggleEye}
        >
          {isViewPass ? <RiEyeFill /> : <RiEyeCloseLine />}
        </button>
      </div>
    </div>
  );
}

export function TextArea({
  title,
  size,
  row,
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
      <textarea
        class="form-control"
        id={title}
        rows={row}
        onChange={handleInputChange}
        value={value}
        readOnly={readOnly}
        required={required}
      />
    </div>
  );
}

export function IFNgay({ title, size, defaultValue, value, onChange, readOnly }) {
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
          disabled={readOnly}
        />
      </div>
    </div>
  );
}

export function IFNgayNgang({ title, size, defaultValue, value, onChange }) {
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
  );
}

export function IFSearchDV({ title, valid, size, options, onChange, value }) {
  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <div className={`col-md-${size}`}>
      <label htmlFor="servicesDataList" className="form-label">
        {title}
      </label>
      <div className="input-group">
        <input
          className={
            valid ? "form-control rounded" : "form-control rounded is-invalid"
          }
          list="servicesDatalist"
          id="servicesDataList"
          type="text"
          value={value}
          onChange={handleChange}
        />
        <datalist id="servicesDatalist">
          {Array.isArray(options) ? (
            options.map((option, index) => (
              <option key={index} value={option.TENDV} />
            ))
          ) : (
            <option value="Loading..." />
          )}
        </datalist>
      </div>
    </div>
  );
}

export function IFSearchHT({
  title,
  valid,
  size,
  options,
  required,
  onChange,
}) {
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
          className={
            valid ? "form-control rounded" : "form-control rounded is-invalid"
          }
          list="hoTenDatalist"
          id="hoTenInput"
          onChange={handleInputChange}
          required
        />
        <datalist id="hoTenDatalist">
          {Array.isArray(options) ? (
            options.map((option, index) => (
              <option key={index} value={option.HOTEN} />
            ))
          ) : (
            <option value="Loading..." />
          )}
        </datalist>
      </div>
    </div>
  );
}

export function IFSearchThuoc({
  title,
  valid,
  size,
  options,
  name,
  required,
  onChange,
}) {
  const handleInputChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <div className={`col-md-${size}`}>
      <label
        htmlFor="thuocInput"
        className="form-label d-flex align-items-center"
      >
        <span>{title}</span>
        {required && <div className="text-danger ms-1">*</div>}
      </label>

      <div className="input-group">
        <input
          className={
            valid ? "form-control rounded" : "form-control rounded is-invalid"
          }
          list="thuocDatalist"
          id="thuocInput"
          onChange={handleInputChange}
          required
        />
        <datalist id="thuocDatalist">
          {Array.isArray(options) ? (
            options.map((option, index) => (
              <option key={index} value={option[name]} />
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
        <FaSearch className="me-2 mb-1" />
        {title}
      </label>
      <div className="input-group">
        <input
          className="form-control rounded"
          id="exampleDataList"
          type="text"
          onChange={handleInputChange}
          required
        />
        {/* <button className="input-group-text bg-primary">
          <FaSearch />
        </button>
        <button className="input-group-text">
          <FaRedoAlt />
        </button> */}
      </div>
    </div>
  );
}

export function ListGroupItem({ title, value, disable }) {
  return (
    <div className="input-group">
      <span
        className="input-group-text border-0 bg-transparent p-0"
        id="inputGroup-sizing-default"
      >
        {title}
      </span>
      <input
        type="text"
        className="form-control border-0 text-end p-1 bg-transparent"
        value={value}
        disabled={disable}
      />
    </div>
  );
}
