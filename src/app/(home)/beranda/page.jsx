import Hero from "@/app/(home)/beranda/components/Hero";
import Kontak from "@/app/(home)/beranda/components/Kontak";
import Menu from "@/app/(home)/beranda/components/Menu";
import Tentang from "@/app/(home)/beranda/components/Tentang";
import Kemitraan from "@/app/(home)/beranda/components/Kemitraan";

export default function Home() {
	return (
		<>
			<Hero />
			<Tentang />
			<Menu />
			<Kemitraan />
			<Kontak />
		</>
	);
}
