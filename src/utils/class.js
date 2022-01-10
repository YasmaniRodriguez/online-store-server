class Product {
	constructor(
		code,
		name,
		category,
		description,
		image,
		price,
		stock,
		timestamp
	) {
		this.code = code;
		this.name = name;
		this.category = category;
		this.description = description;
		this.image = image;
		this.price = price;
		this.stock = stock;
		this.timestamp = timestamp;
	}
}

class OrderRow {
	constructor(product, quantity, amount) {
		this.product = product;
		this.quantity = quantity;
		this.amount = this.calcAmount();
	}

	calcAmount() {
		return this.quantity * this.product.price;
	}

	setQuantity(newQuantity) {
		this.quantity = newQuantity;
		this.amount = this.calcAmount();
	}
}

class Order {
	constructor(buyer, products, totalAmount, totalQuantity) {
		this.buyer = buyer;
		this.products = products;
		this.totalAmount = this.calcTotalAmount();
		this.totalQuantity = this.calcTotalQuantity();
		this.status = 0;
	}

	calcTotalAmount() {
		const amount = this.products.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.amount;
		}, 0);
		return amount;
	}

	calcTotalQuantity() {
		const quantity = this.products.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.quantity;
		}, 0);
		return quantity;
	}

	// setProducts(newProducts) {
	// 	this.products = newProducts;
	// 	this.totalQuantity = this.calcTotalQuantity();
	// 	this.totalAmount = this.calcTotalAmount();
	// }

	setStatus(newStatus) {
		this.status = newStatus;
	}
}

module.exports = { Product, Order, OrderRow };
