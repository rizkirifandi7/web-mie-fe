"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useMemo } from "react";

const BackgroundBox = ({ children, className }) => {
	return (
		<div
			className={cn(
				"flex justify-center items-center md:w-full h-[200px] bg-[url('/bg.jpg')] rounded-lg bg-center bg-no-repeat bg-cover bg-gray-700 bg-blend-multiply text-white",
				className
			)}
		>
			{children}
		</div>
	);
};

export default BackgroundBox;
