const express = require("express");
const router = express.Router();

// @route   GET api/posts/test
// @desc    test posts api
// @access  public
router.get("/test", (req, res) => res.json({ msg: "posts test" }));

module.exports = router;
