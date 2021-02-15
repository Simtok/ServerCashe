let resolvers = {
  House: {
    payments: async (parent) => {
      return await parent.dataValues.Payments
    },
    citizens: async (parent) => {
      return await parent.dataValues.Citizens
    },
  },
  Citizen: {
    houseId: async (parent) => {
      return await parent.getHouse()
    },
    payments: async (parent) => {
      return await parent.dataValues.Payments
    },
  },
  Payment: {
    houseId: async (parent) => {
      return await parent.getHouse()
    },
    citizenId: async (parent) => {
      return await parent.getCitizen()
    },
  },

  Query: {
    getHouse: async (_, { id }, context) => {
      let resp = await context.sequelize.models.Houses.findOne({
        where: { id: id },
        // include: [context.sequelize.models.Payments, context.sequelize.models.Citizens],
      })
      return resp
    },
    getCitizen: async (_, { id }, context) => {
      let citizen = await context.sequelize.models.Citizens.findOne({
        where: { id: id },
        // include: [context.sequelize.models.Payments, context.sequelize.models.Houses],
      })
      return citizen
    },
    getExpense: async (_, { id }, context) => {
      let expense = await context.sequelize.models.Expenses.findOne({
        where: { id: id },
      })
      return expense
    },
    getPayment: async (_, { id }, context) => {
      let payment = await context.sequelize.models.Payments.findByPk(id, {
        include: context.sequelize.models.Citizens,
      })

      return payment
    },
    getAdmin: async (_, { login, password }, context) => {
      let admin = await context.sequelize.models.Admins.findOne({
        where: { login: login, password: password },
      })
      return admin
    },
    getAdminByName: async (_, { login }, context) => {
      let admin = await context.sequelize.models.Admins.findOne({
        where: { name: login },
      })
      return admin
    },
    getAllPayments: async (_, __, context) => {
      let payments = await context.sequelize.models.Payments.findAll()
      return payments
      // include: [context.sequelize.models.Citizens, context.sequelize.models.Houses],
    },
    getAllExpense: async (_, __, context) => {
      let expense = await context.sequelize.models.Expenses.findAll()
      return expense
    },
    getAllCitizen: async (_, __, context) => {
      let citizen = await context.sequelize.models.Citizens.findAll({
        // include: [context.sequelize.models.Payments, context.sequelize.models.Houses],
      })
      return citizen
    },
    getAllHouses: async (_, __, context) => {
      let houses = await context.sequelize.models.Houses.findAll({})
      return houses
    },
  },

  // ******************************** Mutations  *******************************

  Mutation: {
    addHouse: async (_, args, context) => {
      const resp = await context.sequelize.models.Houses.create({
        homenumber: args.homenumber,
        street: args.street,
        sity: args.sity,
      })
      return resp
    },
    editHouse: async (_, args, context) => {
      const resp = await context.sequelize.models.Houses.update(
        {
          homenumber: args.homenumber,
          street: args.street,
          sity: args.sity,
        },
        { where: { id: id } },
      ).then(() => {
        return context.sequelize.models.Houses.findByPk(id)
      })
      return resp
    },
    delHouse: async (_, { id }, context) => {
      const resp = await context.sequelize.models.Houses.findByPk(id).then((result) => {
        return context.sequelize.models.Houses.destroy({ where: { id: id } }).then((u) => {
          return result
        })
      })
      return resp
    },
    addCitizen: async (_, args, context) => {
      const resp = await context.sequelize.models.Citizens.create({
        name: args.name,
        houseId: args.houseId,
        phone: args.phone,
        birthday: args.birthday,
      }).then((citizen) => citizen.setHouse(args.houseId))
      return resp
    },
    editCitizen: async (_, { id, name, houseId, phone, birthday }, context) => {
      const cit = await context.sequelize.models.Citizens.update(
        {
          name: name,
          birthday: birthday,
          phone: phone,
          houseId: houseId,
        },
        { where: { id: id } },
      )
        .then(() => {
          return context.sequelize.models.Citizens.findByPk(id)
        })
        .then((citizen) => citizen.setHouse(houseId))
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
      const admin = await context.sequelize.models.Admins.create({
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
    addPayment: async (_, { dateOfPayments, summ, citizenId, houseId, quarter, year }, context) => {
      const resp = await context.sequelize.models.Payments.create({
        dateOfPayments: dateOfPayments,
        summ: +summ,
        quarter: quarter,
        year: +year,
      }).then(async (payment) => {
        await payment.setCitizen(citizenId)
        await payment.setHouse(houseId)
        console.log(payment)

        return payment
      })
      return resp
    },
    editPayment: async (
      _,
      { id, dateOfPayments, summ, quarter, year, citizenId, houseId },
      context,
    ) => {
      let data = await context.sequelize.models.Payments.update(
        {
          dateOfPayments: dateOfPayments,
          summ: +summ,
          quarter: quarter,
          year: +year,
        },
        { where: { id: id } },
      )
        .then(() => {
          return context.sequelize.models.Payments.findByPk(id)
        })
        .then(async (payment) => {
          await payment.setCitizen(citizenId)
          await payment.setHouse(houseId)
          return payment
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
