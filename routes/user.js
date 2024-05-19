const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsyc = require("../utils/wrapAsyc");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/user.js")


router.route('/signup')
.get(
    userController.renderSignup
)
.post( wrapAsyc(
    userController.createUser
))

router.route("/login")

.get(userController.renderLogin
)

.post(
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    userController.userLogin
)

router.get("/logout",
    userController.userLogout
)


module.exports = router;