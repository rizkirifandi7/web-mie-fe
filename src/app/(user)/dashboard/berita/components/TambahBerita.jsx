import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const TambahBerita = () => {
	return (
		<>
			<Link href="/dashboard/berita/tambah-berita">
				<Button>
					<PlusCircle />
					Tambah Berita
				</Button>
			</Link>
		</>
	);
};

export default TambahBerita;
