import Navtab from "../../component/Navtab";
import { tabsDataAdmin } from "./data";

function Admin() {
  return (
    <>
      <h1 className="container-fluid">Quản trị</h1>
      <Navtab tabsData={tabsDataAdmin} />
    </>
  );
}

export default Admin;
