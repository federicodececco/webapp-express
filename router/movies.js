const express = require("express");
const moviesController = require("../controllers/moviesController");
const router = express.Router();

//index
router.get("/", moviesController.index);
//show
router.get("/:id", moviesController.show);
module.exports = router;
