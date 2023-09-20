import { motion,AnimatePresence } from "framer-motion"
import { useContext } from "react"
import React from 'react'
import FeedbackItem from './FeedbackItem'
import FeedbackContext from "../context/FeedbackContext"
import Spinner from "./shared/Spinner"


const FeedbackList = () => {
  const {feedback,isLoading}=useContext(FeedbackContext)
  const {deleteFeedback}=useContext(FeedbackContext)
  const handleFeedbackDelete=(id)=>{
    deleteFeedback(id)
  }
  if(!isLoading && (!feedback || feedback.length===0)){
    return(
      <p>No Feedback yet</p>
    )
  }
   return isLoading ? <Spinner/> :(
      <div className='feedback-list'>
      <AnimatePresence>
      {feedback.map((feedback)=>{
        return(
          <motion.div 
          key={feedback.id}
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          >
          <FeedbackItem key={feedback.id} feedback={feedback}/>
          </motion.div>
        )
      })}
      </AnimatePresence>
    </div>
   )
}

export default FeedbackList