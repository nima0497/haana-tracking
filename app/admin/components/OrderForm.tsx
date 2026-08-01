"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/app/supabase";

type Model = {
  id: number;
  name: string;
};

export default function OrderForm() {
  const [models, setModels] = useState<Model[]>([]);

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [embroideryDate, setEmbroideryDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [loading, setLoading] = useState(false);

  const invoiceInputRef = useRef<HTMLInputElement>(null);
  const customerInputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    loadModels();
  }, []);

  async function loadModels() {
    const { data, error } = await supabase
      .from("models")
      .select("id,name")
      .eq("is_active", true)
      .order("name");

    if (!error && data) {
      setModels(data);
    }
  }

  function toPersianDate(date: string) {
    return new Date(date).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!invoiceNumber || !selectedModel || !embroideryDate) {
      alert("تمام فیلدها را کامل کنید.");
      return;
    }

    setLoading(true);

    // بررسی تکراری بودن فاکتور
    const { data: existingOrder } = await supabase
      .from("orders")
      .select("embroidery_date")
      .eq("invoice_number", invoiceNumber)
      .maybeSingle();

    if (existingOrder) {
      setLoading(false);

      alert(
        `⚠️ این سفارش در تاریخ ${toPersianDate(
          existingOrder.embroidery_date
        )} دوخته شده است.`
      );

      return;
    }

    const { error } = await supabase
      .from("orders")
      .insert([
        {
          invoice_number: invoiceNumber,
          customer_name: customerName,
          model: selectedModel,
          embroidery_date: embroideryDate,
        },
      ]);

    setLoading(false);

    if (error) {
      alert("خطا در ثبت سفارش");
      console.error(error);
      return;
    }

    alert("سفارش با موفقیت ثبت شد.");

    setInvoiceNumber("");
    setCustomerName("");

    setTimeout(() => {
      invoiceInputRef.current?.focus();
    }, 100);
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-xl font-bold mb-6">
        ثبت دوخت
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="block mb-2 font-medium">
            شماره فاکتور
          </label>

          <input
            ref={invoiceInputRef}
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                customerInputRef.current?.focus();
              }
            }}
            className="w-full border rounded-lg p-3"
            placeholder="مثلاً 12035"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            نام مشتری
          </label>

          <input
            ref={customerInputRef}
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submitButtonRef.current?.focus();
              }
            }}
            className="w-full border rounded-lg p-3"
            placeholder="نام مشتری"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            مدل
          </label>

          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="">
              انتخاب مدل
            </option>

            {models.map((model) => (
              <option
                key={model.id}
                value={model.name}
              >
                {model.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            تاریخ گلدوزی
          </label>

          <input
            type="date"
            value={embroideryDate}
            onChange={(e) => setEmbroideryDate(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="md:col-span-2">
          <button
            ref={submitButtonRef}
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 disabled:opacity-50"
          >
            {loading ? "در حال ثبت..." : "ثبت دوخت"}
          </button>
        </div>
      </form>
    </div>
  );
}