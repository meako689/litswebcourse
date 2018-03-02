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
          <Router>
          <div>
            <nav className="navbar navbar-inverse bg-inverse">
                <div className="container">
                   <Link to="/" className="navbar-brand">News! </Link>
                </div>
            </nav>
              <div className="container">
                    <Route exact path="/" component={Home}/>
                    <Route path={"/detali/:articleId"} component={ArticleDetail}/>
              </div>
          </div>
          </Router>
        )
    }
}

class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {};
        this.state.articles = [];
    }
    componentDidMount(){
      var self = this;
      axios.get(APIURL+'/news').then(response => {
        var articles = response.data;
        self.setState({
          articles:articles,
        });
      });

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
    render(){
        return (<div class="articles">
                {
                  this.props.articles.map(article => {
                    return <Article item={article}/>
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
