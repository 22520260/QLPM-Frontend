import { MdAttachMoney, MdMoneyOff } from "react-icons/md";
import { TbPill, TbPillOff, TbStethoscope, TbStethoscopeOff } from "react-icons/tb";

const styles = ["danger", "warning", "success", "info"]


export function TTK({ stt }) {
    const values = ["Đã hủy", "Chưa thực hiện", "Đã hoàn thành", "Đang thực hiện"]
    let style = "p-2 rounded bg-opacity-10 fw-semibold text-" + styles[stt] + " border border-" + styles[stt] + " bg-" + styles[stt]
    console.log(styles)
    return (
        <span className={style}>
            {values[stt]}
        </span>
    )
}

export function TTTT({ stt }) {
    const values = ["Không có đơn", "Chưa thanh toán", "Đã thanh toán"]
    let style = "p-2 rounded bg-opacity-10 fw-semibold text-" + styles[stt] + " border border-" + styles[stt] + " bg-" + styles[stt]
    return (
        <span className={style}>
            {stt == 0 ? <MdMoneyOff /> : <MdAttachMoney />}
        </span>
    )
}

export function TTCLS({ stt }) {
    const values = ["Không có đơn", "Chưa thanh toán", "Đã thanh toán"]
    let style = "p-2 rounded bg-opacity-10 fw-semibold text-" + styles[stt] + " border border-" + styles[stt] + " bg-" + styles[stt]
    return (
        <span className={style}>
            {stt == 0 ? <TbStethoscopeOff /> : <TbStethoscope />}
        </span>
    )
}

export function TTT({ stt }) {
    const values = ["Không có đơn", "Chưa thanh toán", "Đã thanh toán"]
    let style = "p-2 rounded bg-opacity-10 fw-semibold text-" + styles[stt] + " border border-" + styles[stt] + " bg-" + styles[stt]
    return (
        <span className={style}>
            {stt == 0 ? <TbPillOff /> : <TbPill />}
        </span>
    )
}

export function StatusIcon() {
    return (
        <div>
            {/* Khong co 1 */}
            <TTK stt={0} />
            <div className="py-3 gap-2 flex">
                <TTTT stt={0} />
                <TTCLS stt={0} />
                <TTT stt={0} />
            </div>

        </div >
    );
}