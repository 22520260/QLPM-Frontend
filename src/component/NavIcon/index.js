import { FaRegBell, FaRegUserCircle, FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/other/authSlices";
import { logoutUser } from "../../services/userServices";
import { toast } from "react-toastify";
import { IFInputText, IFNgay } from "../Layout/TabLayout/InputForm";

function NavIcon() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // user chứa token, isAuthenticated, account
  let userInfo = {};
  let groupNameUser = "";
  if (user && user.account) {
    if (user.account.userInfo) {
      userInfo = user.account.userInfo[0];
    }
    if (user.account.groupName) {
      groupNameUser = user.account.groupName;
    }
  }
  console.log("user.userInfo", userInfo);
  console.log("userInfo.NGAYSINH", userInfo.NGAYSINH);
  console.log("groupNameUser", groupNameUser);

  const handleLogout = async () => {
    let response = await logoutUser();
    dispatch(logout());

    if (response && response.data && response.data.errcode === 0) {
      navigate("/login");
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      {/* <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button> */}

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto mb-20 mb-lg-0">
          <li className="nav-item px-2">
            <a
              className="nav-link active text-white"
              aria-current="page"
              href="#"
            >
              <FaRegBell />
            </a>
          </li>
          <li className="nav-item dropdown px-2">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              <FaRegUserCircle size={20} />
              <span className="ms-2 me-1">{user.account.username}</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              {Object.keys(userInfo).length === 0 ? (
                <></>
              ) : (
                <li>
                  <a
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#hosobenhnhan"
                  >
                    Xem hồ sơ
                  </a>
                </li>
              )}

              <li>
                <a className="dropdown-item" href="#">
                  Đổi mật khẩu
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={handleLogout}>
                  Đăng xuất
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div
        className="modal fade modal-lg"
        style={{ color: "#000" }}
        id="hosobenhnhan"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Thông tin hồ sơ {user.account.username}
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
                <div className="row">
                  <IFInputText
                    title={"Mã tài khoản"}
                    size={3}
                    value={userInfo.MATK}
                  />
                  <IFInputText
                    title={"Họ tên"}
                    size={6}
                    value={userInfo.HOTEN}
                  />
                  <IFInputText
                    title={"Nhóm người dùng"}
                    size={3}
                    value={groupNameUser}
                  />
                  <IFInputText
                    title={"Giới tính"}
                    size={2}
                    value={userInfo.GIOITINH}
                  />
                  <IFNgay
                    title={"Ngày sinh"}
                    size={4}
                    value={new Date(userInfo.NGAYSINH)}
                  />
                  <IFInputText title={"CCCD"} size={6} value={userInfo.CCCD} />
                  <IFInputText
                    title={"Số điện thoại"}
                    size={4}
                    value={userInfo.SDT}
                  />
                  <IFInputText
                    title={"Địa chỉ"}
                    size={8}
                    value={userInfo.DIACHI}
                  />
                </div>
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
              <button type="button" className="btn btn-primary">
                Lưu những thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavIcon;
