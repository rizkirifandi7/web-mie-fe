import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const links = [
	{ href: "/", label: "Beranda" },
	{ href: "/menu", label: "Menu" },
	{ href: "/#tentang", label: "Tentang", submenu: [
		{ href: "/#sejarah", label: "Sejarah" },
		{ href: "/#visi-misi", label: "Visi & Misi" },
		{ href: "/#tim", label: "Tim" }
	]},
	{ href: "/#kontak", label: "Kontak" },
	{ href: "/kemitraan", label: "Kemitraan" },
	{ href: "/#feedback", label: "Feedback" },
	{ href: "/registrasi", label: "Registrasi" },
];

const Navbar = React.memo(function Navbar() {
	const [activeLink, setActiveLink] = useState("Beranda");
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const handleDropdown = (label) => {
		if (label === "Tentang") {
			setDropdownOpen(!dropdownOpen);
		} else {
			setDropdownOpen(false);
		}
		setActiveLink(label);
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
					<span className="self-center text-2xl font-bold whitespace-nowrap font-advent">
						D`emiehan
					</span>
				</Link>

				<ul className="flex space-x-4">
					{links.map((item) => (
						<li key={item.label} className="relative">
							<Link
								href={item.href}
								className={
									activeLink === item.label
										? `block py-2 px-3 rounded md:p-0 font-bold`
										: `block py-2 px-3 rounded md:p-0 font-normal`
								}
								onClick={() => handleDropdown(item.label)}
							>
								{item.label}
							</Link>
							{item.submenu && dropdownOpen && activeLink === "Tentang" && (
								<ul className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg">
									{item.submenu.map((subItem) => (
										<li key={subItem.label}>
											<Link
												href={subItem.href}
												className="block py-2 px-4 hover:bg-gray-100"
												onClick={() => setActiveLink(subItem.label)}
											>
												{subItem.label}
											</Link>
										</li>
									))}
								</ul>
							)}
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
});

export default Navbar;