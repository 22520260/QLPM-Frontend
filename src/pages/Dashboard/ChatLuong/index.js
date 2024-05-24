import { ScatterPlot } from "@mui/x-charts/ScatterChart";
import {
  ResponsiveChartContainer,
  ChartsGrid,
  ChartsXAxis,
  ChartsYAxis,
  ChartsTooltip,
  ChartsLegend,
} from "@mui/x-charts";
import { useState, useEffect } from "react";
import { fetchThongKeChatLuongAction } from "../../../redux/action/fetchDataAction/fetchThongKeChatLuongAction";
import { useDispatch, useSelector } from "react-redux";
import { ListForm } from "../../../component/Layout/TabLayout/ListForm";

export default function ChatLuong({ year }) {
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState([]);
  const data = useSelector((state) => state.tkChatLuong?.data) || [];
  console.log('data', data)
  const columns = [
    { title: "Năm", key: "YEAR" },
    { title: "Khoảng cách trung bình giữa 2 lần khám (ngày)", key: "X2" },
    { title: "Số lượt khám", key: "X1" },
  ];

  useEffect(() => {
    dispatch(fetchThongKeChatLuongAction());
  }, []);

  useEffect(() => {
    if (year) {
      const yearData = data.filter((item) => item.YEAR === year);
      setFilterData(yearData);
    }
  }, [year, data]);

  return (
    <div>
      <ResponsiveChartContainer
        xAxis={[{ label: "Khoảng cách trung bình giữa 2 lần khám (ngày)" }]}
        yAxis={[
          {
            id: "yAxis",
            label: "Số lượt khám",
            color: "tomato",
          },
        ]}
        height={400}
        margin={{ left: 90, right: 50 }}
        series={[
          {
            type: "scatter",
            label: "Khách hàng",
            data: filterData.map((v) => ({ x: v.X2, y: v.X1, id: v.ID })),
            markerSize: 5,
            color: "tomato",
          },
        ]}
      >
        <ScatterPlot />
        <ChartsLegend position={{ vertical: "top", horizontal: "right" }} />
        <ChartsGrid horizontal vertical />
        <ChartsXAxis />
        <ChartsYAxis label="Số lượt khám" />
        <ChartsTooltip trigger="item" />
      </ResponsiveChartContainer>

      <h4 className="d-flex justify-content-center">
        Danh Sách Thống Kê Chất Lượng
      </h4>
      <div className="row justify-content-center">
        <div className="col-10">
          <ListForm columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
