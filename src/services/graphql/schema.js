const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query {
        getProducts(filters: ProductQueryFilters): [Product]
    }

    type Mutation {
        addProducts(input: ProductInput): [Product]
        addProfiles(input: ProfileInput): Profile
    }

    type Product {
        _id: ID
        code: String
        name: String
        description: String
        category: String
        image: String
        price: Float
        stock: Int
    }

    type Profile {
        _id: ID
        name: String
        lastname: String
        birthday: String
        avatar: String
        phone: String
        email: String
        address: String
        password: String
        role: String
        tyc: Boolean
    }
    
    input ProductQueryFilters {
        code: String
        category: String
        price: FilterRange
        stock: FilterRange
    }

    input FilterRange {
        lte: Float
        gte: Float
    }

    input ProductInput {
        code: String!
        name: String!
        description: String
        category: String
        image: String
        price: Float
        stock: Int
    }

    input ProfileInput {
        name: String!
        lastname: String!
        birthday: String!
        avatar: String
        phone: String
        email: String!
        address: String
        password: String!
        confirm: String!
        role: String!
        tyc: Boolean!
    }
`);

module.exports = schema;
