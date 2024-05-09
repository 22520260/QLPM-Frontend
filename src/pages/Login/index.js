import {
  IFInputText,
  IFPassword,
} from "../../component/Layout/TabLayout/InputForm";
import { Link } from "react-router-dom";
import { Lg_nameunder } from "../../component/Logo";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/userServices";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/other/authSlices";

function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const defaultObjValidInput = {
    isValidUsername: true,
    isValidPassword: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setObjValidInput(defaultObjValidInput);
    if (!username) {
      setObjValidInput({ ...defaultObjValidInput, isValidUsername: false });
      toast.error("Chưa nhập username");
      return;
    }
    if (!password) {
      setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
      toast.error("Chưa nhập password");
      return;
    }

    const response = await loginUser(username, password);

    if (response && response.data && response.data.errcode === 0) {
      const roles = response.data.data.roles;
      const username = response.data.data.username;
      const groupName = response.data.data.groupName;
      const groupID = response.data.data.groupID;
      const userInfo = response.data.data.userInfo;
      const token = response.data.data.access_token; // token chứa username và roles

      let data = {
        isAuthenticated: true,
        token,
        account: {
          roles,
          groupName,
          groupID,
          username,
          userInfo
        }
      };
      // sessionStorage.setItem("account", JSON.stringify(data));
      // localStorage.setItem('jwt', token)
      dispatch(login(data));

      navigate('/')
    }
    if (response && response.data && response.data.errcode !== 0) {
      toast.error(response.data.message)
    }
  };

  // useEffect(() => {
  //   let session  = sessionStorage.getItem('account');
  //   if(session) {
  //     navigate('/')
  //     window.location.reload();
  //   }
  // })

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
              valid={objValidInput.isValidUsername}
              value={username}
              size={12}
              required={true}
              onChange={(value) => setUsername(value)}
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
