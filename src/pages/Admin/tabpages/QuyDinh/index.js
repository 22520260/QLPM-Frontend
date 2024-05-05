import { IFInputText } from "../../../../component/Layout/TabLayout/InputForm";
import DSDV from "./DSDV";
import DSLB from "./DSLB";
import DVT from "./DVT";

function QuyDinh() {
    return (
        <>
            <div className="container-fluid">
                {/* So BN tối đa */}
                <div className="row py-3 align-items-end border border-primary">
                    <IFInputText title={"Số bệnh nhân tối đa"} size={2} />
                    <div className="col col-md-auto">
                        <button
                            className="btn btn-primary"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#idtmbn">
                            Thay đổi
                        </button>
                    </div>
                </div>

                <div className="row py-3 align-items-end border border-primary">
                    <DSDV />
                </div>

                <div className="row">
                    <div className="col col-md-6 py-3 border border-primary">
                        <div className="h-100">
                            <DSLB />
                        </div>
                    </div>
                    <div className="col col-md-6 py-3 border border-primary">
                        <div className="h-100">
                            <DVT />
                        </div>
                    </div>
                </div>
            </div>



            {/* Modal them bnhan */}
            <div className="modal fade" id="idtmbn" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Thêm bệnh nhân
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body ">
                            <div className="container-fluid">
                                <IFInputText title={'Số bệnh nhân tối đa'} size={12} />

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Đóng
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => { }}
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuyDinh;