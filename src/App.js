import React, { useState } from 'react';
import './App.css';
import Item from "./components/Item";
import { v4 as uuidv4 } from "uuid"; //to generate ID

const arr = () => {
  let data = localStorage.getItem("data"); //localStorage stores item as key,value pairs
  if (data) return JSON.parse(localStorage.getItem("data"));
  else return [];
};

function App() {
  const [item, setItem] = useState(""); //initial state is empty 
  const [edit, setEdit] = useState(false); //initial state is false
  const [editId, setEditId] = useState();
  const [list, setList] = useState(arr); //initial state is empty array 
  const [error, setError] = useState("");
  const [choice, setChoice] = useState("");

  const handleSubmit = (e) => { //handle list of tasks
    const newItem = {
      id: uuidv4(),
      item: item,
      complete: false,
    };
    e.preventDefault();
    if (item && item.length <= 25 && !edit) { //adding new option
      setList([...list, newItem]);
      setItem("");
      setError("");
    } else if (item && item.length <= 25 && edit && editId) { //editing option
      setList(
        list.map((el) => {
          if (el.id === editId) { 
            return { ...el, item: item };
          }
          return el;
        })
      );
      setItem("");
      setEditId(null);
      setEdit(false);
      setError("");
    } else if (!item) setError("Item cannot be blank."); //error checking - no entry
    else if (item.length > 25) setError("Character limit is 25."); //error checking - too long
  };

  React.useEffect(() => { //runs after every render/update
    localStorage.setItem("data", JSON.stringify(list));
  }, [list]);

  const handleChange = (e) => {
    setItem(e.target.value);
    
  };

  const handleGenerate = (id) => {
    //const editItem = list.find((el) => el.id === id); //find item in database and edit
    //var items = Array()
    //items.push(el)
    id.preventDefault()
    console.log(JSON.parse(localStorage.getItem("data")));
    var storage = localStorage.getItem(localStorage.key(0)) //get JSON file of data
    var archive = storage.split(',')
    var j = Math.floor(Math.random()*archive.length); //random number 
    if (j%3 === 0){ //only the values with jmod3==1 are the options
      j = j+1;
    } 
    else if (j%3 === 2){
      j = j-1;
    } 
    var option = archive[j].split(':')[1].replace(/['"]+/g, '')
    setChoice(option)
  };

  //<img src="https://t4.ftcdn.net/jpg/02/52/14/51/360_F_252145102_t75RhIswYlQQglnd2a9kfkHmxaCpIAc1.jpg" width = "40" height = "30" alt="logo" />  

  return (
    <div className="App">
      <head>
        <link href='https://fonts.googleapis.com/css?family=Rock Salt' rel='stylesheet'></link>
        <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet'></link>
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Roboto Mono"></link>
      </head>
      <div class = "inline">
        <h1>Indecisive App </h1>
      </div>
      <form onSubmit={handleGenerate}>
        <h3><i>Can't decide what to do today? Enter your options below and we will help you decide!</i></h3> 
        <button type="button" class="btn" type="submit">
            Generate What To Do
        </button>
        {choice && <h3 style={{ color: "black" }}>You should {choice} today!</h3>}
      </form>
      <br></br>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          value={item}
          placeholder="Enter option"
          onChange={handleChange}
        />  
        <button className="btn2" type="submit">
          Add Options
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <div>
        {list.map((c, id) => (
          <Item
            key={id}
            id={c.id}
            item={c.item}
            list={list}
            setList={setList}
            setItem={setItem}
            setEdit={setEdit}
            setEditId={setEditId}
          />
        ))}
      </div>
    </div>
  );
}

export default App;