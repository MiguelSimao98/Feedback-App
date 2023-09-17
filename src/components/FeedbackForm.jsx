import {v4 as uuidv4} from 'uuid'
import React,{useState,useRef,useContext,useEffect} from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'

const FeedbackForm = () => {
    const [text,setText]=useState('')
    const [rating,setRating]=useState(10)
    const [btnDisabled,setBtnDisabled]=useState(true)
    const [message,setMessage]=useState('')
    const {handleNewFeedbackItem,feedbackEdit,updateFeedback}=useContext(FeedbackContext)

    useEffect(()=>{
        if(feedbackEdit.edit===true){
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    },[feedbackEdit])

    const handleTextChange=(e)=>{
        if(text===''){
            setBtnDisabled(true)
            setMessage(null)
        }else if(text!=='' && text.trim().length<=10){
            setBtnDisabled(true)
            setMessage('Must be at least 10 characteres')
        }else{
            setBtnDisabled(false)
            setMessage(null)
        }
        setText(e.target.value)
    }
    
    const handleSubmit=(event)=>{
        event.preventDefault()
        if(text.trim().length>10){
            const newFeedbackItem={
                id:uuidv4(),
                rating:rating,
                text:text
            }
            if(feedbackEdit.edit===true){
                updateFeedback(feedbackEdit.item.id,newFeedbackItem)
            }else{
                handleNewFeedbackItem(newFeedbackItem)
            }
            setText('')
        }
        
    }
  return (
    <Card>
        <form onSubmit={handleSubmit}> 
        <h2>How would you rate your service with us</h2>
        <RatingSelect select={(rating)=>setRating(rating)}/>
        <div className="input-group">
            <input onChange={handleTextChange} value={text} type="text" placeholder='Write a review'/>
            <Button type='submit' isDisabled={btnDisabled}>Send</Button>
        </div>
        {message && <div className="message">{message}</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm