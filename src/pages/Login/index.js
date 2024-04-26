import { IFInputText, IFPassword } from "../../component/Layout/TabLayout/InputForm";
import { Link } from "react-router-dom";
import { RiEyeCloseLine } from "react-icons/ri";

function Login() {
    return (
        <div className="p-5 pb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(20px)' }}>
            <div className="text-center">
                <img className="mx-auto d-block" style={{ maxHeight: '10vw' }} src='../../assets/images/Logo.svg' alt="..." />
                <h1>
                    <strong>
                        BCare
                    </strong>
                </h1>
            </div>

            <div className="py-3">
                <div className="py-2">
                    <IFInputText
                        title={"Tên đăng nhập"}
                        size={12} 
                        required={true}/>
                </div>
                <div className="py-2">
                    <IFPassword
                        title={"Mật khẩu"}
                        size={12} 
                        />
                </div>


                <div className="row px-2">
                    <div class="col-md-6 form-check">
                        <input class="form-check-input" type="checkbox" value="" id="checkSave" />
                            <label class="form-check-label" for="flexChecchekDefault">
                                Lưu thông tin
                            </label>
                    </div>

                    <div className="col-md-6 text-end">
                        <Link className="text-reset" to={'./quenmatkhau'}><em>Quên mật khẩu?</em></Link>
                    </div>
                </div>

                <div className="d-grid justify-content-center">
                    <button className="btn btn-primary mt-5" type="submit">Đăng nhập</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
