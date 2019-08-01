import React, { Component } from 'react';
import axios from "axios";
import PostList from "./PostList";
import PostForm from "./PostForm"
//import logo from './logo.svg';
import './App.css';
//import { Button } from 'reactstrap';

class App extends Component {
     constructor(props){
        super(props);
        this.state={
        posts:[  { "title": "",
                "contents": "",
                "created_at": "",
                "updated_at": ""
               }
            ] 

       }



     }
     createNewPost=(title, contents, created_at, updated_at)=>{
         const newPost=
           {
            "title": title,
            "contents": contents,
            "created_at": created_at,
            "updated_at": updated_at
        
           }
            .catch(err=>{
              console.log(err);
            })

      }
      componentDidMount(){
         this.refresh()  
      }

     refresh=()=>{
       axios.get("http://localhost:2000/api/posts")
      .then(res=>{
         console.log("GET RESPONSE",res)
         this.setState({posts:res.data})
         
      })
      .catch(err=>{
        console.log(err)
      })
     }

     deleteHandler=(id)=>{
       axios.delete("http://localhost:2000/api/posts/" +id)
            .then(res=>{
               console.log("DELETE RESPONSE",res)
               this.refresh();


            })
            .catch(error=>{
              console.log(error)
            })

     }
     
    
  clickHandler = (event) => {
    
  }

  render() {
    return (
      <div className="App">
      <h2>WELCOME TO THE POSTS</h2>
      <PostList posts={this.state.posts} deleteHandler={this.deleteHandler} />
      <PostForm submitFn={this.createNewPost}/>


        
      </div>
    );
  }
}

export default App;
