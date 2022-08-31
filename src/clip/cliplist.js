import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clip, unclip } from '../store/store';
const ClipList = ({web_url,main,pub_date}) => {
const dispatch=useDispatch()
    return (
      <div className="px-6 pt-4 pb-2">            
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
      onClick={(btn) => {         
       if(btn.target.innerText === 'unclip'){
         btn.target.innerText = 'clip';
         dispatch(unclip(pub_date))               
       }else{           
         btn.target.innerText = 'unclip'   
         dispatch(clip({
          id:pub_date,
          article: main,
          web_url:web_url,
          pub_date:pub_date
      })  
    );      
   }  
      


     }}>cilp</span>
           <a href={web_url} target="_blank" rel="noreferrer"   >
           <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" >detail</span> 
           </a>
                            
          </div>   
    );
}

export default ClipList;
