import React from "react";
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

interface MonthlyExpense {
  month: string;
  amount: number;
}

interface AnnualExpense {
  year: string;
  amount: number;
}

type Expense = MonthlyExpense | AnnualExpense;

export const ExpenseChart: React.FC<{
  data: Expense[];
  chartType: "monthly" | "annual";
}> = ({ data, chartType }) => {

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={chartType === "monthly" ? "month" : "year"}
          stroke="#ffffff"
        />
        <YAxis stroke="#ffffff" />
        <Tooltip
          contentStyle={{ backgroundColor: "#ffffff", color: "#000000" }}
        />
        <Legend wrapperStyle={{ color: "#ffffff" }} />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
