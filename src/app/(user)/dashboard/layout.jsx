import React from "react";
import { AppSidebar } from "@/components/SidebarDashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Dashboard | Demiehan",
	description: "Demiehan",
	icons: {
		icon: "/favicon.ico",
	},
};

const LayoutDashboard = ({ children }) => {
	return (
		<div className={inter.className}>
			<SidebarProvider>
				<AppSidebar>{children}</AppSidebar>
			</SidebarProvider>
		</div>
	);
};

export default LayoutDashboard;
