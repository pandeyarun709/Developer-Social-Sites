const express = require("express");
const router = express.Router();

//@route   GET api/profile/test
//@desc    test profile api
//@access  public
router.get("/test", (req, res) => res.json({ msg: "Profile test" }));

module.exports = router;
