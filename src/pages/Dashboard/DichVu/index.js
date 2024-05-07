import React, { useState, useEffect } from 'react';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsGrid } from '@mui/x-charts/ChartsGrid';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { IFSelect } from '../../../component/Layout/TabLayout/InputForm';

const dataset = [
    { name: 'A', bill: 120000, type: 'CLS', frequency: 43 },
    { name: 'B', bill: 150000, type: 'Khám', frequency: 3 },
    { name: 'C', bill: 220000, type: 'Khám', frequency: 23 },
    { name: 'D', bill: 240000, type: 'CLS', frequency: 41 },
    { name: 'E', bill: 220000, type: 'Khám', frequency: 12 },
    { name: 'F', bill: 200000, type: 'CLS', frequency: 21 },
    { name: 'G', bill: 520000, type: 'Khám', frequency: 42 },
    { name: 'H', bill: 360000, type: 'Khám', frequency: 22 },
    { name: 'I', bill: 180000, type: 'CLS', frequency: 3 },
    { name: 'J', bill: 120000, type: 'CLS', frequency: 33 },
    { name: 'K', bill: 150000, type: 'Khám', frequency: 13 },
    { name: 'L', bill: 220000, type: 'Khám', frequency: 22 },
    { name: 'M', bill: 240000, type: 'CLS', frequency: 21 },
    { name: 'N', bill: 220000, type: 'Khám', frequency: 19 },
    { name: 'O', bill: 200000, type: 'CLS', frequency: 21 },
    { name: 'P', bill: 520000, type: 'Khám', frequency: 42 },
    { name: 'Q', bill: 360000, type: 'Khám', frequency: 32 },
    { name: 'R', bill: 580000, type: 'CLS', frequency: 39 },
];

const series = [
    { type: 'bar', dataKey: 'frequency', color: 'var(--sub)', yAxisKey: 'leftAxis', label: 'Cường độ' },
    { type: 'line', dataKey: 'bill', color: 'var(--sub)', yAxisKey: 'bill', label: 'Giá dịch vụ' },
];

export default function DichVu() {
    const [loai, setLoai] = useState('');
    const [sorted, setSorted] = useState(false);
    const [filteredDataset, setFilteredDataset] = useState(dataset);

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
