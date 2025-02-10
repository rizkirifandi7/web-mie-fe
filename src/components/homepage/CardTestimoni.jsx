import React, { useEffect, useState } from "react";
import Judul from "../Judul";
import Testimoni from "./Testimoni";

const CardTestimoni = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/testimoni`
				);
				const data = await response.json();

				setData(data.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<section className="md:w-full h-full" id="tentang">
			<div className="max-w-screen-sm md:max-w-screen-xl mx-auto py-24">
				<div className="flex flex-col justify-center items-center">
					<Judul mainText="DEMIEHAN" subText="Testimoni" />

					<div className="flex flex-col md:flex-row justify-between items-center mt-10 px-8">
						<Testimoni data={data} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default CardTestimoni;
