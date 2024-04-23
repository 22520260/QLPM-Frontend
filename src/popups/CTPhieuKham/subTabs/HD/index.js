import React from "react";
import { useSelector } from "react-redux";
import { ListForm } from "../../../../component/Layout/TabLayout/ListForm";
function HoaDon() {
  const doctors = useSelector((state) => state.fetchAllBacSi.doctors);

  const handleChange = (page) => {
    console.log(page);
  };

  const columns = [
    { title: "Mã hóa đơn", key: "0" },
    { title: "Loại", key: "2" },
    { title: "Tổng tiền", key: "3" },
  ];

  return (
    <div>
      {/* Thông tin */}
      <div className="px-3 py-2 d-flex justify-content-center bg-primary">
        Dịch vụ - Đơn thuốc
      </div>
      {/* <br></br>
      <div className="py-3 border border-primary">
        <div className="container-fluid mb-">
          <div className="px-3 py-2 text-primary">Dịch vụ khám</div>
          <ListForm columns={columns} data={doctors}></ListForm>
        </div>
      </div>
      <br></br>
      <div className="py-3 border border-primary">
        <div className="container-fluid mb-">
          <div className="px-3 py-2 text-primary">Dịch vụ cận lâm sàn</div>
          <ListForm columns={columns} data={doctors}></ListForm>
        </div>
      </div>
      <br></br>
      <div className="py-3 border border-primary">
        <div className="container-fluid mb-">
          <div className="px-3 py-2 text-primary">Đơn thuốc</div>
          <ListForm columns={columns} data={doctors}></ListForm>
        </div>
      </div> */}
      <div class="container shadow min-vh-100 py-2">
    <div class="table-responsive">
        <table class="table accordion">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Heading 1</th>
                    <th scope="col">Heading 2</th>
                    <th scope="col">Heading 3</th>
                    <th scope="col">Heading 4</th>
                </tr>
            </thead>
            <tbody>
                <tr data-bs-toggle="collapse" data-bs-target="#r1">
                    <th scope="row">1 <i class="bi bi-chevron-down"></i></th>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                </tr>
                <tr class="collapse accordion-collapse" id="r1" data-bs-parent=".table">
                    <td colspan="5"> Item 1 detail .. This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow. </td>
                </tr>
                <tr data-bs-toggle="collapse" data-bs-target="#r2">
                    <th scope="row">2 <i class="bi bi-chevron-down"></i></th>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                </tr>
                <tr class="collapse accordion-collapse" id="r2" data-bs-parent=".table">
                    <td colspan="5"> Item 2 detail .. This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow. </td>
                </tr>
                <tr data-bs-toggle="collapse" data-bs-target="#r3">
                    <th scope="row">3 <i class="bi bi-chevron-down"></i></th>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                </tr>
                <tr class="collapse accordion-collapse" id="r3" data-bs-parent=".table">
                    <td colspan="5"> Item 3 detail .. This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow. </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
    </div>
  );
}

export default HoaDon;
