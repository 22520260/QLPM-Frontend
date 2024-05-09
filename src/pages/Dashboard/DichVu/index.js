import React, { useState, useEffect } from 'react';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsGrid } from '@mui/x-charts/ChartsGrid';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { IFSelect } from '../../../component/Layout/TabLayout/InputForm';

const dataset = [
    { name: 'A', bill: 120000, type: 'CLS', month: '1', year: '2024', name: 'A', frequency: 43, },
    { name: 'B', bill: 150000, type: 'Khám', month: '1', year: '2024', name: 'B', frequency: 3, },
    { name: 'C', bill: 220000, type: 'Khám', month: '1', year: '2024', name: 'C', frequency: 23, },
    { name: 'D', bill: 240000, type: 'CLS', month: '1', year: '2024', name: 'D', frequency: 42, },
    { name: 'E', bill: 220000, type: 'Khám', month: '1', year: '2024', name: 'E', frequency: 32, },
    { name: 'F', bill: 200000, type: 'CLS', month: '1', year: '2024', name: 'F', frequency: 28, },
    { name: 'G', bill: 520000, type: 'Khám', month: '1', year: '2024', name: 'G', frequency: 22, },
    { name: 'H', bill: 360000, type: 'Khám', month: '1', year: '2024', name: 'H', frequency: 12, },
    { name: 'I', bill: 180000, type: 'CLS', month: '1', year: '2024', name: 'I', frequency: 23, },

    { name: 'A', bill: 120000, type: 'CLS', month: '2', year: '2024', name: 'A', frequency: 14, },
    { name: 'B', bill: 150000, type: 'Khám', month: '2', year: '2024', name: 'B', frequency: 3, },
    { name: 'C', bill: 220000, type: 'Khám', month: '2', year: '2024', name: 'C', frequency: 43, },
    { name: 'D', bill: 240000, type: 'CLS', month: '2', year: '2024', name: 'D', frequency: 41, },
    { name: 'E', bill: 220000, type: 'Khám', month: '2', year: '2024', name: 'E', frequency: 12, },
    { name: 'F', bill: 200000, type: 'CLS', month: '2', year: '2024', name: 'F', frequency: 13, },
    { name: 'G', bill: 520000, type: 'Khám', month: '2', year: '2024', name: 'G', frequency: 22, },
    { name: 'H', bill: 360000, type: 'Khám', month: '2', year: '2024', name: 'H', frequency: 14, },
    { name: 'I', bill: 180000, type: 'CLS', month: '2', year: '2024', name: 'I', frequency: 13, },

    { name: 'A', bill: 120000, type: 'CLS', month: '3', year: '2024', name: 'A', frequency: 33, },
    { name: 'B', bill: 150000, type: 'Khám', month: '3', year: '2024', name: 'B', frequency: 2, },
    { name: 'C', bill: 220000, type: 'Khám', month: '3', year: '2024', name: 'C', frequency: 3, },
    { name: 'D', bill: 240000, type: 'CLS', month: '3', year: '2024', name: 'D', frequency: 13, },
    { name: 'E', bill: 220000, type: 'Khám', month: '3', year: '2024', name: 'E', frequency: 22, },
    { name: 'F', bill: 200000, type: 'CLS', month: '3', year: '2024', name: 'F', frequency: 5, },
    { name: 'G', bill: 520000, type: 'Khám', month: '3', year: '2024', name: 'G', frequency: 12, },
    { name: 'H', bill: 360000, type: 'Khám', month: '3', year: '2024', name: 'H', frequency: 22, },
    { name: 'I', bill: 180000, type: 'CLS', month: '3', year: '2024', name: 'I', frequency: 0, },

    { name: 'A', bill: 120000, type: 'CLS', month: '4', year: '2024', name: 'A', frequency: 3, },
    { name: 'B', bill: 150000, type: 'Khám', month: '4', year: '2024', name: 'B', frequency: 52, },
    { name: 'C', bill: 220000, type: 'Khám', month: '4', year: '2024', name: 'C', frequency: 16, },
    { name: 'D', bill: 240000, type: 'CLS', month: '4', year: '2024', name: 'D', frequency: 33, },
    { name: 'E', bill: 220000, type: 'Khám', month: '4', year: '2024', name: 'E', frequency: 12, },
    { name: 'F', bill: 200000, type: 'CLS', month: '4', year: '2024', name: 'F', frequency: 36, },
    { name: 'G', bill: 520000, type: 'Khám', month: '4', year: '2024', name: 'G', frequency: 12, },
    { name: 'H', bill: 360000, type: 'Khám', month: '4', year: '2024', name: 'H', frequency: 12, },
    { name: 'I', bill: 180000, type: 'CLS', month: '4', year: '2024', name: 'I', frequency: 3, },

    { name: 'A', bill: 120000, type: 'CLS', month: '11', year: '2023', name: 'A', frequency: 3, },
    { name: 'B', bill: 150000, type: 'Khám', month: '11', year: '2023', name: 'B', frequency: 43, },
    { name: 'C', bill: 220000, type: 'Khám', month: '11', year: '2023', name: 'C', frequency: 13, },
    { name: 'D', bill: 240000, type: 'CLS', month: '11', year: '2023', name: 'D', frequency: 21, },
    { name: 'E', bill: 220000, type: 'Khám', month: '11', year: '2023', name: 'E', frequency: 12, },
    { name: 'F', bill: 200000, type: 'CLS', month: '11', year: '2023', name: 'F', frequency: 3, },
    { name: 'G', bill: 520000, type: 'Khám', month: '11', year: '2023', name: 'G', frequency: 42, },
    { name: 'H', bill: 360000, type: 'Khám', month: '11', year: '2023', name: 'H', frequency: 2, },
    { name: 'I', bill: 180000, type: 'CLS', month: '11', year: '2023', name: 'I', frequency: 3, },

    { name: 'A', bill: 120000, type: 'CLS', month: '12', year: '2023', name: 'A', frequency: 23, },
    { name: 'B', bill: 150000, type: 'Khám', month: '12', year: '2023', name: 'B', frequency: 11, },
    { name: 'C', bill: 220000, type: 'Khám', month: '12', year: '2023', name: 'C', frequency: 23, },
    { name: 'D', bill: 240000, type: 'CLS', month: '12', year: '2023', name: 'D', frequency: 31, },
    { name: 'E', bill: 220000, type: 'Khám', month: '12', year: '2023', name: 'E', frequency: 12, },
    { name: 'F', bill: 200000, type: 'CLS', month: '12', year: '2023', name: 'F', frequency: 4, },
    { name: 'G', bill: 520000, type: 'Khám', month: '12', year: '2023', name: 'G', frequency: 22, },
    { name: 'H', bill: 360000, type: 'Khám', month: '12', year: '2023', name: 'H', frequency: 12, },
    { name: 'I', bill: 180000, type: 'CLS', month: '12', year: '2023', name: 'I', frequency: 40, },
];

