import { userAgent } from 'next/server';
import React, {useState,useEffect, useRef} from 'react'
import { submitComment } from '../services';

const CommentsForm = ({slug}) => {

  const [error,setError] = useState(false);
  console.log(error);
  const [localStorage,setLocalStorage] = useState(null)

  const [showSuccessMessage,setShowSuccessMessage] = useState(false);

  const commentEl = useRef();
  const nameEl= useRef();
  const emailEl= useRef();
  const storeDataEl= useRef();


  useEffect(()=>{

    nameEl.current.value = window.localStorage.getItem('name');
    emailEl.current.value = window.localStorage.getItem('email');

  },[])

  const handleCommonSubmission =() =>{

      setError(false);
      const { comment } = commentEl.current;
      const { name } = nameEl.current;
      const { email } = emailEl.current;
      const { checked:storedData } = storeDataEl.current;
           console.log(comment,name,email);
      if(!comment || !name || !email) {
           setError(true);
           return;
      }

      const commentObj ={
        name,email,comment,slug
      }

      if(storedData){
        localStorage.setItem('name',name);
        localStorage.setItem('email',name);
      }
      else
      {
        localStorage.removeItem('name',name);
        localStorage.removeItem('email',name);
      }
      submitComment(commentObj)
      .then((res) =>{
        setShowSuccessMessage(true);
        setTimeout(()=>{
             setShowSuccessMessage(false);
        },300)
      })
  }


  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Leave a Reply</h3>
        <div className='grid grid-cols-1 gap-4 mb-4'>
                 <textarea ref={commentEl} className='p-4 outline-none w-full border-1
                 rounded-lg focus:ring-2 focus:ring-gray-200
                  bg-gray-200'
                   placeholder='Comment'
                   name="comment" />
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 '>
             <input 
                 type="text" ref={nameEl}
                 placeholder="Name"
                 className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200
                 bg-gray-200"
             />
              <input 
                 type="email" ref={emailEl}
                 placeholder="Email"
                 className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200
                 bg-gray-200"
             />
        </div>
        {error && <p className='text-xs text-red-500'>All fields are required.</p>}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 '>
              <div>
                 <input ref={storeDataEl} type="checkbox" id="storeData" name="storeData" />
                 <label className='ml-2 text-gray-500 cursor-pointer' htmlFor="storeData" >
                  Save my e-mail and name for the next time I comment
                 </label>
              </div>
       </div>
        <div className='mt-8'>
              <button type="button" 
               className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white  px-8 py-3 cursor-pointer'
              onClick={handleCommonSubmission}>
                Post Comment
              </button>
              {showSuccessMessage && <span className='text-xl float-right font-semibold mt-3
              text-green-500'>Comment submitted for review</span>}
        </div>
        
    </div>
  )
}

export default CommentsForm
