import React, { useState, useEffect } from 'react';
import { getUrl } from '../api';
import Header from '../view/header';
import Footer from '../view/footer';
import { useDispatch,useSelector } from 'react-redux';
import { fetchNewsbyWords } from '../store/store';
import { Link } from 'react-router-dom';

const Demo = () => {
const [value,setValue]= useState("");
const [news, setNews] = useState([]);
const [timer, setTimer] = useState(null);
const historyList = useSelector(({ history }) => history.history);
let page = 1;
const dispatch=useDispatch()


const onDelay = (e) => {
  if (timer) {
    clearTimeout(timer);
    setTimer(null);
  }
  setTimer(
    setTimeout(() => {
      console.log(e.target.value);
      setValue(e.target.value);
    }, 500)
  );
}
const q = value.trim();

const getNews = async () => {
  const response =  await fetch(getUrl({q, page}));
  console.log(getUrl({q, page}));
  const json = await response.json();
  setNews(json.response.docs);
}
  
useEffect(() => {
  if(q !== ""){
      getNews();      
      dispatch(fetchNewsbyWords({ q: value, page }));
  }
}, [getUrl({q, page})])

    return (
      <>
        <Header/>
      <label className="block">
      <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
       search news 
       </span>
      <input type='search'  onChange={onDelay} placeholder='검색어를 입력하세요...' className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" ></input>       
        </label>
       <div>
          {historyList.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
        <section>
          {news.map(item => {     
            return(
            <div key={item._id}  className="max-w-sm rounded overflow-hidden shadow-lg" >
              <div className="font-bold text-xl mb-2" >{item.headline.main}</div>
              <div className="px-6 pt-4 pb-2">
              
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">clip</span>
                <a href={item.web_url} target="_blank" rel="noreferrer"   >
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" >detail</span> 
                </a>
                                 
               </div>       
               <p className='text-gray-600'>{item.pub_date.replace('T', ' ').substring(0, 19)}</p>      
           </div>
           )
            }
        
          )}
        </section>
        <Footer/>
      </>
    );
}

export default Demo;