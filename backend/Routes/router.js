// import controllers
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')

// import express
const express = require('express');
const jwtmiddleware = require('../middleware/authmiddleware');
const multerconfig = require('../middleware/multermiddleware');

// create an object for class router in Express
const router = new express.Router()

// Define path
// user registration
router.post('/user/register', userController.registerUser)

router.post('/user/login', userController.loginUser)

router.post('/project/add', jwtmiddleware, multerconfig.single("projectImage"), projectController.addProject)

router.get('/project/allProject', jwtmiddleware, projectController.getAllProject)

router.get('/project/homeProject', projectController.getHomeProject)

router.get('/project/userProject', jwtmiddleware, projectController.getUserProject)

router.put('/project/edit/:id', jwtmiddleware, multerconfig.single('projectImage'), projectController.updateUserProject)

router.delete('/project/delete/:id', jwtmiddleware, projectController.deleteUserProject)

// export router
module.exports = router