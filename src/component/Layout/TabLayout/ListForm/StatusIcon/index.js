import { MdAttachMoney, MdMoneyOff } from "react-icons/md";
import {
  TbPill,
  TbPillOff,
  TbStethoscope,
  TbStethoscopeOff,
} from "react-icons/tb";
import { Tooltip } from "react-tooltip";

const styles = ["danger", "warning", "success", "info"];

export function TTK({ value }) {
  const values = [
    "Đã hủy",
    "Chưa thực hiện",
    "Đã hoàn thành",
    "Đang thực hiện",
  ];
  const stt = findIndexByValue(values, value);
  console.log("TTK", value, stt);
  let style =
    "p-2 rounded bg-opacity-10 fw-semibold text-" +
    styles[stt] +
    " border border-" +
    styles[stt] +
    " bg-" +
    styles[stt];
  return (
    <span>
      <Tooltip id="ttk-tooltip" />
      <a data-tooltip-id="ttk-tooltip" data-tooltip-content={values[stt]}>
        <span className={style}>{values[stt]}</span>
      </a>
    </span>
  );
}

export function TTTT({ value }) {
  const values = ["Không có đơn", "Chưa thanh toán", "Đã thanh toán"];
  const stt = findIndexByValue(values, value);
  console.log("TTTT", value, stt);

  let style =
    "p-2 rounded bg-opacity-10 fw-semibold text-" +
    styles[stt] +
    " border border-" +
    styles[stt] +
    " bg-" +
    styles[stt];
  return (
    <span>
      <Tooltip id="tttt-tooltip" />
      <a data-tooltip-id="tttt-tooltip" data-tooltip-content={values[stt]}>
        <span className={style}>
          {stt == 0 ? <MdMoneyOff /> : <MdAttachMoney />}
        </span>
      </a>
    </span>
  );
}

export function TTCLS({ value }) {
  const values = ["Không có đơn", "Chưa thanh toán", "Đã thanh toán"];
  const stt = findIndexByValue(values, value);
  console.log("TTCLS", value, stt);

  let style =
    "p-2 rounded bg-opacity-10 fw-semibold text-" +
    styles[stt] +
    " border border-" +
    styles[stt] +
    " bg-" +
    styles[stt];
  return (
    <span>
      <Tooltip id="ttcls-tooltip" />
      <a data-tooltip-id="ttcls-tooltip" data-tooltip-content={values[stt]}>
        <span className={style}>
          {stt == 0 ? <TbStethoscopeOff /> : <TbStethoscope />}
        </span>
      </a>
    </span>
  );
}

export function TTT({ value }) {
  const values = ["Không có đơn", "Chưa thanh toán", "Đã thanh toán"];
  const stt = findIndexByValue(values, value);
  console.log("TTT", value, stt);

  let style =
    "p-2 rounded bg-opacity-10 fw-semibold text-" +
    styles[stt] +
    " border border-" +
    styles[stt] +
    " bg-" +
    styles[stt];
  return (
    <span>
      <Tooltip id="ttt-tooltip" />
      <a data-tooltip-id="ttt-tooltip" data-tooltip-content={values[stt]}>
        <span className={style}>{stt == 0 ? <TbPillOff /> : <TbPill />}</span>
      </a>
    </span>
  );
}

function findIndexByValue(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return i;
    }
  }
  return -1;
}

export function StatusIcon({
  trangThaiThucHien,
  trangThaiThanhToanPK,
  trangThaiThanhToanCLS,
  trangThaiThanhToanDT,
}) {
  return (
    <div>
      <TTK value={trangThaiThucHien} />
      <TTTT value={trangThaiThanhToanPK} />
      {/* <div className="py-3 gap-2 flex"> */}
      <TTCLS value={trangThaiThanhToanCLS} />
      <TTT value={trangThaiThanhToanDT} />
      {/* </div> */}
    </div>
  );
}
