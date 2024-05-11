const Router = require("express");
const ratingController = require("../controllers/ratingController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = new Router();

router.post("/", authMiddleware, ratingController.create);


module.exports = router;
