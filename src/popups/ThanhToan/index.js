// import React, { useState } from "react";
// import Navtab from "../../component/Navtab";
// import { tabsDataTT } from "./data";
// import { FaDollarSign } from "react-icons/fa";
// import { ListGroupItem, TextArea } from "../../component/Layout/TabLayout/InputForm";

// function ThanhToan({ props }) {
//   const handleThanhToan = () => {
//   };

//   return (
//     <>
//       <button
//         type="button"
//         className="btn btn-primary"
//         data-bs-toggle="modal"
//         data-bs-target="#thanhtoanModal"
//       >
//         <FaDollarSign />
//       </button>

//       <div
//         className="modal fade modal-xl"
//         id="thanhtoanModal"
//         tabindex="-1"
//         aria-labelledby="thanhtoanModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-scrollable">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5" id="thanhtoanModalLabel">
//                 Thanh toán {props[0]}
//               </h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>

//             <div className="modal-body ">
//               <div className="container-fluid">
//                 <div className="row">
//                   <div className="col-9">
//                     <Navtab tabsData={tabsDataTT} />
//                   </div>
//                   <div className="col-3">
//                     <ListGroupItem
//                       title={"Khách hàng"}
//                       value={"Doan Danh Du"}
//                     />
//                     <ListGroupItem title={"Người bán"} value={"Le Thi Thanh Thao"} />
//                     <ListGroupItem title={"Ngày bán"} value={"25/4/2004"} />
//                     <ListGroupItem title={"Mã phiếu"} value={"PK2022"} />
//                     <ListGroupItem title={"Tổng tiền"} value={"4.370.000"} />
//                     <ListGroupItem title={"Giảm giá"} value={"0"} />
//                     <ListGroupItem
//                       title={"Thành tiền"}
//                       value={"4.370.000"}
//                     />
//                     <ListGroupItem
//                       title={"Phương thức TT"}
//                       value={"Tiền mặt"}
//                     />
//                     <TextArea title={"Ghi chú"} value={""} />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Đóng
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={() => handleThanhToan}
//               >
//                 Thanh toán
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ThanhToan;
