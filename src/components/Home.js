import React,{useState,useEffect} from 'react'
import '../css/home.css'
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';


const Home = () => {
  const[isCompleteScreen,setIsCompleteScreen]= useState(false);
  const[allTodos,setAllTodos]=useState([]);
  const[newTitle,setNewTitle] = useState("");
  const[newDescription,setNewDescription]=useState("");
  const[completedTodos,setCompletedTodos]=useState([]);
const handleAddTodo =()=>{
  let newTodoItem ={
  title: newTitle,
  description:newDescription,
  }
  let updatedTodoArr = [...allTodos];
  updatedTodoArr.push(newTodoItem);
  setAllTodos(updatedTodoArr);
  localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
};
const handleDeleteTodo =(index)=>{
  let reducedTodo=[...allTodos]
  reducedTodo.splice(index);
  localStorage.setItem('todolist',JSON.stringify(reducedTodo));
  setAllTodos(reducedTodo);
};
const handleCompleteTodo=(index)=>{
  let now = new Date();
  let dd = now.getDate();
  let mm = now.getMonth()+1;
  let yy = now.getFullYear();
  let hr= now.getHours();
  let min = now.getMinutes();
  let seconds = now.getSeconds();
  // let completedOn = dd + '-' + mm +'-'+ yy + ' '+ 'at' +' '+ hr +':'+ min +':'+seconds;
  let completedOn = `${dd}- ${mm}- ${yy} at ${hr}-${min} -${seconds}`;
let filteredItem ={
  ...allTodos[index],
  completedOn:completedOn
}
  

let updatedCompletedArr =[...completedTodos];
updatedCompletedArr.push(filteredItem);
setCompletedTodos(updatedCompletedArr);
handleDeleteTodo(index);
localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));
}
const handleDeleteCompletedTodo =(index)=>{
  let reducedTodo=[...completedTodos]
  reducedTodo.splice(index);
  localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
  setCompletedTodos(reducedTodo); }


useEffect(()=>
{
  let savedTodo = JSON.parse(localStorage.getItem('todolist'))
  let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodo'))

if(savedTodo){
  setAllTodos(savedTodo);
}
if(savedCompletedTodo){
  setCompletedTodos(savedCompletedTodo)
}
},[]);

  return (
    <div className="todo-wrapper">
        <div className="todo-input">
            <div className='input-item'>
                <label>TITLE</label>
                <input type='text'value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's the task title?"/>
            </div>
            <div className='input-item'>
              <label>DESCRIPTION</label>
              <input type='text' value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="What's the task description?"/>
            </div>
            <div className='input-item'>
              <button type='button' onClick={handleAddTodo} className='Primary-btn'>ADD</button>
            </div>
          </div>
        <div className="btn-area">
        <button className={`secondary-btn ${isCompleteScreen === false ? "active" : ""}`} onClick={()=>setIsCompleteScreen(false)} >to-do
          </button>
          
        <button className={`secondary-btn ${isCompleteScreen === true ? "active" : "" }`} onClick={()=>setIsCompleteScreen(true)}>Completed
        </button>
        </div>
      
      <div className="todo-list">
        {isCompleteScreen===false && allTodos.map((item,index)=>{
          return(
            <div className='todo-list-item' key={index}>
            <div>
           <h1>{item.title}</h1>
           <p>{item.description}</p>
           </div> 
           <div>
            <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)} title="delete?"/>
            <BsCheckLg className='check-icon' onClick={()=>handleCompleteTodo(index)} title='completed?'/>
          </div>
          </div>
          );
       
        } ) }

{isCompleteScreen===true && completedTodos.map((item,index)=>{
      return(
            <div className='todo-list-item' key={index}>
            <div>
           <h1>{item.title}</h1>
           <p>{item.description}</p>
           <p><small>Completed on: {item.completedOn}</small></p>
           <div>
            <AiOutlineDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)} title="delete?"/>
            </div>
        </div>
      </div>
      )})}

</div>
</div>
  )
  

      }
export default Home
