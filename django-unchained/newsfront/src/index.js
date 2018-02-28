import React from 'react';
import ReactDOM from 'react-dom';
import data from './data.json'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import './index.css'


class App extends React.Component {

    render(){
        return (
          <div>
            <nav className="navbar navbar-inverse bg-inverse">
                <div className="container">
                   <a className="navbar-brand">News! </a>
                </div>
            </nav>
            <Router>
              <div class="container">
                    <Route exact path="/" component={Home}/>
                    <Route path={"/detali/:articleId"} component={ArticleDetail}/>
              </div>
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
class ArticleDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {};
        this.state.id = props.match.params.articleId;
        this.state.article = {};
    }

    componentDidMount(){
      var article = data.items[2];

      this.setState({
        article:article,
        id:this.state.id
      });
    }

    render(){
        console.log(this.state);
        return <Article item={this.state.article}/>
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
