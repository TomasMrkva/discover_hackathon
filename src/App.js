import './App.css';
import Button from 'react-bootstrap/Button';
import Test from './Test'

var pictures = ["https://nypost.com/wp-content/uploads/sites/2/2021/08/rihanna-smells-really-good-323.jpg?quality=80&strip=all","https://nypost.com/wp-content/uploads/sites/2/2021/08/rihanna-smells-really-good-323.jpg?quality=80&strip=all","https://nypost.com/wp-content/uploads/sites/2/2021/08/rihanna-smells-really-good-323.jpg?quality=80&strip=all","https://nypost.com/wp-content/uploads/sites/2/2021/08/rihanna-smells-really-good-323.jpg?quality=80&strip=all","https://nypost.com/wp-content/uploads/sites/2/2021/08/rihanna-smells-really-good-323.jpg?quality=80&strip=all"]

var numRows = 3
var rows = []

function App() {
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
    row = numRows == row ? 0 : row+1
  }


  return (
    <div>
      {rows.map((row,i) => 
        <span>
        {row.map((image,k) => <img src={image} class='cover' key = {k}/>)}
        </span>
      )}
    </div>
    // <Test/>
  );
}

export default App;