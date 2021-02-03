const { User, Orders, Status, Language } = require("../models");

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      res.send(user.toJSON());
    } catch (err) {
      res.status(400).send({
        error: "User Name allready registered :(",
      });
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({
        where: { userName: req.body.userName },
      });
      if (!user) {
        throw new Error("Can not find user");
      } else {
        res.send(user.toJSON());
      }
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
  async getOrders(req, res) {
    try {
      const orders = await Orders.findAll();
      res.send(orders);
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
  async getOrder(req, res) {
    try {
      const order = await Orders.findOne({
        where: { id: req.params.id },
      });
      res.send(order);
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
  async getStatus(req, res) {
    try {
      const status = await Status.findAll();
      res.send(status);
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
  async getLanguage(req, res) {
    try {
      const language = await Language.findAll();
      res.send(language);
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
  async createOrder(req, res) {
    try {
      const order = await Orders.create(req.body);
      res.send(order.toJSON());
    } catch (err) {
      res.status(400).send({
        error: "User Name allready registered :(",
      });
    }
  },
  async saveOrder(req, res) {
    try {
      const order = await Orders.update(req.body, {
        where: { id: req.params.id },
      });
      res.send(order);
    } catch (err) {
      res.status(400).send({
        error: "Can not update Order :(",
      });
    }
  },
};
