"use client";
import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

type DashboardProps = {
  todoUrgent: number;
  todoImportant: number;
  todoOthers: number;
  todoComplete: number;
};

export default function Dashboard({
  todoUrgent,
  todoImportant,
  todoOthers,
  todoComplete,
}: DashboardProps) {
  const total = todoUrgent + todoImportant + todoOthers;
  const PieData = [
    { name: "Completed", value: todoComplete },
    { name: "Remainings", value: total - todoComplete },
  ];
  const PieData2 = [
    { name: "Urgent", value: todoUrgent },
    { name: "Important", value: todoImportant },
    { name: "Others", value: todoOthers },
  ];

  const PieDataTheme = [
    "rgb(243 244 246 / var(--tw-bg-opacity))",
    "rgb(255 255 255 / var(--tw-bg-opacity))",
  ];
  const PieDataTheme2 = [
    "rgb(239 68 68 / var(--tw-bg-opacity))",
    "rgb(99 102 241 / var(--tw-bg-opacity))",
    "rgb(125 211 252 / var(--tw-bg-opacity))",
  ];

  const RADIAN = Math.PI / 180;

  const PieLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className=" text-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <div className=" grid place-content-center place-items-center m-5 ">
        <ResponsiveContainer width={280} height={300}>
          <PieChart width={280} height={300}>
            <Pie
              data={PieData}
              dataKey="value"
              outerRadius={70}
              label={PieLabel}
              labelLine={false}
              stroke="black"
              className=" focus:outline-none"
              // cx={120}
              // cy={100}
              // fill="#8884d8"
            >
              {PieData.map((v, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={PieDataTheme[i % PieDataTheme.length]}
                />
              ))}
            </Pie>
            <Pie
              data={PieData2}
              dataKey="value"
              outerRadius={120}
              innerRadius={70}
              stroke="black"
              className=" focus:outline-none"
              // label={PieLabel}
              // labelLine={false}
              // cx={120}
              // cy={100}
              // fill="#8884d8"
            >
              {PieData2.map((v, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={PieDataTheme2[i % PieDataTheme2.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div
          className=" grid 
        md:grid-cols-2 md:mt-12 
        mt-10 gap-5 "
        >
          {/* legend */}
          <div className=" flex gap-5 ">
            <div className=" flex md:flex-col justify-center items-center gap-2">
              <p className="bg-gray-200 w-3 h-3 rounded-full"></p>
              <p className=" text-xs">Remainings</p>
            </div>
            <div className=" flex md:flex-col justify-center items-center gap-2">
              <p className="bg-gray-500 w-3 h-3 rounded-full"></p>
              <p className=" text-xs">Completed</p>
            </div>
          </div>

          {/* category legend */}
          <div className=" flex gap-5 ">
            <div className=" flex md:flex-col justify-center items-center gap-2">
              <p className="bg-rose-500 w-3 h-3 rounded-full"></p>
              <p className=" text-xs">Urgent</p>
            </div>
            <div className=" flex md:flex-col justify-center items-center gap-2">
              <p className="bg-indigo-500 w-3 h-3 rounded-full"></p>
              <p className=" text-xs">Important</p>
            </div>
            <div className=" flex md:flex-col justify-center items-center gap-2">
              <p className="bg-sky-300 w-3 h-3 rounded-full"></p>
              <p className=" text-xs">Others</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
