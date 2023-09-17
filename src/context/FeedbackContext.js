import { createContext,useState } from "react";
import feedbackData from "../data/feedbackData";

const FeedbackContext= createContext()

export const FeedbackProvider=({children})=>{
    const [feedback,setFeedBack]=useState([
        {
            id:1,
            rating:10,
            text:'Great Course very Detailed'
          },
          {
            id:2,
            rating:4.7,
            text:'Needs to be updated, too much has changed in the librarys'
          },
          {
            id:3,
            rating:7,
            text:'Would like for some more exercises, but overall its a good course'
          },
          {
            id:4,
            rating:8.6,
            text:'Just what i needed, thank you very much'
          }
    ])
    const [feedbackEdit,setFeedbackEdit]=useState({
        item: {},
        edit:false
    })
    const editFeedback=(item)=>{
        setFeedbackEdit({
            item,
            edit:true
        })
    }
    const updateFeedback=(id,updItem)=>{
      setFeedBack(feedback.map((item)=> item.id===id ? {...item,...updItem} : item))
    }
    const deleteFeedback=(id)=>{
        setFeedBack(feedback.filter((item)=>(item.id!==id)))
    }
    const handleNewFeedbackItem=(feedbackItem)=>{
        setFeedBack([feedbackItem,...feedback])
      }
    return <FeedbackContext.Provider value={{
        feedback:feedback,
        deleteFeedback,
        handleNewFeedbackItem,
        editFeedback,
        feedbackEdit,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext