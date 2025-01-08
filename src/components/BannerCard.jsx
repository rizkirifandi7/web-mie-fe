import React from "react";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const BannerCard = ({
	name,
	description,
	href,
	cta,
	className,
	background,
}) => {
	return (
		<div
			key={name}
			className={cn(
				"group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl border",
				// light styles
				"bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
				// dark styles
				"transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
				className
			)}
		>
			<div className="aspect-square md:aspect-[16/6] object-cover overflow-hidden">
				<Image
					src={background ? background : undefined}
					width={1000}
					height={800}
					className="object-cover w-full h-auto"
          alt={name}
				/>
			</div>
			<div className="pointer-events-none z-50 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10 group-hover:text-white">
				<h3 className="text-2xl font-semibold ">{name}</h3>
				<p className="max-w-lg text-neutral-400">{description}</p>
			</div>

			<div
				className={cn(
					"pointer-events-none absolute z-50 bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:text-white group-hover:translate-y-0 group-hover:opacity-100"
				)}
			>
				<Button
					asChild
					size="sm"
					className="pointer-events-auto hover:text-white"
				>
					<a href={href}>
						{cta}
						<ArrowRightIcon className="ml-2 h-4 w-4" />
					</a>
				</Button>
			</div>
			<div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300  group-hover:bg-black/[.5] group-hover:dark:bg-neutral-800/10" />
		</div>
	);
};

export default BannerCard;
