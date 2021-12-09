const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query {
        getProducts: [Product]
        getProfiles: [Profile]
        getMessages: [Message]
    }

    type Mutation {
        updateProduct: Product
    }

    type Profile {
        name: String
        gender: String
        phone: String
        address: String
        birthday: String
        avatar: String
        email: String
        password: String
        role: String
        tyc: Boolean
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
