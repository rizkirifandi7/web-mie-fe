const getAllMenu = async () => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/menu`);
	return response.json();
};

const getMenuById = async (id) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/menu/${id}`
	);
	const data = await response.json();
	return data;
};

const createMenu = async (menu) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/menu`, {
		method: "POST",
		body: menu,
	});
	return response.json();
};

const updateMenu = async (id, formData) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/menu/${id}`,
		{
			method: "PUT",
			body: formData,
		}
	);
	return response.json();
};

const deleteMenu = async (id) => {
	await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/menu/${id}`, {
		method: "DELETE",
	});
};

export { getAllMenu, getMenuById, createMenu, updateMenu, deleteMenu };
