import React, { useState, useEffect } from 'react';
import { getUrl } from '../api';

const Index = () => {
let page = 1;

const [value,setValue]= useState("");
const [news, setNews] = useState([]);
const [timer, setTimer] = useState(null);

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
  }
}, [getUrl({q, page})])

    return (
      <>
        <header>
          <input onChange={onDelay} placeholder='검색어를 입력하세용...'></input>
        </header>
        <section>
          {news.map(item => (
            <div key={item._id}>
              <div>{item.headline.main}</div>
              <div>{item.pub_date.replace('T', ' ').substring(0, 19)}</div>
            </div>
          ))}
        </section>
      </>
    );
}

export default Index;
