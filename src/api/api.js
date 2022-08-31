import userEvent from '@testing-library/user-event';
import React, {useState, useEffect} from 'react';
import { useResolvedPath } from 'react-router-dom';
import { getUrl } from './index';

const Api = () => {

const [articles, setArticles] = useState([]);
        let page = 1;
        let q = 'red';

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(getUrl({q,page}))
        const articles = await res.json()
        setArticles(articles.response.docs)
        console.log(articles.response.docs)
      }catch (error){
        console.error(error)
      }
    }
  
    fetchArticles()
},[])

return (
  <section>
    {articles.map((article)=> {
      const {
        abstract, 
        headline: {main},
        pub_date,
        _id,
      } = article

      return(
        <article key={_id}>
          <h2>{main}</h2>
          <h4>{abstract}</h4>
          <h4>{pub_date}</h4>
        </article>
      )

    })}
  </section>

  )
}

export default Api