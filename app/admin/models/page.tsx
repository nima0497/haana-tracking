"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

type Model = {
  id: number;
  name: string;
  is_active: boolean;
};

export default function ModelsPage() {
  const [models, setModels] = useState<Model[]>([]);
  const [newModel, setNewModel] = useState("");

  useEffect(() => {
    loadModels();
  }, []);

  async function loadModels() {
    const { data, error } = await supabase
      .from("models")
      .select("*")
      .order("name");

    if (!error && data) {
      setModels(data);
    }
  }

  async function addModel() {
    if (!newModel.trim()) return;

    const { error } = await supabase.from("models").insert([
      {
        name: newModel,
        is_active: true,
      },
    ]);

    if (error) {
      alert("خطا در ثبت مدل");
      return;
    }

    setNewModel("");
    loadModels();
  }

  async function toggleModel(model: Model) {
    const { error } = await supabase
      .from("models")
      .update({
        is_active: !model.is_active,
      })
      .eq("id", model.id);

    if (error) {
  alert(error.message);
  console.error(error);
  return;
}

    loadModels();
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">

        <h1 className="text-2xl font-bold mb-6">
          مدیریت مدل‌ها
        </h1>

        <div className="flex gap-2 mb-6">

          <input
            value={newModel}
            onChange={(e) => setNewModel(e.target.value)}
            placeholder="نام مدل جدید"
            className="flex-1 border rounded-lg px-3 py-2"
          />

          <button
            onClick={addModel}
            className="bg-purple-700 text-white px-5 rounded-lg hover:bg-purple-800"
          >
            افزودن
          </button>

        </div>

        <div className="space-y-3">

          {models.map((item) => (

            <div
              key={item.id}
              className="border rounded-lg p-4 flex items-center justify-between"
            >

              <div>

                <div className="font-bold">
                  {item.name}
                </div>

                <div
                  className={`text-sm mt-1 ${
                    item.is_active
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {item.is_active ? "فعال" : "آرشیو شده"}
                </div>

              </div>

              <button
                onClick={() => toggleModel(item)}
                className={`px-4 py-2 rounded-lg text-white ${
                  item.is_active
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {item.is_active ? "آرشیو" : "فعال‌سازی"}
              </button>

            </div>

          ))}

        </div>

      </div>
    </main>
  );
}