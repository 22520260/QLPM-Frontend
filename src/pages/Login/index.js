import {
  IFInputText,
  IFPassword,
} from "../../component/Layout/TabLayout/InputForm";
import { Link } from "react-router-dom";
import { Lg_nameunder } from "../../component/Logo";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setObjValidInput(defaultObjValidInput);
    if (!userName) {
      setObjValidInput({ ...defaultObjValidInput, isValidUserName: false });
      toast.error("Chưa nhập username", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (!password) {
      setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
      toast.error("Chưa nhập password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    console.log("call API");
    if (1) {
      let data = {
        isAuthenticated: true,
        token: "fake token",
      };
      sessionStorage.setItem("account", JSON.stringify(data));
      navigate('/tiepdon')
    }
    //ngược lại báo lỗi
  };

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const defaultObjValidInput = {
    isValidUserName: true,
    isValidPassword: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  return (
    <div
      className="p-5 pb-4"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(20px)",
      }}
    >
      <Lg_nameunder size={"10vw"} />
      <form>
        <div className="py-3">
          <div className="py-2">
            <IFInputText
              title={"Tên đăng nhập"}
              valid={objValidInput.isValidUserName}
              value={userName}
              size={12}
              required={true}
              onChange={(value) => setUserName(value)}
            />
          </div>
          <div className="py-2">
            <IFPassword
              title={"Mật khẩu"}
              valid={objValidInput.isValidPassword}
              value={password}
              size={12}
              onChange={(value) => setPassword(value)}
            />
          </div>

          <div className="row px-2">
            <div class="col-md-6 form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="checkSave"
              />
              <label class="form-check-label" for="flexChecchekDefault">
                Lưu thông tin
              </label>
            </div>

            <div className="col-md-6 text-end">
              <Link className="text-reset" to={"./quenmatkhau"}>
                <em>Quên mật khẩu?</em>
              </Link>
            </div>
          </div>

          <div className="d-grid justify-content-center">
            <button
              className="btn btn-primary mt-5"
              onClick={(e) => handleLogin(e)}
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
