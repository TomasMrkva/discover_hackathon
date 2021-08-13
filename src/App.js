import './App.css';
import React from 'react'
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from './Popup'
import { useState } from 'react';

import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCdEYKNU8_Nv1BHckau8FQ82vTnji4YL-k",
  authDomain: "logintest-bfbbc.firebaseapp.com",
  projectId: "logintest-bfbbc"
});

var db = firebase.firestore();

//var posts = [{id:0, image: 'https://www.nme.com/wp-content/uploads/2020/05/GettyImages-1134174735.jpg', title: 'To Pimp a Butterfly', message: 'The best album ever made', dateTime:'29/03/21'},{id:1,image: 'https://bleedingcool.com/wp-content/uploads/2020/10/S5e40_Finn_Jake_and_BMO_sitting-1200x900.jpg', title: 'To Pimp a Butterfly', message: 'The best album ever made', dateTime:'29/03/21'}]
//const [posts, setPosts] = useState([]);

var numRows = 3
var rows = []


function App() {

  const [modalShow, setModalShow] = React.useState(false);
  const [posts, setPosts] = useState([]);

  db.collection("posts").get().then((querySnapshot )=>{
    var build = []
  
    querySnapshot.forEach((doc) => {
      console.log(doc.data().image);
      build.push(doc.data())
    });
  
    setPosts(build)
  })

  function imageClick(props) {
    setModalShow(true)
  }

  rows = []

  var row = 0

  for(var i = 0; i<posts.length; i++){
    //Add a row
    if(rows.length <= row){
      rows.push([]);
    }

    //Add to a row
    rows[row].push(posts[i]);

    //Increment or Reset
    row = numRows-1 == row ? 0 : row+1
  }

  return (
    <div class = 'div'>
    <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)}/>
      {rows.map((row,i) => 
        <div key = {i}>
          {row.map((post,k) => 
            <img src={post.image} onClick={imageClick} class='cover' key = {k}/>
          )}
        </div>
      )}
    </div>
    // <Test/>
  );
}
 
export default App;