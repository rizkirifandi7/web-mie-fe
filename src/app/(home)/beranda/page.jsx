import Hero from "@/app/(home)/beranda/components/Hero";
import Kontak from "@/app/(home)/beranda/components/Kontak";
import Menu from "@/app/(home)/beranda/components/Menu";
import Tentang from "@/app/(home)/beranda/components/Tentang";

export default function Home() {
	return (
		<div>
			<Hero />
			<Tentang />
			<Menu />
			<Kontak />
		</div>
	);
}
