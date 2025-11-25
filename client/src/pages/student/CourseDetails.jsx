import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import { assets } from '../../assets/assets'

const CourseDetails = () => {

   const {id} = useParams()

   const [courseData, setCoursedata] = useState(null)

   const {allCourses, calculateRating} = useContext(AppContext)

   const fetchCourseData = async ()=>{
     const findCourse = allCourses.find(course => course._id === id)
     setCoursedata(findCourse);
   }

   useEffect(()=>{
    fetchCourseData()
   },[])

  return courseData ? (
    <>
    <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>

  {/* background gradient - put at z-0 so it's behind content in the same stacking context */}
  <div className='absolute top-0 left-0 w-full h-section-height z-0 bg-gradient-to-b from-cyan-100/70'></div>

      {/* left colomn */}
      <div className='max-w-xl z-10 text-gray-500'>
        <h1 className='md:text-course-deatails-heading-large text-course-deatails-heading-small font-semibold text-gray-800'>{courseData.courseTitle}</h1>
        <p className='pt-4 md:text-base text-sm'
         dangerouslySetInnerHTML={{__html: courseData.courseDescription.slice(0,200)}}></p>

     {/*reviews and ratings section*/}
      <div className='flex items-center space-x-2'>
        <p>{calculateRating(courseData)}</p>
        <div className='flex'>
           {[...Array(5)].map((_, i)=>(<img key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt='' className='w-3.5 h-3.5' />
           ))}
        </div>
         <p className='text-blue-600'>({courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'ratings' : 'rating'})</p>

         <p>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? 'students' : 'student'}</p>
      </div>

      </div>

  {/* right column (placeholder) */}
  <div className='relative z-10' />

    </div>
    </>
  ): <Loading />
}

export default CourseDetails
