"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {

    if (username === "Nima" && password === "38401680") {
      localStorage.setItem("role", "admin");
      router.push("/admin");
      return;
    }

    if (username === "nadim" && password === "987654321") {
      localStorage.setItem("role", "staff");
      router.push("/search");
      return;
    }

    alert("نام کاربری یا رمز عبور اشتباه است.");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">

        <h1 className="text-3xl font-bold text-center mb-8">
          سامانه رهگیری هانا
        </h1>

        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-3 mb-6"
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white rounded-lg p-3"
        >
          ورود
        </button>

      </div>
    </main>
  );
}