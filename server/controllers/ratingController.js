const ApiError = require("../error/ApiError");
const { Type, Rating, Device } = require("../models/models");

class typeController {
  async create(req, res, next) {
    try {
      const { rate, deviceId } = req.body;
      const user = req.user;
      const candidate = await Rating.findOne({
        where: { rate, userId: user.id, deviceId },
      });
      const rating = await Rating.create({ rate, userId: user.id, deviceId });

      const ratings = await Rating.findAndCountAll({ where: { deviceId } });

      const device = await Device.findOne({ where: { id: deviceId } });

      const averageRating = (
        ratings.rows.reduce((acc, rating) => acc + rating.rate, 0) /
        ratings.count
      ).toFixed(0);

      device.rating = averageRating;
      await device.save();

      return res.json(rating);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new typeController();
