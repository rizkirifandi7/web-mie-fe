import React from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "../ui/carousel";

import { Card, CardContent } from "../ui/card";
import Judul from "../Judul";
import Image from "next/image";

const Banner = () => {
	return (
		<section className="md:w-full h-full bg-repeat" id="tentang">
			<div className="max-w-screen-sm md:max-w-screen-xl mx-auto py-24">
				<div className="flex flex-col justify-center items-center">
					<Judul mainText="D'EMIEHAN" subText="Informasi" />
				</div>

				<div className="w-full h-full justify-center items-center mt-10 px-10">
					<Carousel
						opts={{
							align: "start",
						}}
						className="w-full max-w-screen-sm md:max-w-screen-xl mx-auto"
					>
						<CarouselContent>
							{Array.from({ length: 5 }).map((_, index) => (
								<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
									<div className="p-1 w-full h-full">
										<Card>
											<CardContent className="w-full h-full flex aspect-square items-center justify-center p-0 rounded-md overflow-hidden">
												<Image
													src="/bg.jpg"
													width={1000}
													height={1000}
													alt="logo"
													className="object-cover w-full h-full"
												/>
											</CardContent>
										</Card>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</div>
		</section>
	);
};

export default Banner;
