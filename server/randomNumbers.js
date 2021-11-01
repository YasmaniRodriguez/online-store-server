const getRandoms = (qty) => {
	const obj = {};
	for (let i = 0; i <= qty; i++) {
		console.log(i);
		prop = Math.floor(Math.random() * (999999 - 111111) + 111111);
		obj[prop] = i;
	}
	return obj;
};

process.on("message", (qty) => {
	const ob = getRandoms(qty);
	process.send(JSON.stringify(ob));
});
