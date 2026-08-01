"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function StatsCards() {
  const [embroideryToday, setEmbroideryToday] = useState(0);
  const [deliveredToday, setDeliveredToday] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const today = new Date().toISOString().split("T")[0];

    const { count: embroideryCount } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("embroidery_date", today);

    const { count: deliveredCount } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("delivered_date", today);

    setEmbroideryToday(embroideryCount ?? 0);
    setDeliveredToday(deliveredCount ?? 0);
  };

  return (
    <section className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-white rounded-2xl shadow border-t-4 border-blue-600 p-4">
        <div className="text-2xl mb-1">🧵</div>

        <p className="text-sm text-gray-500">
          سفارش‌های دوخته‌شده امروز
        </p>

        <h2 className="text-3xl font-bold text-blue-600 mt-2">
          {embroideryToday}
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow border-t-4 border-green-600 p-4">
        <div className="text-2xl mb-1">✅</div>

        <p className="text-sm text-gray-500">
          سفارش‌های تحویل‌شده امروز
        </p>

        <h2 className="text-3xl font-bold text-green-600 mt-2">
          {deliveredToday}
        </h2>
      </div>
    </section>
  );
}