import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsGrid } from '@mui/x-charts/ChartsGrid';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ChartsOnAxisClickHandler } from '@mui/x-charts';
import { IFSelect } from '../../../component/Layout/TabLayout/InputForm';
import { useState } from 'react';

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

const series = [
    { type: 'bar', dataKey: 'frequency', color: 'var(--sub)', yAxisKey: 'leftAxis', label: 'Cường độ', },
];

const sorted = dataset.sort((a, b) => b.frequency - a.frequency);


export default function LoaiBenh() {

    const [loai, setLoai] = useState('');
    

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
            </div>

            <ResponsiveChartContainer
                series={series}
                xAxis={[
                    {
                        scaleType: 'band',
                        dataKey: 'name',
                        label: 'Tên bệnh',
                    },
                ]}
                yAxis={[
                    { id: 'leftAxis' },
                ]}
                dataset={dataset}
                height={400}
                margin={{ left: 90, right: 50 }}

            >
                <ChartsGrid horizontal />
                <BarPlot />
                <LinePlot />
                <MarkPlot />
                <ChartsXAxis />
                <ChartsYAxis axisId="leftAxis" label="Cường độ" />
                <ChartsTooltip />
            </ResponsiveChartContainer>

            <div>
            </div>
        </div>
    );
}
