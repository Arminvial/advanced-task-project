'use client';

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <InnerLayout>{children}</InnerLayout>
    </Provider>
  );
}

function InnerLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link
          href="https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir.css"
          rel="stylesheet"
        />
      </head>
      <body className="font-vazir">
        <NextAuthProvider>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </NextAuthProvider>
      </body>
    </html>
  );
}
