"use client";
import * as React from "react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Separator } from "./ui/separator";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
	AppWindow,
	BriefcaseBusiness,
	FileText,
	Handshake,
	House,
	Images,
	LogOut,
	MapPinned,
	MessageSquareTextIcon,
	Newspaper,
	NotepadText,
	SquareMenu,
	Store,
	User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { removeCookie } from "@/actions/cookies";
import Link from "next/link";

const data = {
	navMain: [
		{
			title: "Dashboard Menu",
			url: "#",
			items: [
				{
					title: "Menu",
					url: "/dashboard/menu",
					icon: <SquareMenu size={20} />,
				},
				{
					title: "Kemitraan",
					url: "/dashboard/kemitraan",
					icon: <Handshake size={20} />,
				},
				{
					title: "Cabang",
					url: "/dashboard/cabang",
					icon: <MapPinned size={20} />,
				},
				{
					title: "Paket Kemitraan",
					url: "/dashboard/paket-kemitraan",
					icon: <BriefcaseBusiness size={20} />,
				},
			],
		},
		{
			title: "Dashboard Informasi",
			url: "#",
			items: [
				{
					title: "Beranda",
					url: "/dashboard/beranda",
					icon: <Store size={20} />,
				},
				{
					title: "Berita & Artikel",
					url: "/dashboard/berita-artikel",
					icon: <Newspaper size={20} />,
				},
				{
					title: "Galeri",
					url: "/dashboard/galeri",
					icon: <Images size={20} />,
				},
				{
					title: "Banner",
					url: "/dashboard/banner",
					icon: <Images size={20} />,
				},
				{
					title: "Feedback",
					url: "/dashboard/feedback",
					icon: <MessageSquareTextIcon size={20} />,
				},
				{
					title: "Media Sosial",
					url: "/dashboard/media-sosial",
					icon: <AppWindow size={20} />,
				},
				{
					title: "Sertifikat",
					url: "/dashboard/sertifikat",
					icon: <FileText size={20} />,
				},
				{
					title: "Testimoni",
					url: "/dashboard/testimoni",
					icon: <FileText size={20} />,
				},
			],
		},
		{
			title: "Dashboard User",
			url: "#",
			items: [
				{
					title: "User",
					url: "/dashboard/user",
					icon: <User size={20} />,
				},
			],
		},
	],
};

export function AppSidebar({ children }) {
	const router = useRouter();
	const [activePage, setActivePage] = React.useState("Menu");

	const handleSidebarItemClick = (title) => {
		setActivePage(title);
	};

	const handleLogout = () => {
		removeCookie("auth_token");
		router.push("/auth/signin");
	};

	return (
		<>
			<Sidebar>
				<SidebarMenu className="p-2">
					<SidebarMenuItem>
						<SidebarMenuButton size="lg">
							<Image
								src={"/logobrand.png"}
								width={40}
								height={40}
								alt="logo"
								className="w-auto h-auto"
							/>
							<div className="flex flex-col gap-0.5">
								<span className="font-bold text-base">Dmiehan</span>
								<span className="text-sm text-gray-500">Sistem Informasi</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
				<SidebarContent className="p-2">
					{data.navMain.map((item) => (
						<SidebarGroup key={item.title}>
							<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu className="flex flex-col gap-3">
									{item.items.map((subItem) => (
										<SidebarMenuItem key={subItem.title}>
											<SidebarMenuButton
												asChild
												isActive={activePage === subItem.title}
											>
												<Link
													href={subItem.url}
													onClick={() => handleSidebarItemClick(subItem.title)}
												>
													<p className="text-base">{subItem.icon}</p>
													<p className="text-base">{subItem.title}</p>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					))}
				</SidebarContent>
				<SidebarRail />
			</Sidebar>
			<SidebarInset>
				<header className="flex justify-between shrink-0 items-center border-b px-4">
					<div className="flex items-center h-16 gap-2">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<div className="">
							<Breadcrumb>
								<BreadcrumbList>
									<BreadcrumbItem>
										<BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator />
									<BreadcrumbItem>
										<BreadcrumbPage>{activePage}</BreadcrumbPage>
									</BreadcrumbItem>
								</BreadcrumbList>
							</Breadcrumb>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<DropdownMenu>
							<DropdownMenuTrigger>
								<p className="inline-flex items-center gap-2 px-3 py-1 border rounded-md text-base font-medium capitalize">
									{/* <FaRegUser /> */}
									Admin
								</p>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-auto me-5">
								<DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={handleLogout}
									className="flex items-center gap-2"
								>
									<LogOut size={16} />
									<span>Keluar</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>
				<div className="p-4">{children}</div>
			</SidebarInset>
		</>
	);
}
