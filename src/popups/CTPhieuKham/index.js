import React, { useState } from "react";
import NavTabVertical from '../../component/NavTabVertical'
import { tabsDataCTPK } from "./data";
import { FaEye } from "react-icons/fa";

function CTPhieuKham({props}) {

  console.log('props',props)
  const handleSave = () => {};

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <FaEye />
      </button>

      <div
        className="modal fade modal-xl"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Thông tin phiếu khám  {props[0]}
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
                <NavTabVertical tabsData={tabsDataCTPK} />
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
                onClick={() => handleSave}
              >
                Lưu những thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CTPhieuKham;
