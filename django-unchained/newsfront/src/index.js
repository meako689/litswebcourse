import React from 'react';
import ReactDOM from 'react-dom';
import data from './data.json'

class App extends React.Component {

    constructor(props){
        super(props)
        this.state = {};
        this.state.articles = data.items;
    }
    render(){
        return (<div>
                 <h1>News! </h1>
                 <ArticleList articles={this.state.articles}/>
                </div>
        )
    }
}

class ArticleList extends React.Component {

    constructor(props){
        super(props)
        this.state = {};
        this.state.articles = props.articles;
    }
    render(){
        return (<div class="articles">
                {
                  this.state.articles.map((article) => {
                    return <Article item={article}/>
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
        this.state.item = props.item;
    }
    render(){
      return (
        <div>
        {this.state.item.title}
        </div>
      )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
