const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query {
        getProfiles(filters: ProfileQueryFilters): [Profile]
        getMessages(filters: MessageQueryFilters): [Message]
        getProducts(filters: ProductQueryFilters): [Product]
        getOrders(filters: OrderQueryFilters): [Order]
    }

    type Mutation {
        addProducts(product: ProductRequiredFields): Product
        updateProducts(product: String, fields: ProductEditableFields): [Product]
        deleteProducts(product: String): Product

        addProfiles(profile: ProfileRequiredFields): [Profile]
        updateProfiles(profile: String, fields: ProfileEditableFields): [Profile]
        deleteProfiless(profile: String): Profile

        addMessages(message: MessageRequiredFields): Message
        updateMessages(message: String, fields: MessageEditableFields): [Message]
        deleteMessages(message: String): [Message]

        addOrders(order: OrderRequiredFields): Order
        updateOrders(order: String, fields: OrderEditableFields): [Order]
        deleteOrders(order: String): [Order]
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

    type Author {
        name: String
        lastname: String
        avatar: String
        email: String
    }

    type Buyer {
        name: String
        lastname: String
        email: String
        phone: String
        address: String
    }

    type Message {
        _id: ID
        author: Author
        message: String
    }

    type Order {
        _id: ID
        status: Int
        buyer: Buyer
        products: [OrderRow]
        totalAmount: Float
        totalQuantity: Float
        createdAt: String
        updatedAt: String
    }

    type OrderRow {
        row: Int
        product: Product
        quantity: Float
        amount: Float
    }

    input ProfileRequiredFields {
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

    input ProfileQueryFilters {
        _id: String
        email: String
        phone: String
    }

    input ProfileEditableFields {
        name: String
        lastname: String
        birthday: String
        avatar: String
        phone: String
        email: String
        address: String
        password: String
        role: String
    }

    input MessageRequiredFields {
        author: AuthorFields
        message: String
    }

    input MessageQueryFilters {
        _id: String
        author: String
    }

    input MessageEditableFields {
        message: String
    }

    input ProductRequiredFields {
        code: String!
        name: String!
        description: String
        category: String
        image: String
        price: Float
        stock: Float
    }

    input ProductQueryFilters {
        code: String
        category: String
        price: FloatFilterRange
        stock: FloatFilterRange
    }

    input ProductEditableFields {
        code: String
        name: String
        description: String
        category: String
        image: String
        price: Float
        stock: Int
    }

    input OrderRequiredFields {
        buyer: BuyerFields
        cart: [OrderRowFields]
    }

    input OrderQueryFilters {
        _id: String
        buyer: String
        status: Int
    }

    input OrderEditableFields {
        status: Int
    }

    input AuthorFields {
        name: String
        lastname: String
        avatar: String
        email: String
    }

    input BuyerFields {
        name: String
        lastname: String
        email: String
        phone: String
        address: String
    }

    input OrderRowFields {
        product: String
        quantity: Float
    }

    input FloatFilterRange {
        lte: Float
        gte: Float
    }

`);

module.exports = schema;
