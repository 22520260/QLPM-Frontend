import { Link } from "react-router-dom";
import NavIcon from "../../../NavIcon";

function Header() {
  return (
    <>
      <nav className="navbar bg-primary navbar-expand-md">
        <div className="container-fluid px-4">
          <div className="col col-md-1">
            <div className="col col-md-9 ">
              <Link className="navbar-brand" to="../">
                <img
                  className="img-fluid p-1"
                  src="../../assets/images/Logonew.svg"
                  alt="..."
                />
              </Link>
            </div>
          </div>
          <NavIcon />
        </div>
      </nav>
    </>
  );
}

export default Header;
