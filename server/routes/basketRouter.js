const Router = require("express");
const basketController = require("../controllers/basketController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = new Router();

router.post("/", authMiddleware, basketController.addOne);
router.get("/",authMiddleware, basketController.getAll);
router.put('/', basketController.update)

module.exports = router;
