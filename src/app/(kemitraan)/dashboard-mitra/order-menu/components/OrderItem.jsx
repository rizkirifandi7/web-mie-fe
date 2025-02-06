import React from "react";
import ItemMenu from "./ItemMenu";

const OrderItem = ({ totalQuantity, cart }) => {
	return (
		<div className="flex flex-col p-4 border-b">
			<div className="flex items-center mb-2">
				<h1 className="inline-flex items-center font-semibold text-base">
					Total Items ({totalQuantity})
				</h1>
			</div>
			<div className="flex flex-col gap-2">
				{cart.map((data, index) => (
					<ItemMenu key={index} data={data} menu={"cart"} />
				))}
			</div>
		</div>
	);
};

export default OrderItem;
