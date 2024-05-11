import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsGrid } from '@mui/x-charts/ChartsGrid';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ChartsOnAxisClickHandler } from '@mui/x-charts';

import { useEffect, useState } from 'react';
const dataset = [
    { guest: 4, bill: 1200000, month: '1', year: '2024' },
    { guest: 5, bill: 330000, month: '2', year: '2024' },
    { guest: 6, bill: 540000, month: '3', year: '2024' },
    { guest: 11, bill: 1250000, month: '4', year: '2024' },
    { guest: 8, bill: 1600000, month: '5', year: '2024' },
    { guest: 3, bill: 1000000, month: '6', year: '2024' },
    { guest: 10, bill: 1380000, month: '7', year: '2024' },
    { guest: 11, bill: 290000, month: '8', year: '2024' },
    { guest: 3, bill: 300000, month: '9', year: '2024' },
    { guest: 11, bill: 1310000, month: '10', year: '2024' },
    { guest: 7, bill: 910000, month: '11', year: '2024' },
    { guest: 5, bill: 110000, month: '12', year: '2024' },

    { guest: 24, bill: 220000, month: '1', year: '2023' },
    { guest: 5, bill: 530000, month: '2', year: '2023' },
    { guest: 6, bill: 50000, month: '3', year: '2023' },
    { guest: 31, bill: 120000, month: '4', year: '2023' },
    { guest: 2, bill: 160000, month: '5', year: '2023' },
    { guest: 4, bill: 100000, month: '6', year: '2023' },
    { guest: 30, bill: 130000, month: '7', year: '2023' },
    { guest: 21, bill: 200000, month: '8', year: '2023' },
    { guest: 31, bill: 30000, month: '9', year: '2023' },
    { guest: 1, bill: 131000, month: '10', year: '2023' },
    { guest: 12, bill: 91000, month: '11', year: '2023' },
    { guest: 15, bill: 11000, month: '12', year: '2023' },

    { guest: 24, bill: 2300000, month: '1', year: '2022' },
    { guest: 12, bill: 230000, month: '2', year: '2022' },
    { guest: 2, bill: 340000, month: '3', year: '2022' },
    { guest: 21, bill: 1350000, month: '4', year: '2022' },
    { guest: 12, bill: 1300000, month: '5', year: '2022' },
    { guest: 33, bill: 13000000, month: '6', year: '2022' },
    { guest: 17, bill: 4380000, month: '7', year: '2022' },
    { guest: 21, bill: 390000, month: '8', year: '2022' },
    { guest: 32, bill: 300000, month: '9', year: '2022' },
    { guest: 15, bill: 1330000, month: '10', year: '2022' },
    { guest: 17, bill: 230000, month: '11', year: '2022' },
    { guest: 25, bill: 130000, month: '12', year: '2022' },
];

function DoanhThuLuotKhach({year}) {
    const [filterData, setFilterData] = useState([])

    const series = [
        { type: 'line', dataKey: 'bill', color: 'var(--primary)', label: 'Doanh thu' },
        { type: 'bar', dataKey: 'guest', color: 'var(--sub)', yAxisKey: 'rightAxis', label: 'Lượt khách' },
    ];

    const [axisData, setAxisData] = useState();


    const onAxisClick = (event, d) => {
        setAxisData(d)
    }

    useEffect(() => {
        if (year) {
            const yearData = dataset.filter(item => item.year === year);
            setFilterData(yearData);
        }
    }, [year]);

    return (
        <div>
            <ResponsiveChartContainer
                series={series}
                xAxis={[
                    {
                        scaleType: 'band',
                        dataKey: 'month',
                        label: 'Tháng',
                    },
                ]}
                yAxis={[
                    { id: 'leftAxis' },
                    { id: 'rightAxis' },
                ]}
                dataset={filterData}
                height={400}
                margin={{ left: 90, right: 50 }}

            >
                <ChartsGrid horizontal />
                <ChartsOnAxisClickHandler onAxisClick={onAxisClick} />
                <BarPlot />
                <LinePlot />
                <MarkPlot />
                <ChartsXAxis />
                <ChartsYAxis axisId="leftAxis" label="Doanh thu (VND)" labelStyle={{ translate: '-45px 0px' }} />

                <ChartsYAxis
                    axisId="rightAxis"
                    position="right"
                    label="Đăng kí khám (Lượt)"
                />
                <ChartsTooltip />
            </ResponsiveChartContainer>

            <div>
                {console.log(axisData)}
            </div>
        </div>
    );
}

export default DoanhThuLuotKhach;