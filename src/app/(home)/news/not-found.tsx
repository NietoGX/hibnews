"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NewsNotFound() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Artículo no encontrado
        </h1>

        <p className="text-gray-600 mb-8">
          Serás redirigido a la página principal en {countdown} segundos.
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
        >
          Volver a la home
        </Link>
      </div>
    </div>
  );
}
