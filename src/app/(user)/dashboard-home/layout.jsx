import React from "react";
import { AppSidebar } from "@/components/SidebarDashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Dashboard | Demiehan",
	description: "Demiehan",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/logobrand.png', sizes: '180x180' }
    ],
  },
  manifest: '/manifest.json'
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
