const getAllBerita = async () => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/berita`);
	const data = await response.json();
	return data;
};

const getBeritaById = async (id) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/berita/${id}`
	);
	const data = await response.json();
	return data;
};

const createBerita = async (berita) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/berita`, {
		method: "POST",
		body: berita,
	});
	return response.json();
};

const updateBerita = async (id, formData) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/berita/${id}`,
		{
			method: "PUT",
			body: formData,
		}
	);
	return response.json();
};

const deleteBerita = async (id) => {
	await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/berita/${id}`, {
		method: "DELETE",
	});
};

export {
	getAllBerita,
	getBeritaById,
	createBerita,
	updateBerita,
	deleteBerita,
};
