import React,{useState} from 'react'
import './adminAddList.scss'
import { AuthContext } from '../context/authContext/AuthContext'
import { useContext } from 'react';

const AdminAddList = ({addList}) => {
    const form ={
        title: " ",
        type: " ",
        genre: " ",
        content: []
    }
  const [newForm , setNewForm] = useState(form)
  const context = useContext(AuthContext)


  let handleSubmit = async (e) =>{
    e.preventDefault()
    let response = await fetch(`${process.env.REACT_APP_backendURI}lists`, {
        method:'POST',
        body: JSON.stringify({
            title: newForm.title,
            type: newForm.type,
            genre: newForm.genre,
            content: newForm.content
        }),
        headers:{
            token:
            `Bearer ${context.user.accesToken}`,
            "Content-Type": "application/json"
        }
    })
    let list = await response.json()
    console.log(list)
    addList(list)
    setNewForm(form)
}

  let handleChange = (e) =>{
    setNewForm({
        ...newForm,
        [e.target.id]:(e.target.value)
    })}

  return (
    <div>AdminAddList
        <form onSubmit={handleSubmit}>
                <ul>
                <li>
                    <label htmlFor="title">Title:</label>
                    <input 
                        type="text" 
                        id='title' 
                        name='title' 
                        onChange ={handleChange} 
                        value={newForm.title} 
                        placeholder='title'/>
                </li>
                <li>
                    <label htmlFor="title">Type:</label>
                    <input 
                        type="text" 
                        id='type' 
                        name='type' 
                        onChange ={handleChange} 
                        value={newForm.type} 
                        placeholder='type'/>
                </li>
                <li>
                    <label htmlFor="genre">Genre:</label>
                    <input 
                        type="text" 
                        id='genre' 
                        name='genre' 
                        onChange ={handleChange} 
                        value={newForm.genre} 
                        placeholder='genre'/>
                </li>
                <li>
                    <label htmlFor="content">Movie ID:</label>
                    <textarea 
                        type="text" 
                        id='content' 
                        name='content' 
                        onChange ={handleChange} 
                        value={newForm.content} 
                        placeholder='"id","id","id"'>    
                    </textarea>
                </li>
                </ul>
                

            <input type="submit" value='Add new list' />
        </form>
    </div>
  )
}

export default AdminAddList
