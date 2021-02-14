const schema = `
type Citizen {
  id: ID!
  name: String!
  birthday: String
  phone: String!
  payments: [Payment]
  houseId: House!
}

type House {
  id: ID!
  homenumber: String!
  street: String!
  sity: String!
  payments: [Payment]
  citizens: [Citizen]
}

type Admin {
  id: ID!
  name: String!
  login: String!
  password: String
}

type Payment {
  id: ID!
  dateOfPayments: String!
  summ: String!
  quarter: String!
  year: Int!
  citizenId: Citizen!
  houseId: House!
}

type Expense {
  id: ID!
  name: String!
  dateOfExpenditure: String! 
  summOfExpenditure: String! 
}


type Query {
  getAllCitizen: [Citizen]
  getAllPayments: [Payment]
  getAllExpense: [Expense]
  getAllAdmin: [Admin]
  getAllHouses: [House]
  getCitizen(id: ID!): Citizen
  getPayment(id: ID!): Payment
  getExpense(id: ID!): Expense
  getHouse(id: ID!): House
  getAdmin(login: String!,password: String!): Admin
  getAdminByName(login: String!): Admin

}


type Mutation {
  addAdmin (  name: String!, login: String!, password: String! ): Admin
  addCitizen (  name: String, birthday: String, phone: String, houseId: ID!): Citizen
  editCitizen (  id: ID!, name: String, birthday: String, phone: String, houseId: ID!): Citizen
  delCitizen (  id: ID!): Citizen
  addExpense (  name: String!, dateOfExpenditure: String!, summOfExpenditure: String!): Expense
  editExpense (  id: ID!, name: String!, dateOfExpenditure: String!, summOfExpenditure: String!): Expense
  delExpense (  id: ID!): Expense
  addPayment (  dateOfPayments: String!, summ: String!, houseId: ID!, citizenId: ID!, quarter: String!, year: Int!): Payment
  editPayment ( id: ID!, dateOfPayments: String!, summ: String!, houseId: ID!, citizenId: ID!, quarter: String!, year: Int!): Payment
  delPayment (  id: ID!): Payment
  addHouse (homenumber: String!, street: String!, sity: String!): House
  editHouse (id: ID!, homenumber: String!, street: String!, sity: String!): House
  delHouse (id: ID!): House
}


  


`

module.exports = schema
