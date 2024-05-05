import Navtab from "../../component/Navtab";
import { tabsDataAdmin } from "./data";

function Admin() {
    return ( 
        <>
            <h1>Admin</h1>
            <Navtab tabsData={tabsDataAdmin} />
        </>
     );
}

export default Admin;