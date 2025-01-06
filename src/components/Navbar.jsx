"use client";

import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

const NavLink = ({ link, activeLink, setActiveLink }) => {
	return (
		<ul className="flex flex-col p-4 md:p-0 mt-4 border md:flex-row md:space-x-6 rtl:space-x-reverse md:mt-0 md:border-0 text-sm">
			{link.map((item, index) => (
				<li key={index}>
					<Link
						href={item.href}
						className={
							activeLink === item.label
								? `block py-2 px-3 rounded md:p-0 font-bold`
								: `py-2 px-3 rounded md:p-1 font-medium hover:bg-slate-50`
						}
						onClick={() => setActiveLink(item.label)}
					>
						{item.label}
					</Link>
				</li>
			))}
		</ul>
	);
};

const links = [
	{ href: "/", label: "Beranda" },
	{ href: "/menu", label: "Menu" },
	{ href: "/tentang", label: "Tentang" },
	{ href: "/#kontak", label: "Kontak" },
	{ href: "/kemitraan", label: "Kemitraan" },
	{ href: "/#feedback", label: "Feedback" },
	{ href: "/registrasi", label: "Registrasi" },
	{ href: "/berita", label: "Berita" },
	{ href: "/galeri", label: "Galeri" },
];

const Navbar = React.memo(function Navbar() {
	const [activeLink, setActiveLink] = useState("Beranda");

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
					<span className="self-center text-2xl font-bold whitespace-nowrap font-advent">
						D`emiehan
					</span>
				</Link>

				<DropdownMenu className="w-full">
					<DropdownMenuTrigger asChild>
						<Button
							size="icon"
							className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center bg-white text-black border"
						>
							<Menu />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="mt-3 w-[430px] border-b shadow-none rounded-none">
						{links.map((item, index) => (
							<DropdownMenuItem key={index}>
								<Link href={item.href} className="text-sm">
									{item.label}
								</Link>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>

				<div className="hidden w-full md:block md:w-auto" id="navbar-default">
					{/* <NavLink
						link={links}
						activeLink={activeLink}
						setActiveLink={setActiveLink}
					/> */}

					<ul className="flex flex-col p-4 md:p-0 mt-4 border md:flex-row md:gap-4 rtl:space-x-reverse md:mt-0 md:border-0 text-sm">
						<li>
							<Link
								href="/"
								className={
									activeLink === "Beranda"
										? `block py-2 px-3 rounded md:p-0 font-bold`
										: `py-2 px-3 rounded md:p-1 font-medium hover:bg-slate-50`
								}
								onClick={() => setActiveLink("Beranda")}
							>
								Beranda
							</Link>
						</li>
						<li>
							<Link
								href="/menu"
								className={
									activeLink === "Menu"
										? `block py-2 px-3 rounded md:p-0 font-bold`
										: `py-2 px-3 rounded md:p-1 font-medium hover:bg-slate-50`
								}
								onClick={() => setActiveLink("Menu")}
							>
								Menu
							</Link>
						</li>
						<li>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<button
										className={
											activeLink === "Informasi"
												? `inline-flex items-center gap-1 py-2 px-3 rounded md:p-0 font-bold`
												: `inline-flex items-center gap-1 py-2 px-3 rounded md:p-0 font-medium hover:bg-slate-50`
										}
										onClick={() => setActiveLink("Informasi")}
									>
										Informasi <ChevronDown size={14} />
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-fit">
									<DropdownMenuGroup>
										<Link
											href="/tentang"
											onClick={() => setActiveLink("Tentang")}
										>
											<DropdownMenuItem
												className={
													activeLink === "Informasi"
														? `font-bold text-sm`
														: `font-medium text-sm`
												}
											>
												Tentang
											</DropdownMenuItem>
										</Link>
										<Link
											href="/berita"
											onClick={() => setActiveLink("Berita")}
										>
											<DropdownMenuItem
												className={
													activeLink === "Informasi"
														? `font-bold text-sm`
														: `font-medium text-sm`
												}
											>
												Berita
											</DropdownMenuItem>
										</Link>
										<Link
											href="/galeri"
											onClick={() => setActiveLink("Galeri")}
										>
											<DropdownMenuItem
												className={
													activeLink === "Informasi"
														? `font-bold text-sm`
														: `font-medium text-sm`
												}
											>
												Galeri
											</DropdownMenuItem>
										</Link>
									</DropdownMenuGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						</li>
						<li>
							<Link
								href="/#kontak"
								className={
									activeLink === "Kontak"
										? `block py-2 px-3 rounded md:p-0 font-bold`
										: `py-2 px-3 rounded md:p-1 font-medium hover:bg-slate-50`
								}
								onClick={() => setActiveLink("Kontak")}
							>
								Kontak
							</Link>
						</li>
						<li>
							<Link
								href="/kemitraan"
								className={
									activeLink === "Kemitraan"
										? `block py-2 px-3 rounded md:p-0 font-bold`
										: `py-2 px-3 rounded md:p-1 font-medium hover:bg-slate-50`
								}
								onClick={() => setActiveLink("Kemitraan")}
							>
								Kemitraan
							</Link>
						</li>
						<li>
							<Link
								href="/#feedback"
								className={
									activeLink === "Feedback"
										? `block py-2 px-3 rounded md:p-0 font-bold`
										: `py-2 px-3 rounded md:p-1 font-medium hover:bg-slate-50`
								}
								onClick={() => setActiveLink("Feedback")}
							>
								Feedback
							</Link>
						</li>
						<li>
							<Link
								href="/registrasi"
								className={
									activeLink === "Registrasi"
										? `block py-2 px-3 rounded md:p-0 font-bold`
										: `py-2 px-3 rounded md:p-1 font-medium hover:bg-slate-50`
								}
								onClick={() => setActiveLink("Registrasi")}
							>
								Registrasi
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
});

export default Navbar;
