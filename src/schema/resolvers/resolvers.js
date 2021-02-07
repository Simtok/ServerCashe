let resolvers = {
  Houses: {
    payments: (parent) => {
      return parent.dataValues.Payments
    },
  },
  Citizen: {
    HouseId: async (parent, args, context) => {
      return await parent.getHouse()
    },
  },
  Payment: {
    HouseId: async (parent, args, context) => {
      return await parent.getHouse()
    },
  },

  Query: {
    getCitizen: async (_, { id }, context) => {
      let citizen = await context.sequelize.models.Citizens.findOne({
        where: { id: id },
        include: context.sequelize.models.Payments,
      })
      return citizen
    },
    getAdmin: async (_, { login, password }, context) => {
      let admin = await context.sequelize.models.Admin.findOne({
        where: { login: login, password: password },
      })
      return admin
    },
    getAdminByName: async (_, { login }, context) => {
      let admin = await context.sequelize.models.Admin.findOne({
        where: { name: login },
      })
      return admin
    },
    getPayWithCitizen: async (parent, { id }, context) => {
      let payments = await context.sequelize.models.Payments.findAll({
        where: { id: id },
        include: context.sequelize.models.Citizens,
      })
      return payments
    },
    getCitizenWithPays: async (parent, { id }, context) => {
      let result = await context.sequelize.models.Citizens.findOne({
        where: { id: id },
        include: context.sequelize.models.Payments,
      })
      return result
    },
    getExpense: async (_, { id }, context) => {
      let expense = await context.sequelize.models.Expenses.findOne({
        where: { id: id },
      })
      return expense
    },
    getAllExpense: async (parent, args, context) => {
      let expense = await context.sequelize.models.Expenses.findAll()
      return expense
    },
    getAllCitizen: async (parent, args, context) => {
      let citizen = await context.sequelize.models.Citizens.findAll({
        include: context.sequelize.models.Payments,
      })
      return citizen
    },
    getAllPayments: async (_, __, context) => {
      let payments = await context.sequelize.models.Payments.findAll({
        include: context.sequelize.models.Citizens,
      })
      return payments
    },
    getPayment: async (_, { id }, context) => {
      let payment = await context.sequelize.models.Payments.findByPk(id, {
        include: context.sequelize.models.Citizens,
      })
      return payment
    },
  },

  Mutation: {
    addCitizen: async (_, args, context) => {
      const citizen = await context.sequelize.models.Citizens.create({
        name: args.name,
        address: args.address,
        phone: args.phone,
      })
      return citizen
    },
    editCitizen: async (_, { id, name, address, phone }, context) => {
      const cit = await context.sequelize.models.Citizens.update(
        {
          name: name,
          address: address,
          phone: phone,
        },
        { where: { id: id } },
      ).then(() => {
        return context.sequelize.models.Citizens.findByPk(id)
      })

      return cit
    },
    delCitizen: async (_, { id }, context) => {
      const cit = await context.sequelize.models.Citizens.findByPk(id).then((result) => {
        return context.sequelize.models.Citizens.destroy({ where: { id: id } }).then((u) => {
          return result
        })
      })

      return cit
    },
    addAdmin: async (_, args, context) => {
      const admin = await context.sequelize.models.Admin.create({
        name: args.name,
        login: args.login,
        password: args.password,
      })
      return admin
    },
    addExpense: async (_, args, context) => {
      const expense = await context.sequelize.models.Expenses.create({
        name: args.name,
        dateOfExpenditure: args.dateOfExpenditure,
        summOfExpenditure: args.summOfExpenditure,
      })
      return expense
    },
    delExpense: async (_, { id }, context) => {
      let data = await context.sequelize.models.Expenses.findByPk(id).then((result) => {
        return context.sequelize.models.Expenses.destroy({ where: { id: id } }).then((u) => {
          return result
        })
      })
      return data
    },
    editExpense: async (_, { id, name, dateOfExpenditure, summOfExpenditure }, context) => {
      let data = await context.sequelize.models.Expenses.update(
        {
          name: name,
          dateOfExpenditure: dateOfExpenditure,
          summOfExpenditure: summOfExpenditure,
        },
        { where: { id: id } },
      ).then(() => {
        return context.sequelize.models.Expenses.findByPk(id)
      })
      return data
    },
    addPayment: async (_, { dateOfPayments, summ, citizenId }, context) => {
      const payment = await context.sequelize.models.Payments.create({
        dateOfPayments: dateOfPayments,
        summ: summ,
      }).then((payment) => payment.setCitizen(citizenId))
      return payment
    },
    editPayment: async (_, { id, dateOfPayments, summ, citizenId }, context) => {
      let data = await context.sequelize.models.Payments.update(
        {
          dateOfPayments: dateOfPayments,
          summ: summ,
          citizenId: +citizenId,
        },
        { where: { id: id } },
      )
        .then(() => {
          return context.sequelize.models.Payments.findByPk(id)
        })
        .then(async (payment) => {
          let temp = await payment.setCitizen(citizenId)
          return temp
        })

      return data
    },
    delPayment: async (_, { id }, context) => {
      let data = await context.sequelize.models.Payments.findByPk(id).then((result) => {
        return context.sequelize.models.Payments.destroy({ where: { id: id } }).then((u) => {
          return result
        })
      })
      return data
    },
  },
}

module.exports = resolvers
