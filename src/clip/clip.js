import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addClip } from '../store/store';
import { clip, unclip } from '../store/store';
const ClipList = ({web_url,main,pub_date}) => {
const [value,setValue]=React.useState();
const clippednewsList = useSelector( ({ clippednews }) => clippednews.clippednews);
const dispatch=useDispatch()
const nextId = React.useRef(0);
    return (
      <div className="px-6 pt-4 pb-2">            
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
      onClick={(btn) => {         
       if(btn.target.innerText === 'unclip'){
         btn.target.innerText = 'clip';
         dispatch(unclip({
          id: nextId.current,
         article: main,
         web_url:web_url,
         pub_date:pub_date
      })) 
              
       }else{           
         btn.target.innerText = 'unclip' 
         btn.preventDefault();
         dispatch(clip({
          id: nextId.current,
          article: main,
          web_url:web_url,
          pub_date:pub_date
      })  
    );    
    nextId.current++;          
   }  
      


     }}>cilp</span>
           <a href={web_url} target="_blank" rel="noreferrer"   >
           <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" >detail</span> 
           </a>
                            
          </div>   
    );
}

export default ClipList;
