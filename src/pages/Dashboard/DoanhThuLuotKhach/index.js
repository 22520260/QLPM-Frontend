import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsGrid } from '@mui/x-charts/ChartsGrid';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ChartsOnAxisClickHandler } from '@mui/x-charts';

import { useState } from 'react';

function DoanhThuLuotKhach() {


    const dataset = [
        { guest: 14, bill: 2200000, month: 'Jan' },
        { guest: 5, bill: 330000, month: 'Feb' },
        { guest: 6, bill: 540000, month: 'Mar' },
        { guest: 11, bill: 1250000, month: 'Apr' },
        { guest: 8, bill: 1600000, month: 'May' },
        { guest: 3, bill: 1000000, month: 'Jun' },
        { guest: 10, bill: 1380000, month: 'Jul' },
        { guest: 11, bill: 290000, month: 'Aug' },
        { guest: 3, bill: 300000, month: 'Sep' },
        { guest: 11, bill: 1310000, month: 'Oct' },
        { guest: 7, bill: 910000, month: 'Nov' },
        { guest: 5, bill: 110000, month: 'Dec' },
    ];

    const series = [
        { type: 'line', dataKey: 'bill', color: 'var(--primary)', label: 'Doanh thu' },
        { type: 'bar', dataKey: 'guest', color: 'var(--sub)', yAxisKey: 'rightAxis', label: 'Lượt khách' },
    ];

    const [axisData, setAxisData] = useState();


    const onAxisClick = (event, d) => {
        setAxisData(d)
    }

    return (
        <div>
            <ResponsiveChartContainer
                series={series}
                xAxis={[
                    {
                        scaleType: 'band',
                        dataKey: 'month',
                        label: 'Month',
                    },
                ]}
                yAxis={[
                    { id: 'leftAxis' },
                    { id: 'rightAxis' },
                ]}
                dataset={dataset}
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