import React from "react";

const SavingTips: React.FC = () => {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-lg mt-4">
      <h2 className="text-lg font-bold mb-2 text-white">Dicas de Economia</h2>
      <ul className="list-disc list-inside text-white">
        <li>Considere cancelar assinaturas não utilizadas.</li>
        <li>Compare planos de assinatura para encontrar o mais econômico.</li>
        <li>Avalie a necessidade de cada assinatura regularmente.</li>
      </ul>
    </div>
  );
};

export default SavingTips;
