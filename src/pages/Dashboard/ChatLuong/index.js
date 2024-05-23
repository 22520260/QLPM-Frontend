import { ScatterPlot } from '@mui/x-charts/ScatterChart';
import { ResponsiveChartContainer, ChartsGrid, ChartsXAxis, ChartsYAxis, ChartsTooltip, ChartsLegend } from '@mui/x-charts';
import { useState, useEffect } from 'react';
import { fetchThongKeChatLuongAction } from '../../../redux/action/fetchDataAction/fetchThongKeChatLuongAction';
import { useDispatch, useSelector } from "react-redux";


export default function ChatLuong({ year }) {
    const dispatch = useDispatch();
    const [filterData, setFilterData] = useState([])
    const data = useSelector((state) => state.tkChatLuong?.data) || [];

    useEffect(() => {
        dispatch(fetchThongKeChatLuongAction());
      }, []);

    useEffect(() => {
        if (year) {
            const yearData = data.filter(item => item.YEAR === year);
            setFilterData(yearData);
        }
    }, [year, data]);

    return (
        <div>
            <ResponsiveChartContainer
                xAxis={[{ label: 'Khoảng cách trung bình giữa 2 lần khám', }]}
                yAxis={[{
                    id: 'yAxis',
                    label: 'Số lượt khám',
                    colorMap: {
                        type: 'continuous',
                        min: 10,
                        max: 30,
                        color: ['indigo', 'tomato']
                    }
                }]}
                height={400}
                margin={{ left: 90, right: 50 }}
                series={[
                    {
                        type: 'scatter',
                        label: "Khách hàng",
                        data: filterData.map((v) => ({ x: v.X2, y: v.X1, id: v.ID })),
                        markerSize: 5,
                        color: 'tomato'
                    },
                ]}
            >
                <ScatterPlot />
                <ChartsLegend position={{ vertical: 'top', horizontal: 'right' }} />
                <ChartsGrid horizontal vertical />
                <ChartsXAxis />
                <ChartsYAxis label='Số lượt khám' />
                <ChartsTooltip trigger='item' />
            </ResponsiveChartContainer>
        </div>
    );
}
