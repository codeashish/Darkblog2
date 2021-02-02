import React from 'react'
import Spinnerr from  './preloader.gif'
export default function Spinner() {
    return (
        <div>
            <img src={Spinnerr} 
            alt="...Loading" style={{width:'50px',margin:'auto',display:'block'}} />
        </div>
    )
}
