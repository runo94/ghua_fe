import {useState} from "react";

import Map from "../../components/Map";
import Sidebar from "../../components/Sidebar";
import geoUrl from "../../components/Map/Ukraine-regions.json";


const HomePage = () => {
  const [obl, setObl] = useState(null)
  const [show, setShow] = useState(false)


  const toBcd = (number) => {
    let out = "", bit = 1;
    while (number >= bit) {
      out = (number & bit ? 1 : 0) + out;
      console.log(number & bit)
      bit <<= 1;
    }
    return out || "0";
  }

  return (
    <>
      <Map geoUrl={geoUrl}/>
      <Sidebar name={obl} show={show}/>
    </>
  );
}

export default HomePage;