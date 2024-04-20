import React, { useEffect, useState } from "react";

import { submitData } from "../../redux/action/postDataAction";

import TTKH from "./subTabs/TTKH";

function CTPhieuKham() {

    const handleSave = () => {

    }

    const [currentPage, setCurrentPage] = useState(1);

    const handleSelectList = (id) => {
        setCurrentPage(id);
    }

    const renderElement = () => {
        switch (currentPage) {
          case 1:
            return <TTKH />;
          case 2:
            return <></>;
          case 3:
            return <></>;
          case 4:
            return <></>;
          default:
            return null;
        }
      };

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Phieu kham
            </button>

            <div className="modal fade modal-xl" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Thông tin phiếu khám</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body ">

                            <div className="container-fluid">
                                <div className="row">


                                    <div class="col col-md-3" >
                                        <div className="col-md-12 btn-group-vertical" role="group" aria-label="Vertical radio toggle button group">
                                            <input type="radio" class="btn-check" name="vbtn-radio" id="1" autocomplete="off" 
                                                onChange={() => handleSelectList(1)}/>
                                            <label class="btn btn-outline-primary text-start" for="1">Thông tin khách hàng</label>
                                            <input type="radio" class="btn-check" name="vbtn-radio" id="2" autocomplete="off" 
                                                onChange={() => handleSelectList(2)}/>
                                            <label class="btn btn-outline-primary text-start" for="2">Thông tin khám</label>
                                            <input type="radio" class="btn-check" name="vbtn-radio" id="3" autocomplete="off" 
                                                onChange={() => handleSelectList(3)}/>
                                            <label class="btn btn-outline-primary text-start" for="3">Dịch vụ khám</label>
                                            <input type="radio" class="btn-check" name="vbtn-radio" id="4" autocomplete="off" 
                                                onChange={() => handleSelectList(4)}/>
                                            <label class="btn btn-outline-primary text-start" for="4">Hóa đơn</label>
                                        </div>


                                    </div>

                                    <div className="col col-md-9 border py-3">
                                        {renderElement()}
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleSave}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CTPhieuKham;