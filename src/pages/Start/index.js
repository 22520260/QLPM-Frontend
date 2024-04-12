import { Link } from "react-router-dom";
import Header from "../../component/Layout/DefaultLayout/Header";
import StartButton from "../../component/StartButton";

function Start() {
    return (
        <>
            <Header />
            <div className="container justify-content-md-center d-flex my-5" >
                <div className="col col-2 text-center mx-3 px-3">
                    <StartButton title={"Tiếp đón"} path={'/tiepdon'} />
                    <StartButton title={"Khám bệnh"} path={'/khambenh'} />
                </div>
                <div className="col col-2 text-center mx-3 px-3">
                    <StartButton title={"Khách hàng"} path={'/khachhang'} />
                    <StartButton title={"Thuốc"} path={'/thuoc'} />
                </div>
                <div className="col col-2 text-center mx-3 px-3">
                    <StartButton title={"Dashboard"} path={'/dashboard'} />
                </div>

            </div>
        </>
    );
}

export default Start;




