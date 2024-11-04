"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoBrand from "@/assets/logo.svg";
import { Menu, X } from "lucide-react";

const Navbar = () => {
	const [activeLink, setActiveLink] = useState("beranda");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<nav className="w-full fixed z-50">
			<div className="md:max-w-screen-xl mx-auto py-4 px-6 bg-navbar rounded-sm">
				<div className="flex justify-between items-center md:hidden">
					<Link href="/beranda" className="flex items-center gap-2">
						<Image src={LogoBrand} width="32" height="32" alt="demihan Logo" />
						<span className="text-2xl font-bold">D&apos;emiehan</span>
					</Link>
					<button onClick={toggleMobileMenu} className="text-2xl">
						{isMobileMenuOpen ? <X /> : <Menu />}
					</button>
				</div>
				<div
					className={`${
						isMobileMenuOpen ? "flex mt-8 flex-col gap-4" : "hidden"
					} md:flex justify-between items-center md:gap-16 font-semibold tracking-widest uppercase`}
					id="navbar-default"
				>
					<Link
						href="/beranda"
						onClick={() => setActiveLink("beranda")}
						className={`${
							activeLink === "beranda"
								? "border-b-2 border-black font-bold"
								: ""
						}`}
					>
						Beranda
					</Link>
					<Link
						href="/menu"
						onClick={() => setActiveLink("menu")}
						className={`${
							activeLink === "menu" ? "border-b-2 border-black font-bold" : ""
						}`}
					>
						Menu
					</Link>
					<Link href="/" className="hidden md:flex items-center gap-2">
						<Image src={LogoBrand} width="32" height="32" alt="demihan Logo" />
						<span className="text-2xl font-extrabold">D&apos;emiehan</span>
					</Link>
					<Link
						href="/beranda/#tentang"
						onClick={() => setActiveLink("tentang")}
						className={`${
							activeLink === "tentang"
								? "border-b-2 border-black font-bold"
								: ""
						}`}
					>
						Tentang
					</Link>
					<Link
						href="/beranda/#kontak"
						onClick={() => setActiveLink("kontak")}
						className={`${
							activeLink === "kontak" ? "border-b-2 border-black font-bold" : ""
						}`}
					>
						Kontak
					</Link>
				</div>
			</div>
		</nav>
	);
	2;
};

export default Navbar;
