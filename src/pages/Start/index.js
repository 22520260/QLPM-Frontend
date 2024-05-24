import Header from "../../component/Layout/DefaultLayout/Header";
import StartButton from "../../component/StartButton";
import { useSelector } from "react-redux";

function Start() {
  const user = useSelector((state) => state.auth?.user); // user chứa token, isAuthenticated, account
  let groupID = null;
  if (user && user.account && user.account.groupID) {
    groupID = user.account.groupID;
  }
  return (
    <>
      <Header />
      <div className="container justify-content-md-center d-flex my-5">
        <div className="col col-2 text-center mx-3 px-3">
          <StartButton title={"Tiếp đón"} path={"/tiepdon"} img={"TiepDon"} />
          <StartButton title={"Kho thuốc"} path={"/thuoc"} img={"Thuoc"} />
        </div>
        <div className="col col-2 text-center mx-3 px-3">
          <StartButton
            title={"Khám bệnh"}
            path={"/khambenh"}
            img={"KhamBenh"}
          />
          <StartButton
            title={"Thống kê"}
            path={"/dashboard"}
            img={"DashBoard"}
          />
        </div>
        <div className="col col-2 text-center mx-3 px-3">
          <StartButton
            title={"Khách hàng"}
            path={"/khachhang"}
            img={"KhachHang"}
          />
          {groupID && groupID === 1 ? (
            <StartButton title={"Quản trị"} path={"/admin"} img={"Admin"} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Start;
