const express = require("express");
const { signup, login, getAllPosts, } = require("../controller/adminController");
const { adminSignupValidation, adminLoginValidation } = require("../middleware/adminValidator");
const checkAdmin = require("../middleware/checkAdmin");

const Router = express.Router;

const adminRouter = Router();



adminRouter.get("/", (req, res) => {
    res.json({ success: true, message: "Elcome to Backend" });
});

adminRouter.post('/adminsignup', adminSignupValidation, signup);

adminRouter.post('/adminlogin', adminLoginValidation, login);

adminRouter.get('/allposts', checkAdmin, getAllPosts);





module.exports = adminRouter;
