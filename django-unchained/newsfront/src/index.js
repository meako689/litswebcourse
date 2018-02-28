import React from 'react';
import ReactDOM from 'react-dom';
import data from './data.json'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import './index.css'


class App extends React.Component {

    render(){
        return (
          <div className="container">
            <nav className="navbar navbar-inverse bg-inverse">
                   <a className="navbar-brand">News! </a>
            </nav>
          <Router>
                <Route exact path="/" component={Home}/>
          </Router>
          </div>
        )
    }
}

class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {};
        this.state.articles = data.items;
    }
    render(){
      return <ArticleList articles={this.state.articles}/>
    }
}
class ArticleList extends React.Component {

    constructor(props){
        super(props)
        this.state = {};
        this.state.articles = props.articles;
    }

    handleClick(article){
      let articles_new = this.state.articles.slice();
      let index = articles_new.indexOf(article);
      articles_new.splice(index, 1);

      this.setState({
        articles: articles_new
      })
    }

    render(){
        return (<div class="articles">
                {
                  this.state.articles.map((article) => {
                    return <Article
                            clickHandler={() => {this.handleClick(article)}}
                            item={article}/>
                  })
                }
               </div>
        )
    }
}
class Article extends React.Component {
    constructor(props){
        super(props)
        this.state = {};
        this.state.article = props.item;
    }


    render(){
      return (
        <div
        className="row article"
        onClick={() => {this.props.clickHandler()}}>
        <div className="col-4">
          <img className="img-thumbnail" src={this.state.article.picture} alt="" />
        </div>
        <div className="col-8">
          {this.state.article.title}
        </div>
        
        </div>
      )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
