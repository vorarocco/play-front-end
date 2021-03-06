import React, { useEffect, useState } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import "./featured.scss"
import axios from 'axios';
import { AuthContext } from '../../context/authContext/AuthContext'
import { useContext } from 'react';

const Featured = ({type, setGenre}) => {
    const [content,setContent] = useState({})
    const context = useContext(AuthContext)

    useEffect(()=>{
    // console.log(context)
        const getRandomContent = async()=>{
            try{
                const res = await axios.get(`${process.env.REACT_APP_backendURI}movies/random?type=${type}`,
                {
                    headers:{
                      token:
                      `Bearer ${context.user.accesToken}`
                    }
                  }
                  )
                setContent(res.data[0])
            }catch(err){
                console.log(err)
            }
        }
        getRandomContent()
    },[type])
    // console.log(content)
  return (
    <div className='featured'>
        {type && (
            <div className='category'>
                <span>{type === 'movie' ? 'Movies' : 'Series'}</span>
                <select 
                    name="genre" 
                    id="genre"
                    onChange={(e) => setGenre(e.target.value)}
                    >

                    <option>Genres</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Action">Action</option>
                    <option value="Drama">Drama</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Horror">Horror</option>
                    <option value="Romance">Romance</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Kid">Kid</option>

                </select>
            </div>
        )}
        <img 
            width= '100%'
            src={content.img}
            alt="" 
        />
        <div className="info">
            <img src={content.imgSmall} alt="" />

            <span className='description'>
                {content.description}
            </span>
            <div className="buttons">
                <button className='play-button'>
                    <PlayArrowIcon/>
                    <span>Play</span>
                </button>

                <button className='more-button'>
                    <InfoOutlinedIcon/>
                    <span>More Info</span>
                </button>

            </div>
        </div>
    </div>
  )
}

export default Featured