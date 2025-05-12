"use client"
import {
    CartesianGrid,
    LabelList,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { Chart, useChart } from "@chakra-ui/charts"

type LightnessChartProps = {
    data: number[]
}

export const LightnessChart = ({ data }: LightnessChartProps) => {
    const chart = useChart({
        data: data.map((value, index) => ({
            name: ((index + 1) * 100).toString(),
            uv: value.toFixed(3),
        })),
    });
    return (
        <Chart.Root maxH="md" chart={chart}>
            <LineChart data={chart.data} margin={{ left: 40, right: 40, top: 40 }}>
                <CartesianGrid
                    stroke={chart.color("border")}
                    strokeDasharray="3 3"
                    horizontal={false}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                    dataKey={chart.key("uv")}
                    stroke={chart.color("border")}
                />
                <XAxis
                    dataKey={chart.key("name")}
                    tickFormatter={(value) => value.slice(0, 4)}
                    stroke={chart.color("border")}
                />
                <Tooltip
                    animationDuration={100}
                    cursor={{ stroke: chart.color("border") }}
                    content={<Chart.Tooltip hideLabel />}
                />
                <Line
                    isAnimationActive={false}
                    dataKey={chart.key("uv")}
                    fill={chart.color("teal.solid")}
                    stroke={chart.color("teal.solid")}
                    strokeWidth={2}
                />
            </LineChart>
        </Chart.Root>
    )
};