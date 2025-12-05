import { clerkClient } from '@clerk/express'

// update role to educator
export const updateRoleToEducator = async (req, res) =>{
    try {
        const userId = req.auth.userId

        await clerkClient.users.updateUserMetadata(userId,{
            publicMetadata:{
                role: 'educator',
            }
        })

        res.json({ success: true, message: 'You can publish a course now'})

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Add New Course
export const addCourse = async (req, res)=>{
    try {
        const {  courseData } = req.body
        const imageFile = req.file 
        const educatorId = req.auth.userId

        if(!imageFile){
            return res.json({success: false, message: 'Thumbnail Not Attached'})
        }

        

    } catch (error) {
        
    }
}