const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query {
        getProducts(filters: ProductQueryFilters): [Product]
    }

    type Mutation {
        addProducts(input: ProductInput): [Product]
    }

    type Product {
        _id: ID
        code: String
        name: String
        category: String
        description: String
        image: String
        price: Float
        stock: Int
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
        category: String
        description: String
        image: String
        price: Float
        stock: Int
    }
`);

module.exports = schema;
