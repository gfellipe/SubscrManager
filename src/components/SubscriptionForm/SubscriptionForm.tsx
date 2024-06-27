import React, { useState } from "react";
import { motion } from "framer-motion";

export interface Subscription {
  id: string;
  name: string;
  category: string;
  cost: number;
  renewalDate: string;
}

interface SubscriptionFormProps {
  onAddSubscription: (subscription: Subscription) => void;
}

export const SubscriptionForm: React.FC<SubscriptionFormProps> = ({
  onAddSubscription,
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState<number | "">("");
  const [renewalDate, setRenewalDate] = useState(() => {
    return new Date().toISOString().split("T")[0]; 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && category && cost !== "" && Number(cost) >= 0 && renewalDate) {
      const selectedDate = new Date(renewalDate);
      selectedDate.setDate(selectedDate.getDate() + 1);

      const newSubscription: Subscription = {
        name,
        category,
        cost: Number(cost),
        renewalDate: selectedDate.toISOString().split("T")[0],
        id: "",
      };
      onAddSubscription(newSubscription);
      setName("");
      setCategory("");
      setCost("");
      setRenewalDate(new Date().toISOString().split("T")[0]); 
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 border rounded bg-gray-800 shadow-xl"
      style={{ transform: "translateZ(0)" }}
    >
      <div className="mb-4">
        <motion.label
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="block mb-2 text-white"
        >
          Nome da Assinatura
        </motion.label>
        <motion.input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <motion.label
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="block mb-2 text-white"
        >
          Categoria
        </motion.label>
        <motion.input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <motion.label
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="block mb-2 text-white"
        >
          Custo Mensal
        </motion.label>
        <motion.input
          type="number"
          value={cost}
          onChange={(e) => {
            const value = Number(e.target.value);
            setCost(value >= 0 ? value : "");
          }}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <motion.label
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="block mb-2 text-white"
        >
          Data de Renovação
        </motion.label>
        <motion.input
          type="date"
          value={renewalDate}
          onChange={(e) => {
            setRenewalDate(e.target.value);
          }}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          required
        />
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Adicionar Assinatura
      </motion.button>
    </motion.form>
  );
};
