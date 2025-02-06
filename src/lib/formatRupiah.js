export const formatRupiah = (number) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(number);
};

export const formatRupiahShort = (price) => {
	if (price == null) {
		return "0";
	}
	if (price >= 1000000) {
		return `${(price / 1000000).toFixed(0)}M`;
	}
	if (price >= 1000) {
		return `${(price / 1000).toFixed(0)}K`;
	}
	return `${price}`;
};
