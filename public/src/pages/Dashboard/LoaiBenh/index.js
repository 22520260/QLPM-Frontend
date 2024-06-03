import React, { useState, useEffect } from "react";
import {
  ResponsiveChartContainer,
  BarPlot,
  ChartsXAxis,
  ChartsYAxis,
  ChartsGrid,
  ChartsTooltip,
} from "@mui/x-charts";
import { IFSelect } from "../../../component/Layout/TabLayout/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchThongKeBenhAction } from "../../../redux/action/fetchDataAction/fetchThongKeBenhAction";
import { ListForm } from "../../../component/Layout/TabLayout/ListForm";


const LoaiBenh = () => {
  const dispatch = useDispatch();
  const d = new Date();
  const defaultMonth = (d.getMonth() + 1).toString().padStart(2, "0");
  const defaultYear = d.getFullYear().toString();
  const dataset = useSelector((state) => state.tkBenh?.data) || [];
  const [month, setMonth] = useState(defaultMonth);
  const [year, setYear] = useState(defaultYear);
  const [totalIntensityData, setTotalIntensityData] = useState([]);
  const [monthlyIntensityData, setMonthlyIntensityData] = useState([]);
  const columns = [
    { title: "Tháng", key: "MONTH" },
    { title: "Năm", key: "YEAR" },
    { title: "Mã ICD bệnh", key: "ID" },
    { title: "Tên bệnh", key: "NAME" },
    { title: "Tần suất", key: "FREQUENCY" },
  ];

  useEffect(() => {
    dispatch(fetchThongKeBenhAction());
  }, []);

  // Tính tổng cường độ cho mỗi loại bệnh trong năm được chọn
  useEffect(() => {
    if (year) {
      const yearData = dataset.filter((item) => item.YEAR === year);
      const intensityMap = {};
      const nameMap = {};
      yearData.forEach((item) => {
        if (!intensityMap[item.ID]) {
          intensityMap[item.ID] = 0;
        }
        intensityMap[item.ID] += item.FREQUENCY;

        if (!nameMap[item.ID]) {
          nameMap[item.ID] = 0;
        }
        nameMap[item.ID] = item.NAME;
      });
      const totalIntensity = Object.keys(intensityMap).map((id) => ({
        id,
        name: nameMap[id],
        totalIntensity: intensityMap[id],
      }));
      setTotalIntensityData(totalIntensity);
    }
  }, [year, dataset]);

  // Tính tổng cường độ cho mỗi loại bệnh trong từng tháng của năm được chọn
  useEffect(() => {
    if (year && month) {
      const monthlyData = dataset.filter(
        (item) => item.YEAR === year && item.MONTH === month
      );
      const intensityMap = {};
      const nameMap = {};
      monthlyData.forEach((item) => {
        if (!intensityMap[item.ID]) {
          intensityMap[item.ID] = 0;
        }
        intensityMap[item.ID] += item.FREQUENCY;

        if (!nameMap[item.ID]) {
          nameMap[item.ID] = 0;
        }
        nameMap[item.ID] = item.NAME;
      });
      const monthlyIntensity = Object.keys(intensityMap).map((id) => ({
        id,
        name: nameMap[id],
        monthlyIntensity: intensityMap[id],
      }));
      setMonthlyIntensityData(monthlyIntensity);
    }
  }, [year, month, dataset]);

  return (
    <div className="shadow rounded pt-4">
      <h2 className="d-flex justify-content-center">
        Biểu Đồ Thống Kê Bệnh
      </h2>
      <div className="row d-flex justify-content-center mb-4">
        <IFSelect
          title="Tháng"
          size={1}
          options={Array.from({ length: 12 }, (_, i) => ({
            month: `${String(i + 1).padStart(2, "0")}`,
          }))}
          def={"Chọn"}
          onChange={(value) => setMonth(value === "Chọn" ? null : value)}
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
      </div>

      <div className="row">
        <div className="col col-md-6">
          <h4 className="d-flex justify-content-center">
            Thống kê bệnh trong cả năm {year}
          </h4>
          <ResponsiveChartContainer
            series={[
              {
                type: "bar",
                dataKey: "totalIntensity",
                color: "var(--sub)",
                label: "Cường độ",
              },
            ]}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "id",
                label: "Mã ICD Bệnh",
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
            yAxis={[{ label: "Tổng cường độ" }]}
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
              label="Tổng cường độ"
              labelStyle={{ translate: "-25px 0px" }}
            />
            <ChartsTooltip />
          </ResponsiveChartContainer>
        </div>
        {month && (
          <div className="col col-md-6">
            <h4 className="d-flex justify-content-center">
              Thống kê bệnh trong tháng {month}/{year}
            </h4>
            <ResponsiveChartContainer
              series={[
                {
                  type: "bar",
                  dataKey: "monthlyIntensity",
                  color: "var(--sub)",
                  label: "Cường độ",
                },
              ]}
              xAxis={[
                {
                  scaleType: "band",
                  dataKey: "id",
                  label: "Mã ICD Bệnh",
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
              yAxis={[{ label: "Cường độ trong tháng" }]}
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
                label="Cường độ trong tháng"
                labelStyle={{ translate: "-25px 0px" }}
              />
              <ChartsTooltip />
            </ResponsiveChartContainer>
          </div>
        )}
      </div>

      <h2 className="d-flex justify-content-center">Danh Sách Thống Kê Bệnh</h2>

      <div className="row justify-content-center">
        <div className="col-6">
          <ListForm columns={columns} data={dataset} />
        </div>
      </div>
    </div>
  );
};

export default LoaiBenh;
