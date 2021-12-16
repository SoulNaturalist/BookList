import React from 'react';
import axios from 'axios';
import './App.css';

function App() {
  //const [Auth, SetAuth] = React.useState(true);
  //const [Loading, SetLoading] = React.useState(true);
  React.useEffect(() => {
    axios({method: 'post',url:'http://127.0.0.1:3030/api/check_auth', headers: {}})
    .then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }, [])


return (
  <div className="App">
    <div className="cointainer">
      <p className="description_title">Book List - это сайт на котором ты можешь указать 
      какие книги прочитал и как их оцениваешь.</p>
    </div>
  </div>

)}

export default App;
