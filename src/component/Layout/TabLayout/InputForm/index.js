import DatePicker from 'rsuite/DatePicker';
import 'rsuite/DatePicker/styles/index.css';
import './style.css'

export function IFSelect({title, size, option}) {
    const style = 'col-md-' + size
    const optionElements = option.map((value, index) => (
        <option key={index} value={index}>{value}</option>
    ));
    return (
        <div className={style}>
            <label for="basic-url" className="form-label">{title}</label>
            <select class="form-select" aria-label="Default select example">
                <option selected>Chọn</option>
                {optionElements}
            </select>
        </div>
    );
}

export function IFInputText({title, size}) {
    const style = 'col-md-' + size

    return (
        <div className={style}>
            <label for="basic-url" className="form-label">{title}</label>
            <div className="input-group">
                <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" />
            </div>
        </div>
    );
}

export function IFNgaySinh() {
    return (
        <div className="col-md-2">
            <label htmlFor="ngaySinh" className="form-label">Ngày sinh</label>
            <div className="input-group">
                <DatePicker format="dd/MM/yyyy" placeholder="dd/mm/yyyy" />
            </div>
        </div>
    );
}