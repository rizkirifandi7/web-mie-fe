"use client";

import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

// Define main navigation links
const mainLinks = [
	{ href: "/", label: "Beranda" },
	{ href: "/menu", label: "Menu" },
	{
		label: "Informasi",
		submenu: [
			{ href: "/tentang", label: "Tentang" },
			{ href: "/berita", label: "Berita" },
			{ href: "/galeri", label: "Galeri" },
			{ href: "/artikel", label: "Artikel" },
		],
	},
	{ href: "/#kontak", label: "Kontak" },
	{ href: "/kemitraan", label: "Kemitraan" },
	{ href: "/#feedback", label: "Feedback" },
	{ href: "/registrasi", label: "Registrasi" },
];

// Helper function to conditionally join class names
const classNames = (...classes) => classes.filter(Boolean).join(" ");

const Navbar = React.memo(function Navbar() {
	const pathname = usePathname();

	// Helper to determine if a link is active
	const isActive = (href) => {
		if (href === "/") return pathname === "/";
		return pathname.startsWith(href);
	};

	return (
		<nav className="fixed w-full bg-white z-50 border-b">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<Link
					href="/"
					className="flex items-center space-x-1 rtl:space-x-reverse"
				>
					<Image
						src="/logobrand.png"
						width={32}
						height={32}
						alt="Dmiehan Logo"
					/>
					<h1 className="self-center text-2xl font-bold whitespace-nowrap font-advent">
						Demiehan
					</h1>
				</Link>

				{/* Mobile Menu Dropdown */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							size="icon"
							className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center bg-white text-black border"
							aria-label="Toggle Menu"
						>
							<Menu />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="mt-3 w-[250px] border-b shadow-none rounded-none">
						{mainLinks.map((item, index) => {
							if (item.submenu) {
								return (
									<DropdownMenu key={index}>
										<DropdownMenuTrigger asChild>
											<span className="w-full px-3 py-2 block text-sm font-medium cursor-pointer">
												{item.label}
											</span>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuGroup>
												{item.submenu.map((subItem, subIndex) => (
													<DropdownMenuItem asChild key={subIndex}>
														<Link href={subItem.href} className="text-sm">
															{subItem.label}
														</Link>
													</DropdownMenuItem>
												))}
											</DropdownMenuGroup>
										</DropdownMenuContent>
									</DropdownMenu>
								);
							}

							return (
								<DropdownMenuItem asChild key={index}>
									<Link href={item.href} className="text-sm">
										{item.label}
									</Link>
								</DropdownMenuItem>
							);
						})}
					</DropdownMenuContent>
				</DropdownMenu>

				{/* Desktop Navigation Links */}
				<div className="hidden w-full md:block md:w-auto" id="navbar-default">
					<ul className="flex flex-col p-4 md:p-0 mt-4 border md:flex-row md:gap-4 rtl:space-x-reverse md:mt-0 md:border-0 text-sm">
						{mainLinks.map((item, index) => {
							if (item.submenu) {
								const isAnySubActive = item.submenu.some((sub) =>
									isActive(sub.href)
								);
								return (
									<li key={index}>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<button
													className={classNames(
														isAnySubActive
															? "font-bold"
															: "font-medium hover:bg-slate-50",
														"inline-flex items-center gap-1 py-2 px-3 rounded md:p-0"
													)}
													aria-haspopup="true"
												>
													{item.label} <ChevronDown size={14} />
												</button>
											</DropdownMenuTrigger>
											<DropdownMenuContent className="w-fit">
												<DropdownMenuGroup>
													{item.submenu.map((subItem, subIndex) => (
														<DropdownMenuItem asChild key={subIndex}>
															<Link
																href={subItem.href}
																className={classNames(
																	isActive(subItem.href)
																		? "font-bold"
																		: "font-medium",
																	"text-sm block px-2 py-1"
																)}
															>
																{subItem.label}
															</Link>
														</DropdownMenuItem>
													))}
												</DropdownMenuGroup>
											</DropdownMenuContent>
										</DropdownMenu>
									</li>
								);
							}

							return (
								<li key={index}>
									<Link
										href={item.href}
										className={classNames(
											isActive(item.href)
												? "font-bold"
												: "font-medium hover:bg-slate-50",
											"block py-2 px-3 rounded md:p-0"
										)}
									>
										{item.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</nav>
	);
});

export default Navbar;
