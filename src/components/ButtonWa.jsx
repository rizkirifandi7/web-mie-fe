import React from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const ButtonWa = () => {
	const partnershipMessage =
		"Halo, saya tertarik untuk bergabung dalam kemitraan.";

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="icon" className="shadow-sm">
					<Image src="/wa.ico" width={32} height={32} alt="wa" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-fit mr-4">
				<div className="flex flex-col gap-4">
					<Button variant="outline" asChild>
						<Link href="https://wa.link/dben6b">Hubungi Kami</Link>
					</Button>
					<Button variant="outline" asChild>
						<Link
							href={`https://wa.me/628987201555?text=${encodeURIComponent(
								partnershipMessage
							)}`}
						>
							Hubungi Untuk Kemitraan
						</Link>
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default ButtonWa;