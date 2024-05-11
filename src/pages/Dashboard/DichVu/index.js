import React, { useState, useEffect } from 'react';
import { ResponsiveChartContainer, BarPlot, ChartsXAxis, ChartsYAxis, ChartsGrid, ChartsTooltip, LinePlot } from '@mui/x-charts';
import { IFSelect } from '../../../component/Layout/TabLayout/InputForm';

const dataset = [
    { month: '1', year: '2024', name: 'A', frequency: 43, bill: 120000, type: 'CLS', },
    { month: '1', year: '2024', name: 'B', frequency: 3, bill: 150000, type: 'Khám', },
    { month: '1', year: '2024', name: 'C', frequency: 23, bill: 220000, type: 'Khám', },
    { month: '1', year: '2024', name: 'D', frequency: 41, bill: 240000, type: 'CLS', },
    { month: '1', year: '2024', name: 'E', frequency: 12, bill: 220000, type: 'Khám', },
    { month: '1', year: '2024', name: 'F', frequency: 21, bill: 200000, type: 'CLS', },
    { month: '1', year: '2024', name: 'G', frequency: 42, bill: 520000, type: 'Khám', },
    { month: '1', year: '2024', name: 'H', frequency: 22, bill: 360000, type: 'Khám', },
    { month: '1', year: '2024', name: 'I', frequency: 33, bill: 180000, type: 'CLS', },

    { month: '2', year: '2024', name: 'A', frequency: 4, bill: 120000, type: 'CLS', },
    { month: '2', year: '2024', name: 'B', frequency: 3, bill: 150000, type: 'Khám', },
    { month: '2', year: '2024', name: 'C', frequency: 23, bill: 220000, type: 'Khám', },
    { month: '2', year: '2024', name: 'D', frequency: 41, bill: 240000, type: 'CLS', },
    { month: '2', year: '2024', name: 'E', frequency: 52, bill: 220000, type: 'Khám', },
    { month: '2', year: '2024', name: 'F', frequency: 13, bill: 200000, type: 'CLS', },
    { month: '2', year: '2024', name: 'G', frequency: 22, bill: 520000, type: 'Khám', },
    { month: '2', year: '2024', name: 'H', frequency: 24, bill: 360000, type: 'Khám', },
    { month: '2', year: '2024', name: 'I', frequency: 13, bill: 180000, type: 'CLS', },

    { month: '3', year: '2024', name: 'A', frequency: 33, bill: 120000, type: 'CLS', },
    { month: '3', year: '2024', name: 'B', frequency: 2, bill: 150000, type: 'Khám', },
    { month: '3', year: '2024', name: 'C', frequency: 53, bill: 220000, type: 'Khám', },
    { month: '3', year: '2024', name: 'D', frequency: 43, bill: 240000, type: 'CLS', },
    { month: '3', year: '2024', name: 'E', frequency: 22, bill: 220000, type: 'Khám', },
    { month: '3', year: '2024', name: 'F', frequency: 11, bill: 200000, type: 'CLS', },
    { month: '3', year: '2024', name: 'G', frequency: 32, bill: 520000, type: 'Khám', },
    { month: '3', year: '2024', name: 'H', frequency: 22, bill: 360000, type: 'Khám', },
    { month: '3', year: '2024', name: 'I', frequency: 30, bill: 180000, type: 'CLS', },

    { month: '4', year: '2024', name: 'A', frequency: 13, bill: 120000, type: 'CLS', },
    { month: '4', year: '2024', name: 'B', frequency: 32, bill: 150000, type: 'Khám', },
    { month: '4', year: '2024', name: 'C', frequency: 26, bill: 220000, type: 'Khám', },
    { month: '4', year: '2024', name: 'D', frequency: 31, bill: 240000, type: 'CLS', },
    { month: '4', year: '2024', name: 'E', frequency: 32, bill: 220000, type: 'Khám', },
    { month: '4', year: '2024', name: 'F', frequency: 31, bill: 200000, type: 'CLS', },
    { month: '4', year: '2024', name: 'G', frequency: 12, bill: 520000, type: 'Khám', },
    { month: '4', year: '2024', name: 'H', frequency: 32, bill: 360000, type: 'Khám', },
    { month: '4', year: '2024', name: 'I', frequency: 3, bill: 180000, type: 'CLS', },

    { month: '11', year: '2023', name: 'A', frequency: 3, bill: 120000, type: 'CLS', },
    { month: '11', year: '2023', name: 'B', frequency: 23, bill: 150000, type: 'Khám', },
    { month: '11', year: '2023', name: 'C', frequency: 33, bill: 220000, type: 'Khám', },
    { month: '11', year: '2023', name: 'D', frequency: 21, bill: 240000, type: 'CLS', },
    { month: '11', year: '2023', name: 'E', frequency: 2, bill: 220000, type: 'Khám', },
    { month: '11', year: '2023', name: 'F', frequency: 31, bill: 200000, type: 'CLS', },
    { month: '11', year: '2023', name: 'G', frequency: 22, bill: 520000, type: 'Khám', },
    { month: '11', year: '2023', name: 'H', frequency: 12, bill: 360000, type: 'Khám', },
    { month: '11', year: '2023', name: 'I', frequency: 33, bill: 180000, type: 'CLS', },

    { month: '12', year: '2023', name: 'A', frequency: 43, bill: 120000, type: 'CLS', },
    { month: '12', year: '2023', name: 'B', frequency: 31, bill: 150000, type: 'Khám', },
    { month: '12', year: '2023', name: 'C', frequency: 2, bill: 220000, type: 'Khám', },
    { month: '12', year: '2023', name: 'D', frequency: 21, bill: 240000, type: 'CLS', },
    { month: '12', year: '2023', name: 'E', frequency: 2, bill: 220000, type: 'Khám', },
    { month: '12', year: '2023', name: 'F', frequency: 41, bill: 200000, type: 'CLS', },
    { month: '12', year: '2023', name: 'G', frequency: 12, bill: 520000, type: 'Khám', },
    { month: '12', year: '2023', name: 'H', frequency: 12, bill: 360000, type: 'Khám', },
    { month: '12', year: '2023', name: 'I', frequency: 43, bill: 180000, type: 'CLS', },
];


