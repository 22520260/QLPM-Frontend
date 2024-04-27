
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

function ForgotPass() {
    return (
        <>
            <div className="p-5 pb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(20px)' }}>
                <h1>Quên mật khẩu?</h1>
                <p>Xin vui lòng liên hệ với <strong>người quản trị</strong> để được cấp lại mật khẩu!</p>
                <Link className="text-reset" to={'../login'}>
                    <FaArrowLeft />
                </Link>
            </div>
        </>
    );
}

export default ForgotPass;