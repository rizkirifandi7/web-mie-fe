import React from "react";

const Judul = ({ mainText, subText, mainTextColor, className }) => {
	return (
		<div
			className={`flex flex-col justify-center items-center ${className} font-extrabold uppercase z-10`}
		>
			<span className={`font-extrabold ${mainTextColor} text-outline-black`}>
				{mainText}
			</span>
			<span className="font-extrabold text-outline-white rotate-2">
				{subText}
			</span>
		</div>
	);
};

export default Judul;
