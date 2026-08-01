"use client";

import SearchForm from "../admin/components/SearchForm";

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            جستجوی سفارش
          </h1>

          <p className="text-center text-gray-500 mb-8">
            شماره فاکتور را وارد کنید و جستجو را انجام دهید.
          </p>

          <SearchForm />

        </div>
      </div>
    </main>
  );
}
