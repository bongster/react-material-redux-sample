import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import { withWidth } from "@material-ui/core";

function createData(name: string, value: number) {
  return { name, value };
}
const data = [
  createData("USDT", 400),
  createData("BTC", 300),
  createData("ETH", 300),
  createData("EOS", 200),
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
  } = props;
  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <text
        x={cx}
        y={cy - 10}
        dy={8 * 3}
        textAnchor="middle"
        fill={fill}
        style={{ fontSize: "0.9em", fontWeight: 500 }}
      >
        ({payload.value})
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

const BalanceChart: React.FC = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (data: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <React.Fragment>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={120}
            cy={100}
            labelLine={false}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default withWidth()(BalanceChart);
