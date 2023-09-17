import React,{useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext'

const FeedbackStats = () => {
  const {feedback}=useContext(FeedbackContext)
  var averageRating=feedback.reduce((acc,cur)=>{
    return acc + cur.rating
  },0)/feedback.length
  averageRating=averageRating.toFixed(1).replace(/[.,]0$/,'')
  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} reviews</h4>
      <h4>Average Rating: {isNaN(averageRating)? 0 : averageRating}</h4>
      </div>
  )
}


export default FeedbackStats