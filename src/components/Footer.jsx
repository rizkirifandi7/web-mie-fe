import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoBrand from "@/assets/logo.svg";

const Footer = () => {
	const sections = [
		{
			title: "Navigasi",
			links: [
				{ href: "/beranda", label: "Beranda" },
				{ href: "#tentang", label: "Tentang Kami" },
				{ href: "/menu", label: "Menu" },
				{ href: "#kontak", label: "Kontak" },
			],
		},
		{
			title: "Ikuti Kami",
			links: [
				{ href: "https://github.com/themesberg/flowbite", label: "Instagram" },
				{ href: "https://discord.gg/4eeurUVvTy", label: "Facebook" },
			],
		},
	];

	return (
		<footer className="bg-blue-500 text-white">
			<div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
				<div className="md:flex md:justify-between">
					<div className="mb-6 md:mb-0">
						<Link href="/beranda" className="flex items-center">
							<Image
								src={LogoBrand}
								className="me-3"
								width="40"
								height="40"
								alt="FlowBite Logo"
							/>
							<span className="self-center text-2xl font-bold font-advent">
								D&apos;emiehan
							</span>
						</Link>
					</div>
					<div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
						{sections.map((section) => (
							<div key={section.title}>
								<h2 className="mb-6 text-lg font-semibold">{section.title}</h2>
								<div className="">
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
				<div className="text-center">
					<span className="text-base  sm:text-center dark:text-gray-400">
						© 2023 Demiehan . All Rights Reserved.
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
