import React, { useState, useEffect } from 'react';
import { ResponsiveChartContainer, BarPlot, ChartsXAxis, ChartsYAxis, ChartsGrid, ChartsTooltip } from '@mui/x-charts';
import { IFSelect } from '../../../component/Layout/TabLayout/InputForm';

const dataset = [
    { month: '1', year: '2024', name: 'A', frequency: 43, },
    { month: '1', year: '2024', name: 'B', frequency: 3, },
    { month: '1', year: '2024', name: 'C', frequency: 23, },
    { month: '1', year: '2024', name: 'D', frequency: 41, },
    { month: '1', year: '2024', name: 'E', frequency: 12, },
    { month: '1', year: '2024', name: 'F', frequency: 21, },
    { month: '1', year: '2024', name: 'G', frequency: 42, },
    { month: '1', year: '2024', name: 'H', frequency: 22, },
    { month: '1', year: '2024', name: 'I', frequency: 33, },

    { month: '2', year: '2024', name: 'A', frequency: 4, },
    { month: '2', year: '2024', name: 'B', frequency: 3, },
    { month: '2', year: '2024', name: 'C', frequency: 23, },
    { month: '2', year: '2024', name: 'D', frequency: 41, },
    { month: '2', year: '2024', name: 'E', frequency: 52, },
    { month: '2', year: '2024', name: 'F', frequency: 13, },
    { month: '2', year: '2024', name: 'G', frequency: 22, },
    { month: '2', year: '2024', name: 'H', frequency: 24, },
    { month: '2', year: '2024', name: 'I', frequency: 13, },

    { month: '3', year: '2024', name: 'A', frequency: 33, },
    { month: '3', year: '2024', name: 'B', frequency: 2, },
    { month: '3', year: '2024', name: 'C', frequency: 53, },
    { month: '3', year: '2024', name: 'D', frequency: 43, },
    { month: '3', year: '2024', name: 'E', frequency: 22, },
    { month: '3', year: '2024', name: 'F', frequency: 11, },
    { month: '3', year: '2024', name: 'G', frequency: 32, },
    { month: '3', year: '2024', name: 'H', frequency: 22, },
    { month: '3', year: '2024', name: 'I', frequency: 30, },

    { month: '4', year: '2024', name: 'A', frequency: 13, },
    { month: '4', year: '2024', name: 'B', frequency: 32, },
    { month: '4', year: '2024', name: 'C', frequency: 26, },
    { month: '4', year: '2024', name: 'D', frequency: 31, },
    { month: '4', year: '2024', name: 'E', frequency: 32, },
    { month: '4', year: '2024', name: 'F', frequency: 31, },
    { month: '4', year: '2024', name: 'G', frequency: 12, },
    { month: '4', year: '2024', name: 'H', frequency: 32, },
    { month: '4', year: '2024', name: 'I', frequency: 3, },

    { month: '11', year: '2023', name: 'A', frequency: 3, },
    { month: '11', year: '2023', name: 'B', frequency: 23, },
    { month: '11', year: '2023', name: 'C', frequency: 33, },
    { month: '11', year: '2023', name: 'D', frequency: 21, },
    { month: '11', year: '2023', name: 'E', frequency: 2, },
    { month: '11', year: '2023', name: 'F', frequency: 31, },
    { month: '11', year: '2023', name: 'G', frequency: 22, },
    { month: '11', year: '2023', name: 'H', frequency: 12, },
    { month: '11', year: '2023', name: 'I', frequency: 33, },

    { month: '12', year: '2023', name: 'A', frequency: 43, },
    { month: '12', year: '2023', name: 'B', frequency: 31, },
    { month: '12', year: '2023', name: 'C', frequency: 2, },
    { month: '12', year: '2023', name: 'D', frequency: 21, },
    { month: '12', year: '2023', name: 'E', frequency: 2, },
    { month: '12', year: '2023', name: 'F', frequency: 41, },
    { month: '12', year: '2023', name: 'G', frequency: 12, },
    { month: '12', year: '2023', name: 'H', frequency: 12, },
    { month: '12', year: '2023', name: 'I', frequency: 43, },
];


const LoaiBenh = () => {
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
                
            </div>

            <div className='row'>
                <div className='col col-md-6'>
                    <h2>Thống kê trong cả năm {year}</h2>
                    <ResponsiveChartContainer
                        series={[{ type: 'bar', dataKey: 'totalIntensity', color: 'var(--sub)' }]}
                        xAxis={[{ scaleType: 'band', dataKey: 'name', label: 'Tên bệnh' }]}
                        yAxis={[{ label: 'Tổng cường độ' }]}
                        dataset={totalIntensityData}
                        height={400}
                        margin={{ left: 90, right: 50 }}
                    >
                        <ChartsGrid horizontal />
                        <BarPlot />
                        <ChartsXAxis />
                        <ChartsYAxis label="Tổng cường độ" labelStyle={{ translate: '-25px 0px' }} />
                        <ChartsTooltip />
                    </ResponsiveChartContainer>
                </div>
                {month && (
                    <div className='col col-md-6'>
                        <h2>Thống kê trong tháng {month}/{year}</h2>
                        <ResponsiveChartContainer
                            series={[{ type: 'bar', dataKey: 'monthlyIntensity', color: 'var(--sub)' }]}
                            xAxis={[{ scaleType: 'band', dataKey: 'name', label: 'Tên bệnh' }]}
                            yAxis={[{ label: 'Cường độ trong tháng' }]}
                            dataset={monthlyIntensityData}
                            height={400}
                            margin={{ left: 90, right: 50 }}
                        >
                            <ChartsGrid horizontal />
                            <BarPlot />
                            <ChartsXAxis />
                            <ChartsYAxis label="Cường độ trong tháng"  labelStyle={{ translate: '-25px 0px' }}/>
                            <ChartsTooltip />
                        </ResponsiveChartContainer>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoaiBenh;