import { useEffect, useState } from "react";
import Navtab from "../../component/Navtab";
import { tabsDataTD } from "./data";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAccountAction } from "../../redux/action/fetchDataAction/fetchUserAccountAction";

function TiepDon() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log("window.location.pathname", window.location.pathname);
  //     console.log('GOI FETCHUSERACCOUNT')
  //     dispatch(fetchUserAccountAction());
  // }, []);
  return (
    <div>
      <h1 className="container-fluid">Tiếp Đón</h1>
      <Navtab tabsData={tabsDataTD} />
    </div>
  );
}

export default TiepDon;
