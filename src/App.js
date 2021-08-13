import './App.css';
import React from 'react'
import Popup from './Popup'


var numRows = 3
var rows = []

const posts = [
  {
    key: 1,
    image: 'https://www.nme.com/wp-content/uploads/2020/05/GettyImages-1134174735.jpg', 
    title: 'To Pimp a Butterfly', 
    message: 'The best album ever made', 
    dateTime:'29/03/21'
  }, {
    key: 2,
    image: 'https://nypost.com/wp-content/uploads/sites/2/2021/08/rihanna-smells-really-good-323.jpg?quality=80&strip=all', 
    title: 'Rihanna', 
    message: 'My hobbies are singing and being rich', 
    dateTime:'1/06/21'
  }
]

function App() {

  const [modalShow, setModalShow] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  function imageClick(post) {
    setModalShow(true)
    setModalData(post)
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
    <div className = 'div'>
       {modalData && <Popup show={modalShow} onHide={() => setModalShow(false)} data={modalData}/>}
      { rows.map((row,i) => 
        <div>
          { row.map( (post,k) => 
            <>
              <img src={post.image} onClick={() => imageClick(post)} className='cover' key = {k}/>
            </>
          )}
        </div>
      )}
    </div>
  );
}
 
export default App;