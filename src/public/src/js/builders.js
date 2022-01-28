function buildHtmlMessages(message, align) {
	return `
    <li class="message-item ${align}">
        <div>
            <div>
                <img 
                    src="src${message.author.avatar}"
                    alt=""
                />
                <p>${message.author.email}</p>
                <p>${message.updatedAt}</p>
            </div>
            <span class="material-icons-outlined">more_vert</span>
        </div>
        <p>${message.message}</p>
    </li>
    `;
}

function buildHtmlProducts(product) {
	return `
    <div class="product-card-container">
        <div class="product-gallery">
            <img src="${product.image}" alt="">
        </div>
        <div class="product-info">
            <p class="product-name">${product.name}</p>
            <p class="product-description">${product.description}</p>
            <p class="product-price">${product.price}</p>
        </div>
        <div class="add-to-cart-btn">
            <p>add to cart</p>
        </div>
    </div>
    `;
}

export { buildHtmlMessages, buildHtmlProducts };
