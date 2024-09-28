const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', (req, res) => {
   const username=req.body.username;
   const password=req.body.password;
   //zod
   User.create({
    username,
    password
   })
  res.json({ msg:"user created"})

});

router.get('/courses', async(req, res) => {
    const allCourses= await Course.find();
    res.json({
        courses: allCourses
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId=req.params.courseId;
    const username = req.headers.username;
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

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username:req.headers.username
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