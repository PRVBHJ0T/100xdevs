const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");

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

router.post('/courses', adminMiddleware, async(req, res) => {
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

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find()
    res.json({
        courses: allCourses
    })
});

module.exports = router;