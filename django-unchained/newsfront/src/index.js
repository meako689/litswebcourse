import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import _ from 'lodash';
import axios from 'axios';

import data from './data.json'

import 'bootstrap/dist/css/bootstrap.css';
import './index.css'

var APIURL = 'http://127.0.0.1:8000/api';


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
              <div className="container">
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
      var self = this;

      axios.get(APIURL+'/news/'+self.state.id).then(response => {
        var article = response.data;
        self.setState({
          article:article,
          id:self.state.id
        });
      });

    }

    render(){
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

    render(){
      return (
        <div
        className="row article"
        >
        <div className="col-4">
          <img className="img-thumbnail" src={this.props.item.picture} alt="" />
        </div>
        <div className="col-8">
          <div>
            {this.props.item.title}
          </div>

          <Link to={"detali/"+this.props.item.id}>Read more -></Link>
        </div>
        
        </div>
      )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
