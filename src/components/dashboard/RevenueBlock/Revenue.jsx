// import { FOUND_CLAIMED_DATA} from "../../../data/mockData";
import { BlockContentWrap, BlockTitle } from "../../../styles/global/default";
import { RevenueWrap } from "./Revenue.styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
const formatTooltipValue = (value) => {
  return `${value} item`;
};

const formatYAxisLabel = (value) => {
  return `${value}`;
};

const formatLegendValue = (value) => {
  console.log(value);
  return value.charAt(0).toUpperCase() + value.slice(1) + " items";
};

const Revenue = () => {
  const FOUND_CLAIMED_DATA=useSelector(state=>state.auth.foundClaimedData)
  return (
    <RevenueWrap>
      <div className="block-head">
        <BlockTitle className="block-title">
          <h3>FOUND_CLAIMED_DATA</h3>
        </BlockTitle>
      </div>
      <BlockContentWrap className="bar-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={FOUND_CLAIMED_DATA}
            margin={{
              top: 5,
              right: 5,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              stroke="#f8f8f9"
              horizontal={true}
              vertical={false}
              strokeDasharray="3 0"
            />
            <XAxis
              dataKey="day"
              tickSize={0}
              axisLine={false}
              tick={({ payload, x, y, dy }) => (
                <text
                  x={x}
                  y={y + 25}
                  dy={dy}
                  textAnchor="middle"
                  fill="#7B91B0"
                  fontSize={14}
                >
                  {payload.value}
                </text>
              )}
            />
            <YAxis
              tickFormatter={formatYAxisLabel}
              tickCount={6}
              axisLine={false}
              tickSize={0}
              tick={{
                fill: "#7B91B0",
                fontSize: 14,
              }}
              interval={0}
              ticks={[0, 5, 10, 15, 20, 25]}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              formatter={formatTooltipValue}
            />
            <Legend
              iconType="circle"
              iconSize={10}
              formatter={formatLegendValue}
              style={{
                paddingTop: "10px",
              }}
            />
            <Bar
              dataKey="found"
              fill="#0095FF"
              activeBar={false}
              isAnimationActive={false}
              radius={[4, 4, 4, 4]}
              barSize={18}
            />
            <Bar
              dataKey="claimed"
              fill="#00E096"
              activeBar={false}
              isAnimationActive={false}
              radius={[4, 4, 4, 4]}
              barSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </BlockContentWrap>
    </RevenueWrap>
  );
};

export default Revenue;
