import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Loading from 'react-loading';
import { getUrl } from '../api';
import Header from '../view/header';
import Footer from '../view/footer';


const NewsItem = styled.div`
  height: 40px;
`

const Infinite = () => {
const [value,setValue]= useState(""); // 검색값 
const [page, setPage] = useState(1); // 현재 페이지 
const [news, setNews] = useState([]); // News List
const [timer, setTimer] = useState(null);
const obsRef = useRef(null);  // observer Element
const preventRef = useRef(true); // observer 중복 실행 방지 
const endRef = useRef(false); //모든 글 로드 확인
const [load, setLoad] = useState(false);
const [hasMore, setHasMore] = useState(false);

const q = value.trim();


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

useEffect(() => {
  if(q !== ""){
    getNews();
  }
}, [getUrl({q, page})])

useEffect(()=> { // 옵저버 생성 
  const observer = new IntersectionObserver(obsHandler, { threshold : 0.3 });
  if(obsRef.current) observer.observe(obsRef.current);
  return () => { observer.disconnect(); }
}, [hasMore]);


const getNews = useCallback(async () => { // 뉴스 불러오기 
  setLoad(true)
  const res = await axios.get(getUrl({ q, page }))
  console.log(res.data); 
  console.log(res.data.response.docs);
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
  setLoad(false); //로딩 종료
}, [getUrl({q}),hasMore])


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
          {news.map(item => (
            <NewsItem key={item._id}>
              <div>{item.headline.main}</div>
              <div>{item.pub_date.replace('T', ' ').substring(0, 19)}</div>
            </NewsItem>
          ))}
        </section>
        <div ref={obsRef}></div>
        <Footer/>
      </>
    );
}

export default Infinite;
