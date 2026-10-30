import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gráfica Online | Web-to-Print",
  description: "Configurador dinâmico e modular de impressos gráficos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-[#f8fafc] text-slate-800">
        {children}
      </body>
    </html>
  );
}
