const schema = `
type Query {
  getCitizen(id: ID!): Citizen
  getAllCitizen: [Citizen]
  getPayWithCitizen(id: ID!): [Payment]
  getCitizenWithPays(id: ID!): Citizen
  getAllPayments: [Payment]
  getPayment(id: ID!): Payment
  getAdmin(login: String!,password: String!): Admin
  getAdminByName(login: String!): Admin
  getAllAdminn: [Admin]
  getExpense(id: ID!): Expense
  getAllExpense: [Expense]
}


type Citizen {
  id: ID!
  name: String!
  address: String!
  phone: String!
  password: String
  payments: [Payment]
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
  citizenId: Citizen
}

type Expense {
  id: ID!
  name: String!
  dateOfExpenditure: String! 
  summOfExpenditure: String! 
}

type Mutation {
  addCitizen (  name: String, address: String, phone: String): Citizen
  editCitizen (  id: ID!, name: String, address: String, phone: String): Citizen
  delCitizen (  id: ID!): Citizen
  addAdmin (  name: String!, login: String!, password: String! ): Admin
  addExpense (  name: String!, dateOfExpenditure: String!, summOfExpenditure: String!): Expense
  editExpense (  id: ID!, name: String!, dateOfExpenditure: String!, summOfExpenditure: String!): Expense
  delExpense (  id: ID!): Expense
  addPayment (  dateOfPayments: String!, summ: String!, citizenId: ID!): Payment
  editPayment ( id: ID!, dateOfPayments: String!, summ: String!, citizenId: ID!): Payment
  delPayment (  id: ID!): Payment
}

`

module.exports = schema
