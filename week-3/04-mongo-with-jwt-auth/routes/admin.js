const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, User, Course } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET}=require("../config");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password= req.body.password;
    // check if the username already exists
    await Admin.create({
        username: username,
        password: password
    })
    res.json({
        Message: "Admin created succesfully"
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password= req.body.password;

    const user = await Admin.find({
        username,
        password
    })
    if(user){

  
    const token = jwt.sign({
        username
    },JWT_SECRET);
    res.json({
        token
    })
}else{
    res.status(411).json({
        message:"incorrect email and password"
    })
}
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    //zod
    const newCourse = await Course.create({
     title,
     description,
     imageLink,
     price
    })
    res.json({
     message: 'course created successfully',courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, (req, res) => {
    Course.find().then((value)=>{
        if(value){
            res.json({
                courses:value
            })
        }
    })
});

module.exports = router;