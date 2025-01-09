import React from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const Testimoni = ({ data }) => {
	return (
		<div className="px-8 mt-10">
			<Carousel
				plugins={[
					Autoplay({
						delay: 2000,
					}),
				]}
				opts={{
					align: "start",
				}}
				className="w-full max-w-screen-sm md:max-w-screen-xl mx-auto"
			>
				<CarouselContent>
					{data.map((item, index) => (
						<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
							<Card className="flex flex-col justify-center items-center aspect-square">
								<CardHeader className="flex flex-col items-center">
									<div className="w-[70px] h-[70px] overflow-hidden">
										<Image
											src={item.foto || "/logobrand.png"}
											width={70}
											height={70}
											alt="foto"
											className="object-cover rounded-full bg-slate-50"
										/>
									</div>
									<CardTitle className="text-base">{item.nama}</CardTitle>
									<CardDescription>
										{item.profesi || "Mitra Demiehan"}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-center">&quot;{item.testimoni}&quot;</p>
								</CardContent>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
};

export default Testimoni;
