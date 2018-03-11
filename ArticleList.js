import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';

import Article from './Article';


export default class ArticleList extends React.Component {
    render(){
        return(
          <div className="articles">
              {
                this.props.articles.map((article, i) => {
                  // Every Article must have unique key 
                  return <Article article={article} key={i}/>  
                })
              }
          </div>
        )
    }
}