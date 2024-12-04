// typedef -> Schema
// graphql me jo b # ke sath likhte hai vo comment hota hia 
export const typeDefs = `#graphql
    type User {
        id: ID!
        firstName :String!
        lastName: String
        email: String!
        profileImageURL: String    
    }
`; 