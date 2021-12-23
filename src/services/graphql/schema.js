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

        addMessages(message: MessageRequiredFields): [Message]
        updateMessages(message: String, fields: MessageEditableFields): [Message]
        deleteMessages(message: String): Message

        addOrders(order: OrderRequiredFields): [Order]
        updateOrders(order: String, fields: OrderEditableFields): [Order]
        deleteOrders(order: String): Order
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

    type Message {
        _id: ID
        author: Author
        message: String
    }

    type Order {
        _id: ID
        products: [Cart]
        createdAt: String
        updatedAt: String
    }

    type Cart {
        code: ID
        status: Int
        buyer: Profile
        products: [CartRow]
        totalAmount: Float
        totalQuantity: Float
    }

    type CartRow {
        row: Int
        product: Product
        quantity: Float
        amount: Float
    }

    input ProductQueryFilters {
        code: String
        category: String
        price: FloatFilterRange
        stock: FloatFilterRange
    }

    input ProfileQueryFilters {
        _id: String
        email: String
        phone: String
    }

    input MessageQueryFilters {
        _id: String
        author: String
    }

    input OrderQueryFilters {
        code: String
        buyer: String
        status: Int
    }

    input FloatFilterRange {
        lte: Float
        gte: Float
    }

    input ProductRequiredFields {
        code: String!
        name: String!
        description: String
        category: String
        image: String
        price: Float
        stock: Int
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

    input MessageEditableFields {
        message: String
    }

    input MessageRequiredFields {
        author: AuthorFields
        message: String
    }

    input OrderEditableFields {
        status: Int
    }

    input OrderRequiredFields {
        code: ID
        status: Int
        buyer: BuyerFields
        products: [CartRowFields]
        totalAmount: Float
        totalQuantity: Float
    }

    input AuthorFields {
        name: String
        lastname: String
        avatar: String
        email: String
    }

    input CartRowFields {
        product: ProductRequiredFields
        quantity: Float
        amount: Float
    }

    input BuyerFields {
        name: String
        phone: String
        email: String
        address: String
    }

`);

module.exports = schema;
