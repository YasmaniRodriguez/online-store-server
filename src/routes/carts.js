const express = require("express");
const router = express.Router();
const moment = require("moment");
const service = require("../services/messaging.js").Whatsapp;
const conf = require("../config.js");
const classes = require("../classes.js");

var cart = [];

//get all products
router.get("/carts", (req, res) => {
	const filters = req.query;
	const myPromise = new Promise((resolve, reject) => {
		if (Object.keys(filters).length === 0) {
			resolve(cart);
		} else {
			resolve(cart.find((row) => row.product.code == filters.product));
		}
	});
	myPromise
		.then((result) => {
			if (!result) {
				res.json({ error: "product is not in the cart" });
			} else {
				result.length === 0
					? res.json({ error: "cart is empty" })
					: res.json({ cart: result });
			}
		})
		.catch((error) => res.json(error));
});

//add product
router.post("/carts", (req, res) => {
	const dataHandler = req.app.get("dataHandler");
	const { product, quantity } = req.body;
	const myPromise = new Promise((resolve, reject) => {
		resolve(dataHandler.getProducts({ code: product }));
	});
	myPromise
		.then((result) => {
			cart.push(
				new classes.OrderRow(
					cart.length + 1,
					result[0],
					quantity,
					"null",
					moment().format()
				)
			);
			res.json({ message: "product was added to cart" });
		})
		.catch((error) => res.json(error));
});

//update product by id
router.put("/carts/:id", (req, res) => {
	const myPromise = new Promise((resolve, reject) => {
		resolve(cart.find((row) => row.product.code == req.params.id));
	});
	myPromise
		.then((result) => {
			if (result === undefined) {
				res.json({ error: "product is not in the cart" });
			} else {
				const { quantity } = req.body;
				result.setQuantity(quantity);
				res.json({ message: "product quantity was updated" });
			}
		})
		.catch((error) => res.json(error));
});

//delete product
router.delete("/carts/:id", (req, res) => {
	const myPromise = new Promise((resolve, reject) => {
		resolve(cart.find((row) => row.product.code == req.params.id));
	});
	myPromise
		.then((result) => {
			if (result === undefined) {
				res.json({ error: "product is not in the cart" });
			} else {
				let i = cart.indexOf(result);
				if (i !== -1) {
					cart.splice(i, 1);
				}
				res.json({ message: "product was removed" });
			}
		})
		.catch((error) => res.json(error));
});

module.exports = router;
