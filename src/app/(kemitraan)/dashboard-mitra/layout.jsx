import DashboardHeaderOrder from "@/components/dashboard/header-order";
import SidebarDashboard from "@/components/dashboard/sidebar-dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MitraNavData } from "@/constant/sidebarData";
import { CartProvider } from "@/hooks/useCart";
import { CartBahanBakuProvider } from "@/hooks/useCartBahan";
import React from "react";
import { Toaster } from "sonner";

export const metadata = {
	title: "Dashboard Mitra | Demiehan",
	description: "Demiehan",
	icons: {
		icon: "/logobrand.png",
	},
};

const LayoutDashboardMitra = ({ children }) => {
	return (
		<>
			<Toaster position="top-center" />
			<SidebarProvider>
				<SidebarDashboard
					data={MitraNavData}
					judul={"Demiehan Mitra"}
					logo={"/logobrand.png"}
					header={<DashboardHeaderOrder />}
				>
					<div className="p-4">
						<CartProvider>
							<CartBahanBakuProvider>{children}</CartBahanBakuProvider>
						</CartProvider>
					</div>
				</SidebarDashboard>
			</SidebarProvider>
		</>
	);
};

export default LayoutDashboardMitra;
