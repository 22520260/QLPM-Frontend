import Navtab from '../../component/Navtab';
import { tabsDataTD } from './data';

function TiepDon() {
        // Dữ liệu cho các tab và nội dung tương ứng

    return (
        <div>
        
            <h1>TiepDon</h1>
            <Navtab tabsData={tabsDataTD}/>
            
        </div>
    );
}

export default TiepDon;
