import React from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import '../index.css'

var APIURL = 'http://127.0.0.1:8000/api';

export default class ArticleCreation extends React.Component{
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
    handleSubmit(e){
      e.preventDefault();
      axios.post(APIURL+'/news', this.state.article)
      .then(
        result => {
          this.props.onArticleUpdate(this.state.article);
        })
    }
    handleChange(e){
        var article = this.state.article;
        article[e.target.name] = e.target.value;
        this.setState(
          {article:article}
        );
    }
    render(){
      return(
      <div>
        <h1>Hi</h1>
          <form onSubmit={this.handleSubmit}>
              <label> Title:     
                <input name="title" type="text" 
                // refs={input => {this.text = input}}
                onChange={this.handleChange} />
              </label>
              
              <br/>
              
              <label> Description: 
                <input name="description" type="text" onChange={this.handleChange} />
              </label>
              
              <br/>

              <label> Link: 
                <input name="link" type="text" onChange={this.handleChange} />
              </label>

               <hr/>
            
            <input type="submit" value="save"/>
          </form>
      </div>
      )
    }
}
