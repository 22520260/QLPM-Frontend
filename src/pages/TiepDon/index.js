import Navtab from '../../component/Navtab';
import { tabsDataTD } from './data';

function TiepDon() {
    return (
        <div>
        
            <h1 className='container-fluid'>Tiếp Đón</h1>
            <Navtab tabsData={tabsDataTD}/>
            
        </div>
    );
}

export default TiepDon;
