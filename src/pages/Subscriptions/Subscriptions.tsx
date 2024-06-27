import React, { useState, useEffect } from "react";
import {
  Subscription,
  SubscriptionList,
} from "../../components/SubscriptionList/SubscriptionList";
import { SubscriptionForm } from "../../components/SubscriptionForm/SubscriptionForm";
import ImgPlatforms from "../../components/assets/plataformas.jpg";

export const Subscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const storedSubscriptions = JSON.parse(
      localStorage.getItem("subscriptions") || "[]"
    );
    setSubscriptions(storedSubscriptions);

    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); 
    };
  }, []);

  const handleAddSubscription = (subscription: Subscription) => {
    const newSubscription = { ...subscription, id: generateId() };
    const updatedSubscriptions = [...subscriptions, newSubscription];
    setSubscriptions(updatedSubscriptions);
    localStorage.setItem("subscriptions", JSON.stringify(updatedSubscriptions));
  };

  const handleDeleteSubscription = (id: string) => {
    const updatedSubscriptions = subscriptions.filter(
      (subscription) => subscription.id !== id
    );
    setSubscriptions(updatedSubscriptions);
    localStorage.setItem("subscriptions", JSON.stringify(updatedSubscriptions));
  };

  const generateId = (): string => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="p-4  bg-gray-800 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-white">Gerenciar Assinaturas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className=" bg-gray-800 p-4 rounded shadow-lg">
          <h2 className="text-lg font-bold mb-2 text-white">Adicionar Nova Assinatura</h2>
          <SubscriptionForm onAddSubscription={handleAddSubscription} />
        </div>
        {!isMobileView && (
          <div className="flex justify-center items-center">
            <img src={ImgPlatforms} alt="Imagem contendo as plataformas" className="max-w-full h-auto rounded shadow-lg pt-10" />
          </div>
        )}
        <div className=" bg-gray-800 p-4 rounded shadow-lg col-span-2 md:col-span-2">
          <h2 className="text-lg font-bold mb-2 text-white">Lista de Assinaturas</h2>
          <SubscriptionList
            subscriptions={subscriptions}
            onDeleteSubscription={handleDeleteSubscription}
          />
        </div>
      </div>
    </div>
  );
};
