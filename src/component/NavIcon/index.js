import { FaRegBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function NavIcon() {
    const navigate = useNavigate();
    return (
        <>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto mb-20 mb-lg-0">
                    <li className="nav-item px-2">
                        <a className="nav-link active text-white" aria-current="page" href="~/">
                            <FaRegBell />
                        </a>
                    </li>
                    <li className="nav-item dropdown px-2">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="true">
                            Link
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><a className="dropdown-item" href="#">Xem hồ sơ</a></li>
                            <li><a className="dropdown-item" href="#">Đổi mật khẩu</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => {
                                sessionStorage.clear();
                                navigate('/login')
                            }}>Đăng xuất</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default NavIcon;