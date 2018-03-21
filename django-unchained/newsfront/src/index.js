import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css'

var APIURL = '/api';
var WSURL = 'ws://'+window.location.host;


class App extends React.Component {
    render(){
        return (
          <Router>
          <div>
            <nav className="navbar navbar-inverse bg-inverse">
                <div className="container">
                   <Link to="/" className="navbar-brand">News! </Link>
                   <Link to="/chat" >Chat</Link>
                </div>
            </nav>
              <div className="container">
                    <Route exact path="/" component={Home}/>
                    <Route path={"/create"} component={ArticleCreate}/>
                    <Route path={"/detali/:articleId"} component={ArticleDetail}/>
                    <Route path={"/chat"} component={Chat}/>
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
          <Article article={this.state.article}/>
          <hr/>
          <Chat articleId={this.state.id}/>
        </div>)
    }
}

class ArticleList extends React.Component {
    render(){
        return (<div class="articles">
                <Link to="/create" className="navbar-brand">Create a post! </Link>
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

class ArticleCreate extends React.Component{
    constructor(props){
        super(props)
        this.state = {redirect:false};
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
      axios.post(APIURL+'/news',
                this.state.article).then(
                  result => {
                    this.props.onArticleUpdate(this.state.article);
                    console.log(result);
                    this.setState({redirect: true});})
                  
    }
    handleChange(event){
        var article = this.state.article;
        article[event.target.name] = event.target.value;
        this.setState(
          {article:article}
        );
    }
    render(){
      if (this.state.redirect){
        return <Redirect to="/"/>;
      }
      return (<div>
        <h2>Create: {this.state.article.title}</h2>
        <form onSubmit={this.handleSubmit}>
        <label> Title: {this.state.article.title}
          <input name="title" type="text" onChange={this.handleChange}/>
        </label>
        <label> Description(can be blank): {this.state.article.description}
          <input name="description" type="text" onChange={this.handleChange}/>
        </label>
        <label> Link: {this.state.article.link}
          <input name="link" type="text" onChange={this.handleChange}/>
        </label>
        <label> PictureLink(can be blank): {this.state.article.picture}
          <input name="picture" type="text" onChange={this.handleChange}/>
        </label>
          <input type="submit" value="save"/>
        </form>
      </div>)
       }
}

class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          messages:[],
          newMessage:""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
      let serverUrl = WSURL+'/news/chat/'+this.props.articleId;
      this.connection = new WebSocket(serverUrl);

      this.connection.onmessage = evt => {
        let messages = this.state.messages;
        messages.push(JSON.parse(evt.data));
        this.setState({messages:messages});
      }
    }
    handleChange(event){
      event.preventDefault();
      let newMessage = event.target.value;
      this.setState({
        messages:this.state.messages,
        newMessage:newMessage
      })

    }
    handleSubmit(event){
      event.preventDefault();
      this.connection.send(JSON.stringify({message: this.state.newMessage}));
      this.setState({
        messages:this.state.messages,
        newMessage:""
      })
    }

    render(){
      return (
      <div>
        <h1>Chat</h1>
        <ul>
        { this.state.messages.map( (msg, idx) => <li key={'msg-' + idx }>{ msg.message }</li> )}
        </ul>
        <hr/>
        <form onSubmit={this.handleSubmit} >
          <input onChange={this.handleChange} placeholder="message" value={this.state.newMessage} type="text"></input>
          <input type="submit" value="send"/>
        </form>
      </div>
      )

    }
  
}
Chat.defaultProps = {articleId:""};


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
