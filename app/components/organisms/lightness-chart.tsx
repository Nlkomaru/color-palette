"use client";
import { Chart, useChart } from "@chakra-ui/charts";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

type LightnessChartProps = {
    data: { index: number; lightness: number }[];
};

export const LightnessChart = ({ data }: LightnessChartProps) => {
    const chart = useChart({
        data: data.map((item) => ({
            name: item.index.toString(),
            uv: item.lightness.toFixed(3),
        })),
    });
    return (
        <Chart.Root maxH="md" chart={chart}>
            <LineChart data={chart.data} margin={{ left: 40, right: 40, top: 40 }}>
                <CartesianGrid stroke={chart.color("border")} strokeDasharray="3 3" horizontal={false} />
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
    );
};
