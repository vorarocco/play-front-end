import React from 'react'
import './popup.scss'

const Popup = ({content, handleClose}) => {
  return (
    <div className="popup-box">
        <div className="box">
        <span className="close-icon" onClick={handleClose}>x</span>
        {content}
      </div>
    </div>
  )
}

export default Popup