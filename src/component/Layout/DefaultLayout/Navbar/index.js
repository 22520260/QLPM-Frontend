import { Link } from "react-router-dom";
import NavIcon from "../../../NavIcon";
import { FaAccessibleIcon } from "react-icons/fa6";
import { useSelector } from "react-redux";

function Navbar() {
  const user = useSelector((state) => state.auth.user); // user chứa token, isAuthenticated, account
  let groupID = null;
  if (user && user.account && user.account.groupID) {
    groupID = user.account.groupID;
  }
  return (
    <>
      <nav className="navbar bg-primary navbar-expand-md">
        <div className="container-fluid px-4">
          <Link className="navbar-brand" to="../">
            <FaAccessibleIcon />
          </Link>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/tiepdon" aria-current="page">
                Tiếp đón
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Khám bệnh
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/khambenh">
                    Khám bệnh
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/khambenh/canlamsang">
                    Cận lâm sàng
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item ">
              <Link
                className="nav-link"
                to="/khachhang"
                role="button"
                aria-expanded="false"
              >
                Khách hàng
              </Link>
            </li>

            <li className="nav-item ">
              <Link
                className="nav-link"
                to="/thuoc"
                role="button"
                aria-expanded="false"
              >
                Thuốc
              </Link>
            </li>

            <li className="nav-item ">
              <Link
                className="nav-link"
                to="/dashboard"
                role="button"
                aria-expanded="false"
              >
                Thống kê
              </Link>
            </li>
            {groupID && groupID === 1 ? (
              <li className="nav-item ">
                <Link
                  className="nav-link"
                  to="/admin"
                  role="button"
                  aria-expanded="false"
                >
                  Quản trị
                </Link>
              </li>
            ) : (
              <></>
            )}
          </ul>
          <NavIcon />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
