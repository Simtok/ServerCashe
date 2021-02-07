const schema = `
type Query {
  getAllCitizen: [Citizen]
  getAllPayments: [Payment]
  getAllExpense: [Expense]
  getCitizen(id: ID!): Citizen
  getPayment(id: ID!): Payment
  getExpense(id: ID!): Expense
  getAdmin(login: String!,password: String!): Admin
  getAdminByName(login: String!): Admin
  getAllAdminn: [Admin]
  getPayWithCitizen(id: ID!): [Payment]
  getCitizenWithPays(id: ID!): Citizen
}


type Citizen {
  id: ID!
  name: String!
  birthday: String
  phone: String!
  payments: [Payment]
}

type House {
  id: ID!
  homenumber: STRING!
  address: STRING!
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
