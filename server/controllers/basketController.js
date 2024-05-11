// const { Brand } = require("../models/models");

const ApiError = require("../error/ApiError");
const { BasketDevice, Basket } = require("../models/models");

class basketController {
  async addOne(req, res, next) {
    try {
      let { id } = req.body;
      const user = req.user;
      const basket = await Basket.findOne({ where: { userId: user.id } });
      const candidate = await BasketDevice.findOne({
        where: { deviceId: id, basketId: basket.id },
      });
      if (candidate) {
        return next(ApiError.badRequest("Данный девайс уже был добавлен"));
      }
      const deviceBasket = await BasketDevice.create({
        deviceId: id,
        basketId: basket.id,
        count: 1,
      });
      return res.json(deviceBasket);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res, next) {
    try {
      const user = req.user;
      //   return res.json(req.body);
      const basket = await Basket.findOne({ where: { userId: user.id } });
      const goods = await BasketDevice.findAndCountAll({
        where: { basketId: basket.id },
      });
      return res.json(goods);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async update(req, res, next) {
    try {
      const { id } = req.body;
      const updateBasket = await BasketDevice.update(req.body, {
        where: { id },
      });
      const basket = await BasketDevice.findOne({ where: { id } });
      if (basket.count == 0) {
        await basket.destroy();
      }
      return res.json(basket);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new basketController();
