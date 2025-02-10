import React from "react";

const Judul = ({ mainText, subText }) => {
	return (
		<div className={`flex flex-col justify-center items-center`}>
			<h1 className={`text-xl font-extrabold font-advent text-blue-500 uppercase`}>
				{mainText}
			</h1>
			<h2 className="text-4xl font-bold ">{subText}</h2>
		</div>
	);
};

export default Judul;
