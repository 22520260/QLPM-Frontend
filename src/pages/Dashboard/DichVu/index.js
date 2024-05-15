import React, { useState, useEffect } from "react";
import {
  ResponsiveChartContainer,
  BarPlot,
  ChartsXAxis,
  ChartsYAxis,
  ChartsGrid,
  ChartsTooltip,
  LinePlot,
} from "@mui/x-charts";
import { IFSelect } from "../../../component/Layout/TabLayout/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchThongKeDichVuKhamAction } from "../../../redux/action/fetchDataAction/fetchThongKeDichVuKhamAction";
import { fetchThongKeDichVuCLSAction } from "../../../redux/action/fetchDataAction/fetchThongKeDichVuCLSAction";
import { fetchAllLoaiDichVuAction } from "../../../redux/action/fetchDataAction/fetchAllLoaiDichVuAction";

const DichVu = () => {
  const dispatch = useDispatch();
  const d = new Date();
  const defaultMonth = (d.getMonth() + 1).toString().padStart(2, '0');  
  const defaultYear = d.getFullYear().toString();
  const loaiDichVu = useSelector((state) => state.loaiDichVu?.data) || [];
  const tkDichVuKham = useSelector((state) => state.tkDichVuKham?.data) || [];
  const tkDichVuCLS = useSelector((state) => state.tkDichVuCLS?.data) || [];

  const [dataset, setDataset] = useState(tkDichVuKham);

  const [loai, setLoai] = useState("Tất cả");
  const [month, setMonth] = useState(defaultMonth);
  const [year, setYear] = useState(defaultYear);
  const [totalIntensityData, setTotalIntensityData] = useState([]);
  const [monthlyIntensityData, setMonthlyIntensityData] = useState([]);

  useEffect(() => {
    dispatch(fetchAllLoaiDichVuAction());
    dispatch(fetchThongKeDichVuKhamAction());
    dispatch(fetchThongKeDichVuCLSAction());
  }, []);

  useEffect(() => {
    setDataset([...tkDichVuKham, ...tkDichVuCLS]);
  }, [tkDichVuCLS, tkDichVuKham]);

  // Tính tổng cường độ cho mỗi loại bệnh trong năm được chọn
  useEffect(() => {
    if (year) {
      const yearData = dataset.filter(
        (item) =>
          item.YEAR === year &&
          (!loai || item.TYPE === loai || loai === "Tất cả")
      );
      const intensityMap = {};
      const billMap = {};
      const nameMap = {};
      yearData.forEach((item) => {
        if (!intensityMap[item.ID]) {
          intensityMap[item.ID] = 0;
        }
        intensityMap[item.ID] += item.FREQUENCY;

        if (!billMap[item.ID]) {
          billMap[item.ID] = 0;
        }
        billMap[item.ID] = item.BILL;

        if (!nameMap[item.ID]) {
          nameMap[item.ID] = 0;
        }
        nameMap[item.ID] = item.NAME;
      });
      const totalIntensity = Object.keys(intensityMap).map((id) => ({
        id,
        name: nameMap[id],
        totalIntensity: intensityMap[id],
        bill: billMap[id],
      }));
      setTotalIntensityData(totalIntensity);
    }
  }, [year, loai, dataset]);

  // Tính tổng cường độ cho mỗi loại bệnh trong từng tháng của năm được chọn
  useEffect(() => {
    if (year && month) {
      const monthlyData = dataset.filter(
        (item) =>
          item.YEAR === year &&
          item.MONTH === month &&
          (!loai || item.TYPE === loai || loai === "Tất cả")
      );
      const intensityMap = {};
      const billMap = {};
      const nameMap = {};
      monthlyData.forEach((item) => {
        if (!intensityMap[item.ID]) {
          intensityMap[item.ID] = 0;
        }
        intensityMap[item.ID] += item.FREQUENCY;
        if (!billMap[item.ID]) {
          billMap[item.ID] = 0;
        }
        billMap[item.ID] = item.BILL;

        if (!nameMap[item.ID]) {
          nameMap[item.ID] = 0;
        }
        nameMap[item.ID] = item.NAME;
      });
      const monthlyIntensity = Object.keys(intensityMap).map((id) => ({
        id,
        name: nameMap[id],
        monthlyIntensity: intensityMap[id],
        bill: billMap[id],
      }));
      setMonthlyIntensityData(monthlyIntensity);
    }
  }, [year, month, loai, dataset]);

  return (
    <div>
      <div className="row align-items-end">
        <IFSelect
          title="Tháng"
          size={1}
          options={Array.from({ length: 12 }, (_, i) => ({
            month: `${String(i + 1).padStart(2, "0")}`,
          }))}
          def={"Chọn"}
          onChange={(value) =>
            setMonth(value === "Chọn" ? null : value)
          }
          value={month}
          keyObj="month"
          showObj={"month"}
        />

        <IFSelect
          title="Năm"
          size={1}
          options={[{ year: "2022" }, { year: "2023" }, { year: "2024" }]}
          def={"Chọn"}
          onChange={(value) => setYear(value === "Chọn" ? null : value)}
          value={year}
          keyObj="year"
          showObj={"year"}
        />

        <IFSelect
          title={"Loại dịch vụ"}
          size={4}
          options={[{ TENLOAIDV: "Tất cả" }, ...loaiDichVu]} // Thêm tùy chọn "Tất cả"
          def="Chọn"
          onChange={(value) => setLoai(value)}
          value={loai}
          keyObj={"TENLOAIDV"}
          showObj={"TENLOAIDV"}
        />
      </div>

      <div className="row">
        <div className="col col-md-6">
          <h2>Thống kê trong cả năm {year}</h2>
          <ResponsiveChartContainer
            series={[
              {
                type: "bar",
                dataKey: "totalIntensity",
                color: "var(--sub)",
                yAxisKey: "leftAxis",
                label: "Cường độ",
              },
              {
                type: "line",
                dataKey: "bill",
                color: "var(--sub)",
                yAxisKey: "bill",
                label: "Giá dịch vụ",
              },
            ]}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "id",
                label: "Tên dịch vụ",
                tickLabelStyle: {
                  angle: 75,
                  textAnchor: "start",
                  fontSize: 12,
                },
                valueFormatter: (id, context) =>
                  context.location === "tick"
                    ? id
                    : `${id}. ${
                        totalIntensityData.find((d) => d.id === id)?.name
                      }`,
              },
            ]}
            yAxis={[{ id: "leftAxis" }, { id: "bill" }]}
            dataset={totalIntensityData}
            height={400}
            margin={{ left: 90, right: 50, bottom: 80 }}
          >
            <ChartsGrid horizontal />
            <BarPlot />
            <ChartsXAxis
              labelStyle={{
                fontSize: 14,
                translate: "0px 25px",
              }}
            />
            <ChartsYAxis
              yAxisKey="leftAxis"
              label="Tổng cường độ"
              labelStyle={{ translate: "-25px 0px" }}
            />
            <ChartsTooltip />
          </ResponsiveChartContainer>
        </div>
        {month && (
          <div className="col col-md-6">
            <h2>
              Thống kê trong tháng {month}/{year}
            </h2>
            <ResponsiveChartContainer
              series={[
                {
                  type: "bar",
                  dataKey: "monthlyIntensity",
                  color: "var(--sub)",
                  yAxisKey: "leftAxis",
                  label: "Cường độ",
                },
                {
                  type: "line",
                  dataKey: "bill",
                  color: "var(--sub)",
                  yAxisKey: "bill",
                  label: "Giá dịch vụ",
                },
              ]}
              xAxis={[
                {
                  scaleType: "band",
                  dataKey: "id",
                  label: "Tên dịch vụ",
                  tickLabelStyle: {
                    angle: 75,
                    textAnchor: "start",
                    fontSize: 12,
                  },
                  valueFormatter: (id, context) =>
                    context.location === "tick"
                      ? id
                      : `${id}. ${
                          totalIntensityData.find((d) => d.id === id)?.name
                        }`,
                },
              ]}
              yAxis={[{ id: "leftAxis" }, { id: "bill" }]}
              dataset={monthlyIntensityData}
              height={400}
              margin={{ left: 90, right: 50, bottom: 80 }}
            >
              <ChartsGrid horizontal />
              <BarPlot />
              <ChartsXAxis
                labelStyle={{
                  fontSize: 14,
                  translate: "0px 25px",
                }}
              />
              <ChartsYAxis
                yAxisKey="leftAxis"
                label="Cường độ trong tháng"
                labelStyle={{ translate: "-25px 0px" }}
              />
              <ChartsTooltip />
            </ResponsiveChartContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default DichVu;
