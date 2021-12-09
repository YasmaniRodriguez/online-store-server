const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query {
        getProducts: [Product]
        getMessages: [Message]
        getCarts: [Cart]
        getOrders: [Cart]
    }

    type Mutation {
        addProducts: Product
        addMessages: Message
        addCartProduct: CartProduct
        addOrders: Cart
    }

    type Author {
        email: String
        name: String
        lastname: String
        birthday: String
        alias: String
        avatar: String
    }

    type Message {
        author: Author
        message: String
    }

    type Buyer {
        name: String
        phone: String
        email: String
        address: String
    }

    type CartProduct {
        row: Int
        product: Product
        quantity: Int
        amount: Float
    }

    type Cart {
        code: String
        status: Int
        buyer: Buyer
        products: [CartProduct]
        totalAmount: Int
        totalQuantity: Float
    }

    type Product {
        code: String
        name: String
        category: String
        description: String
        image: String
        price: Float
        stock: Int
    }    
`);

module.exports = schema;
