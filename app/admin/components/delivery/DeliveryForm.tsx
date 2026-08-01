"use client";

import { useRef, useState } from "react";
import { supabase } from "../../../supabase";

export default function DeliveryForm() {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [message, setMessage] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const deliverButtonRef = useRef<HTMLButtonElement>(null);

  const toPersianDate = (date: string) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const searchOrder = async () => {
    setMessage("");

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("invoice_number", invoiceNumber)
      .single();

    if (error || !data) {
      setOrder(null);
      setMessage("❌ فاکتور پیدا نشد.");
      return;
    }

    setOrder(data);

    if (data.delivered_date) {
      setMessage(
        `⚠️ این سفارش در تاریخ ${toPersianDate(
          data.delivered_date
        )} تحویل شده است.`
      );
      return;
    }

    setTimeout(() => {
      deliverButtonRef.current?.focus();
    }, 100);
  };

  const deliverOrder = async () => {
    if (!order) return;

    const today = new Date().toISOString().split("T")[0];

    const { error } = await supabase
      .from("orders")
      .update({
        delivered_date: today,
      })
      .eq("id", order.id);

    if (error) {
      setMessage("❌ خطا در ثبت تحویل.");
      return;
    }

    setMessage("✅ تحویل با موفقیت ثبت شد.");

    setOrder(null);
    setInvoiceNumber("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">
        ثبت تحویل
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          ref={inputRef}
          type="text"
          placeholder="شماره فاکتور"
          value={invoiceNumber}
          onChange={(e) => setInvoiceNumber(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              searchOrder();
            }
          }}
          className="border rounded-lg p-3"
        />

        <button
          onClick={searchOrder}
          className="bg-blue-600 text-white rounded-lg p-3"
        >
          جستجو
        </button>
      </div>

      {message && (
        <div className="mt-4 font-bold">
          {message}
        </div>
      )}

      {order && (
        <div className="mt-6 border rounded-lg p-4 bg-gray-50">
          <p>
            <strong>شماره فاکتور:</strong> {order.invoice_number}
          </p>

          <p>
            <strong>مدل:</strong> {order.model}
          </p>

          <p>
            <strong>مشتری:</strong> {order.customer_name || "ثبت نشده"}
          </p>

          <p>
            <strong>تاریخ دوخت:</strong>{" "}
            {toPersianDate(order.embroidery_date)}
          </p>

          {!order.delivered_date && (
            <button
              ref={deliverButtonRef}
              onClick={deliverOrder}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  deliverOrder();
                }
              }}
              className="mt-4 w-full bg-green-600 text-white rounded-lg p-3 focus:ring-4 focus:ring-green-300"
            >
              تحویل شود
            </button>
          )}
        </div>
      )}
    </div>
  );
}