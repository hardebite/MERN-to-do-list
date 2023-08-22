import React, { useState, useEffect } from "react";

let nextId = 0;
function App() {
  const [inputText, setInputText] = useState("");
  const [itemList, setItemList] = useState([]);
  const [line, setLine] = useState(false)

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/`);
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const records = await response.json();
      // console.log(records)
      records.map((record) =>(
        // console.log(record._id)
        setItemList((prevValue)=>{
          return [...prevValue, {id:record._id,inputText:record.name}]
        })
      ))
     
    }
    
    getRecords();
  
    return;
  },[]);

  async function handleClick() {
    // const newTask = e.target.getAttribute("value")
    // console.log(inputText);
    // e.preventDefault();
    const newTask ={ "task":inputText}
    console.log(newTask);
   await fetch("http://localhost:5000", {
     method: "POST",
     headers: {
       "Content-Type": "application/x-www-form-urlencoded",
     },
     body: new URLSearchParams(newTask),
   })
   .then(data => data.redirected && (document.location.href='/'))
   .catch(error => {
     window.alert(error);
     
    
     return;
   });
  //  setItemList({})
    // setItemList((prevValue) => {
    //   return [...prevValue];
    // });
    setInputText("");
   
    // setItemList((prevValue)=>{
    //   return [...prevValue,{id:nextId++,inputText:inputText}]
    //  })
  }

  function handleChange(event) {
    const newValue = event.target.value;
    console.log(newValue);
    setInputText(newValue);
  }
  function handleLine(event){
    if(event.target.style.textDecoration){
      event.target.style.removeProperty('text-decoration');
    }else{
      event.target.style.setProperty('text-decoration','line-through');
    }
    // console.log(event.target.style.textDecoration)
  };

  async function deleteTask(id){
    const info = {id:id}
    await fetch(`http://localhost:5000/`, {
     method: "DELETE",
     headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(info),
   });
    setItemList(itemList.filter((a) => a.id !== id));
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onKeyDown={(e)=>{
          if(e.key==="Enter"){
            if(inputText.length>0){
              handleClick()
            }
          }
        }}   value={inputText} onChange={handleChange} type="text" />
        <button onClick={handleClick}>
          <span value={inputText} >Add</span>
        </button>
      </div>
      <div>
        <ul>
          {itemList.map((item,index) => (
            <li  id={index} key={index} onClick={handleLine}>
              {item.inputText}
              <button 
                style={{ float: "right" }}
                onClick={() => { deleteTask(item.id)
                  
                }}
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
