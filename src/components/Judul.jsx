import React from "react";

const Judul = ({ mainText, subText }) => {
	return (
		<div className={`flex flex-col justify-center items-center`}>
			<span className={`text-xl font-extrabold font-advent text-blue-500`}>
				{mainText}
			</span>
			<span className="text-4xl font-bold ">{subText}</span>
		</div>
	);
};

export default Judul;
