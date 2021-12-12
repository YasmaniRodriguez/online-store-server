const baseUrl = "http://localhost:8080";
const request = require("supertest")(baseUrl);
const expect = require("chai").expect;
const { buildProduct } = require("../utils/function");

const API_PRODUCTS = "/products";
const validators = [];

const setValidator = (key, value) => {
	return validators.push({ key, value });
};

const getValidator = (key) => {
	const val = validators.filter((obj) => obj.key === key);
	return val[0].value;
};

console.log("all is ready to run tests of the suite products");

describe("[unit tests for products endpoint]", () => {
	describe("POST", () => {
		it("should return state 201 and the created product", async () => {
			let product = await buildProduct();
			setValidator("code", product.code);
			let response = await request.post(API_PRODUCTS).send(product);
			expect(response.status).to.eql(201);
			const data = response.body;
			expect(data.length).to.eql(1);
			expect(data[0].code).to.eql(product.code);
		});
	});

	describe("GET", () => {
		it("should return status 200 and the requested product", async () => {
			let product = await getValidator("code");
			let response = await request.get(`${API_PRODUCTS}?code=${product}`);
			expect(response.status).to.eql(200);
			const data = response.body;
			expect(data.length).to.eql(1);
			expect(data[0].code).to.eql(product);
		});
	});

	describe("PUT", () => {
		it("should return status 200 and the requested product with updated fields", async () => {
			let fields = { stock: 5000 };
			let product = await getValidator("code");
			let response = await request
				.put(`${API_PRODUCTS}/${product}`)
				.send(fields);
			expect(response.status).to.eql(200);
			const data = response.body;
			expect(data.length).to.eql(1);
			expect(data[0].code).to.eql(product);
			expect(data[0].stock).to.eql(5000); //hacer refactor para meter en un for los elementos de fields
		});
	});

	describe("DELETE", () => {
		it("should return status 200 and the deleted product", async () => {
			let product = await getValidator("code");
			let response = await request.delete(`${API_PRODUCTS}/${product}`);
			expect(response.status).to.eql(200);
			const data = response.body;
			expect(data.status).to.eql("ok");
		});
	});
});
