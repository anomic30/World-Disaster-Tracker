import React from 'react';
import '../Styles/Desc.css';
import { IoCloseCircleSharp } from 'react-icons/io5';

const Desc = ({val, show, setShow}) => {
    return (
        <div className="desc">
            <IoCloseCircleSharp className="close" onClick={()=>{setShow(!show)}}/>
            <p>{val.title}</p>
            <p>{val.geometries[0].date.slice(0,10)}</p>
        </div>
    )
}

export default Desc