const series = [
    { type: 'bar', dataKey: 'frequency', color: 'var(--sub)', yAxisKey: 'leftAxis', label: 'Cường độ' },
    { type: 'line', dataKey: 'bill', color: 'var(--sub)', yAxisKey: 'bill', label: 'Giá dịch vụ' },
];

export default function DichVu() {
    const [loai, setLoai] = useState('');
    const [sorted, setSorted] = useState(false);
    const [filteredDataset, setFilteredDataset] = useState(dataset);
    
    const d = new Date();
    const defaultMonth = d.getMonth();
    const defaultYear = d.getFullYear().toString();

    const [month, setMonth] = useState(defaultMonth);
    const [year, setYear] = useState(defaultYear);
    const [totalIntensityData, setTotalIntensityData] = useState([]);
    const [monthlyIntensityData, setMonthlyIntensityData] = useState([]);

    // Tính tổng cường độ cho mỗi loại bệnh trong năm được chọn
    useEffect(() => {
        if (year) {
            const yearData = dataset.filter(item => item.year === year);
            const intensityMap = {};
            yearData.forEach(item => {
                if (!intensityMap[item.name]) {
                    intensityMap[item.name] = 0;
                }
                intensityMap[item.name] += item.frequency;
            });
            const totalIntensity = Object.keys(intensityMap).map(name => ({
                name,
                totalIntensity: intensityMap[name],
            }));
            setTotalIntensityData(totalIntensity);
        }
    }, [year]);

    // Tính tổng cường độ cho mỗi loại bệnh trong từng tháng của năm được chọn
    useEffect(() => {
        if (year && month) {
            const monthlyData = dataset.filter(item => item.year === year && item.month === month.toString());
            const intensityMap = {};
            monthlyData.forEach(item => {
                if (!intensityMap[item.name]) {
                    intensityMap[item.name] = 0;
                }
                intensityMap[item.name] += item.frequency;
            });
            const monthlyIntensity = Object.keys(intensityMap).map(name => ({
                name,
                monthlyIntensity: intensityMap[name],
            }));
            setMonthlyIntensityData(monthlyIntensity);
        }
    }, [year, month]);

    useEffect(() => {
        filterData();
    }, [loai, sorted]);

    const filterData = () => {
        let filteredData = [...dataset];
        if (loai) {
            filteredData = filteredData.filter(item => item.type === loai);
        }
        if (sorted) {
            filteredData.sort((a, b) => b.frequency - a.frequency);
        }
        setFilteredDataset(filteredData);
    };

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
                <div className="form-check col">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={sorted}
                        onChange={(e) => setSorted(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Sắp xếp
                    </label>
                </div>
            </div>
            
            <ResponsiveChartContainer
                series={series}
                xAxis={[
                    {
                        scaleType: 'band',
                        dataKey: 'name',
                        label: 'Tên dịch vụ',
                    },
                ]}
                yAxis={[
                    { id: 'leftAxis' },
                    { id: 'bill' },
                ]}
                dataset={filteredDataset}
                height={400}
                margin={{ left: 90, right: 50 }}
            >
                <ChartsGrid horizontal />
                <BarPlot />
                <ChartsXAxis />
                <ChartsYAxis axisId="leftAxis" label="Cường độ" />
                <ChartsTooltip trigger="axis" />
            </ResponsiveChartContainer>
        </div>
    );
}
