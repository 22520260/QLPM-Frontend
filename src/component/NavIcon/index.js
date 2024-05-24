import { FaRegBell, FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/other/authSlices";
import { logoutUser, changeUserPassword } from "../../services/userServices";
import { toast } from "react-toastify";
import { IFInputText, IFNgay, IFPassword } from "../Layout/TabLayout/InputForm";
import { useState } from "react";

function NavIcon() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user); // user chứa token, isAuthenticated, account
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

  const handleLogout = async () => {
    let response = await logoutUser();
    dispatch(logout());

    if (response && response.data && response.data.errcode === 0) {
      navigate("/login");
    } else {
      toast.error(response.data.message);
    }
  };

  const [username, setUsername] = useState(user.account.username);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const defaultObjValidInput = {
    isValidUsername: true,
    isValidOldPassword: true,
    isValidNewPassword: true,
    isValidConfirmPassword: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setObjValidInput(defaultObjValidInput);
    if (!username) {
      setObjValidInput({ ...defaultObjValidInput, isValidUsername: false });
      toast.error("Chưa nhập username");
      return;
    }
    if (!oldPassword) {
      setObjValidInput({ ...defaultObjValidInput, isValidOldPassword: false });
      toast.error("Chưa nhập password cũ");
      return;
    }
    if (!newPassword) {
      setObjValidInput({ ...defaultObjValidInput, isValidNewPassword: false });
      toast.error("Chưa nhập password mới");
      return;
    }
    if (newPassword !== confirmPassword) {
      setObjValidInput({ ...defaultObjValidInput, isValidConfirmPassword: false });
      toast.error("Mật khẩu mới không đồng nhất");
      return;
    }

    const response = await changeUserPassword(username, oldPassword, newPassword);

    if (response && response.data && response.data.errcode === 0) {
      toast.success(response.data.message);
      navigate("/");
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto mb-20 mb-lg-0">
          {/* <li className="nav-item px-2">
            <a
              className="nav-link active text-white"
              aria-current="page"
              href="#"
            >
              <FaRegBell />
            </a>
          </li> */}
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
                <a
                  className="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#doimatkhau"
                >
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
      {/* Modal xem hồ sơ */}
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
                    readOnly={true}
                  />
                  <IFInputText
                    title={"Họ tên"}
                    size={6}
                    value={userInfo.HOTEN}
                    readOnly={true}
                  />
                  <IFInputText
                    title={"Nhóm người dùng"}
                    size={3}
                    readOnly={true}
                    value={groupNameUser}
                  />
                  <IFInputText
                    title={"Giới tính"}
                    size={2}
                    readOnly={true}
                    value={userInfo.GIOITINH}
                  />
                  <IFNgay
                    title={"Ngày sinh"}
                    size={4}
                    readOnly={true}
                    value={new Date(userInfo.NGAYSINH)}
                  />
                  <IFInputText
                    title={"CCCD"}
                    size={6}
                    readOnly={true}
                    value={userInfo.CCCD}
                  />
                  <IFInputText
                    title={"Số điện thoại"}
                    size={4}
                    readOnly={true}
                    value={userInfo.SDT}
                  />
                  <IFInputText
                    title={"Địa chỉ"}
                    size={8}
                    readOnly={true}
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
              {/* <button type="button" className="btn btn-primary">
                Lưu những thay đổi
              </button> */}
            </div>
          </div>
        </div>
      </div>
      {/* Modal đổi mật khẩu */}
      <div
        className="modal fade modal-lg"
        style={{ color: "#000" }}
        id="doimatkhau"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Đổi mật khẩu {user.account.username}
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
                  <div className="py-2">
                    <IFInputText
                      title={"Tên đăng nhập"}
                      valid={objValidInput.isValidUsername}
                      value={username}
                      size={12}
                      required={true}
                      onChange={(value) => setUsername(value)}
                    />
                  </div>
                  <div className="py-2">
                    <IFPassword
                      title={"Nhập mật khẩu cũ"}
                      valid={objValidInput.isValidOldPassword}
                      value={oldPassword}
                      size={12}
                      onChange={(value) => setOldPassword(value)}
                    />
                  </div>
                  <div className="py-2">
                    <IFPassword
                      title={"Nhập mật khẩu mới"}
                      valid={objValidInput.isValidNewPassword}
                      value={newPassword}
                      size={12}
                      onChange={(value) => setNewPassword(value)}
                    />
                  </div>
                  <div className="py-2">
                    <IFPassword
                      title={"Xác nhận mật khẩu mới"}
                      valid={objValidInput.isValidConfirmPassword}
                      value={confirmPassword}
                      size={12}
                      onChange={(value) => setConfirmPassword(value)}
                    />
                  </div>
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleChangePassword}
              >
                Đổi mật khẩu
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavIcon;
