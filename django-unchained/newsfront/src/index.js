import React from 'react';
import ReactDOM from 'react-dom';
import data from './data.json'

class App extends React.Component {

    constructor(props){
        super(props)
    }
    render(){
        return "<h1>Hello World</h1>"
    }
}

class ArticleList extends React.Component {

    constructor(props){
        super(props)
        this.state.articles = props.articles;
    }
    render(){
        return (this.articles.map((article) => {<Article item=article/>}))
    }
}
class Article extends React.Component {
    constructor(props){
        super(props)
        this.state.item = props.item;
    }
    render(){return}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);