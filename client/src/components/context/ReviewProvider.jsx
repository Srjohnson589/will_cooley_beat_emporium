import { useEffect } from 'react';
import {createContext, useContext, useState} from 'react';

const ReviewContext = createContext({})

export const useReview = ()=>{
    return useContext(ReviewContext)
}

export const ReviewProvider = ({children})=>{
    const [reviewData, setReviewData] = useState(()=>{
        const saved = localStorage.getItem("reviewData");
        const initialValue = JSON.parse(saved);
        return initialValue || '';
    })

    useEffect(()=>{
        localStorage.setItem("reviewData", JSON.stringify(reviewData))
    }, [reviewData])

    const emptyReviewData = () => {
      setReviewData('')
    }

    const handleReviewData = (obj)=>{
        setReviewData(obj)
      }
    
    return (
        <ReviewContext.Provider value={{reviewData, emptyReviewData, handleReviewData}}>
            {children}
        </ReviewContext.Provider>
    )
}