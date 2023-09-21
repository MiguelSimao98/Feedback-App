import { createContext,useState,useEffect } from "react";
import feedbackData from "../data/feedbackData";

const FeedbackContext= createContext()

export const FeedbackProvider=({children})=>{
    const [feedback,setFeedBack]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
      fetchFeedback()
    },[])
    const fetchFeedback= async()=>{
      const response= await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`)
      const data = await response.json() 
      setFeedBack(data)
      setIsLoading(false)
    }
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
    const updateFeedback=async (id,updItem)=>{
      const response= await fetch(`http://localhost:5000/feedback/${id}`,{
        method:'PUT',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify(updItem)
      })
      const data = await response.json()
      setFeedBack(feedback.map((item)=> item.id===id ? {...item,...data} : item))
    }
    const deleteFeedback=async (id)=>{
        const response= await fetch(`http://localhost:5000/feedback/${id}`,{
          method:'DELETE',
          headers:{
            'Content-Type':'application/json'
          },
        })
        const data= await response.json()
        setFeedBack(feedback.filter((item)=>(item.id!==id)))
    }
    const handleNewFeedbackItem=async (feedbackItem)=>{
      const response = await fetch('http://localhost:5000/feedback/',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(feedbackItem)
      })
        const data= await response.json()
        setFeedBack([feedbackItem,...feedback])
      }
    return <FeedbackContext.Provider value={{
        feedback:feedback,
        deleteFeedback,
        handleNewFeedbackItem,
        editFeedback,
        feedbackEdit,
        updateFeedback,
        setIsLoading,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext