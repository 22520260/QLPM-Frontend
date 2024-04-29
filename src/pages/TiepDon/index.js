import { useEffect, useState } from "react";
import Navtab from "../../component/Navtab";
import { tabsDataTD } from "./data";
import { useNavigate } from "react-router-dom";

function TiepDon() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const session = sessionStorage.getItem("account");
    if (!session) {
      setLoading(true);
      navigate("/login");
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="modal-backdrop bg-secondary-subtle d-flex justify-content-center align-items-center">
        <div
          className="spinner-grow bg-primary"
          style={{ width: "5rem", height: "5rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="container-fluid">Tiếp Đón</h1>
      <Navtab tabsData={tabsDataTD} />
    </div>
  );
}

export default TiepDon;
