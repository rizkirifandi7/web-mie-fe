"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useMemo } from "react";

const BackgroundBox = ({ children, className }) => {
	const [data, setData] = useState({});

	const fetchData = async () => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/beranda/1`
		);
		const result = await response.json();
		setData(result.data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const backgroundImageStyle = useMemo(
		() => ({
			backgroundImage: `url(${data.background ? data.background : "bg.jpg"})`,
		}),
		[data.background]
	);

	return (
		<div
			className={cn(
				"flex justify-center items-center md:w-full h-[200px] rounded-lg bg-center bg-no-repeat bg-cover bg-gray-700 bg-blend-multiply text-white",
				className
			)}
			style={backgroundImageStyle}
		>
			{children}
		</div>
	);
};

export default BackgroundBox;
