import React from "react";
import { motion } from "framer-motion";

export interface Subscription {
  id: string;
  name: string;
  category: string;
  cost: number;
  renewalDate: string;
}

interface SubscriptionListProps {
  subscriptions: Subscription[];
  onDeleteSubscription: (id: string) => void;
}

export const SubscriptionList: React.FC<SubscriptionListProps> = ({
  subscriptions,
  onDeleteSubscription,
}) => {
  const handleDelete = (id: string) => {
    onDeleteSubscription(id);
  };

  return (
    <div className="mt-4 max-h-96 overflow-y-auto">
      {subscriptions.length === 0 ? (
        <p className="text-white">Nenhuma assinatura encontrada.</p>
      ) : (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4"
        >
          {subscriptions.map((subscription, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b p-4 border rounded bg-gray-800 shadow-xl"
              style={{ transform: "translateZ(0)" }}
            >
              <h2 className="text-lg font-bold text-white">{subscription.name}</h2>
              <p className="text-white">Categoria: {subscription.category}</p>
              <p className="text-white">Custo Mensal: R${subscription.cost.toFixed(2)}</p>
              <p className="text-white">
                Data de Renovação:{" "}
                {new Date(subscription.renewalDate).toLocaleDateString()}
              </p>
              <div className="mt-2 space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(subscription.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Excluir
                </motion.button>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};
