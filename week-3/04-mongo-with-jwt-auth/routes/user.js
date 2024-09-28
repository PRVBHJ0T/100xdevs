const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const {JWT_SECRET}=require("../config")
const jwt = require("jsonwebtoken")

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password= req.body.password;
    // check if the username already exists
    await User.create({
        username: username,
        password: password
    })
    res.json({
        Message: "User created succesfully"
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
     const username = req.body.username;
     const password= req.body.password;
 
     const user = await User.find({
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

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find().then((value)=>{
        if(value){
            res.json({
                courses:value
            })
        }
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId=req.params.courseId;
    const username = req.username;
    User.updateOne({
        username: username
    },{
        "$push":{
            purchasedCourses:courseId
        }
    }).catch((e)=>{
        console.log(e)
    }).then((value)=>{
        if(value){
            res.json({
                message:"course successfully purchased"
            })
        }
    })
});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {

    const username = req.username;
    const user = await User.findOne({
        username: username
    })
    const courses= await Course.find({
       _id:{
        "$in":user.purchasedCourses}
    })
    res.json({
       courses:courses
    })
});

module.exports = router