const DichVu = () => {
    const d = new Date();
    const defaultMonth = d.getMonth();
    const defaultYear = d.getFullYear().toString();

    const [loai, setLoai] = useState('');
    const [month, setMonth] = useState(defaultMonth);
    const [year, setYear] = useState(defaultYear);
    const [totalIntensityData, setTotalIntensityData] = useState([]);
    const [monthlyIntensityData, setMonthlyIntensityData] = useState([]);

    // Tính tổng cường độ cho mỗi loại bệnh trong năm được chọn
    useEffect(() => {
        if (year) {
            const yearData = dataset.filter(item => item.year === year && (!loai || item.type === loai));
            const intensityMap = {};
            const billMap = {};
            yearData.forEach(item => {
                if (!intensityMap[item.name]) {
                    intensityMap[item.name] = 0;
                }
                intensityMap[item.name] += item.frequency;

                if (!billMap[item.name]) {
                    billMap[item.name] = 0;
                }
                billMap[item.name] = item.bill;
            });
            const totalIntensity = Object.keys(intensityMap).map(name => ({
                name,
                totalIntensity: intensityMap[name],
                bill: billMap[name],
            }));
            setTotalIntensityData(totalIntensity);
        }
    }, [year, loai]);

    // Tính tổng cường độ cho mỗi loại bệnh trong từng tháng của năm được chọn
    useEffect(() => {
        if (year && month) {
            const monthlyData = dataset.filter(item => item.year === year && item.month === month.toString() && (!loai || item.type === loai));
            const intensityMap = {};
            const billMap = {};
            monthlyData.forEach(item => {
                if (!intensityMap[item.name]) {
                    intensityMap[item.name] = 0;
                }
                intensityMap[item.name] += item.frequency;
                if (!billMap[item.name]) {
                    billMap[item.name] = 0;
                }
                billMap[item.name] = item.bill;
            });
            const monthlyIntensity = Object.keys(intensityMap).map(name => ({
                name,
                monthlyIntensity: intensityMap[name],
                bill: billMap[name],
            }));
            setMonthlyIntensityData(monthlyIntensity);
        }
    }, [year, month, loai]);

    return (
        <div>
            <div className='row align-items-end'>
                <IFSelect
                    title="Tháng"
                    size={1}
                    options={Array.from({ length: 12 }, (_, i) => ({ month: `${i + 1}` }))}
                    def={"Chọn"}
                    onChange={(value) => setMonth(value === "Chọn" ? defaultMonth : value)}
                    selected={month.toString()}
                    keyObj='month'
                />

                <IFSelect
                    title="Năm"
                    size={1}
                    options={[{ year: '2022' }, { year: '2023' }, { year: '2024' }]}
                    def={"Chọn"}
                    onChange={(value) => setYear(value === "Chọn" ? defaultYear : value)}
                    selected={year}
                    keyObj='year'
                />

                <IFSelect
                    title={"Loại dịch vụ"}
                    size={4}
                    options={[
                        { loai: 'CLS' },
                        { loai: 'Khám' },
                    ]}
                    def='Tất cả'
                    onChange={(value) => setLoai(value === 'Tất cả' ? '' : value)}
                    selected={loai}
                    keyObj={'loai'}
                />

            </div>

            <div className='row'>
                <div className='col col-md-6'>
                    <h2>Thống kê trong cả năm {year}</h2>
                    <ResponsiveChartContainer
                        series={[
                            { type: 'bar', dataKey: 'totalIntensity', color: 'var(--sub)', yAxisKey: 'leftAxis', label: 'Cường độ' },
                            { type: 'line', dataKey: 'bill', color: 'var(--sub)', yAxisKey: 'bill', label: 'Giá dịch vụ' },
                        ]}
                        xAxis={[{ scaleType: 'band', dataKey: 'name', label: 'Tên dịch vụ' }]}
                        yAxis={[
                            { id: 'leftAxis' },
                            { id: 'bill' },
                        ]}
                        dataset={totalIntensityData}
                        height={400}
                        margin={{ left: 90, right: 50 }}
                    >
                        <ChartsGrid horizontal />
                        <BarPlot />
                        <ChartsXAxis />
                        <ChartsYAxis yAxisKey='leftAxis' label="Tổng cường độ" labelStyle={{ translate: '-25px 0px' }} />
                        <ChartsTooltip />
                    </ResponsiveChartContainer>
                </div>
                {month && (
                    <div className='col col-md-6'>
                        <h2>Thống kê trong tháng {month}/{year}</h2>
                        <ResponsiveChartContainer
                            series={[
                                { type: 'bar', dataKey: 'monthlyIntensity', color: 'var(--sub)', yAxisKey: 'leftAxis', label: 'Cường độ' },
                                { type: 'line', dataKey: 'bill', color: 'var(--sub)', yAxisKey: 'bill', label: 'Giá dịch vụ' },
                            ]}
                            xAxis={[{ scaleType: 'band', dataKey: 'name', label: 'Tên dịch vụ' }]}
                            yAxis={[
                                { id: 'leftAxis' },
                                { id: 'bill' },
                            ]}
                            dataset={monthlyIntensityData}
                            height={400}
                            margin={{ left: 90, right: 50 }}
                        >
                            <ChartsGrid horizontal />
                            <BarPlot />
                            <ChartsXAxis />
                            <ChartsYAxis yAxisKey='leftAxis' label="Cường độ trong tháng" labelStyle={{ translate: '-25px 0px' }} />
                            <ChartsTooltip />
                        </ResponsiveChartContainer>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DichVu;