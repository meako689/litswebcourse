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
        <div onClick={() => {this.props.clickHandler()}}>
        {this.state.article.title}
        </div>
      )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
