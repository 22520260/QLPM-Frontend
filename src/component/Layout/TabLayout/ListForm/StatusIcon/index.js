import { MdAttachMoney, MdMoneyOff } from "react-icons/md";
import {
  TbPill,
  TbPillOff,
  TbStethoscope,
  TbStethoscopeOff,
} from "react-icons/tb";

const styles = ["danger", "warning", "success", "info"];

export function TTK({ value }) {
  const values = [
    "Đã hủy",
    "Chưa thực hiện",
    "Đã hoàn thành",
    "Đang thực hiện",
  ];
  const stt = findIndexByValue(values, value);
  console.log('TTK', value, stt);
  let style =
    "p-2 rounded bg-opacity-10 fw-semibold text-" +
    styles[stt] +
    " border border-" +
    styles[stt] +
    " bg-" +
    styles[stt];
  return <span className={style}>{values[stt]}</span>;
}

export function TTTT({ value }) {
  const values = ["Không có đơn", "Chưa thanh toán", "Đã thanh toán"];
  const stt = findIndexByValue(values, value);
  console.log('TTTT', value, stt);

  let style =
    "p-2 rounded bg-opacity-10 fw-semibold text-" +
    styles[stt] +
    " border border-" +
    styles[stt] +
    " bg-" +
    styles[stt];
  return (
    <span className={style}>
      {stt == 0 ? <MdMoneyOff /> : <MdAttachMoney />}
    </span>
  );
}

export function TTCLS({ value }) {
  const values = ["Không có đơn", "Chưa thanh toán", "Đã thanh toán"];
  const stt = findIndexByValue(values, value);
  console.log('TTCLS', value, stt);

  let style =
    "p-2 rounded bg-opacity-10 fw-semibold text-" +
    styles[stt] +
    " border border-" +
    styles[stt] +
    " bg-" +
    styles[stt];
  return (
    <span className={style}>
      {stt == 0 ? <TbStethoscopeOff /> : <TbStethoscope />}
    </span>
  );
}

export function TTT({ value }) {
  const values = ["Không có đơn", "Chưa thanh toán", "Đã thanh toán"];
  const stt = findIndexByValue(values, value);
  console.log('TTT', value, stt);

  let style =
    "p-2 rounded bg-opacity-10 fw-semibold text-" +
    styles[stt] +
    " border border-" +
    styles[stt] +
    " bg-" +
    styles[stt];
  return <span className={style}>{stt == 0 ? <TbPillOff /> : <TbPill />}</span>;
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
      {/* Khong co 1 */}
      <TTK value={trangThaiThucHien} />
      {/* <div className="py-3 gap-2 flex"> */}
        <TTTT value={trangThaiThanhToanPK} />
        <TTCLS value={trangThaiThanhToanCLS} />
        <TTT value={trangThaiThanhToanDT} />
      {/* </div> */}
    </div>
  );
}
