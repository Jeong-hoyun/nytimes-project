import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Loading from 'react-loading';
import { getUrl } from '../api';
import Header from '../view/header';
import Footer from '../view/footer';
import { useDispatch,useSelector } from 'react-redux';
import { addClip, clip, deleteClip, fetchNewsbyWords } from '../store/store';
import ClipList from '../clip/clip';


const Index = () => {
const [value,setValue]= useState(""); // 검색값 
const [page, setPage] = useState(1); // 현재 페이지 
const [news, setNews] = useState([]); // News List
const [timer, setTimer] = useState(null);
const [isClip, setIsClip] = useState(false);
const [clipValue, setClipValue] = useState([]);
const [clip, setClip] = useState({clip: "clip", id: ""})

const obsRef = useRef(null);  // observer Element
const preventRef = useRef(true); // observer 중복 실행 방지 
const endRef = useRef(false); //모든 글 로드 확인
const clipRef= useRef(false); //모든 글 로드 확인

const [load, setLoad] = useState(false);
const [hasMore, setHasMore] = useState(false);
const historyList = useSelector(({ history }) => history.history);
const clippednewsList = useSelector( ({ clippednews }) => clippednews.clippednews);
const dispatch=useDispatch()


console.log(clippednewsList)

const onDelay = (e) => {
  if (timer) {
    clearTimeout(timer);
    setTimer(null);
  }
  setTimer(
    setTimeout(() => {
      setValue(e.target.value);
      setPage(1)   
      setNews([])   
    }, 500)
  );
}

useEffect(() => {
  if(value !== ""){
    getNews();
    dispatch(fetchNewsbyWords({ q: value, page }));
  }
}, [value, page])

useEffect(()=> { // 옵저버 생성 
  const observer = new IntersectionObserver(obsHandler, { threshold : 0.3 });
  if(obsRef.current) observer.observe(obsRef.current);
  return () => { observer.disconnect(); }
}, [hasMore]);


const getNews = useCallback(async () => { // 뉴스 불러오기 
  setLoad(true)
  try{
    const res = await axios.get(getUrl({ value, page }))
    if(res.data){
      if(res.data.end){
        endRef.current = true;
      }
      setNews(prev => [...prev, ...res.data.response.docs]);
      setHasMore(res.data.response.docs.length > 0);
      
      preventRef.current = true;
    } else{
      console.log(res); //에러
    }
    setLoad(false);
  }catch(e){
    if (axios.isCancel(e)) return console.log(e)
  }
  return () => axios.cancel()
   //로딩 종료
  }, [value, page,hasMore])


const obsHandler = ((entries) => { 
  const target = entries[0];
  if(!endRef.current && target.isIntersecting && preventRef.current && hasMore){ //옵저버 중복 실행 방지
    preventRef.current = false; //옵저버 중복 실행 방지
    setPage(prev => prev+1 ); //페이지 값 증가
  }
})
    return (
      <>
        <Header/>
          <input onChange={onDelay} placeholder='검색어를 입력하세용...'></input>      
        <section>
     <details className="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg" open>
       <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none"> search list</summary>
         <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
             {historyList.map((item, index) => ( <p key={index}>{item}</p> ))}
          </div>
      </details>
      
          {news.filter((el, i) => news.indexOf(el) === i).map((item,i) => (
            <div key={item._id}  className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="font-bold text-xl mb-2" >{item.headline.main}</div>
            <ClipList web_url={item.web_url}  main={item.headline.main} id={item._id} pub_date={item.pub_date.replace('T', ' ').substring(0, 19)}   ></ClipList>
      
             <p className='text-gray-600'>{item.pub_date.replace('T', ' ').substring(0, 19)}</p>      
         </div>
          ))}
        </section>
        <div>{load && 'Loading...'}</div>
        <div ref={obsRef}></div>
        <Footer/>
      </>
    );
}

export default Index;
