import React, { SyntheticEvent, useState } from 'react'
import {ComposableMap, Geographies, Geography}  from "react-simple-maps";


const Map = (props: any) => {
    const {geoUrl} = props
    const [obl, setObl] = useState(null);
    const [clickedCity, setClickedCity] = useState(false);

    const handleSelectedObl = (e: any, selectedObl: any) => {
        const selectedDis = e.target;
        selectedDis.fill = 'red'
        // e.target.fill = 'red'
        setObl(selectedObl);
        setClickedCity(selectedObl.properties.NAME_1);
        // handleObl(selectedObl.properties.NAME_1)
    }

    // console.log(obl && obl.properties.NAME_1)
    return (<div style={{position: 'relative', left: 0, width: `70%`, zIndex: 1}}>
        <ComposableMap height={500} width={900}>
            <Geographies geography={geoUrl}>
                {({geographies}) => geographies.map(geo => {
                    const isClicked = (obl && obl.properties.NAME_1) === geo.properties.NAME_1;

                    return <Geography
                        style={{
                            default: {outline: "none", stroke: '#fff'},
                            hover: {outline: "none", stroke: '#fff', fill: '#008acb'},
                            pressed: {outline: "none", stroke: '#fff', fill: '#008acb'},
                            // focused: {outline: "none", fill: '#008acb'},
                            // blur: {fill: 'red'},
                            // click: {fill: 'red'}
                        }}
                        fill={isClicked ? "#008acb" : "#c2c2c2"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        onClick={(e) => handleSelectedObl(e, geo)}
                        key={geo.rsmKey}
                        geography={geo}/>
                })}
            </Geographies>
        </ComposableMap>
    </div>)
}

export default Map;