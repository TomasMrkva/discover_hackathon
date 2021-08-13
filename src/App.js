import './App.css';
import React from 'react'
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from './Popup'


var pictures = ['https://www.nme.com/wp-content/uploads/2020/05/GettyImages-1134174735.jpg',"https://nypost.com/wp-content/uploads/sites/2/2021/08/rihanna-smells-really-good-323.jpg?quality=80&strip=all",'https://www.nme.com/wp-content/uploads/2020/05/GettyImages-1134174735.jpg',"https://nypost.com/wp-content/uploads/sites/2/2021/08/rihanna-smells-really-good-323.jpg?quality=80&strip=all",'https://www.nme.com/wp-content/uploads/2020/05/GettyImages-1134174735.jpg',"https://nypost.com/wp-content/uploads/sites/2/2021/08/rihanna-smells-really-good-323.jpg?quality=80&strip=all",'https://www.nme.com/wp-content/uploads/2020/05/GettyImages-1134174735.jpg',"https://nypost.com/wp-content/uploads/sites/2/2021/08/rihanna-smells-really-good-323.jpg?quality=80&strip=all",'https://www.nme.com/wp-content/uploads/2020/05/GettyImages-1134174735.jpg',"https://nypost.com/wp-content/uploads/sites/2/2021/08/rihanna-smells-really-good-323.jpg?quality=80&strip=all",'https://www.nme.com/wp-content/uploads/2020/05/GettyImages-1134174735.jpg',"https://nypost.com/wp-content/uploads/sites/2/2021/08/rihanna-smells-really-good-323.jpg?quality=80&strip=all",'https://www.nme.com/wp-content/uploads/2020/05/GettyImages-1134174735.jpg',"https://nypost.com/wp-content/uploads/sites/2/2021/08/rihanna-smells-really-good-323.jpg?quality=80&strip=all",'https://www.nme.com/wp-content/uploads/2020/05/GettyImages-1134174735.jpg',"https://nypost.com/wp-content/uploads/sites/2/2021/08/rihanna-smells-really-good-323.jpg?quality=80&strip=all",'https://www.nme.com/wp-content/uploads/2020/05/GettyImages-1134174735.jpg',"https://nypost.com/wp-content/uploads/sites/2/2021/08/rihanna-smells-really-good-323.jpg?quality=80&strip=all",'https://www.nme.com/wp-content/uploads/2020/05/GettyImages-1134174735.jpg',"https://nypost.com/wp-content/uploads/sites/2/2021/08/rihanna-smells-really-good-323.jpg?quality=80&strip=all",'https://www.nme.com/wp-content/uploads/2020/05/GettyImages-1134174735.jpg',"https://nypost.com/wp-content/uploads/sites/2/2021/08/rihanna-smells-really-good-323.jpg?quality=80&strip=all",'https://www.nme.com/wp-content/uploads/2020/05/GettyImages-1134174735.jpg',"https://nypost.com/wp-content/uploads/sites/2/2021/08/rihanna-smells-really-good-323.jpg?quality=80&strip=all",'https://www.nme.com/wp-content/uploads/2020/05/GettyImages-1134174735.jpg',"https://nypost.com/wp-content/uploads/sites/2/2021/08/rihanna-smells-really-good-323.jpg?quality=80&strip=all",'https://www.nme.com/wp-content/uploads/2020/05/GettyImages-1134174735.jpg']

var numRows = 2
var rows = []


function App() {

  const [modalShow, setModalShow] = React.useState(false);

  function imageClick(props) {
    setModalShow(true)
  }

  rows = []

  var row = 0

  for(var i = 0; i<pictures.length; i++){
    //Add a row
    if(rows.length <= row){
      rows.push([]);
    }

    //Add to a row
    rows[row].push(pictures[i]);

    //Increment or Reset
    row = numRows-1 == row ? 0 : row+1
  }

  return (
    <div class = 'div'>
    <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)}/>
      {rows.map((row,i) => 
        <div>
          {row.map((image,k) => 
            <img src={image} onClick={imageClick} class='cover' key = {k}/>
          )}
        </div>
      )}
    </div>
    // <Test/>
  );
}
 
export default App;