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
                	<Link to="/items/add" className="navbar-brand">Add News </Link>
                </div>
            </nav>
              <div className="container">
                    <Route exact path="/" component={Home}/>
                    <Route path={"/detali/:articleId"} component={ArticleDetail}/>
                    <Route exact path="/items/add/" component={Add}/>
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
class Add extends React.Component {
	onAdd = (title, description, link, picture) => {
    	this.state.goals.push({
     		id: nextId,
      		title: title,
      		description: description,
      		link: link,
      		picture: picture
     	});
    	this.setState(this.state);
    		nextId += 1;
  		};
  	};
    render(){
      return (<div>
        <h2>Add: {this.state.article.title}</h2>
        <form onSubmit={this.handleSubmit}>
        <label> Title: {this.state.article.title}
          <input name="title" type="text" onChange={this.onAdd}/>
        </label>
        <label> Description: {this.state.article.description}
          <input name="description" type="text" onChange={this.onAdd}/>
        </label>
        <label> Link: {this.state.article.link}
          <input name="link" type="text" onChange={this.onAdd}/>
        </label>
        <label> Image: {this.state.article.picture}
          <input name="img" type="image" onChange={this.onAdd}/>
        </label>
          <input type="submit" value="save"/>
        </form>
      </div>)
    };
}
class ArticleDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {};
        this.state.id = props.match.params.articleId;
        this.state.article = {};
        this.onArticleUpdate = this.onArticleUpdate.bind(this);
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
    onArticleUpdate(article){
        this.setState({
          article:article
        })
    }

    render(){
        return (
          <div>
          <h1>{this.state.article.title}</h1>
          <hr/>
          <ArticleEdit onArticleUpdate={this.onArticleUpdate} article={this.state.article}/>
        </div>)
    }

}

class ArticleList extends React.Component {
    render(){
        return (<div class="articles">
                {
                  this.props.articles.map(article => {
                    return <Article article={article}/>
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
          <img className="img-thumbnail" src={this.props.article.picture} alt="" />
        </div>
        <div className="col-8">
          <div>
            {this.props.article.title}
          </div>

          <Link to={"detali/"+this.props.article.id}>Read more -></Link>
        </div>
        
        </div>
      )
    }
}

class ArticleEdit extends React.Component{
    constructor(props){
        super(props)
        this.state = {};
        this.state.article = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(props){
      this.setState(
        {article:props.article}
      );
    }
    handleSubmit(event){
      event.preventDefault();
      axios.put(APIURL+'/news/'+this.state.article.id,
                this.state.article).then(
                  result => {
                    this.props.onArticleUpdate(this.state.article);
                    console.log(result)})
    }
    handleChange(event){
        var article = this.state.article;
        article[event.target.name] = event.target.value;
        this.setState(
          {article:article}
        );
    }
    render(){
      return (<div>
        <h2>Edit: {this.state.article.title}</h2>
        <form onSubmit={this.handleSubmit}>
        <label> Title: {this.state.article.title}
          <input name="title" type="text" onChange={this.handleChange}/>
        </label>
        <label> Description: {this.state.article.description}
          <input name="description" type="text" onChange={this.handleChange}/>
        </label>
        <label> Link: {this.state.article.link}
          <input name="link" type="text" onChange={this.handleChange}/>
        </label>
          <input type="submit" value="save"/>
        </form>
      </div>)

       }
    
    
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
