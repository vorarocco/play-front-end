import React,{useState} from 'react'
import './adminAddMovie.scss'
import Popup from '../components/popup/Popup'
import { AuthContext } from '../context/authContext/AuthContext'
import { useContext } from 'react';


const AdminAddMovie = ({addMovie}) => {
    const form ={
        title: " ",
        description: " ",
        img: " ",
        imgTitle: " ",
        imgSmall: " ",
        trailer: " ",
        video: " ",
        year: " ",
        limit: " ",
        genre: " ",
        isSeries: false
    }


    const [newForm , setNewForm] = useState(form)
    const [isOpen , setIsOpen] = useState(false)
    const context = useContext(AuthContext)



    const togglePopup = () =>{
        setIsOpen(!isOpen)
      }

  let handleSubmit = async (e) =>{
    e.preventDefault()
    let response = await fetch(`${process.env.REACT_APP_backendURI}movies`, {
        method:'POST',
        body: JSON.stringify({
            title: newForm.title,
            description: newForm.description,
            img: newForm.img,
            imgTitle: newForm.imgTitle,
            imgSmall: newForm.imgSmall,
            trailer: newForm.trailer,
            video: newForm.video,
            year: newForm.year,
            limit: newForm.limit,
            genre: newForm.genre,
            isSeries: false

        }),
        headers:{
            token:
            `Bearer ${context.user.accesToken}`,
            "Content-Type": "application/json"
        }
    })
    let list = await response.json()
    console.log(list)
    addMovie(list)
    setNewForm(form)
    togglePopup()

}

let handleChange = (e) =>{
    setNewForm({
        ...newForm,
        [e.target.id]:(e.target.value)
    })}

  return (
      <>
    <div>
        <input className='button addnew' type="button" value="Add New Movie" onClick={togglePopup}/>
    </div>
        {isOpen && <Popup 
            content={<>
        <form className='addForm' onSubmit={handleSubmit}>
                <ul className='ul'>
                <li className='li'>
                    <label htmlFor="title">Title:</label>
                    <input 
                        type="text" 
                        id='title' 
                        name='title' 
                        onChange ={handleChange} 
                        value={newForm.title} 
                        placeholder='title'/>
                </li>
                <li className='li'>
                    <label htmlFor="description">description:</label>
                    <textarea 
                        type="text" 
                        id='description' 
                        name='description' 
                        onChange ={handleChange} 
                        value={newForm.description} 
                        placeholder='description'>    
                    </textarea>
                </li>
                <li className='li'>
                    <label htmlFor="img">Img:</label>
                    <input 
                        type="text" 
                        id='img' 
                        name='img' 
                        onChange ={handleChange} 
                        value={newForm.img} 
                        placeholder='img'/>
                </li>
                <li className='li'>
                    <label htmlFor="imgTitle">ImgTitle:</label>
                    <input 
                        type="text" 
                        id='imgTitle' 
                        name='imgTitle' 
                        onChange ={handleChange} 
                        value={newForm.imgTitle} 
                        placeholder='imgTitle'/>
                </li>
                <li className='li'>
                    <label htmlFor="imgSmall">ImgSmall:</label>
                    <input 
                        type="text" 
                        id='imgSmall' 
                        name='imgSmall' 
                        onChange ={handleChange} 
                        value={newForm.imgSmall} 
                        placeholder='imgSmall'/>
                </li>
                <li className='li'>
                    <label htmlFor="trailer">trailer:</label>
                    <input 
                        type="text" 
                        id='trailer' 
                        name='trailer' 
                        onChange ={handleChange} 
                        value={newForm.trailer} 
                        placeholder='trailer'/>
                </li>
                <li className='li'>
                    <label htmlFor="video">video:</label>
                    <input 
                        type="text" 
                        id='video' 
                        name='video' 
                        onChange ={handleChange} 
                        value={newForm.video} 
                        placeholder='video'/>
                </li>
                <li className='li'>
                    <label htmlFor="year">year:</label>
                    <input 
                        type="text" 
                        id='year' 
                        name='year' 
                        onChange ={handleChange} 
                        value={newForm.year} 
                        placeholder='year'/>
                </li>
                <li className='li'>
                    <label htmlFor="limit">limit:</label>
                    <input 
                        type="text" 
                        id='limit' 
                        name='limit' 
                        onChange ={handleChange} 
                        value={newForm.limit} 
                        placeholder='limit'/>
                </li>
                <li className='li'>
                    <label htmlFor="genre">genre:</label>
                    <input 
                        type="text" 
                        id='genre' 
                        name='genre' 
                        onChange ={handleChange} 
                        value={newForm.genre} 
                        placeholder='genre'/>
                </li>
                <li className='li'>
                    <label htmlFor="isSeries">Check for Series:</label>
                    <input 
                        type="checkbox" 
                        id='isSeries' 
                        name='isSeries' 
                        onChange ={handleChange} 
                        value={true} 
                        placeholder='isSeries'/>
                </li>
                </ul>

            <input type="submit" value='Add new movie' />
        </form>

        </> }
        handleClose={togglePopup}
        />} 
    {/* </div> */}
 </>
  )
}

export default AdminAddMovie

