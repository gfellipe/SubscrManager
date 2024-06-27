import React from "react";
import { Link } from "react-router-dom";
import Assinaturas from "../../components/assets/assinatura.jpg";

export const Home: React.FC = () => {
  return (
    <div
      className="p-4 bg-gray-100 min-h-screen flex flex-col justify-center items-center relative"
      style={{
        backgroundImage: `url(${Assinaturas})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="relative z-10 flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
          Rastreador de Gastos por Assinaturas
        </h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4 md:mb-8">
          <Link
            to="/subscriptions"
            className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white font-bold rounded shadow hover:bg-blue-600 transition text-center"
          >
            Gerenciar Assinaturas
          </Link>
          <Link
            to="/reports"
            className="w-full md:w-auto px-6 py-3 bg-green-500 text-white font-bold rounded shadow hover:bg-green-600 transition text-center mt-4 md:mt-0"
          >
            Ver Relatórios
          </Link>
        </div>
        <p className="text-gray-200 mb-8 max-w-md">
          Acompanhe suas assinaturas, gerencie seus gastos e visualize
          relatórios detalhados para uma melhor gestão financeira.
        </p>
      </div>
    </div>
  );
};
