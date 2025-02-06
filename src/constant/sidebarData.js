import { LucideSquareMenu } from "lucide-react";
import { FaRegUser } from "react-icons/fa";
import { FiHome, FiShoppingBag } from "react-icons/fi";
const { BiFoodMenu } = require("react-icons/bi");
const { LuChefHat } = require("react-icons/lu");
const {
	MdOutlineSpaceDashboard,
	MdOutlineNoteAlt,
	MdOutlineFastfood,
} = require("react-icons/md");

export const MitraNavData = {
	navMain: [
		{
			title: "Kelola Dashboard",
			url: "#",
			items: [
				{
					title: "Dashboard",
					url: "/dashboard-mitra/home",
					icon: <FiHome />,
				},
			],
		},
		{
			title: "Kelola Menu",
			url: "#",
			items: [
				{
					title: "Kelola Menu",
					url: "/dashboard-mitra/menu",
					icon: <BiFoodMenu />,
				},
				{
					title: "Kategori Menu",
					url: "/dashboard-mitra/kategori-menu",
					icon: <LucideSquareMenu />,
				},
				{
					title: "Beli Bahan Baku",
					url: "/dashboard-mitra/order-bahan",
					icon: <FiShoppingBag />,
				},
			],
		},
		{
			title: "Kelola Pesanan",
			url: "#",
			items: [
				{
					title: "Order Menu",
					url: "/dashboard-mitra/order-menu",
					icon: <MdOutlineFastfood />,
				},
				{
					title: "List Pesanan",
					url: "/dashboard-mitra/pesanan",
					icon: <MdOutlineNoteAlt />,
				},
				{
					title: "Manajemen Pesanan",
					url: "/dashboard-mitra/kitchen-list",
					icon: <LuChefHat />,
				},
			],
		},
	],
};

export const SuperAdminNavData = {
	navMain: [
		{
			title: "Kelola Bahan Baku",
			url: "#",
			items: [
				{
					title: "Bahan Baku",
					url: "/dashboard-superadmin/bahan-baku",
					icon: <MdOutlineSpaceDashboard />,
				},
				{
					title: "Pesanan Bahan Baku",
					url: "/dashboard-superadmin/pesanan-bahan",
					icon: <BiFoodMenu />,
				},
			],
		},
		{
			title: "Kelola Mitra",
			url: "#",
			items: [
				{
					title: "Laporan Penjualan",
					url: "/dashboard-superadmin/laporan-penjualan",
					icon: <BiFoodMenu />,
				},
				{
					title: "Akun Mitra",
					url: "/dashboard-superadmin/akun-mitra",
					icon: <FaRegUser />,
				},
			],
		},
		{
			title: "Kelola Profile",
			url: "#",
			items: [
				{
					title: "Profile",
					url: "/dashboard-superadmin/profile",
					icon: <FaRegUser />,
				},
			],
		},
	],
};
