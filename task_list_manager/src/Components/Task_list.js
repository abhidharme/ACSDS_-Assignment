import React, {useEffect, useState } from 'react'
import axios from "axios";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
// import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { color } from '@mui/system';

const Task_list = () => {

    const [task , setTask] = useState("");
    const [taskdata , setTaskdata] = useState([]);
    const [complete_task , setComplete_task] = useState(false);


const handleSubmit = ()=>{
    axios.post("http://localhost:8080/tasks",{
        task:task
    })
    .then(getData())
}

useEffect(()=>{
getData()
},[complete_task,task])

   const getData = ()=>{
        axios.get("http://localhost:8080/tasks")
        .then((res)=>setTaskdata(res.data))
    }
   


const handleDelete = (id)=>{
  axios.delete(`http://localhost:8080/tasks/${id}`)
  .then(alert("Task Deleted"))
  .then(getData())
}

// function check(){
//     if({complete_task}){
//         <span id="task_com">{el.task}</span> 
//     }
//     else{
//         <span>{el.task}</span>
//     }
// }

  return (
    <div>

    <div>
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 , border:"3px solid black" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1  }}
        placeholder="Enter Task"
        onChange={(e)=>setTask(e.target.value)}
      />
      <Button variant="contained" color="success" onClick={handleSubmit}>
      Add New Task
    </Button>
    </Paper>
    </div>
  <div id="dash"></div>
    <div>
    {taskdata.map((el)=>(
        <div className='border' key={el.id}>
        <Checkbox onChange={()=>setComplete_task(true)} />
        <span>{el.task}</span>
        <CloseIcon id="cross" onClick={()=>handleDelete(el.id)}/>
        </div>
    ))}
    </div>
     
    </div>
  )
}

export default Task_list