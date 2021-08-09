import { useState, React, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, { Marker } from 'react-map-gl';
import { IoMdFlame } from "react-icons/io";
import { GiSmokingVolcano } from "react-icons/gi";
import Axios from 'axios';
import Desc from './Desc';
import '../Styles/Map.css';
require('dotenv').config();

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = () => {

    const [wildfires, setWildFires] = useState([]);
    const [volcanoes, setVolcanoes] = useState([]);
    const [show, setShow] = useState("");

    useEffect(() => {
        Axios.get("https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories/8").then((res) => {
            setWildFires(res.data.events);
        })
    }, [])

    useEffect(() => {
        Axios.get("https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories/12").then((res) => {
            setVolcanoes(res.data.events);
        })
    }, [])
    
    // console.log(wildfires[0].geometries[0].coordinates[0]);
    // console.log(wildfires[0].geometries[0].coordinates[1]);

    const [viewport, setViewport] = useState({
        latitude: 22.5726,
        longitude: 88.3639,
        zoom: 3.1,
        bearing: 0,
        pitch:0,
        width: "100%",
        height: "94vh",
    });

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/mapbox/dark-v10"
            mapboxApiAccessToken={TOKEN}
            {...viewport}
            onViewportChange={(viewport) => setViewport(viewport)}

        >
            {wildfires.map((val) => {
                return <Marker key={val.id} latitude={val.geometries[0].coordinates[1]} longitude={val.geometries[0].coordinates[0]}>
                        <IoMdFlame onClick={() => { setShow(val.id) }} size="20px" className="fire" />
                    {show === `${val.id}` ? <Desc val={val} show={show} setShow={setShow}/> : <></>}
                    </Marker>
            })}

            {volcanoes.map((val) => {
                return <div key={val.id}>
                    {(val.geometries[0].coordinates[1]) ?
                        <Marker key={val.id} latitude={val.geometries[0].coordinates[1]} longitude={val.geometries[0].coordinates[0]}>
                            <GiSmokingVolcano onClick={() => { setShow(val.id) }} size="20px" className="vol" />
                            {show===`${val.id}`? <Desc val={val} show={show} setShow={setShow} /> : <></>}
                        </Marker>
                        : <></>}
                </div>
            })}

        </ReactMapGL>
    );
}

export default Map