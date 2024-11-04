const Login = async ({ email, password }) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	const data = await response.json();
	return data;
};

const Logout = async () => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signout`, {
		method: "POST",
	});
	return response.json();
};

export { Login, Logout };
