const postData = async (url, data) => {
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: data
	});

	return res.json();
};

const getResource = async (url) => {
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, status: ${res.status}`);
	}

	return res.json();
};

export { postData, getResource };