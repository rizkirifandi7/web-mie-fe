import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoBrand from "@/assets/logo.svg";

const Footer = () => {
	const sections = [
		{
			title: "NAVIGASI",
			links: [
				{ href: "/beranda", label: "Beranda" },
				{ href: "#tentang", label: "Tentang Kami" },
				{ href: "/menu", label: "Menu" },
				{ href: "#kontak", label: "Kontak" },
			],
		},
		{
			title: "Ikuti Kita",
			links: [
				{ href: "https://github.com/themesberg/flowbite", label: "Instagram" },
				{ href: "https://discord.gg/4eeurUVvTy", label: "Facebook" },
			],
		},
	];

	return (
		<footer className="bg-[#A30000] dark:bg-gray-900">
			<div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
				<div className="md:flex md:justify-between uppercase">
					<div className="mb-6 md:mb-0">
						<Link href="/beranda" className="flex items-center">
							<Image
								src={LogoBrand}
								className="me-3"
								width="40"
								height="40"
								alt="FlowBite Logo"
							/>
							<span className="self-center text-3xl font-bold whitespace-nowrap text-white uppercase">
								D&apos;emiehan
							</span>
						</Link>
					</div>
					<div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
						{sections.map((section) => (
							<div key={section.title}>
								<h2 className="mb-6 text-lg font-semibold text-white uppercase">
									{section.title}
								</h2>
								<div className="text-white">
									{section.links.map((link) => (
										<div key={link.href} className="mb-4">
											<a href={link.href} className="hover:underline">
												{link.label}
											</a>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
				<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
				<div className="text-center uppercase">
					<span className="text-base text-white sm:text-center dark:text-gray-400">
						© 2023 Demiehan . All Rights Reserved.
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
