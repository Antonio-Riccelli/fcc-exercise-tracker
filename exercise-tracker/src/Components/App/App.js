import {useState} from "react";
import './App.css';
import CreateUser from '../CreateUserSection';

function App() {
const URL = `https://fcc-exercise-trackr.herokuapp.com/api/users`;
const [createdUser, setCreatedUser] = useState({});


  return (
    <div className="App">
     <h1>Exercise Tracker</h1>
    <CreateUser url={URL} setCreatedUser={setCreatedUser} createdUser={createdUser} />
    </div>
  );
}

export default App;
