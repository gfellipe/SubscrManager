import React, { useState, useEffect } from "react";
import { ExpenseChart } from "../../components/ExpenseChart/ExpenseChart";

interface Subscription {
  name: string;
  category: string;
  cost: number;
  renewalDate: string;
}

export const Reports: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const storedSubscriptions = JSON.parse(
      localStorage.getItem("subscriptions") || "[]"
    );
    setSubscriptions(storedSubscriptions);
  }, []);

  const calculateMonthlyExpenses = () => {
    const monthlyExpenses: { [month: string]: number } = {};

    subscriptions.forEach((subscription) => {
      const renewalDate = new Date(subscription.renewalDate);
      const monthYearKey = `${
        renewalDate.getMonth() + 1
      }/${renewalDate.getFullYear()}`;

      if (monthlyExpenses[monthYearKey]) {
        monthlyExpenses[monthYearKey] += subscription.cost;
      } else {
        monthlyExpenses[monthYearKey] = subscription.cost;
      }
    });

    const data = Object.keys(monthlyExpenses).map((key) => ({
      month: key,
      amount: monthlyExpenses[key],
    }));

    return data;
  };

  const calculateAnnualExpenses = () => {
    const annualExpenses: { [year: string]: number } = {};

    subscriptions.forEach((subscription) => {
      const renewalDate = new Date(subscription.renewalDate);
      const yearKey = renewalDate.getFullYear().toString();

      if (annualExpenses[yearKey]) {
        annualExpenses[yearKey] += subscription.cost * 12;
      } else {
        annualExpenses[yearKey] = subscription.cost * 12;
      }
    });

    const data = Object.keys(annualExpenses).map((key) => ({
      year: key,
      amount: annualExpenses[key],
    }));

    return data;
  };

  const [chartType, setChartType] = useState<"monthly" | "annual">("monthly");

  const handleChartTypeChange = (type: "monthly" | "annual") => {
    setChartType(type);
  };

  const savingTips = [
    "Considere cancelar assinaturas não utilizadas.",
    "Compare planos de assinatura para encontrar o mais econômico.",
    "Avalie a necessidade de cada assinatura regularmente.",
    "Negocie descontos ao renovar assinaturas.",
    "Utilize cupons ou códigos promocionais ao assinar novos serviços.",
    "Agrupe serviços similares em pacotes para economizar.",
    "Pesquise e aproveite períodos de teste gratuitos antes de se comprometer com uma assinatura.",
  ];

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-white text-center">
        Relatórios de Gastos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold mb-2 text-white">Gastos</h2>
            <div className="flex">
              <button
                className={`mr-2 px-4 py-2 rounded ${
                  chartType === "monthly"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-500 text-gray-300"
                }`}
                onClick={() => handleChartTypeChange("monthly")}
              >
                Mensais
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  chartType === "annual"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-500 text-gray-300"
                }`}
                onClick={() => handleChartTypeChange("annual")}
              >
                Anuais
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <ExpenseChart
              data={
                chartType === "monthly"
                  ? calculateMonthlyExpenses()
                  : calculateAnnualExpenses()
              }
              chartType={chartType}
            />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded shadow-lg">
          <h2 className="text-lg font-bold mb-2 text-white">
            Dicas de Economia
          </h2>
          <ul className="list-disc list-inside text-white">
            {savingTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reports;
