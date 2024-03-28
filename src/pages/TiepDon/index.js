import Navtab from '../../component/Navtab';
import { tabsData } from './data';

function TiepDon() {
        // Dữ liệu cho các tab và nội dung tương ứng

    return (
        <>
            <h1>TiepDon</h1>
            <Navtab tabsData={tabsData}/>
            
        </>
    );
}

export default TiepDon;
