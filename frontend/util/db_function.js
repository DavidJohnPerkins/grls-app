async function getData(url) {
	const response = await fetch(url);
	const body = await response.json();
	return body;
};

async function postData(url, reqBody) {
	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(reqBody)
	});

	const body = await response.json();

	return body;
};
module.exports.getData = getData;
module.exports.postData = postData;
