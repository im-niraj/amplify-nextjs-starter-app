import NavbarAdmin from "@/components/admin/navbar";
import SidebarAdmin from "@/components/admin/sidebar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <NavbarAdmin />
      <SidebarAdmin />
      <div className="ps-[250px] pt-16">
        <main className="p-2">{children}</main>
      </div>
    </div>
  );
};
export default AdminLayout;
