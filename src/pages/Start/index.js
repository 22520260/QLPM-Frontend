import { Link } from "react-router-dom";
import Header from "../../component/Layout/DefaultLayout/Header";
import StartButton from "../../component/StartButton";

function Start() {
    return (
        <>
            <Header />
            <div className="row">
                
                <div className="row text-center">
                    <StartButton title={"Tiếp đón"} path={'/tiepdon'} />
                    <StartButton title={"Khám bệnh"} path={'/khambenh'}/>
                    <StartButton title={"Khách hàng"} path={'khachhang'}/>
                </div>
                <div className="row text-center">
                    <StartButton title={"Thuốc"} path={'thuoc'}/>
                    <StartButton title={"Dashboard"} path={'dashboard'}/>
                </div>
            </div>
        </>
    );
}

export default Start;