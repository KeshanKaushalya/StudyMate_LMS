import express from 'express'
import { addUserRating, gettUserCourseProgress, getUserData, purchaseCourse, updateUserCourseProgress, userEnrolledCourses } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get('/data', getUserData)
userRouter.get('/enrolled-courses', userEnrolledCourses)
userRouter.post('/purchase', purchaseCourse)

userRouter.post('/update-course-progress', updateUserCourseProgress)
userRouter.post('/get-course-progress', gettUserCourseProgress)
userRouter.post('/add-rating', addUserRating)

export default userRouter;