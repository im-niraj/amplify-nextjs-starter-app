// import NavbarClient from "@/components/pages/client/navbar";
import Navbar from "@/components/client/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HindiNews9",
  description: "Powered by NexxonTech",
};

export default function AdminLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
}
