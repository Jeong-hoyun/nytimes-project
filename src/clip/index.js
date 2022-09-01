
import React from 'react';
import Footer from '../view/footer';
import Header from '../view/header';
import { useDispatch } from 'react-redux';
import { addcilp, deleteCilp } from '../store/store';
const ClipIndex = () => { 
    const dispatch=useDispatch()
    const [isOpen, setOpen] = React.useState(
      JSON.parse(localStorage.getItem('NEWS_CLIP')) || null
    );     
   console.log(isOpen)
       
    return (
        <>
        <Header/>
        <section>
        {isOpen&&isOpen.map((item,i) => (
            <div key={item.id}  className="bg-white shadow-lg p-6 rounded-lg ring-1">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900" >{item.main}</h5>        
            <p className='mb-3 font-normal text-gray-700'>{item.pub_date}</p>           
          <span className=" inline-flex items-center    px-3 py-1 mr-2 mb-2 text-sm       font-medium text-center text-white 
          bg-blue-700 rounded-lg  hover:bg-blue-800" onClick={()=>{        
            dispatch(deleteCilp(item.web_url))         
        }}>uncilp</span>
           <a href={item.web_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1 mr-2 mb-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg">detail
           </a>         
          </div>
          ))}
        </section>        
        <Footer/>            
        </>
    );
}

export default ClipIndex;
