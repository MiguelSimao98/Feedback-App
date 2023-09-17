import { FaTimes,FaEdit } from 'react-icons/fa'
import React,{useContext, useState} from 'react'
import Card from './shared/Card'
import PropTypes from 'prop-types'
import FeedbackContext from '../context/FeedbackContext'


const FeedbackItem = ({feedback}) => {
const {deleteFeedback,editFeedback}= useContext(FeedbackContext)
const handleClick=(event)=>{
  const id= feedback.id
  deleteFeedback(id)
}
  return (
    <React.Fragment>
        <Card >
            <div className='num-display'>{feedback.rating}</div>
            <button className='close' onClick={handleClick}>
              <FaTimes color='purple'/>
            </button>
            <button  onClick={()=>editFeedback(feedback)} className='edit'>
              <FaEdit color='purple'/>
            </button>
            <div className='text-display'>{feedback.text}</div>
        </Card>
    </React.Fragment>
  )
}

FeedbackItem.propTypes={
  feedback:PropTypes.object.isRequired
}

export default FeedbackItem