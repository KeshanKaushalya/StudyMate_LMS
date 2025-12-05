import User from "../models/User.js"
import Stripe from "stripe";
import { Purchase } from "../models/Purchase.js";

// Get User data
export const getUserData = async (req, res)=>{
    try {
        const userId = req.auth.userId
        const user = await User.findById(userId)

        if(!user){
            return res.json({success: false, message: 'User not found'})
        }

        res.json({success: true, user })
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// User Enrolled Courses With Lecture Links
export const userEnrolledCourses = async (req, res)=>{
    try {
        const userId = req.auth.userId
        const userData = await User.findById(userId).populate('enrolledCourses')

        res.json({success: true, enrolledCourses: userData.enrolledCourses})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// Purchase Course
export const purchaseCourse = async (req, res) =>{
    try {
      const {courseId} = req.body
      const { origin } = req.headers
      const userId = req.auth.userId
      const userData = await User.findById(userId)
      const courseData = await Course.findById(courseId)

      if(!userData || !courseData){
        return res.json({success: false, message: 'Data not found'})
      }

      const purchaseData = {
        courseId: courseData._id,
        userId,
        amount: (courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed (2),
      }

      const newPurchase = await Purchase.create(purchaseData)

      // Stripe Gateway Initialize
      const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)
      

    } catch (error) {
      
    }
}

