const User = require("../models/user")


module.exports.renderSignup = (req, res) => {
    // res.send("signup page")
    res.render("./users/signup.ejs")
}


module.exports.createUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username })
        const registedUser = await User.register(newUser, password)
        console.log(registedUser)

        req.login(registedUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to wanderlust...! ")
            res.redirect("/listings")
        })
        //    req.flash("success","Welcome to wanderlust...! ")
        //    res.redirect("/listings")

    } catch (error) {
        req.flash("error", error.message)
        res.redirect("/signup.ejs")
    }

}

module.exports.renderLogin = (req, res) => {
    res.render("./users/login.ejs")
}

module.exports.userLogin = async (req, res) => {

    req.flash("success", " Welcome back to wanderlust...!")
    // res.redirect(res.locals.redirectUrl)
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl)
}

module.exports.userLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err)
        }
        req.flash("success", "You are logged out!")
        res.redirect("/listings")
    })
}